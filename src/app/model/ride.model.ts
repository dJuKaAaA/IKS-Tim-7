import { Rejection } from './rejection.model';
import { Route } from './route.model';
import { SimpleUser } from './simple-user.model';

export interface Ride {
  id: number;
  locations: Route[];
  startTime: Date;
  endTime: Date;
  totalCost: number;
  driver: SimpleUser
  passengers: SimpleUser[];
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: Rejection;
  status: string
}
