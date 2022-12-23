U roditelju .html ubacite <app-map></app-map>

U roditelju .ts definisite atribut @ViewChild(MapComponent) mapComponent: MapComponent;
Za prikaz markera i ruta cim se stranica ucita, koristiti onAfterViewInit u roditeljlskoj komponenti koja koristi 
mape. Ne moze se koristiti ngOnInit zato sto mapComponent atribut u tom periodu nece biti inicijalizovan.

Public metode MapComponent:
    
    loadMap()
        - ucitava i prikazuje mapu na ekran

    showRouteFromAddresses(startAddress: string, endAddress: string)
        - prima adrese kao stringove, pravi upit ka server tomtoma i vraca objekat koji sadrzi geografsku sirinu i duzinu
        - koristeci dobijenu geografsku sirinu i duzinu, postavljaju se markeri na mapi i postavlja ruta izmedju ta
        dva markera

    public focusOnPoint(location: Location)
        - prima lokaciju na koju ce mapa da se fokusira

    public clearMap()
        - restartuje mapu i sve prethodno prikazane markere i rute

    public showMarker(location: Location)
        - prikazuje marker na mapi

    public showRoute(route: Route)
        - prikazuje rutu na mapi

    public updateMarkerLocation(markerLocation: GGCJLocation, newLocation: GGCJLocation)

    public removeRoute(route: GGCJRoute)

    public removeMarker(location: GGCJLocation)

MapComponent ima EventEmitter atribut routeEmitter koji se koristi kada zelimo da roditelju proslijedimo rutu koju 
imamo u djetetu (MapComponent)
Najvise ima smisla koristiti koristiti posle showRouteFromAddresses metode kako bismo dobili punu adresu i udaljenost
te rute

Atributi koji se mogu proslijediti:
    startingLongitude: number
    startingLatitude: number
    startingZoom: number
Ovo cini pocetni fokus mape


!!!
Primijetio sam bag dje se mape ne prikazuju posle router.navigate metode.
Da biste ovo popravili, morate u ngOnInit metodu roditelja koji koristi mape pozovete this.mapComponent.loadMap()
Tu ce rec da je mapComponent undefined.
Opet pozovite tu metodu ali u ngAfterViewInit i radice.
Zbog nekog razloga nece radit ako se ne pozove ta metoda u ngOnInit metodi iako je tad mapComponent undefined.
Predebilan bag al za sad je to jedino prihvatljivo rjesenje :(
!!!