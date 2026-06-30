// src/ui/widgets/TreatmentRoom3D.js
import Component from '../core/Component.js';
import LinacEngine from '../../simulation/linac/LinacEngine.js';

export default class TreatmentRoom3D extends Component {
    template() {
        return `
            <div style="width: 100%; height: 100%; position: relative; background: #000;">
                <canvas class="webgl-canvas" style="width: 100%; height: 100%; display: block;"></canvas>
                <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(18,27,41,0.8); padding: 15px; border-radius: 8px;">
                    <label style="color: #9db0c6; font-size: 12px; display: block; margin-bottom: 5px;">GANTRY ANGLE</label>
                    <input type="range" class="gantry-slider" min="0" max="360" value="0" style="width: 200px;">
                    <span class="gantry-readout" style="color: #2fd27a; font-family: monospace; font-size: 16px; margin-left: 10px;">0.0°</span>
                </div>
            </div>
        `;
    }

    onMount() {
        const canvas = this.element.querySelector('.webgl-canvas');
        this.engine = new LinacEngine(canvas);
        this.engine.start();

        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.engine.resize(entry.contentRect.width, entry.contentRect.height);
            }
        });
        this.resizeObserver.observe(this.element);

        const slider = this.element.querySelector('.gantry-slider');
        const readout = this.element.querySelector('.gantry-readout');
        slider.addEventListener('input', (e) => {
            readout.textContent = `${parseFloat(e.target.value).toFixed(1)}°`;
            this.engine.setGantryAngle(e.target.value);
        });
    }

    onUnmount() {
        if (this.engine) this.engine.stop();
        if (this.resizeObserver) this.resizeObserver.disconnect();
    }
}
