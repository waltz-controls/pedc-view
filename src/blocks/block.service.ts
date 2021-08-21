import {ComponentType, LibraryComponentType} from "../types";
import {Alignment} from "@blueprintjs/core";
import {
  CheckboxComponent,
  FileInputComponent,
  GalleryComponent,
  HeaderComponent,
  HintComponent,
  ImageComponent,
  NumericInputComponent,
  ParagraphComponent,
  RadioGroupComponent,
  SliderComponent,
  SwitchComponent,
  TagInputComponent,
  TextAreaComponent,
  TextInputComponent,
} from "./components";
import {HEADER_TYPE} from "./components/header.component";


export default class BlockService {
  static getInstanceByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: FileInputComponent,
      [LibraryComponentType.CHECKBOX]: CheckboxComponent,
      [LibraryComponentType.SWITCH]: SwitchComponent,
      [LibraryComponentType.NUMERIC_INPUT]: NumericInputComponent,
      [LibraryComponentType.TAG_INPUT]: TagInputComponent,
      [LibraryComponentType.RADIO_GROUP]: RadioGroupComponent,
      [LibraryComponentType.SLIDER]: SliderComponent,
      [LibraryComponentType.TEXT_INPUT]: TextInputComponent,
      [LibraryComponentType.TEXTAREA]: TextAreaComponent,
      [LibraryComponentType.IMAGE]: ImageComponent,
      [LibraryComponentType.GALLERY]: GalleryComponent,
      [LibraryComponentType.HEADER]: HeaderComponent,
      [LibraryComponentType.PARAGRAPH]: ParagraphComponent,
      [LibraryComponentType.HINT]: HintComponent,
    }[type];
  }

  static getDefaultPropsByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: {
        placeholder: 'Choose file...',
        buttonText: 'Browse',
        linkText: 'Download File',
        onChange: () => {
        }
      },
      [LibraryComponentType.CHECKBOX]: {
        alignIndicator: Alignment.LEFT,
        label: 'Checkbox Label',
        onChange: () => {
        }
      },
      [LibraryComponentType.SWITCH]: {
        alignIndicator: Alignment.LEFT,
        label: 'Switch Label',
        onChange: () => {
        }
      },
      [LibraryComponentType.NUMERIC_INPUT]: {
        label: "Numeric Label",
        placeholder: "Enter a number...",
        onChange: () => {
        }
      },
      [LibraryComponentType.TAG_INPUT]: {
        placeholder: 'Values...',
        label: 'Tag Input Label',
        values: [],
        onChange: () => {
        }
      },
      [LibraryComponentType.RADIO_GROUP]: {
        name: 'radio-group',
        label: 'Radio Group Label',
        inline: true,
        options: [{
          label: 'option 1',
          value: 'option 1'
        }],
        onChange: () => {
        }
      },
      [LibraryComponentType.SLIDER]: {
        label: 'Slider Label',
        min: 0,
        max: 10,
        stepSize: 0.1,
        labelStepSize: 1,
        onChange: () => {
        }
      },
      [LibraryComponentType.TEXT_INPUT]: {
        label: 'Text Input Label',
        placeholder: 'Placeholder',
        onChange: () => {
        },
      },
      [LibraryComponentType.TEXTAREA]: {
        label: 'TextArea Label',
        placeholder: 'Placeholder',
        onChange: () => {
        },
      },
      [LibraryComponentType.IMAGE]: {
        placeholder: 'Choose image...',
        buttonText: 'Browse',
        linkText: 'Download File',
        label: 'Image Label',
        onChange: () => {
        }
      },
      [LibraryComponentType.GALLERY]: {
        placeholder: 'Choose image...',
        buttonText: 'Browse',
        linkText: 'Download File',
        label: 'Gallery Label',
        onChange: () => {
        }
      },
      [LibraryComponentType.HEADER]: {
        value: "Header text..."
      },
      [LibraryComponentType.PARAGRAPH]: {
        value: "Paragraph text..."
      },
      [LibraryComponentType.HINT]: {
        value: "Hint text..."
      }
    }[type];
  }

  static getConfigurationFieldsByType(type: LibraryComponentType): any {
    const configurations = new Map([
      [LibraryComponentType.TEXT_INPUT, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true},
      }]],
      [LibraryComponentType.FILE_INPUT, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'buttonText',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'linkText',
        props: {small: true},
      }]],
      [LibraryComponentType.CHECKBOX, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true},
      }]],
      [LibraryComponentType.SWITCH, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true},
      }]],
      [LibraryComponentType.TAG_INPUT, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true}
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true}
      }]],
      [LibraryComponentType.RADIO_GROUP, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true}
      }, {
        type: LibraryComponentType.TAG_INPUT,
        key: 'options',
        props: {
          small: true,
          values: ['option 1', 'option 2'],
          helperText: 'Write option name and press enter'
        }
      }]],
      [LibraryComponentType.SLIDER, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true}
      }, {
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'min',
        props: {small: true, helperText: 'Min'}
      }, {
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'max',
        props: {small: true, helperText: 'Max'}
      }, {
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'stepSize',
        props: {
          small: true, helperText: 'Step size',
          stepSize: 0.1,
          minorStepSize: 0.1,
        }
      }, {
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'labelStepSize',
        props: {small: true, helperText: 'Label step size'}
      }]],
      [LibraryComponentType.NUMERIC_INPUT, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true}
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true}
      }]],
      [LibraryComponentType.TEXTAREA, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: {small: true}
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true}
      }]],
      [LibraryComponentType.IMAGE, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'buttonText',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'linkText',
        props: {small: true},
      }]],
      [LibraryComponentType.GALLERY, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'buttonText',
        props: {small: true},
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'linkText',
        props: {small: true},
      }]],
      [LibraryComponentType.HEADER, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'value',
        props: {small: true},
      }, {
        type: LibraryComponentType.RADIO_GROUP,
        key: 'type',
        props: {
          value: HEADER_TYPE.ONE,
          inline: true,
          options: [
            {
              value: HEADER_TYPE.ONE,
              label: 'H1'
            },
            {
              value: HEADER_TYPE.TWO,
              label: 'H2'
            },
            {
              value: HEADER_TYPE.THREE,
              label: 'H3'
            },
            {
              value: HEADER_TYPE.FOUR,
              label: 'H4'
            },
            {
              value: HEADER_TYPE.FIVE,
              label: 'H5'
            },
            {
              value: HEADER_TYPE.SIX,
              label: 'H6'
            }
          ]
        },
        onChange: () => {
        }
      }]],
      [LibraryComponentType.PARAGRAPH, [{
        type: LibraryComponentType.TEXTAREA,
        key: 'value',
        props: {small: true},
      }]],
      [LibraryComponentType.HINT, [{
        type: LibraryComponentType.TEXTAREA,
        key: 'value',
        props: {small: true},
      }]],
    ]);

    return configurations.get(type) || [];
  }

  static getAllComponentsForLibrary(): ComponentType[] {
    return [
      LibraryComponentType.HEADER,
      LibraryComponentType.PARAGRAPH,
      LibraryComponentType.HINT,
      LibraryComponentType.TEXT_INPUT,
      LibraryComponentType.FILE_INPUT,
      LibraryComponentType.CHECKBOX,
      LibraryComponentType.SWITCH,
      LibraryComponentType.NUMERIC_INPUT,
      LibraryComponentType.TAG_INPUT,
      LibraryComponentType.RADIO_GROUP,
      LibraryComponentType.SLIDER,
      LibraryComponentType.TEXTAREA,
      LibraryComponentType.IMAGE,
      LibraryComponentType.GALLERY,
    ].map((type) => {
      return {
        type,
        instance: BlockService.getInstanceByType(type),
        props: BlockService.getDefaultPropsByType(type),
        fields: BlockService.getConfigurationFieldsByType(type)
      }
    });
  }
}
