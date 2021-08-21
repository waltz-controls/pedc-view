import React from "react";
import {Text} from "@blueprintjs/core";

type ParagraphComponentProps = {
  value: string;
};

export function ParagraphComponent(props: ParagraphComponentProps) {
  return (
    <Text>
      {props.value}
    </Text>
  )
}
