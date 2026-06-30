export class ServiceContainer {

    private readonly services =

        new Map<string, unknown>();

    public register<T>(

        key: string,

        service: T

    ): void {

        this.services.set(key, service);

    }

    public resolve<T>(

        key: string

    ): T {

        return this.services.get(key) as T;

    }

}
