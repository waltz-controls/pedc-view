export enum ListApiServiceType {
  TEMPLATE = 'pedc-templates',
  DOCUMENT = 'pedc-documents'
}

export default class ListApiService {

  readonly LOCAL_STORAGE_KEY: string;

  constructor(key: string) {
    this.LOCAL_STORAGE_KEY = key;
  }


  private readLocalStorage(): any {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]';
    return JSON.parse(data);
  }

  private writeLocalStorage(data: any): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  public insertOne(blocks: any[]): string {
    const documents = this.readLocalStorage();
    const id = String(Date.now());

    documents.push({id, blocks});

    this.writeLocalStorage(documents);

    return id;
  }

  public findOne(id: string): any {
    const documents = this.readLocalStorage();

    return documents.find((document: any) => document.id === id);
  }

  public findAll(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.readLocalStorage());
      }, 700)
    });
  }

  public removeOne(id: string): void {
    const documents = this.readLocalStorage();

    const updatedDocuments = documents.filter((document: any) => document.id !== id);

    this.writeLocalStorage(updatedDocuments);
  }

  public updateOne(id: string, data: any): void {
    const documents = this.readLocalStorage();

    const updatedDocuments = documents.map((document: any) => {
      if (document.id === id) {
        return {...document, ...data};
      }

      return document;
    });

    this.writeLocalStorage(updatedDocuments);
  }
}
