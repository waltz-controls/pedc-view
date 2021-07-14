export default class FileInputService {
  static toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  static toFile(filename: any, url: any, mimeType?: any): Promise<File> {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];

    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        return new File([buf], filename, {type: mimeType});
      });
  }

  static loadFile(file: File): void {
    let link = document.createElement('a');
    link.download = file.name;

    link.href = URL.createObjectURL(file);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

