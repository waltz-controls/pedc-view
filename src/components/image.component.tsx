import React, {useEffect, useState} from "react";
import {FormGroup} from "@blueprintjs/core";
import {FileInputComponent} from "./file-input.component";


type ImageComponentProps = {
  label?: string;
  helperText?: string;
  labelInfo?: string;
  file?: {
    name: string;
    type: string;
    dataUrl: string;
  };
  placeholder?: string;
  onChange(file: any): void;
  buttonText?: string;
  linkText?: string;
};

// TODO - add remove file logic

export function ImageComponent(props: ImageComponentProps) {
  const [file, setFile] = useState(props.file);

  useEffect(() => {
    props.onChange(file);
  }, [file]);

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
    >
      <FileInputComponent
        placeholder={props.placeholder}
        buttonText={props.buttonText}
        linkText={props.linkText}
        onChange={(file) => setFile(file)}
      />

      {file && <div style={{marginTop: 20, width: '100%'}}>
        <img
          src={file.dataUrl}
          width={"100%"}
        />
      </div>}
    </FormGroup>
  )
}
