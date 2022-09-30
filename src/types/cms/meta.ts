import { IFile } from "./file";

/**
 * Model definition for meta
 */
export interface IMeta {
  id?: string;
  title?: string;
  description?: string;
  image?: IFile;
}
