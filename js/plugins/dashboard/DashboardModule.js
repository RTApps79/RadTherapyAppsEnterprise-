import Module from "../../core/Module.js";

export default class DashboardModule extends Module {

    constructor(services) {

        super(
            "dashboard",
            services
        );

    }

    async render() {

        this.container.innerHTML = `

<div class="dashboard">

<h1>

Welcome to
RadTherapyApps Enterprise

</h1>

<div class="dashboardGrid">

<div class="card">

<h2>Patient</h2>

<p id="dashboardPatient">

No Patient Loaded

</p>

</div>

<div class="card">

<h2>Workflow</h2>

<p>

Ready

</p>

</div>

<div class="card">

<h2>Machine</h2>

<p>

No LINAC Selected

</p>

</div>

<div class="card">

<h2>Treatment Planning</h2>

<p>

Awaiting Plan

</p>

</div>

</div>

</div>

`;

    }

}
