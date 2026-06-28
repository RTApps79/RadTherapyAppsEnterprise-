export default class PatientSelector{

    constructor(patientService){

        this.patientService=patientService;

        this.selector=

            document.getElementById(

                "patientSelector"

            );

    }

    initialize(){

        this.populate();

        this.selector.addEventListener(

            "change",

            e=>{

                this.patientService.selectPatient(

                    e.target.value

                );

            }

        );

    }

    populate(){

        const patients=

            this.patientService.getPatients();

        this.selector.innerHTML="";

        patients.forEach(patient=>{

            const option=

                document.createElement(

                    "option"

                );

            option.value=patient.id;

            option.innerHTML=

                `${patient.fullName}
                 (${patient.primaryDiagnosis})`;

            this.selector.appendChild(

                option

            );

        });

        if(patients.length>0){

            this.patientService.selectPatient(

                patients[0].id

            );

        }

    }

}
