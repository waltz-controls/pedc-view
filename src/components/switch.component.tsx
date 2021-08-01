import React, {useEffect, useState} from "react";
import {Checkbox, FormGroup, NumericInput, Switch} from "@blueprintjs/core";

type SwitchComponentProps = {
  label?: string;
  value: boolean;
  onChange(value: any): void;
  inline: boolean;
};

export function SwitchComponent(props: SwitchComponentProps) {
  const [value, setValue] = useState(props.value || false);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <Switch
      label={props.label}
      inline={props.inline}
      onChange={(e: any) => setValue(e.target.checked)}
      checked={value}
    />
  )
}
