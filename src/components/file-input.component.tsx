import React, {useEffect, useState} from "react";
import {Button, FileInput} from "@blueprintjs/core";

type FileInputComponentProps = {
  text: any,
  file: any,
  value: any,
  onChange(value: any): void
};

function toBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

function toFile(filename: any, url: any, mimeType?: any): Promise<File> {
  mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];

  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => {
      return new File([buf], filename, {type: mimeType});
    });
}

function loadFile(file: File): void {
  let link = document.createElement('a');
  link.download = file.name;

  link.href = URL.createObjectURL(file);
  link.click();
  URL.revokeObjectURL(link.href);
}


export function FileInputComponent(props: FileInputComponentProps) {
  const [file, setFile] = useState<File>(props.file || '');
  const [text, setText] = useState(props.text || 'Choose file...');

  useEffect(() => {
    if (props.value?.fileName && props.value?.fileValue) {
        toFile(props.value.fileName, props.value.fileValue)
          .then((defaultFile) => {
            setFile(defaultFile);
          });
    }
  }, [props.value]);

  useEffect(() => {
    if (file) {
      setText(file.name);

      toBase64(file).then((fileValue) => {
        props.onChange({
          fileName: file.name,
          fileValue
        });
      });
    }
  }, [file]);

  return (
    <>
      <FileInput
        {...props}
        onChange={(value: any) => {
          setFile(value.target.files[0]);
        }}
        text={text}
      />


      <Button
        small
        onClick={() => loadFile(file)}
        minimal
        text={"Download"}
        style={{ marginBottom: -5, marginLeft: 8}}
      />
    </>
  )
}
