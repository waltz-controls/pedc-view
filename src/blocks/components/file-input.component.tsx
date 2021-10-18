import React, {useEffect, useState} from "react";
import {Button, FileInput} from "@blueprintjs/core";
import FileInputService from "./file-input.service";

type FileInputComponentProps = {
  placeholder?: string,
  buttonText?: string;
  linkText?: string;
  value?: {
    name: string;
    type: string;
    dataUrl: string;
  },
  onChange(value: any): void
};


export function FileInputComponent(props: FileInputComponentProps) {
  const [currentFile, setCurrentFile] = useState<File>();

  useEffect(() => {
    if(props.value){
      FileInputService
        .toFile(props.value)
        .then(defaultFile => setCurrentFile(defaultFile));
    }
  }, [props.value]);

  return (
    <>
      <FileInput
        onChange={(value: any) => {
          const file = value.target.files[0];

          setCurrentFile(file);

          FileInputService.toBase64(file)
            .then((dataUrl) => {
              props.onChange({
                name: file?.name,
                type: file?.type,
                dataUrl
              });
            });
        }}
        text={(currentFile && currentFile.name) || props.placeholder || 'Choose file...'}
        buttonText={props.buttonText || 'Browse'}
      />

      {currentFile && <Button
        minimal
        small
        onClick={() => FileInputService.loadFile(currentFile)}
        text={props.linkText || "Download file"}
        style={{marginBottom: -5, marginLeft: 8}}
      />}
    </>
  )
}
