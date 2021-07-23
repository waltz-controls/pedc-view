import React, {useEffect, useState} from "react";
import {FormGroup, NumericInput} from "@blueprintjs/core";

type NumericInputComponentProps = {
  label?: string;
  helperText?: string;
  labelInfo?: string;
  value: number;
  max?: number;
  min?: number;
  placeholder?: string;
  stepSize?: number;
  onChange(value: number): void;
  inline: boolean;
};

export function NumericInputComponent(props: NumericInputComponentProps) {
  const [value, setValue] = useState(String(props.value));

  useEffect(() => {
    props.onChange(Number(value));
  }, [value]);

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
      inline={props.inline}
    >
      <NumericInput
        fill
        onValueChange={(_v: number, value: string, ) => setValue(value)}
        placeholder={props.placeholder}
        value={value || 0}
        min={props.min || 0}
        max={props.max || 100}
        stepSize={props.stepSize || 1}
      />
    </FormGroup>
  )
}
