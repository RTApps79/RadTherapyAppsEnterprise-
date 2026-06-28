export default class Router {

    constructor(moduleManager) {

        this.moduleManager = moduleManager;

    }

    initialize() {

        const buttons =
            document.querySelectorAll(
                "#sidebar button"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const module =
                        button.dataset.module;

                    this.navigate(module);

                }
            );

        });

        this.navigate("dashboard");

    }

    async navigate(moduleName) {

        history.pushState(
            {},
            "",
            "#" + moduleName
        );

        await this.moduleManager.activate(
            moduleName
        );

        document
            .getElementById("statusText")
            .innerText =
            moduleName.toUpperCase();

    }

}
