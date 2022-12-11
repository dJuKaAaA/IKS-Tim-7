import { Location } from "./location.model"

export interface Ride {
    id: number,
    startTime: string,
    endTime: string,
    totalCost: number,
    driver: Driver,
    passengers: Array<Passenger>,
    estimatedTimeInMinutes: number,
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    rejection: Rejection,
    locations: Array<Route>,
    status: string
}

interface Driver {
    id: number,
    email: string
}

interface Passenger {
    id: number,
    email: string
}

interface Rejection {
    reason: string,
    timeOfRejection: string
}


interface Route {
    departure: Location,
    destination: Location
}