export default class Allergies{

render(patient,container){

const allergies=

patient.allergies??

[];

container.innerHTML=`

<div class="card">

<h2>

Allergies

</h2>

<ul>

${allergies.map(

a=>`<li>${a}</li>`

).join("")}

</ul>

</div>

`;

}

}
