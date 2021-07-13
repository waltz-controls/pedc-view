import React, {useEffect, useState} from "react";
import {Slider} from "@blueprintjs/core";

type SliderComponentProps = { value: number, onChange(value: number): void };

export function SliderComponent(props: SliderComponentProps) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.onChange(value);
  }, [value])

  return (
    <Slider
      {...props}
      onChange={(value) => setValue(value)}
      value={value}
    />
  )
}
