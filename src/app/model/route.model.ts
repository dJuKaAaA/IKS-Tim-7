import { Location } from './location.model';

export class Route {
    // TODO: Add ride later
    constructor(public departure: Location, public destination: Location, public distanceInMeters: number, public estimatedTimeInMinutes?: number) {

    }

    toString(): string {
        return "(" + this.departure.toString() + ", " + this.destination.toString() + ")";
    }
}

