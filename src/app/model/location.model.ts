export class Location {
    
    constructor(public latitude: number, public longitude: number, public address: string) {
    }


    // doesn't work
    // when I try calling this method in map-component.ts it returns [object Object]
    public toString(): string {
        return "[" + this.latitude + ", " + this.longitude + "]";
    }
}

