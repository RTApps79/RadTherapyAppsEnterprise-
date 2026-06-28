import Module

from "../../core/Module.js";

export default class DashboardModule

extends Module{

constructor(services){

super(

"dashboard",

services

);

}

async initialize(){

this.store=

this.services.get(

"store"

);

this.events=

this.services.get(

"events"

);

this.events.subscribe(

"patientChanged",

patient=>{

if(this.active)

this.refresh(patient);

}

);

}

async render(){

const patient=

this.store.get(

"currentPatient"

);

this.container.innerHTML=`

<div class="dashboard">

<div class="dashboardHeader">

<h1>

Clinical Dashboard

</h1>

</div>

<div id="patientBanner">

</div>

<div class="dashboardGrid">

<div class="card">

<h2>

Workflow

</h2>

<p>

Simulation Ready

</p>

</div>

<div class="card">

<h2>

Treatment Planning

</h2>

<p>

No Active Plan

</p>

</div>

<div class="card">

<h2>

Machine

</h2>

<p id="machineName">

No Machine

</p>

</div>

<div class="card">

<h2>

Fractions

</h2>

<p>

0 / 0

</p>

</div>

</div>

</div>

`;

this.refresh(patient);

}

refresh(patient){

if(!patient)

return;

document

.getElementById(

"patientBanner"

)

.innerHTML=`

<div class="patientBanner">

<h2>

${patient.fullName}

</h2>

<p>

MRN

${patient.mrn}

</p>

<p>

Diagnosis

${patient.primaryDiagnosis}

</p>

<p>

Radiation Oncologist

${patient.physician}

</p>

</div>

`;

const machine=

document.getElementById(

"machineName"

);

if(machine)

machine.innerHTML=

patient.machine;

}

}
