import React, {useEffect, useState} from "react";
import {FormGroup, TagInput} from "@blueprintjs/core";

type TagInputComponentProps = {
  label: string;
  helperText: string;
  labelInfo: string;
  placeholder: string;
  values: any[],
  onChange(values: string[]): void
};

export function TagInputComponent(props: TagInputComponentProps) {
  const [values, setValues] = useState(props.values);

  useEffect(() => {
    props.onChange(values);
  }, [values])

  return (
    <FormGroup
      label={props.label}
      helperText={props.helperText}
      labelInfo={props.labelInfo}
    >
      <TagInput
        placeholder={props.placeholder}
        onChange={(values) => setValues(values)}
        values={values || []}
      />
    </FormGroup>
  )
}
