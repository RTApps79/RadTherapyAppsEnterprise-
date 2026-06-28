export default class Vitals{

render(patient,container){

const v=

patient.vitals??

{};

container.innerHTML=`

<div class="card">

<h2>

Latest Vitals

</h2>

<table>

<tr>

<td>

Height

</td>

<td>

${v.height??"--"}

</td>

</tr>

<tr>

<td>

Weight

</td>

<td>

${v.weight??"--"}

</td>

</tr>

<tr>

<td>

BP

</td>

<td>

${v.bp??"--"}

</td>

</tr>

<tr>

<td>

Pulse

</td>

<td>

${v.pulse??"--"}

</td>

</tr>

<tr>

<td>

Temp

</td>

<td>

${v.temp??"--"}

</td>

</tr>

</table>

</div>

`;

}

}
