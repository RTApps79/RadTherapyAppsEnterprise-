// src/core/Bootstrap.js
import TreatmentRoom3D from '../ui/widgets/TreatmentRoom3D.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app-root');
    
    // Instantiate and mount the 3D Room component
    const simulator = new TreatmentRoom3D();
    root.appendChild(simulator.render());
});
