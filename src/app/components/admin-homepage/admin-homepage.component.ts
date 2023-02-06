import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { Ride } from 'src/app/model/ride.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { Document } from 'src/app/model/document.model';
import { DriverService } from 'src/app/services/driver.service';
import { RideService } from 'src/app/services/ride.service';
import { MapComponent } from '../map/map.component';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit, AfterViewInit{
  @Output() drivers : Driver[];
  @ViewChild(MapComponent) mapComponent: MapComponent;
  //atributi voznje
  @Output() destination : string;
  @Output() departure : string;
  @Output() departureDate : string;
  @Output() departureTime : string;
  @Output() duration : string;
  @Output() distance : string;

  //atributi vozaca
  @Output() selectedDriver : Driver;
  @Output() vehicle : Vehicle;
  @Output() driverRating : number;
  @Output() vehicleRating : number;
  @Output() documents: Document[];

  activeRideMessage : string = "";
  activeRide : Ride;

  constructor(private driverService : DriverService, private rideService : RideService, private imageParserService:ImageParserService){
    this.driverService = driverService;
    this.rideService = rideService;
  }
  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }
  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(data => {this.drivers = data.results});
    // this.mapComponent.loadMap();
  }

  updateCurrentDriver(id : number): void {
    //Dobavljanje vozaca po id-ju
    this.driverService.getDriver(id).subscribe
    ({
      next: driver => {
        this.selectedDriver = driver;
        //Dobavljanje ocena za vozaca i vozilo i vozaceva dokumenta
        this.driverService.getAvgDriverRating(this.selectedDriver.id).then(rating => {this.driverRating = Math.round(rating)});
        this.driverService.getAvgVehicleRating(this.selectedDriver.id).then(rating => {this.vehicleRating = Math.round(rating)});
        this.driverService.getDocuments(this.selectedDriver.id).subscribe(document => {this.documents = document});

        this.driverService.getVehicle(this.selectedDriver.id).subscribe({
          next : vehicle => {
              this.vehicle = vehicle;
              this.updateMap(vehicle);
          },
          error : () => {
              this.activeRideMessage = "This driver has no vehicles"
          }
        })
        //Dobavljanje aktivne voznje po id-ju vozaca
        this.rideService.getDriversActiveRide(this.selectedDriver.id).subscribe({
          next: ride => {
            //Postavljanje poruke za gresku na prazan string
            this.activeRideMessage = ""
            //Postavljanje atributa koji se prosledjuju komponenti za prikaz podataka voznje
            console.log(ride.locations[0].departure);
            this.setRideParameters(ride);
          },
          error: () =>{
            this.setDummyParameters()
            this.activeRideMessage = "This driver has no active rides"
          }
        });  
      },
      error: () => {
      }
    });

  }

  updateMap(vehicle : Vehicle){
    this.mapComponent.clearMap();
    this.mapComponent.focusOnPoint(vehicle.currentLocation);
    this.mapComponent.showMarker(vehicle.currentLocation);
  }

  setDummyParameters(){
    this.destination = "N/A";
    this.departure = "N/A";
    this.departureTime = "N/A";
    this.departureDate = "N/A";
    this.duration = "N/A"; 
  }

  setRideParameters(ride : Ride){
    this.activeRide = ride;
    this.destination = ride.locations[0].destination.address;
    this.departure = ride.locations[0].departure.address;
    this.departureTime = ride.startTime + "";
    this.departureDate = ride.startTime + "";
    this.duration = ride.estimatedTimeInMinutes+"min";
  }

  getImage(){
    if(this.selectedDriver != null)
      return this.imageParserService.getImageUrl(
        this.selectedDriver.profilePicture
      );
    else
        return ""
  }

}
