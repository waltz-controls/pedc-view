import React, {useEffect, useState} from "react";
import {FormGroup, Slider} from "@blueprintjs/core";

type SliderComponentProps = {
  label: string;
  helperText: string;
  labelInfo: string;
  value: number,
  onChange(value: number): void
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
        {...props}
        onChange={(value) => setValue(value)}
        value={value}
      />
    </FormGroup>
  )
}
