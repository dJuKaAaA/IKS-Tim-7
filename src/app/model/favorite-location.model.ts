import { Route } from "./route.model";
import { SimpleUser } from "./simple-user.model";

export interface FavoriteLocation {
    favoriteName: string,
    locations: Array<Route>,
    passengers: Array<SimpleUser>,
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    scheduledTime: string | undefined
}