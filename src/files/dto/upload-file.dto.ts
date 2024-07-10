export class UploadFileDto {
  readonly name: string;
  readonly folderId?: number;
  readonly fileType: string;
  readonly contentType: string;
}
