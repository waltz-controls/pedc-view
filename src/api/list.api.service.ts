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

  public insertOne(title: string, blocks: any[]): string {
    const items = this.readLocalStorage();
    const id = String(Date.now());

    items.push({id, title, blocks});

    this.writeLocalStorage(items);

    return id;
  }

  public findOne(id: string): any {
    const items = this.readLocalStorage();

    return items.find((item: any) => item.id === id);
  }

  public findAll(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.readLocalStorage());
      }, 700)
    });
  }

  public removeOne(id: string): void {
    const items = this.readLocalStorage();

    const updatedItems = items.filter((item: any) => item.id !== id);

    this.writeLocalStorage(updatedItems);
  }

  public updateOne(id: string, data: any): void {
    const items = this.readLocalStorage();

    const updatedItems = items.map((item: any) => {
      if (item.id === id) {
        return {...item, ...data};
      }

      return item;
    });

    this.writeLocalStorage(updatedItems);
  }
}
