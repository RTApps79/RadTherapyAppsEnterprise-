// src/ui/widgets/TreatmentRoom3D.js

import Component from '../core/Component.js';
import LinacEngine from '../../simulation/linac/LinacEngine.js';

export default class TreatmentRoom3D extends Component {
    constructor(props) {
        super(props);
        this.engine = null;
    }

    template() {
        // A container that fills its parent, holding the WebGL canvas
        return `
            <div class="room-container" style="width: 100%; height: 100%; position: relative; background: #000;">
                <canvas class="webgl-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
                
                <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(18,27,41,0.8); padding: 15px; border-radius: 8px; border: 1px solid #243449;">
                    <label style="color: #9db0c6; font-size: 12px; display: block; margin-bottom: 5px;">GANTRY ANGLE</label>
                    <input type="range" class="gantry-slider" min="0" max="360" value="0" style="width: 200px;">
                    <span class="gantry-readout" style="color: #2fd27a; font-family: monospace; font-size: 16px; margin-left: 10px;">0.0°</span>
                </div>
            </div>
        `;
    }

    onMount() {
        // The DOM element is now ready. Boot the 3D Engine.
        const canvas = this.element.querySelector('.webgl-canvas');
        
        this.engine = new LinacEngine(canvas);
        this.engine.start();

        // Handle browser resizing
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                this.engine.resize(width, height);
            }
        });
        this.resizeObserver.observe(this.element);

        // Bind the floating UI slider to the 3D Engine API
        const slider = this.element.querySelector('.gantry-slider');
        const readout = this.element.querySelector('.gantry-readout');
        
        slider.addEventListener('input', (e) => {
            const angle = parseFloat(e.target.value);
            readout.textContent = `${angle.toFixed(1)}°`;
            this.engine.setGantryAngle(angle);
        });
    }

    onUnmount() {
        // Clean up memory to prevent WebGL context leaks
        if (this.engine) this.engine.stop();
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
}
