import { Rejection } from './rejection.model';
import { Route } from './route.model';
import { SimpleUser } from './simple-user.model';

export interface Ride {
  id: number;
  locations: Route[];
  startTime: String;
  endTime: String;
  totalCost: number;
  passengers: SimpleUser[];
  estimatedTimeInMinutes: number;
  vehicleType: String;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: Rejection;
}
