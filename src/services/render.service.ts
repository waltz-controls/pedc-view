import {ComponentType} from "../types";
import React, {ReactHTMLElement} from "react";


export default class RenderService {

  static renderBlock(component: ComponentType, customProps: any = {}): ReactHTMLElement<any> {
    const {instance, props, children} = component;

    const updatedChildren = Array.isArray(children)
      ? children.map((child: ComponentType, idx) =>
        React.createElement(
          child.instance,
          {...child.props, key: idx},
          child.children)
      )
      : children;

    const updatedProps = {
      ...props,
      ...customProps,
    };

    return React.createElement(instance, updatedProps, updatedChildren);
  }
}
