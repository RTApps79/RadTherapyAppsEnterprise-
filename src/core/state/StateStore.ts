export class StateStore {

    private readonly values =

        new Map<string, unknown>();

    public set(

        key: string,

        value: unknown

    ): void {

        this.values.set(key, value);

    }

    public get<T>(

        key: string

    ): T {

        return this.values.get(key) as T;

    }

}
