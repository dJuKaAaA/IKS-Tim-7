export class Location {
    
    constructor(public latitude: number, public longitude: number, public address: string) {
    }

    public toString(): string {
        return "[" + this.latitude + ", " + this.longitude + "]";
    }
}

