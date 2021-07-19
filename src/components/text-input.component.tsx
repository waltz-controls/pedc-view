import React, {useEffect, useState} from "react";
import {FormGroup, InputGroup} from "@blueprintjs/core";

type TextInputComponentProps = {
  label: string;
  helperText: string;
  labelInfo: string;
  value: string;
  placeholder: string;
  onChange(value: string): void;
};

export function TextInputComponent(props: TextInputComponentProps) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
    >
      <InputGroup
        onChange={(e) => setValue(e.target.value)}
        placeholder={props.placeholder}
        value={value}
      />
    </FormGroup>
  )
}
