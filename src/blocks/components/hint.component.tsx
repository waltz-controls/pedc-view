import React from "react";
import {Callout} from "@blueprintjs/core";

type HintComponentProps = {
  value: any;
};

export function HintComponent(props: HintComponentProps) {
  return (
    <Callout>
      {props.value}
    </Callout>
  )
}
