import React, {useEffect, useState} from "react";
import {Radio, RadioGroup} from "@blueprintjs/core";

type RadioGroupComponentProps = {
  options: Array<{
    label: string;
    value: any;
  }>,
  selectedValue: any;
  label: string;
  onChange(value: any): void
};

export function RadioGroupComponent(props: RadioGroupComponentProps) {
  const [value, setValue] = useState(props.selectedValue || null);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  const options = props.options || [];

  return (
    <RadioGroup
      label={props.label}
      selectedValue={value}
      onChange={(e: any) => setValue(e.target.value)}
    >
      {options.map((option, index) => (
        <Radio key={index} label={option.label} value={option.value} />
      ))}
    </RadioGroup>
  );
}
