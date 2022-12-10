export class Location {
    
    constructor(public latitude: number, public longitude: number, address: Object) {}

    public toString(): string {
        return "[" + this.latitude + ", " + this.longitude + "]";
    }
}
