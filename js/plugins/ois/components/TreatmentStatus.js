export default class TreatmentStatus{

render(patient,container){

const rx=patient.prescription ?? {};

const delivered=patient.deliveredFractions ?? 0;

const total=rx.fractions ?? 30;

const percent=((delivered/total)*100).toFixed(1);

container.innerHTML=`

<div class="card">

<h2>

Treatment Progress

</h2>

<div class="progressBar">

<div
class="progressFill"
style="width:${percent}%">
</div>

</div>

<p>

${delivered} / ${total}

Fractions Delivered

</p>

<p>

${percent}% Complete

</p>

</div>

`;

}

}
