import { Location } from "./location.model";

export interface VehicleDTO {
  vehicleType: string;
  model: String;
  licenseNumber: String;
  currentLocation : Location;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
