import { Ride } from "./ride.model";
import { User } from "./user";

export interface Panic {
    id : number,
    sentTime : string,
    reason : string,
    ride : Ride,
    user : User,
    reviewed : boolean
}
