import React from 'react';
import {
  Button,
  Checkbox,
  H3,
  Intent,
  NumericInput,
  Switch,
} from "@blueprintjs/core";
import {ComponentType, LibraryComponentType, RawComponentType} from "../../types";
import './document.component.scss';
import {useHistory, useParams} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {Control, Controller, useForm} from "react-hook-form";
import {ListApiServiceType} from "../../api/list.api.service";
import {FileInputComponent} from "../../components/file-input.component";
import {TagInputComponent} from "../../components/tag-input.component";
import {RadioGroupComponent} from "../../components/radio-group.component";
import {SliderComponent} from "../../components/slider.component";

function renderComponentByType(
  control: Control,
  name: string,
  rawComponent: RawComponentType | any
): any {
  const component: any = {
    [LibraryComponentType.NUMERIC_INPUT]: {
      instance: NumericInput,
      props: {value: rawComponent.value}
    },
    [LibraryComponentType.CHECKBOX]: {
      instance: Checkbox,
      props: {checked: rawComponent.value}
    },
    [LibraryComponentType.FILE_INPUT]: {
      instance: FileInputComponent,
      props: {file: rawComponent.value}
    },
    [LibraryComponentType.TAG_INPUT]: {
      instance: TagInputComponent,
      props: {values: rawComponent.value || []}
    },
    [LibraryComponentType.RADIO_GROUP]: {
      instance: RadioGroupComponent,
      props: {selectedValue: rawComponent.value}
    },
    [LibraryComponentType.SWITCH]: {
      instance: Switch,
      props: {checked: rawComponent.value}
    },
    [LibraryComponentType.SLIDER]: {
      instance: SliderComponent,
      props: {value: rawComponent.value}
    },
  }[String(rawComponent.type)] || null;

  if (!component) {
    return null;
  }

  component.type = rawComponent.type;
  component.props = {...rawComponent.props, ...component.props};

  const onChangeName = {
    [LibraryComponentType.NUMERIC_INPUT]: 'onValueChange',
  }[String(component.type)] || 'onChange';

  return (
    <Controller
      control={control}
      name={name}
      render={({field}: any) => {
        component.props[onChangeName] = field.onChange;

        return (
          <component.instance
            {...component.props}
            onBlur={field.onBlur}
          />
        );
      }}
    />
  )
}


export default function DocumentComponent() {
  const {handleSubmit, control} = useForm();

  const history = useHistory();
  const {id}: any = useParams();
  const api = new DocumentApiService(ListApiServiceType.DOCUMENT);
  const document = api.findOne(id);

  console.log(document);

  const blocks: any = document.blocks.map((component: ComponentType, index: number) => {
    return renderComponentByType(control, String(index), component);
  });

  const submitFunction = (formData: any) => {
    const blocks = document.blocks
      .map((block: RawComponentType, index: number) => {
        if (!formData[index]) {
          return block;
        }

        return {...block, value: formData[index]};
      });

    api.updateOne(document.id, {blocks})
  }

  return (
    <div className={"item-container"}>
      <H3>Document: {id}</H3>

      <form>
        {blocks.map((block: any, index: number) => (
          <div key={index} className={"item-block"}>{block}</div>
        ))}

        <Button
          intent={Intent.NONE}
          text={'Go back'}
          onClick={() => history.push('/documents')}
        />

        &nbsp;

        <Button
          intent={Intent.PRIMARY}
          text={'Update document'}
          onClick={handleSubmit(submitFunction)}
        />

      </form>
    </div>
  );
}
