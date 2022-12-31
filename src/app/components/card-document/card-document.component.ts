import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from 'src/app/model/document.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private driverService: DriverService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getId();
    this.driverService
      .getDocuments(userId)
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
