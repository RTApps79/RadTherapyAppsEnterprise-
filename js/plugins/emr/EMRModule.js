import Module from "../../core/Module.js";

import PatientSummary from "./components/PatientSummary.js";
import EncounterList from "./components/EncounterList.js";
import ClinicalNotes from "./components/ClinicalNotes.js";
import Allergies from "./components/Allergies.js";
import Vitals from "./components/Vitals.js";
import ProblemList from "./components/ProblemList.js";

export default class EMRModule extends Module{

    constructor(services){

        super("emr",services);

    }

    async initialize(){

        this.store=this.services.get("store");

        this.events=this.services.get("events");

        this.summary=new PatientSummary();

        this.encounters=new EncounterList();

        this.notes=new ClinicalNotes();

        this.allergies=new Allergies();

        this.vitals=new Vitals();

        this.problemList=new ProblemList();

        this.events.subscribe(

            "patientChanged",

            ()=>{

                if(this.active)

                    this.render();

            }

        );

    }

    async render(){

        const patient=

            this.store.get(

                "currentPatient"

            );

        if(!patient){

            this.container.innerHTML=

            "<h2>No Patient Loaded</h2>";

            return;

        }

        this.container.innerHTML=`

<div class="emr">

<div class="emrHeader">

<h1>

Electronic Medical Record

</h1>

</div>

<div class="emrGrid">

<div id="summaryPanel"></div>

<div id="problemPanel"></div>

<div id="allergyPanel"></div>

<div id="vitalsPanel"></div>

<div id="encounterPanel"></div>

<div id="notesPanel"></div>

</div>

</div>

`;

        this.summary.render(

            patient,

            document.getElementById(

                "summaryPanel"

            )

        );

        this.problemList.render(

            patient,

            document.getElementById(

                "problemPanel"

            )

        );

        this.allergies.render(

            patient,

            document.getElementById(

                "allergyPanel"

            )

        );

        this.vitals.render(

            patient,

            document.getElementById(

                "vitalsPanel"

            )

        );

        this.encounters.render(

            patient,

            document.getElementById(

                "encounterPanel"

            )

        );

        this.notes.render(

            patient,

            document.getElementById(

                "notesPanel"

            )

        );

    }

}
