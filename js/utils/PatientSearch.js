export default class PatientSearch{

    static search(list,text){

        const value=

            text.toLowerCase();

        return list.filter(

            patient=>

            patient.fullName

            .toLowerCase()

            .includes(value)

            ||

            patient.mrn

            .toLowerCase()

            .includes(value)

            ||

            patient.primaryDiagnosis

            .toLowerCase()

            .includes(value)

        );

    }

}
