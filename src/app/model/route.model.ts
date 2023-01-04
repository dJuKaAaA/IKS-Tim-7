import { Location } from './location.model';

export class Route {
    // TODO: Add ride later
    constructor(public departure: Location, public destination: Location, public distanceInMeters: number, public estimatedTimeInMinutes: number) {

    }

    // doesn't work
    // when I try calling this method in map-component.ts it returns [object Object]
    toString(): string {
        return "(" + this.departure.toString() + ", " + this.destination.toString() + ")";
    }
}

