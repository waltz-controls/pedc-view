import {Control, Controller} from "react-hook-form";
import {ComponentType, LibraryComponentType, RawComponentType} from "../types";
import ComponentService from "./component.service";
import React from "react";

export default function renderComponentByType(
  control: Control,
  name: string,
  rawComponent: RawComponentType
): React.ComponentElement<any, any> {

  const component: ComponentType = {
    ...rawComponent,
    instance: ComponentService.getInstanceByType(rawComponent.type),
  }

  // TODO - remove this workaround
  const onChangeName = {
    [LibraryComponentType.NUMERIC_INPUT]: 'onValueChange',
  }[String(component.type)] || 'onChange';

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      render={({field}: any) => {
        component.props[onChangeName] = field.onChange;

        return (
          <component.instance {...component.props} />
        );
      }}
    />
  )
}
