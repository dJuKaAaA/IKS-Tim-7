import { DriverDocumentChangeRequest } from './driver-document-change-request.model';

export interface DriverProfileChangeRequest {
  firstName: String;
  lastName: String;
  profilePicture: String;
  phoneNumber: String;
  email: String;
  address: String;
  status: String;
  isMessageDisplayed: boolean;
  documents: DriverDocumentChangeRequest[];
}
