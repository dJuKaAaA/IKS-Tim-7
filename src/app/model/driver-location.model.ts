import { Location } from 'src/app/model/location.model';

export interface DriverLocation {
    driverId: number,
    location: Location,
    isActive: boolean
}
