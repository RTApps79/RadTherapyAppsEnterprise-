export default class Module {

    constructor(name, services) {

        this.name = name;
        this.services = services;

        this.loaded = false;
        this.active = false;

        this.container = null;

    }

    async initialize() {

        this.loaded = true;

    }

    async activate(container) {

        this.container = container;
        this.active = true;

        await this.render();

    }

    async deactivate() {

        this.active = false;

        if (this.container)
            this.container.innerHTML = "";

    }

    async render() {

        if (!this.container) return;

        this.container.innerHTML = `
            <div style="padding:30px">
                <h2>${this.name}</h2>
            </div>
        `;

    }

    async destroy() {

        this.loaded = false;
        this.active = false;

    }

}
