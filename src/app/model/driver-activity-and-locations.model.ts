import { Location } from 'src/app/model/location.model';

export interface DriverActivityAndLocation {
    driverId: number,
    location: Location,
    isActive: boolean
}
