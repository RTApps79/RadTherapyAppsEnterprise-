export default class Patient {

    constructor(data = {}) {

        this.id = data.id ?? crypto.randomUUID();

        this.mrn = data.mrn ?? "";

        this.firstName = data.firstName ?? "";

        this.lastName = data.lastName ?? "";

        this.middleName = data.middleName ?? "";

        this.dob = data.dob ?? "";

        this.sex = data.sex ?? "";

        this.phone = data.phone ?? "";

        this.email = data.email ?? "";

        this.address = data.address ?? "";

        this.primaryDiagnosis = data.primaryDiagnosis ?? "";

        this.icd10 = data.icd10 ?? "";

        this.stage = data.stage ?? "";

        this.histology = data.histology ?? "";

        this.physician = data.physician ?? "";

        this.simulationDate = data.simulationDate ?? "";

        this.startDate = data.startDate ?? "";

        this.machine = data.machine ?? "";

        this.course = data.course ?? {};

        this.plan = data.plan ?? {};

        this.structures = data.structures ?? [];

        this.beams = data.beams ?? [];

        this.dose = data.dose ?? {};

        this.images = data.images ?? {};

        this.notes = data.notes ?? [];

        this.billing = data.billing ?? [];

        this.schedule = data.schedule ?? [];

        this.qa = data.qa ?? {};

    }

    get fullName() {

        return `${this.firstName} ${this.lastName}`;

    }

    addNote(note) {

        this.notes.push({

            date:new Date(),

            note

        });

    }

    addBeam(beam){

        this.beams.push(beam);

    }

    addStructure(structure){

        this.structures.push(structure);

    }

}
