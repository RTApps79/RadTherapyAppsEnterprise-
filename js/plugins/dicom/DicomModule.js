import Module from "../../core/Module.js";

export default class DicomModule extends Module {

    constructor(services) {

        super("dicom", services);

        this.dicomViewer = null;
        this.imageStack = [];
        this.currentImageIndex = 0;

    }

    async initialize() {

        this.store = this.services.get("store");
        this.events = this.services.get("events");

        this.events.subscribe(
            "patientChanged",
            patient => {
                if (this.active)
                    this.loadPatientDicom(patient);
            }
        );

    }

    async render() {

        this.container.innerHTML = `
            <div class="dicom-viewer">
                <div class="dicom-header">
                    <h1>DICOM Image Viewer</h1>
                </div>
                
                <div class="dicom-controls">
                    <div class="control-group">
                        <label for="studySelector">Study:</label>
                        <select id="studySelector">
                            <option>Select Study...</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <label for="seriesSelector">Series:</label>
                        <select id="seriesSelector">
                            <option>Select Series...</option>
                        </select>
                    </div>
                    
                    <div class="control-group">
                        <button id="resetBtn" class="btn-control">Reset View</button>
                        <button id="zoomInBtn" class="btn-control">Zoom In</button>
                        <button id="zoomOutBtn" class="btn-control">Zoom Out</button>
                        <button id="panBtn" class="btn-control">Pan</button>
                    </div>
                </div>

                <div class="dicom-canvas-container">
                    <canvas id="dicomCanvas" class="dicom-canvas" width="512" height="512"></canvas>
                </div>

                <div class="dicom-info">
                    <p id="imageInfo">No image loaded</p>
                    <p id="patientInfo">Patient Information</p>
                </div>

                <div class="dicom-navigation">
                    <button id="prevBtn" class="nav-btn">&lt; Previous</button>
                    <span id="imageCounter">0 / 0</span>
                    <button id="nextBtn" class="nav-btn">Next &gt;</button>
                </div>

                <div id="fileUpload" class="file-upload">
                    <label for="dicomFile">Load DICOM File:</label>
                    <input type="file" id="dicomFile" accept=".dcm" multiple>
                    <button id="uploadBtn" class="btn-primary">Upload & View</button>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.initializeCornerstone();

    }

    initializeCornerstone() {

        const canvas = document.getElementById("dicomCanvas");
        
        if (!canvas || !window.cornerstone) {
            console.warn("Cornerstone not loaded or canvas not found");
            return;
        }

        try {
            // Enable the element for Cornerstone
            cornerstone.enable(canvas);
            console.info("Cornerstone initialized successfully");
        } catch (error) {
            console.error("Error initializing Cornerstone:", error);
        }

    }

    setupEventListeners() {

        // File upload
        const uploadBtn = document.getElementById("uploadBtn");
        if (uploadBtn) {
            uploadBtn.addEventListener("click", () => this.handleFileUpload());
        }

        // Navigation buttons
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        if (prevBtn) prevBtn.addEventListener("click", () => this.previousImage());
        if (nextBtn) nextBtn.addEventListener("click", () => this.nextImage());

        // Control buttons
        const resetBtn = document.getElementById("resetBtn");
        const zoomInBtn = document.getElementById("zoomInBtn");
        const zoomOutBtn = document.getElementById("zoomOutBtn");

        if (resetBtn) resetBtn.addEventListener("click", () => this.resetView());
        if (zoomInBtn) zoomInBtn.addEventListener("click", () => this.zoomIn());
        if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => this.zoomOut());

    }

    handleFileUpload() {

        const fileInput = document.getElementById("dicomFile");
        const files = fileInput?.files || [];

        if (files.length === 0) {
            alert("Please select DICOM files");
            return;
        }

        this.imageStack = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const arrayBuffer = event.target.result;
                    
                    // Parse DICOM
                    if (window.dicomParser) {
                        const dataSet = dicomParser.parseDicom(new Uint8Array(arrayBuffer));
                        this.imageStack.push({
                            file: file.name,
                            data: dataSet,
                            arrayBuffer: arrayBuffer
                        });
                    }

                    if (i === files.length - 1) {
                        this.currentImageIndex = 0;
                        this.displayImage();
                    }

                } catch (error) {
                    console.error("Error parsing DICOM file:", error);
                }
            };

            reader.readAsArrayBuffer(file);
        }

    }

    displayImage() {

        if (this.imageStack.length === 0) {
            alert("No DICOM images loaded");
            return;
        }

        const image = this.imageStack[this.currentImageIndex];
        const canvas = document.getElementById("dicomCanvas");
        const counter = document.getElementById("imageCounter");
        const infoDiv = document.getElementById("imageInfo");

        if (counter) {
            counter.textContent = `${this.currentImageIndex + 1} / ${this.imageStack.length}`;
        }

        if (infoDiv) {
            infoDiv.textContent = `File: ${image.file}`;
        }

        // Render using Cornerstone if available
        if (window.cornerstone && canvas) {
            try {
                // Display placeholder message
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "white";
                ctx.font = "14px Arial";
                ctx.fillText("DICOM Image: " + image.file, 20, 30);
                ctx.fillText("Ready for advanced rendering", 20, 50);
            } catch (error) {
                console.error("Error displaying image:", error);
            }
        }

    }

    nextImage() {

        if (this.currentImageIndex < this.imageStack.length - 1) {
            this.currentImageIndex++;
            this.displayImage();
        }

    }

    previousImage() {

        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.displayImage();
        }

    }

    resetView() {

        const canvas = document.getElementById("dicomCanvas");
        if (canvas && window.cornerstone) {
            try {
                cornerstone.reset(canvas);
            } catch (error) {
                console.warn("Error resetting view:", error);
            }
        }

    }

    zoomIn() {

        const canvas = document.getElementById("dicomCanvas");
        if (canvas && window.cornerstone) {
            try {
                const viewport = cornerstone.getViewport(canvas);
                viewport.scale *= 1.2;
                cornerstone.setViewport(canvas, viewport);
            } catch (error) {
                console.warn("Error zooming in:", error);
            }
        }

    }

    zoomOut() {

        const canvas = document.getElementById("dicomCanvas");
        if (canvas && window.cornerstone) {
            try {
                const viewport = cornerstone.getViewport(canvas);
                viewport.scale *= 0.8;
                cornerstone.setViewport(canvas, viewport);
            } catch (error) {
                console.warn("Error zooming out:", error);
            }
        }

    }

    loadPatientDicom(patient) {

        if (!patient) return;

        console.info("Loading DICOM for patient:", patient.fullName);
        // Auto-load DICOM files if available in future implementation
        const patientInfo = document.getElementById("patientInfo");
        if (patientInfo) {
            patientInfo.textContent = `Patient: ${patient.fullName} | MRN: ${patient.mrn}`;
        }

    }

}
