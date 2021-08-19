import {Button, ButtonGroup} from "@blueprintjs/core";
import React from "react";

export function ButtonGroupComponent(props: {
  leftButtonText: string;
  leftButtonAction(): void;
  rightButtonText: string;
  rightButtonAction(): void;
}) {
  return (
    <ButtonGroup fill>
      <Button onClick={props.leftButtonAction}>
        {props.leftButtonText}
      </Button>
      <Button onClick={props.rightButtonAction}>
        {props.rightButtonText}
      </Button>
    </ButtonGroup>
  )
}
