export enum LibraryComponentType {
  CHECKBOX = 'CHECKBOX',
  FILE_INPUT = 'FILE_INPUT',
  NUMERIC_INPUT = 'NUMERIC_INPUT',
  TAG_INPUT = 'TAG_INPUT',
  RADIO_GROUP = 'RADIO_GROUP',
  SWITCH = 'SWITCH',
  SLIDER = 'SLIDER',
  TEXT_INPUT = 'TEXT_INPUT',
  TEXTAREA = 'TEXTAREA',
  IMAGE = 'IMAGE',
  GALLERY = 'GALLERY',
  // DYNAMIC_FORM = 'DYNAMIC_FORM', TODO
}

export type ComponentType = {
  type: LibraryComponentType;
  instance: any;
  props: any;
  fields?: any[];
}

export type RawComponentType = {
  type: LibraryComponentType;
  props: any;
}
