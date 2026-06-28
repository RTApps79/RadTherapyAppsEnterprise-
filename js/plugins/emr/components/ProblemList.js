export default class ProblemList{

render(patient,container){

const problems=

patient.problems ??

[];

container.innerHTML=`

<div class="card">

<h2>

Problem List

</h2>

<ul>

${problems.map(

p=>`<li>${p}</li>`

).join("")}

</ul>

</div>

`;

}

}
