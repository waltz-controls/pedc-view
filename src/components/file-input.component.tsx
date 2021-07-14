import React, {useEffect, useState} from "react";
import {Button, FileInput} from "@blueprintjs/core";
import FileInputService from "./file-input.service";

type FileInputComponentProps = {
  placeholder: string,
  file: {
    name: string;
    type: string;
    dataUrl: string;
  },
  onChange(value: any): void
};


export function FileInputComponent(props: FileInputComponentProps) {
  const [placeholder, setPlaceholder] = useState(props.placeholder || 'Choose file...');
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

    setPlaceholder(name);

    FileInputService
      .toBase64(currentFile)
      .then((dataUrl) => {
        props.onChange({name, type, dataUrl});
      });
  }, [currentFile]);

  return (
    <>
      <FileInput
        {...props}
        onChange={(value: any) => setCurrentFile(value.target.files[0])}
        text={placeholder}
      />

      {currentFile && <Button
        small
        onClick={() => FileInputService.loadFile(currentFile)}
        minimal
        text={"Download file"}
        style={{marginBottom: -5, marginLeft: 8}}
      />}
    </>
  )
}
