import React, {useEffect, useState} from "react";
import {FormGroup, InputGroup, NumericInput} from "@blueprintjs/core";

type NumericInputComponentProps = {
  label?: string;
  helperText?: string;
  labelInfo?: string;
  value: number;
  placeholder?: string;
  onChange(value: number): void;
};

export function NumericInputComponent(props: NumericInputComponentProps) {
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
      <NumericInput
        onValueChange={(value) => setValue(value)}
        placeholder={props.placeholder}
        value={value || 0}
        min={0}
        max={100}
      />
    </FormGroup>
  )
}
