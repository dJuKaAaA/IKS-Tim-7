import { Route } from "./route.model"
import { SimpleUser } from "./simple-user.model"

export interface RideRequest {
    locations: Array<Route>
    passengers: Array<SimpleUser>,
    vehicleType: string,
    babyTransport: true,
    petTransport: true
}
