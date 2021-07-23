import React, {useEffect, useState} from "react";
import {FormGroup, Slider} from "@blueprintjs/core";

type SliderComponentProps = {
  label: string;
  helperText: string;
  labelInfo: string;
  value: number;
  min?: number;
  max?: number;
  stepSize?: number;
  labelStepSize?: number;
  onChange(value: number): void;
};

export function SliderComponent(props: SliderComponentProps) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.onChange(value);
  }, [value])

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
    >
      <Slider
        onChange={(value) => setValue(value)}
        value={value}
        min={props.min || 0}
        max={props.max || 100}
        stepSize={props.stepSize || 1}
        labelStepSize={props.labelStepSize || 1}
      />
    </FormGroup>
  )
}
