import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document, POSTDocument } from 'src/app/model/document.model';
import { DriverDocumentChangeRequest } from 'src/app/model/driver-document-change-request.model';
import { DriverProfileChangeRequest } from 'src/app/model/driver-profile-change-request.model';
import { Driver, NoIdDriver } from 'src/app/model/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';

export interface SliderImage {
  image: String;
  thumbImage: String;
  title: String;
  alt: String;
}

@Component({
  selector: 'app-driver-edit-profile',
  templateUrl: './driver-edit-profile.component.html',
  styleUrls: ['./driver-edit-profile.component.css'],
})
export class DriverEditProfileComponent implements OnInit {
  shouldDocumentsBeDisplayed: boolean = false;
  shouldUploadFormBeDisplayed: boolean = false;
  profileInfo: boolean = true;

  driver: Driver;
  documents: Document[] = [];

  newDocuments: POSTDocument[] = [];
  deleteDocumentsIds = new Set<Number>();
  profileImage: String = '';

  // TODO dodati poruku da li je prihvacen update profila
  // TODO dodati validaciju formi
  // TODO dodati redirekciju za change password
  // TODO dodati pravu cenu
  constructor(
    private driverService: DriverService,
    private imageParserService: ImageParserService
  ) {}
  ngOnInit(): void {
    this.driverService.getDriver(1).subscribe((data) => (this.driver = data));
    this.driverService.getDocuments(1).subscribe((data) => {
      this.documents = data;
    });
  }

  onProfileImageSelected(event: any): void {
    let newProfileImage: File;
    if (event.target.files) {
      newProfileImage = event.target.files[0];
      this.imageParserService
        .convertToBase64(newProfileImage)
        .subscribe((img) => {
          this.profileImage = img;
        });
      alert('Profile image added');
    }
  }

  displayDocuments(): void {
    this.shouldDocumentsBeDisplayed = true;
    this.profileInfo = false;
  }

  closeDocuments(deleteDocumentsIds: Number[]): void {
    this.shouldDocumentsBeDisplayed = false;
    this.shouldUploadFormBeDisplayed = false;
    this.profileInfo = true;

    deleteDocumentsIds.forEach((id) => this.deleteDocumentsIds.add(id));
    console.log(this.deleteDocumentsIds);
  }

  displayForm(): void {
    this.shouldUploadFormBeDisplayed = true;
  }

  closeForm(): void {
    this.shouldUploadFormBeDisplayed = false;
  }

  addDocument(document: POSTDocument) {
    this.newDocuments.push(document);
    this.shouldUploadFormBeDisplayed = false;
    alert('Document is added!');
  }

  changePassword(): void {}

  updateProfile(): void {
    let request: DriverProfileChangeRequest = {} as DriverProfileChangeRequest;
    request.documents = [];

    this.newDocuments.forEach((document) => {
      console.log(document);
      let documentChangeRequest = {} as DriverDocumentChangeRequest;
      documentChangeRequest.documentId = NaN;
      documentChangeRequest.name = document.name;
      documentChangeRequest.documentImage = document.documentImage;
      request.documents.push(documentChangeRequest);
    });

    this.deleteDocumentsIds.forEach((documentId) => {
      let documentChangeRequest = {} as DriverDocumentChangeRequest;
      documentChangeRequest.documentId = documentId;
      documentChangeRequest.name = '';
      documentChangeRequest.documentImage = '';
      request.documents.push(documentChangeRequest);
    });

    request.firstName = this.driver.name;
    request.lastName = this.driver.surname;
    request.profilePicture = this.profileImage;
    request.phoneNumber = this.driver.telephoneNumber;
    request.email = this.driver.email;
    request.address = this.driver.address;
    request.status = 'PADDING';
    request.isMessageDisplayed = false;

    console.log(request);
    this.driverService.saveDriverProfileChangeRequest(1, request).subscribe();

    alert('You have successfully send request for updating profile');
    alert('Only last request will be recorded');
  }
}
