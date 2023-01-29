import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/model/document.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.css'],
})
export class CardDocumentComponent implements OnInit {
  @Input() documents: Document[];
  @Output() closeDocumentsEventEmitter = new EventEmitter();
  documentsForDisplay: String[] = [];

  deleteDocuments = new Set<Number>();

  constructor(
    private driverService: DriverService,
    private authService: AuthService,
    private imageParserService: ImageParserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getId();
    this.driverService.getDocuments(userId).subscribe((response) => {
      this.documents = response;
      for (let i = 0; i < this.documents.length; i++) {
        this.documents[i].documentImage = this.imageParserService.getImageUrl(
          this.documents[i].documentImage as string
        );
      }
    });
  }
  deleteDocument(document: Document): void {
    this.deleteDocuments.add(document.id);
    console.log(this.deleteDocument);
    alert('Request for delete is sent');
  }

  closeDocumentUpdate() {
    this.closeDocumentsEventEmitter.emit(this.deleteDocuments);
  }
}
