import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document, POSTDocument } from 'src/app/model/document.model';
import { DriverDocumentChangeRequest } from 'src/app/model/driver-document-change-request.model';
import { DriverProfileChangeRequest } from 'src/app/model/driver-profile-change-request.model';
import { Driver, NoIdDriver } from 'src/app/model/driver.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';
import { RequestService } from 'src/app/services/request.service';

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

  displayedProfileImage: String;

  driver: Driver;
  documents: Document[] = [];

  newDocuments: POSTDocument[] = [];
  deleteDocumentsIds = new Set<Number>();
  profileImage: String = '';

  // TODO dodati redirekciju za change password, ako treba promeniti link

  constructor(
    private driverService: DriverService,
    private requestService: RequestService,
    private imageParserService: ImageParserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getId();
    this.driverService.getDriver(userId).subscribe((data) => {
      this.driver = data;
      this.displayedProfileImage = this.imageParserService.getImageUrl(
        this.driver.profilePicture
      );
    });
    this.driverService.getDocuments(userId).subscribe((data) => {
      this.documents = data;
    });

    this.requestService.getIsDriverHaveRequest(userId).subscribe((data) => {
      let isExist: boolean = data.exist;

      if (isExist == true) {
        alert('Your request is being processed');
      } else {
        alert('All your requests have been processed');
      }
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
          this.profileImage = this.imageParserService.removeBase64FromImage(
            this.profileImage as string
          );
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

  changePassword(): void {
    this.router.navigate([``]);
  }

  updateProfile(): void {
    try {
      let request: DriverProfileChangeRequest =
        {} as DriverProfileChangeRequest;
      request.documents = [];

      this.updateDocuments(request);
      this.updateProfileInfo(request);

      console.log(request);
      this.driverService
        .saveDriverProfileChangeRequest(this.authService.getId(), request)
        .subscribe(
          (_) => {},
          (err) => {
            throw new Error(err.error.message);
          }
        );

      alert('You have successfully send request for updating profile');
      alert('Only last request will be recorded');
    } catch (error) {
      alert(error);
    }
  }

  private updateDocuments(request: DriverProfileChangeRequest) {
    this.newDocuments.forEach((document) => {
      console.log(document);
      let documentChangeRequest = {} as DriverDocumentChangeRequest;
      documentChangeRequest.documentId = NaN;
      documentChangeRequest.name = document.name;
      documentChangeRequest.documentImage =
        this.imageParserService.removeBase64FromImage(
          document.documentImage as string
        );
      request.documents.push(documentChangeRequest);
    });

    this.deleteDocumentsIds.forEach((documentId) => {
      let documentChangeRequest = {} as DriverDocumentChangeRequest;
      documentChangeRequest.documentId = documentId;
      documentChangeRequest.name = '';
      documentChangeRequest.documentImage = '';
      request.documents.push(documentChangeRequest);
    });
  }

  private updateProfileInfo(request: DriverProfileChangeRequest) {
    if (this.driver.name === '') {
      throw new Error('Error name field can not be empty');
    }
    if (this.driver.surname === '') {
      throw new Error('Error last name field can not be empty');
    }

    let phoneRegex: RegExp = /^[0-9]{8,20}$/;
    if (!phoneRegex.test(this.driver.telephoneNumber)) {
      throw new Error('Phone must contain only digits');
    }
    if (this.driver.address === '') {
      throw new Error('Error address field can not be empty');
    }

    let emailRegex: RegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(this.driver.email)) {
      throw new Error('Email is in wrong format');
    }
    request.firstName = this.driver.name;

    request.lastName = this.driver.surname;
    if (this.profileImage != '') {
      request.profilePicture = this.profileImage;
    } else {
      request.profilePicture = this.imageParserService.removeBase64FromImage(
        this.driver.profilePicture
      );
    }
    request.phoneNumber = '0604672999';

    request.email = this.driver.email;

    request.address = this.driver.address;
    request.status = 'PADDING';
    request.isMessageDisplayed = false;
  }
}
