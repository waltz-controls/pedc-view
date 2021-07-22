import {LibraryComponentType} from "../types";
import {Alignment, Checkbox, Switch} from "@blueprintjs/core";
import {RadioGroupComponent} from "../components/radio-group.component";
import {TagInputComponent} from "../components/tag-input.component";
import {SliderComponent} from "../components/slider.component";
import {FileInputComponent} from "../components/file-input.component";
import {TextInputComponent} from "../components/text-input.component";
import {NumericInputComponent} from "../components/numeric-input.component";
import {TextAreaComponent} from "../components/textarea.component";


export default class ComponentService {
  static getInstanceByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: FileInputComponent,
      [LibraryComponentType.CHECKBOX]: Checkbox,
      [LibraryComponentType.SWITCH]: Switch,
      [LibraryComponentType.NUMERIC_INPUT]: NumericInputComponent,
      [LibraryComponentType.TAG_INPUT]: TagInputComponent,
      [LibraryComponentType.RADIO_GROUP]: RadioGroupComponent,
      [LibraryComponentType.SLIDER]: SliderComponent,
      [LibraryComponentType.TEXT_INPUT]: TextInputComponent,
      [LibraryComponentType.TEXTAREA]: TextAreaComponent,
    }[type];
  }

  static getDefaultPropsByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: {
        placeholder: 'Choose file...',
        buttonText: 'Browse',
        linkText: 'Download File',
        label: 'bingo',
      },
      [LibraryComponentType.CHECKBOX]: {
        alignIndicator: Alignment.LEFT,
        label: 'Checkbox Label',
      },
      [LibraryComponentType.SWITCH]: {
        alignIndicator: Alignment.LEFT,
        label: 'Switch Label',
      },
      [LibraryComponentType.NUMERIC_INPUT]: {
        label: "Numeric Label",
        placeholder: "Enter a number...",
        onChange: () => {}
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
    }[type];
  }

  static mapValueToPropByType(type: LibraryComponentType, value: any) {
    return {
      [LibraryComponentType.NUMERIC_INPUT]: {value: value},
      [LibraryComponentType.CHECKBOX]: {checked: value},
      [LibraryComponentType.FILE_INPUT]: {file: value},
      [LibraryComponentType.TAG_INPUT]: {values: value},
      [LibraryComponentType.RADIO_GROUP]: {value: value},
      [LibraryComponentType.SWITCH]: {checked: value},
      [LibraryComponentType.SLIDER]: {value: value},
      [LibraryComponentType.TEXT_INPUT]: {value: value},
      [LibraryComponentType.TEXTAREA]: {value: value},
    }[type] || {};
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
      [LibraryComponentType.TAG_INPUT,[{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: { small: true }
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: { small: true }
      }]],
      [LibraryComponentType.RADIO_GROUP,[{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: { small: true }
      },{
        type: LibraryComponentType.TAG_INPUT,
        key: 'options',
        props: {
          small: true,
          values: ['option 1', 'option 2'],
          helperText: 'Write option name and press enter'
        }
      }]],
      [LibraryComponentType.SLIDER,[{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: { small: true }
      }]],
      [LibraryComponentType.NUMERIC_INPUT, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: { small: true }
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: { small: true }
      }]],
      [LibraryComponentType.TEXTAREA, [{
        type: LibraryComponentType.TEXT_INPUT,
        key: 'label',
        props: { small: true }
      }, {
        type: LibraryComponentType.TEXT_INPUT,
        key: 'placeholder',
        props: { small: true }
      }]]
    ]);

    return configurations.get(type) || [];
  }
}
