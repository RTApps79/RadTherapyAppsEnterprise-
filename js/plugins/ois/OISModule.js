import Module from "../../core/Module.js";

import ScheduleBoard from "./components/ScheduleBoard.js";
import CourseSummary from "./components/CourseSummary.js";
import FractionTable from "./components/FractionTable.js";
import PrescriptionPanel from "./components/PrescriptionPanel.js";
import TreatmentStatus from "./components/TreatmentStatus.js";

export default class OISModule extends Module{

    constructor(services){

        super("ois",services);

    }

    async initialize(){

        this.store=this.services.get("store");
        this.events=this.services.get("events");

        this.schedule=new ScheduleBoard();
        this.course=new CourseSummary();
        this.fractions=new FractionTable();
        this.prescription=new PrescriptionPanel();
        this.status=new TreatmentStatus();

        this.events.subscribe(
            "patientChanged",
            ()=>{
                if(this.active)
                    this.render();
            }
        );

    }

    async render(){

        const patient=this.store.get("currentPatient");

        if(!patient){

            this.container.innerHTML="<h2>No Patient Loaded</h2>";
            return;

        }

        this.container.innerHTML=`

<div class="ois">

<h1>

Radiation Oncology Information System

</h1>

<div class="oisGrid">

<div id="coursePanel"></div>

<div id="prescriptionPanel"></div>

<div id="statusPanel"></div>

<div id="schedulePanel"></div>

<div id="fractionPanel"></div>

</div>

</div>

`;

        this.course.render(
            patient,
            document.getElementById("coursePanel")
        );

        this.prescription.render(
            patient,
            document.getElementById("prescriptionPanel")
        );

        this.status.render(
            patient,
            document.getElementById("statusPanel")
        );

        this.schedule.render(
            patient,
            document.getElementById("schedulePanel")
        );

        this.fractions.render(
            patient,
            document.getElementById("fractionPanel")
        );

    }

}
