import { Logger } from "../logging/Logger";
import { ThemeManager } from "../theme/ThemeManager";
import { ApplicationMetadata } from "./ApplicationMetadata";

export class Application {

    constructor(

        private readonly logger: Logger,

        private readonly theme: ThemeManager

    ) {}

    public initialize(): void {

        this.theme.initialize();

        this.logger.info(

            `${ApplicationMetadata.product} ${ApplicationMetadata.version}`

        );

        document.body.innerHTML = `

<div id="enterprise-shell">

<h1>${ApplicationMetadata.product}</h1>

<p>Enterprise Runtime Initialized</p>

</div>

`;

    }

}
