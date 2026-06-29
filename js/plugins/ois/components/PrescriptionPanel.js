export default class PrescriptionPanel{

render(patient,container){

const rx=patient.prescription ?? {};

container.innerHTML=`

<div class="card">

<h2>

Prescription

</h2>

<table>

<tr>

<td>Total Dose</td>

<td>${rx.totalDose ?? "6000 cGy"}</td>

</tr>

<tr>

<td>Fractions</td>

<td>${rx.fractions ?? 30}</td>

</tr>

<tr>

<td>Dose/Fx</td>

<td>${rx.dosePerFraction ?? "200 cGy"}</td>

</tr>

<tr>

<td>Technique</td>

<td>${rx.technique ?? "VMAT"}</td>

</tr>

<tr>

<td>Energy</td>

<td>${rx.energy ?? "6 MV"}</td>

</tr>

</table>

</div>

`;

}

}
