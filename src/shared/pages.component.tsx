import {Button, Intent} from "@blueprintjs/core";
import React from "react";

export type PagesComponentProps = {
  addPage(): void;
  deletePage(): void;
  selectPage(i: number): void;
  maxPage: number;
  currentPage: number;
}

export default function PagesComponent(props: PagesComponentProps) {
  const {
    maxPage,
    currentPage,
  } = props;

  const pages = Array.from(Array(maxPage).keys()).map((value) => {
    const index = value + 1;
    const intent = index === currentPage ? Intent.PRIMARY : Intent.NONE;

    return (
      <Button
        minimal
        key={index}
        intent={intent}
        onClick={() => props.selectPage(index)}
      >{index}
      </Button>
    );
  });

  return (
    <div>
      <Button
        minimal
        onClick={() => props.addPage()}
      >
        Add page
      </Button>

      <Button
        minimal
        disabled={maxPage < 2}
        onClick={() => props.deletePage()}>
        Delete page
      </Button>

      <div>
        {pages}
      </div>
    </div>
  );
}
