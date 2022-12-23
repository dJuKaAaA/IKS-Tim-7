export interface TomTomGeolocationResponse {
    results: Array<TomTomGeolocationResult>,
    summary: Object
}

interface TomTomGeolocationResult {
    address: TomTomGeolocationAddress,
    entryPoints: Array<TomTomGeolocationEntryPoint>,
    id: string,
    matchConfidence: TomTomGeolocationMatchConfidence,
    position: TomTomGeolocationPosition,
    score: number,
    type: string,
    viewport: TomTomGeolocationViewport
    
}

interface TomTomGeolocationAddress {
    country: string,
    countryCode: string,
    countryCodeISO3: string,
    countrySubdivision: string,
    freeformAddress: string,
    localName: string,
    postalCode: string,
    streetName: string,
    streetNumber: string
}

interface TomTomGeolocationPosition {
    lat: number,
    lon: number
}

interface TomTomGeolocationEntryPoint {
    type: string,
    position: TomTomGeolocationPosition
}

interface TomTomGeolocationMatchConfidence {
    score: number
}

interface TomTomGeolocationViewport {
    topLeftPoint: TomTomGeolocationPosition,
    btmRightPoint: TomTomGeolocationPosition
}