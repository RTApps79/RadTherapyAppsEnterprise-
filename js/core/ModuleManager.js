export default class ModuleManager{

    constructor(store,eventBus,services){

        this.modules=[];

        this.store=store;

        this.events=eventBus;

        this.services=services;

    }

    async loadModules(){

        console.log("Loading Enterprise Modules");

    }

}
