U roditelju .html ubacite <app-map></app-map>

U roditelju .ts definisite atribut @ViewChild(MapComponent) mapComponent: MapComponent;
Za prikaz markera i ruta cim se stranica ucita, koristiti onAfterContentInit ili onAfterViewInit u roditeljlskoj komponenti koja koristi 
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

MapComponent ima EventEmitter atribut routeEmitter koji se koristi kada zelimo da roditelju proslijedimo rutu koju 
imamo u djetetu (MapComponent)
Najvise ima smisla koristiti koristiti posle showRouteFromAddresses metode kako bismo dobili punu adresu i udaljenost
te rute

Atributi koji se mogu proslijediti:
    startingLongitude: number
    startingLatitude: number
    startingZoom: number
Ovo cini pocetni fokus mape

