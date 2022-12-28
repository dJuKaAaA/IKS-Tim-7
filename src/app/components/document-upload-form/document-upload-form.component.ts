import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { Document, POSTDocument } from 'src/app/model/document.model';
import { FileHandle } from 'src/app/model/file.handle.model';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-document-upload-form',
  templateUrl: './document-upload-form.component.html',
  styleUrls: ['./document-upload-form.component.css'],
})
export class DocumentUploadFormComponent {
  @Output() closeUploadFormEventEmitter = new EventEmitter();
  @Output() addDocumentEventEmitter = new EventEmitter();
  documentName: String;
  image: File;

  public myDocument: POSTDocument = {
    name: '',
    documentImage: '',
  };

  constructor(private imageParseService: ImageParserService) {}

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.image = event.target.files[0];
      this.imageParseService
        .convertToBase64(this.image)
        .subscribe((img) => (this.myDocument.documentImage = img));
    }
  }

  uploadDocument(): void {
    this.myDocument.name = this.documentName;
    this.addDocumentEventEmitter.emit(this.myDocument);
  }

  closeDocumentUpdateForm(): void {
    this.closeUploadFormEventEmitter.emit();
  }
}
