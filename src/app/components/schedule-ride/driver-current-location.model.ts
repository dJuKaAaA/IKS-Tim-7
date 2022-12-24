import { Location } from "src/app/model/location.model";

export interface DriverCurrentLocation {
    driverId: number,
    location: Location,
    isActive: boolean
}