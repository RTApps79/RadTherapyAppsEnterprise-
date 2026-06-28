export default class ClinicalNotes{

render(patient,container){

const notes=

patient.notes??

[];

container.innerHTML=`

<div class="card">

<h2>

Clinical Notes

</h2>

${notes.map(

note=>`

<div class="note">

<h4>

${note.author}

</h4>

<p>

${note.date}

</p>

<div>

${note.text}

</div>

</div>

`

).join("")}

</div>

`;

}

}
