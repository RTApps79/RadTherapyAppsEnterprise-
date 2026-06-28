export default class ServiceRegistry{

    constructor(){

        this.services=new Map();

    }

    register(name,obj){

        this.services.set(name,obj);

    }

    get(name){

        return this.services.get(name);

    }

}
