import React, {ChangeEvent, useEffect, useState} from "react";
import {FileInput, FormGroup} from "@blueprintjs/core";
import FileInputService from "./file-input.service";

type FileType = {
  name: string;
  type: string;
  dataUrl: string;
}

type GalleryComponentProps = {
  label?: string;
  helperText?: string;
  labelInfo?: string;
  value?: FileType[];
  placeholder?: string;
  onChange(file: any): void;
  buttonText?: string;
  linkText?: string;
};


export function GalleryComponent(props: GalleryComponentProps) {
  const [files, setFiles] = useState<FileType[]>(props.value || []);

  useEffect(() => {
    props.onChange(files);
  }, [files]);

  const addFile = (event: ChangeEvent<any>) => {
    const file = event?.target?.files[0];

    if (!file || !file.type.includes('image')) {
      return;
    }

    FileInputService.toBase64(file).then((dataUrl) => {
      if (!dataUrl || typeof dataUrl !== 'string') {
        return;
      }

      const _file = {
        dataUrl,
        name: file.name,
        type: file.type,
      };

      setFiles([...files, _file]);
    });
  }

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
    >
      <FileInput
        onChange={addFile}
        text={props.placeholder || 'Choose image...'}
        buttonText={props.buttonText || 'Browse'}
      />

      {files.map((file, index: number) => (
        <div
          key={index}
          style={{marginTop: 20, width: '100%'}}
        >
          <img
            src={file.dataUrl}
            width={"100%"}
          />
        </div>
      ))}
    </FormGroup>
  )
}
