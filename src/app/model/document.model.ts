import { FileHandle } from './file.handle.model';

export interface Document {
  id: Number;
  name: String;
  documentImage: String;
  driverId: number;
}

export interface POSTDocument {
  name: String;
  documentImage: String;
}
