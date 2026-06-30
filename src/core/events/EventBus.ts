type EventCallback = (payload?: unknown) => void;

export class EventBus {

    private readonly events =

        new Map<string, EventCallback[]>();

    public subscribe(

        event: string,

        callback: EventCallback

    ): void {

        if (!this.events.has(event))

            this.events.set(event, []);

        this.events.get(event)?.push(callback);

    }

    public publish(

        event: string,

        payload?: unknown

    ): void {

        this.events.get(event)?.forEach(

            callback => callback(payload)

        );

    }

}
