export default class ScheduleBoard{

render(patient,container){

const schedule=

patient.schedule ?? [];

container.innerHTML=`

<div class="card">

<h2>

Upcoming Appointments

</h2>

<table>

<tr>

<th>Date</th>

<th>Time</th>

<th>Appointment</th>

</tr>

${schedule.map(s=>`

<tr>

<td>${s.date}</td>

<td>${s.time}</td>

<td>${s.type}</td>

</tr>

`).join("")}

</table>

</div>

`;

}

}
