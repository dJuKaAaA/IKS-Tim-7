export class Location {
    
    constructor(public latitude: number, public longitude: number, public address: string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
    }

    public toString(): string {
        return "[" + this.latitude + ", " + this.longitude + "]";
    }
}

