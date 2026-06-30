// src/core/Bootstrap.js
import TreatmentRoom3D from '../ui/widgets/TreatmentRoom3D.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app-root');
    const simulator = new TreatmentRoom3D();
    root.appendChild(simulator.render());
});
