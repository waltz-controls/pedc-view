export default class FileInputService {
  static toBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  static toFile({ name, dataUrl, type}: {
    name: string;
    dataUrl: string;
    type?: string;
  }): Promise<File> {
    type = type || (dataUrl.match(/^data:([^;]+);/) || '')[1];

    return fetch(dataUrl)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], name, {type}));
  }

  static loadFile(file: File): void {
    let link = document.createElement('a');
    link.download = file.name;

    link.href = URL.createObjectURL(file);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

