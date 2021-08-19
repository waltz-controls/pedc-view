import {ComponentType, LibraryComponentType} from "../types";
import {Alignment} from "@blueprintjs/core";
import {
  RadioGroupComponent,
  TagInputComponent,
  SliderComponent,
  FileInputComponent,
  TextInputComponent,
  NumericInputComponent,
  TextAreaComponent,
  ImageComponent,
  GalleryComponent,
  CheckboxComponent,
  SwitchComponent,
} from "components";


export default class ComponentService {
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
        onChange: () => {}
      },
      [LibraryComponentType.SWITCH]: {
        alignIndicator: Alignment.LEFT,
        label: 'Switch Label',
        onChange: () => {}
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
      },{
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'min',
        props: {small: true, helperText: 'Min'}
      },{
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'max',
        props: {small: true, helperText: 'Max'}
      },{
        type: LibraryComponentType.NUMERIC_INPUT,
        key: 'stepSize',
        props: {small: true, helperText: 'Step size',
          stepSize: 0.1,
          minorStepSize: 0.1,
        }
      },{
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
      }]]
    ]);

    return configurations.get(type) || [];
  }

  static getAllComponentsForLibrary(): ComponentType[] {
    return [
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
        instance: ComponentService.getInstanceByType(type),
        props: ComponentService.getDefaultPropsByType(type),
        fields: ComponentService.getConfigurationFieldsByType(type)
      }
    });
  }
}
