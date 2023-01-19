import { Route } from "./route.model"
import { SimpleUser } from "./simple-user.model"

export interface RideRequest {
    scheduledTime: string | undefined,
    locations: Array<Route>
    passengers: Array<SimpleUser>,
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean
}
