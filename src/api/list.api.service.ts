export enum ListApiServiceType {
  TEMPLATE = 'pedc-templates',
  DOCUMENT = 'pedc-documents'
}

export default class ListApiService {

  readonly LOCAL_STORAGE_KEY: string;

  constructor(key: string) {
    this.LOCAL_STORAGE_KEY = key;
  }

  private read(): Promise<any> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]';
      const parsedData = JSON.parse(data);

      resolve(parsedData);
    });
  }

  private write(data: any): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));

      resolve(true);
    });
  }

  public insertOne(title: string, blocks: any[]): Promise<string> {
    const id = String(Date.now());

    return this.read()
      .then((items) => {
        items.push({id, title, blocks});

        return this.write(items);
      })
      .then(() => id);
  }

  public findOne(id: string): Promise<any> {
    return this.read().then((items) => {
      return items.find((item: any) => item.id === id);
    });
  }

  public findAll(): Promise<any[]> {
    return this.read();
  }

  public removeOne(id: string): Promise<any[]> {
    let updatedItems: any[] = [];

    return this.read()
      .then((items) => {
        updatedItems = items.filter((item: any) => item.id !== id);

        return this.write(updatedItems);
      })
      .then(() => updatedItems);
  }

  public updateOne(id: string, data: any): Promise<any> {
    let updatedItems: any[] = [];

    return this.read()
      .then((items) => {
        const updatedItems = items.map((item: any) => {
          if (item.id === id) {
            return {...item, ...data};
          }

          return item;
        });

        return this.write(updatedItems);
      })
      .then(() => updatedItems);
  }
}
