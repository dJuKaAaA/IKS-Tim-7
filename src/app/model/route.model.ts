import { Location } from './location.model';

export class Route {
    public distanceInMeters = NaN;
    // TODO: Add ride later
    constructor(public departure: Location, public destination: Location) {}

    toString(): string {
        return "(" + this.departure.toString() + ", " + this.destination.toString() + ")"
    }
}

