import {
  Alignment,
  Checkbox,
  FileInput,
  NumericInput,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TagInput
} from "@blueprintjs/core";
import {ComponentType, LibraryComponentType} from "../types";


export default class LibraryService {

  static getComponentByType(type: LibraryComponentType): any {
    return this.getAllComponents().find((component: ComponentType) => component.type === type);
  }

  static getAllComponents(): any[] {
    return [
      {
        type: LibraryComponentType.FILE_INPUT,
        instance: FileInput,
        props: {
          text: 'Choose file...',
          buttonText: 'Browse',
        },
        children: null,
      },
      {
        type: LibraryComponentType.CHECKBOX,
        instance: Checkbox,
        props: {
          alignIndicator: Alignment.LEFT,
          label: 'Checkbox',
        },
        children: null,
      },
      {
        type: LibraryComponentType.SWITCH,
        instance: Switch,
        props: {
          alignIndicator: Alignment.LEFT,
          label: 'Switch',
        },
        children: null,
      },
      {
        type: LibraryComponentType.NUMERIC_INPUT,
        instance: NumericInput,
        props: {
          placeholder: "Enter a number..."
        },
        children: null,
      },
      {
        type: LibraryComponentType.TAG_INPUT,
        instance: TagInput,
        props: {
          placeholder: 'Values...',
          values: [],
        },
        children: null,
      },
      {
        type: LibraryComponentType.RADIO_GROUP,
        instance: RadioGroup,
        props: {
          name: 'radio-group',
          label: 'Radio group',
          inline: true,
          onChange: () => {}
        },
        children: [
          {
            type: LibraryComponentType.RADIO,
            instance: Radio,
            props: {
              label: 'One',
              value: 'one'
            }
          },
          {
            type: LibraryComponentType.RADIO,
            instance: Radio,
            props: {
              label: 'Two',
              value: 'two'
            }
          }
        ]
      },
      {
        type: LibraryComponentType.SLIDER,
        instance: Slider,
        props: {},
        children: null,
      }
    ];
  }
}
