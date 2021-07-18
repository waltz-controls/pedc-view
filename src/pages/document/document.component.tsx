import React from 'react';
import {
  Button,
  H3,
  Intent,
} from "@blueprintjs/core";
import {ComponentType, RawComponentType} from "../../types";
import './document.component.scss';
import {useHistory, useParams} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {useForm} from "react-hook-form";
import {ListApiServiceType} from "../../api/list.api.service";
import ComponentService from "../../services/component.service";
import renderComponentByType from "../../services/renderComponentByType";


function prepareBlocksData(formData: any, document: any): ComponentType[] {
  return document.blocks
    .map((block: RawComponentType, index: number) => {
      if (formData[index] === undefined) {
        return block;
      }

      const customProps = ComponentService.mapValueToPropByType(block.type, formData[index]);
      const updatedProps = {...block.props, ...customProps};

      return {
        ...block,
        props: updatedProps
      };
    });
}


export default function DocumentComponent() {
  const {watch, control} = useForm();

  const formValues = watch();
  const history = useHistory();
  const {id}: any = useParams();
  const api = new DocumentApiService(ListApiServiceType.DOCUMENT);
  const document = api.findOne(id);

  const blocks: any = prepareBlocksData(formValues, document).map((component: ComponentType, index: number) => {
    return renderComponentByType(control, String(index), component);
  });

  const submitFunction = () => {
    api.updateOne(document.id, {
      blocks: prepareBlocksData(formValues, document)
    });
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
          onClick={submitFunction}
        />

      </form>
    </div>
  );
}
