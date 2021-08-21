import React from "react";
import {H1, H2, H3, H4, H5, H6} from "@blueprintjs/core";

export enum HEADER_TYPE {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
}

type HeaderComponentProps = {
  value: string;
  type: HEADER_TYPE;
};

export function HeaderComponent(props: HeaderComponentProps) {
  const Header = {
    [HEADER_TYPE.ONE]: H1,
    [HEADER_TYPE.TWO]: H2,
    [HEADER_TYPE.THREE]: H3,
    [HEADER_TYPE.FOUR]: H4,
    [HEADER_TYPE.FIVE]: H5,
    [HEADER_TYPE.SIX]: H6,
  }[props.type] || H1;

  return (
    <Header>
      {props.value || '...'}
    </Header>
  )
}
