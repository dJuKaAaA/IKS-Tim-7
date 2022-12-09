import { Location as GGCJLocation } from './location.model';

export class Route {
    // TODO: Add distance later
    // TODO: Add ride later
    constructor(public startPoint: GGCJLocation, public endPoint: GGCJLocation) {}

    toString(): string {
        return "(" + this.startPoint.toString() + ", " + this.endPoint.toString() + ")"
    }
}
