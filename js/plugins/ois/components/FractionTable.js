export default class FractionTable{

render(patient,container){

const fractions=

patient.fractions ?? [];

container.innerHTML=`

<div class="card">

<h2>

Daily Treatment Record

</h2>

<table class="fractionTable">

<tr>

<th>#</th>

<th>Date</th>

<th>Status</th>

<th>Therapist</th>

<th>Machine</th>

</tr>

${fractions.map(f=>`

<tr>

<td>${f.number}</td>

<td>${f.date}</td>

<td>${f.status}</td>

<td>${f.therapist}</td>

<td>${f.machine}</td>

</tr>

`).join("")}

</table>

</div>

`;

}

}
