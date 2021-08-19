import React, {useEffect, useState} from "react";
import {Checkbox} from "@blueprintjs/core";

type CheckboxComponentProps = {
  label?: string;
  value: boolean;
  onChange(value: any): void;
  inline: boolean;
};

export function CheckboxComponent(props: CheckboxComponentProps) {
  const [value, setValue] = useState(props.value || false);

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <Checkbox
      label={props.label}
      inline={props.inline}
      onChange={(e: any) => setValue(e.target.checked)}
      checked={value}
    />
  )
}
