export enum LibraryComponentType {
  CHECKBOX = 'CHECKBOX',
  FILE_INPUT = 'FILE_INPUT',
  NUMERIC_INPUT = 'NUMERIC_INPUT',
  TAG_INPUT = 'TAG_INPUT',
  RADIO_GROUP = 'RADIO_GROUP',
  RADIO = 'RADIO',
  SWITCH = 'SWITCH',
  SLIDER = 'SLIDER',
  // TEXT_INPUT = 'TEXT_INPUT', TODO
  // TEXTAREA = 'TEXTAREA', TODO
  // IMAGE = 'IMAGE', TODO
  // GALLERY = 'GALLERY', TODO
  // DYNAMIC_FORM = 'DYNAMIC_FORM', TODO
}

export type ComponentType = {
  type: LibraryComponentType;
  instance: any;
  children: any;
  props: any;
}

export type RawComponentType = {
  type: LibraryComponentType;
  children: any;
  props: any;
}
