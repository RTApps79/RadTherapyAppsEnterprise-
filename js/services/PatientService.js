import PatientRepository
from "../repositories/PatientRepository.js";

import JSONLoader
from "../utils/JSONLoader.js";

export default class PatientService{

    constructor(store,events){

        this.store=store;

        this.events=events;

        this.repository=

            new PatientRepository();

    }

    async loadDatabase(){

        const patients=

            await JSONLoader.load(

                "patients/patients.json"

            );

        this.repository.load(

            patients

        );

        this.events.publish(

            "patientsLoaded",

            this.repository.all()

        );

    }

    getPatients(){

        return this.repository.all();

    }

    getPatient(id){

        return this.repository.find(id);

    }

    selectPatient(id){

const patient=

this.repository.find(id);

if(!patient)

return;

this.store.set(

"currentPatient",

patient

);

this.events.publish(

"patientChanged",

patient

);

document.title=

patient.fullName+

" | RadTherapyApps";

}

}
