export default class ServiceRegistry{

    constructor(){

        this.services=

            new Map();

    }

    register(name,service){

        this.services.set(

            name,

            service

        );

    }

    get(name){

        if(!this.services.has(name))

            throw new Error(

                name+

                " service not registered."

            );

        return this.services.get(name);

    }

    exists(name){

        return this.services.has(name);

    }

    remove(name){

        this.services.delete(name);

    }

    clear(){

        this.services.clear();

    }

}
