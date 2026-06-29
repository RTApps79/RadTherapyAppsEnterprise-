export default class CourseSummary{

render(patient,container){

const course=patient.course ?? {};

container.innerHTML=`

<div class="card">

<h2>

Course Summary

</h2>

<table class="summaryTable">

<tr>

<td>Course</td>

<td>${course.name ?? "Course 1"}</td>

</tr>

<tr>

<td>Intent</td>

<td>${course.intent ?? "Curative"}</td>

</tr>

<tr>

<td>Diagnosis</td>

<td>${patient.primaryDiagnosis}</td>

</tr>

<tr>

<td>Machine</td>

<td>${patient.machine}</td>

</tr>

<tr>

<td>Physician</td>

<td>${patient.physician}</td>

</tr>

</table>

</div>

`;

}

}
