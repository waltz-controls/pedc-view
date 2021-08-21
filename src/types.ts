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
  HEADER = 'HEADER',
  PARAGRAPH = 'PARAGRAPH',
  HINT = 'HINT'
}

export type ComponentType = {
  id?: string;
  page?: number;
  instance?: any;
  fields?: any[];
  type: LibraryComponentType;
  props: any;
}

export type RawComponentType = {
  type: LibraryComponentType;
  props: any;
}
