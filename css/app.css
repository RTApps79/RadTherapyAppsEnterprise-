import Router from "./Router.js";
import Store from "./Store.js";
import EventBus from "./EventBus.js";
import ModuleManager from "./ModuleManager.js";
import ServiceRegistry from "./ServiceRegistry.js";
import Logger from "./Logger.js";

export default class App{

    async initialize(){

        Logger.initialize();

        Logger.info("Starting RadTherapyApps Enterprise");

        this.store=new Store();

        this.events=new EventBus();

        this.services=new ServiceRegistry();

        this.modules=new ModuleManager(
            this.store,
            this.events,
            this.services
        );

        this.router=new Router(
            this.modules
        );

        await this.registerServices();

        await this.modules.loadModules();

        this.router.initialize();

        Logger.success("Application Ready");

    }

    async registerServices(){

        this.services.register("store",this.store);

        this.services.register("events",this.events);

    }

}
