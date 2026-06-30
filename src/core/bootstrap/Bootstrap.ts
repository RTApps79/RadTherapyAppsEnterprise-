import { Application } from "../application/Application";
import { Logger } from "../logging/Logger";
import { ThemeManager } from "../theme/ThemeManager";

export class Bootstrap {

    public static start(): void {

        const logger = new Logger();

        const theme = new ThemeManager();

        const app =

            new Application(

                logger,

                theme

            );

        app.initialize();

    }

}
