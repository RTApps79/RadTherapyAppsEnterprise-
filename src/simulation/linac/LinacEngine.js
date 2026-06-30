// src/simulation/linac/LinacEngine.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class LinacEngine {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.isRunning = false;
        
        // 1. Scene Setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0c1118);
        this.scene.fog = new THREE.Fog(0x0c1118, 20, 100);

        // 2. Camera Setup (Ensure we don't divide by zero on boot)
        const width = this.canvas.clientWidth || window.innerWidth;
        const height = this.canvas.clientHeight || window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
        this.camera.position.set(20, 15, 30);

        // 3. Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(width, height);

        // 4. Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.target.set(0, 0, 0);

        this.buildEnvironment();
        this.buildLinacRig();
        
        this.animate = this.animate.bind(this);
    }

    buildEnvironment() {
        // High-intensity ambient light to guarantee visibility
        this.scene.add(new THREE.AmbientLight(0xffffff, 2.0));

        // DEBUG HELPER: A visible grid on the floor
        const gridHelper = new THREE.GridHelper(50, 50, 0x3d8bf0, 0x243449);
        gridHelper.position.y = -10;
        this.scene.add(gridHelper);

        // DEBUG HELPER: Colored axes at the Isocenter (X=Red, Y=Green, Z=Blue)
        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);
    }

    buildLinacRig() {
        this.linacStand = new THREE.Group();
        this.gantry = new THREE.Group();
        this.collimator = new THREE.Group();
        
        this.linacStand.add(this.gantry);
        this.gantry.add(this.collimator);
        this.scene.add(this.linacStand);

        // The Gantry Head (Mock) - Using MeshNormalMaterial so it glows rainbow and ignores lighting
        const headMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(3, 4, 8, 32),
            new THREE.MeshNormalMaterial({ wireframe: false }) 
        );
        headMesh.position.set(0, 10, 0); 
        this.gantry.add(headMesh);
    }

    setGantryAngle(degrees) {
        const radians = degrees * (Math.PI / 180);
        this.gantry.rotation.z = -radians; 
    }

    start() {
        this.isRunning = true;
        console.log("3D Engine Started!"); // Debug check
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    resize(width, height) {
        if (width === 0 || height === 0) return;
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
