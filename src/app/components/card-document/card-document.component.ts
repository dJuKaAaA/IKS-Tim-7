import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/model/document.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.css'],
})
export class CardDocumentComponent implements OnInit {
  @Input() documents: Document[];
  @Output() closeDocumentsEventEmitter = new EventEmitter();

  deleteDocuments = new Set<Number>();

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService
      .getDocuments(1)
      .subscribe((response) => (this.documents = response));
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
