import { LogLevel } from "./LogLevel";

export class Logger {

    public log(

        level: LogLevel,

        message: string

    ): void {

        const timestamp = new Date().toISOString();

        console.log(

            `[${timestamp}] ${LogLevel[level]} : ${message}`

        );

    }

    public info(message: string): void {

        this.log(LogLevel.Info, message);

    }

    public warn(message: string): void {

        this.log(LogLevel.Warning, message);

    }

    public error(message: string): void {

        this.log(LogLevel.Error, message);

    }

}
