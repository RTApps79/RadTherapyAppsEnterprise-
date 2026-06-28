export default class PatientSummary{

render(patient,container){

container.innerHTML=`

<div class="card">

<h2>

Patient Summary

</h2>

<table class="summaryTable">

<tr>

<td>Name</td>

<td>

${patient.fullName}

</td>

</tr>

<tr>

<td>MRN</td>

<td>

${patient.mrn}

</td>

</tr>

<tr>

<td>DOB</td>

<td>

${patient.dob}

</td>

</tr>

<tr>

<td>Sex</td>

<td>

${patient.sex}

</td>

</tr>

<tr>

<td>Diagnosis</td>

<td>

${patient.primaryDiagnosis}

</td>

</tr>

<tr>

<td>Radiation Oncologist</td>

<td>

${patient.physician}

</td>

</tr>

<tr>

<td>Machine</td>

<td>

${patient.machine}

</td>

</tr>

</table>

</div>

`;

}

}
