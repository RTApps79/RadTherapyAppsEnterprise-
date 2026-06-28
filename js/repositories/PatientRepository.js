import Patient from "../models/Patient.js";

export default class PatientRepository {

    constructor() {

        this.patients = [];

    }

    load(list) {

        this.patients =

            list.map(

                p => new Patient(p)

            );

    }

    add(patient) {

        this.patients.push(

            new Patient(patient)

        );

    }

    remove(id){

        this.patients=

            this.patients.filter(

                p=>p.id!==id

            );

    }

    find(id){

        return this.patients.find(

            p=>p.id===id

        );

    }

    findMRN(mrn){

        return this.patients.find(

            p=>p.mrn===mrn

        );

    }

    all(){

        return this.patients;

    }

}
