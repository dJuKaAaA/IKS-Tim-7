import { Location as GGCJLocation } from './location.model';

export interface Route {
    distance?: number,
    startPoint: GGCJLocation,
    endPoint: GGCJLocation,
    ride?: Object  // TODO: Change to Ride when Ride model has been created
}
