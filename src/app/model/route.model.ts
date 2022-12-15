import { Location } from './location.model';

export class Route {
    // TODO: Add ride later
    constructor(public departure: Location, public destination: Location, public distanceInMeters: number) {
        this.departure = departure;
        this.destination = destination;
        this.distanceInMeters = distanceInMeters;
    }

    toString(): string {
        return "(" + this.departure.toString() + ", " + this.destination.toString() + ")"
    }
}

