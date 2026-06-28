import Logger from "./Logger.js";

export default class ModuleManager {

    constructor(store, events, services) {

        this.store = store;
        this.events = events;
        this.services = services;

        this.modules = new Map();

        this.activeModule = null;

        this.workspace =
            document.getElementById("moduleContainer");

    }

    register(module) {

        this.modules.set(module.name, module);

        Logger.info("Registered Module : " + module.name);

    }

    get(name) {

        return this.modules.get(name);

    }

    async initializeAll() {

        for (const module of this.modules.values()) {

            await module.initialize();

        }

    }

    async activate(name) {

        const module = this.modules.get(name);

        if (!module)
            return;

        if (this.activeModule)
            await this.activeModule.deactivate();

        this.workspace.innerHTML = "";

        await module.activate(this.workspace);

        this.activeModule = module;

        this.events.publish(
            "moduleChanged",
            module.name
        );

    }

    getRegisteredModules() {

        return [...this.modules.keys()];

    }

}
