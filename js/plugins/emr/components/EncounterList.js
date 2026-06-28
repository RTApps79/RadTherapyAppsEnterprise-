export default class EncounterList{

render(patient,container){

const encounters=

patient.encounters??

[];

container.innerHTML=`

<div class="card">

<h2>

Clinical Encounters

</h2>

<table class="encounterTable">

<tr>

<th>Date</th>

<th>Provider</th>

<th>Visit</th>

</tr>

${encounters.map(e=>`

<tr>

<td>

${e.date}

</td>

<td>

${e.provider}

</td>

<td>

${e.type}

</td>

</tr>

`).join("")}

</table>

</div>

`;

}

}
