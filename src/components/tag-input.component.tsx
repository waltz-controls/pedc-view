import React, {useEffect, useState} from "react";
import {TagInput} from "@blueprintjs/core";

type TagInputComponentProps = {
  values: any[],
  onChange(values: string[]): void
};

export function TagInputComponent(props: TagInputComponentProps) {
  const [values, setValues] = useState(props.values);

  useEffect(() => {
    props.onChange(values);
  }, [values])

  return (
    <TagInput
      {...props}
      onChange={(values) => setValues(values)}
      values={values || []}
    />
  )
}
