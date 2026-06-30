// src/simulation/linac/LinacEngine.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class LinacEngine {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.isRunning = false;
        
        // 1. Scene Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0c1118); // Dark vault color
        this.scene.fog = new THREE.Fog(0x0c1118, 20, 100);

        // 2. Camera Setup
        this.camera = new THREE.PerspectiveCamera(50, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 500);
        this.camera.position.set(20, 15, 30);

        // 3. Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;

        // 4. Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.target.set(0, 0, 0); // Look at Isocenter

        this.buildEnvironment();
        this.buildLinacRig();
        
        // Bind the animation loop to this instance
        this.animate = this.animate.bind(this);
    }

    buildEnvironment() {
        // Ambient Light
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        
        // Vault SpotLight
        const spot = new THREE.SpotLight(0xffffff, 2000);
        spot.position.set(0, 40, 20);
        spot.castShadow = true;
        this.scene.add(spot);

        // Floor
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 0x16212e, roughness: 0.8 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -10; // Floor is 100cm below isocenter (assuming 1 unit = 10cm)
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    buildLinacRig() {
        // Create a 3D Object Hierarchy so rotating the gantry rotates the collimator with it
        this.linacStand = new THREE.Group();
        this.gantry = new THREE.Group();
        this.collimator = new THREE.Group();
        
        this.linacStand.add(this.gantry);
        this.gantry.add(this.collimator);
        this.scene.add(this.linacStand);

        // --- Mock Geometry for now (We will load real GLTF models later) ---
        
        // The Gantry Head (Mock)
        const headMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(3, 4, 8, 32),
            new THREE.MeshStandardMaterial({ color: 0xeef2f6 })
        );
        headMesh.position.set(0, 10, 0); // 100cm from isocenter
        this.gantry.add(headMesh);

        // Isocenter marker (Tiny green sphere)
        const iso = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0x2fd27a })
        );
        this.scene.add(iso);
    }

    // --- Public API for the UI to call ---

    setGantryAngle(degrees) {
        // Convert Varian IEC scale (0 = top, 180 = bottom) to radians
        const radians = degrees * (Math.PI / 180);
        this.gantry.rotation.z = -radians; 
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        if (!this.isRunning) return;
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
