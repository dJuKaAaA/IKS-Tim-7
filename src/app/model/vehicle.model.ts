import { Location } from './location.model';

export interface Vehicle {
  id: number;
  driverId: number;
  vehicleType: number;
  model: String;
  licenseNumber: String;
  currentLocation: Location;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
