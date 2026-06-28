import Store from "./Store.js";

import EventBus from "./EventBus.js";

import ServiceRegistry from "./ServiceRegistry.js";

import ModuleManager from "./ModuleManager.js";

import Router from "./Router.js";

import Logger from "./Logger.js";

import DashboardModule
from "../plugins/dashboard/DashboardModule.js";

export default class App {

    constructor() {

        this.store = new Store();

        this.events = new EventBus();

        this.services =
            new ServiceRegistry();

    }

    async initialize() {

        Logger.info(
            "Initializing Enterprise..."
        );

        this.registerCoreServices();

        this.moduleManager =
            new ModuleManager(

                this.store,

                this.events,

                this.services

            );

        this.router =
            new Router(
                this.moduleManager
            );

        await this.loadPlugins();

        await this.moduleManager
            .initializeAll();

        this.router.initialize();

        document
            .getElementById(
                "loadingScreen"
            )
            .style.display = "none";

        Logger.success(
            "Enterprise Ready"
        );

    }

    registerCoreServices() {

        this.services.register(
            "store",
            this.store
        );

        this.services.register(
            "events",
            this.events
        );

    }

    async loadPlugins() {

        this.moduleManager.register(

            new DashboardModule(
                this.services
            )

        );

    }

}
