export interface Message {
    id: number,
    timeOfSending: Date,
    senderId: number,
    receiverId: number,
    message: string,
    type: string,
    rideId: number
}
