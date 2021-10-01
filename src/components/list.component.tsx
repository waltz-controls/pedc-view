import React from 'react';
import './list.component.scss';
import {CommonItemType} from "../types";

type ListComponentProps = {
  items: CommonItemType[];
  selectItem(item: any): void;
  selectedItem: any;
};

export default function ListComponent(props: ListComponentProps) {
  const {
    items,
    selectedItem,
    selectItem,
  } = props;

  return (
    <>
      {items.map((item: CommonItemType, index: number) => (
        <div
          key={index}
          className="item-block"
          onClick={() => selectItem(item)}
        >
          <div
            className={selectedItem?._id === item._id
              ? "item-block-title item-block-title--selected"
              : "item-block-title"}
          >
            {item.title}
            <span className={"item-block-size"}>({item.blocks.length} blocks)</span>
          </div>
          <div className={"item-block-id"}>{item._id}</div>
        </div>
      ))}
    </>
  );
}
