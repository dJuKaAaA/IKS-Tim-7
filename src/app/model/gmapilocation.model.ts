export interface GMAPILocation {
    lat: number,  // latitude and longitude must be named lat and lng for <agm-direction> to show direction correctly
    lng: number,
    label: string,
    draggable: boolean
}
