import {LibraryComponentType} from "../types";
import {Alignment, Checkbox, NumericInput, Switch} from "@blueprintjs/core";
import {RadioGroupComponent} from "../components/radio-group.component";
import {TagInputComponent} from "../components/tag-input.component";
import {SliderComponent} from "../components/slider.component";
import {FileInputComponent} from "../components/file-input.component";
import {TextInputComponent} from "../components/text-input.component";


export default class ComponentService {
  static getInstanceByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: FileInputComponent,
      [LibraryComponentType.CHECKBOX]: Checkbox,
      [LibraryComponentType.SWITCH]: Switch,
      [LibraryComponentType.NUMERIC_INPUT]: NumericInput,
      [LibraryComponentType.TAG_INPUT]: TagInputComponent,
      [LibraryComponentType.RADIO_GROUP]: RadioGroupComponent,
      [LibraryComponentType.SLIDER]: SliderComponent,
      [LibraryComponentType.TEXT_INPUT]: TextInputComponent,
    }[type];
  }

  static getDefaultPropsByType(type: LibraryComponentType) {
    return {
      [LibraryComponentType.FILE_INPUT]: {
        text: 'Choose file...',
        buttonText: 'Browse',
      },
      [LibraryComponentType.CHECKBOX]: {
        alignIndicator: Alignment.LEFT,
        label: 'Checkbox',
      },
      [LibraryComponentType.SWITCH]: {
        alignIndicator: Alignment.LEFT,
        label: 'Switch',
      },
      [LibraryComponentType.NUMERIC_INPUT]: {
        placeholder: "Enter a number..."
      },
      [LibraryComponentType.TAG_INPUT]: {
        placeholder: 'Values...',
        values: [],
        onChange: () => {
        }
      },
      [LibraryComponentType.RADIO_GROUP]: {
        name: 'radio-group',
        label: 'Radio group',
        inline: true,
        options: [{
          label: 'option 1',
          value: 'option 1'
        }],
        onChange: () => {
        }
      },
      [LibraryComponentType.SLIDER]: {
        onChange: () => {
        }
      },
      [LibraryComponentType.TEXT_INPUT]: {
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
      [LibraryComponentType.RADIO_GROUP]: {selectedValue: value},
      [LibraryComponentType.SWITCH]: {checked: value},
      [LibraryComponentType.SLIDER]: {value: value},
      [LibraryComponentType.TEXT_INPUT]: {value: value},
    }[type] || {};
  }
}
