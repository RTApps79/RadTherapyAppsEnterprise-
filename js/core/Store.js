export default class Store{

    constructor(){

        this.state={

            patient:null,

            workflow:null,

            simulation:null,

            linac:null,

            beam:null,

            dicom:null,

            emr:null,

            ois:null,

            physics:null,

            planning:null,

            education:null,

            ui:{}

        };

    }

    set(key,value){

        this.state[key]=value;

    }

    get(key){

        return this.state[key];

    }

}
