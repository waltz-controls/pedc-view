import React, {useEffect, useState} from "react";
import {Button, FileInput} from "@blueprintjs/core";
import FileInputService from "./file-input.service";

type FileInputComponentProps = {
  placeholder?: string,
  buttonText?: string;
  linkText?: string;
  file?: {
    name: string;
    type: string;
    dataUrl: string;
  },
  onChange(value: any): void
};


export function FileInputComponent(props: FileInputComponentProps) {
  const [currentFile, setCurrentFile] = useState<File>();

  // --- Create file from dataUrl
  useEffect(() => {
    if(!props.file){
      return;
    }

    const {name, type, dataUrl} = props.file;

    FileInputService
      .toFile(name, dataUrl, type)
      .then(defaultFile => setCurrentFile(defaultFile));
  }, [props.file]);

  // Create dataUrl from file
  useEffect(() => {
    if (!currentFile) {
      return;
    }

    const {name, type} = currentFile;

    FileInputService
      .toBase64(currentFile)
      .then((dataUrl) => {
        props.onChange({name, type, dataUrl});
      });
  }, [currentFile]);

  return (
    <>
      <FileInput
        onChange={(value: any) => setCurrentFile(value.target.files[0])}
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
