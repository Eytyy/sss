import array from './array';
import boolean from './boolean';
import date from './date';
import datetime from './datetime';
import file from './file';
import image from './image';
import number from './number';
import object from './object';
import reference from './reference';
import slug from './slug';
import string from './string';
import text from './text';
import url from './url';

const types = [
  array,
  boolean,
  file,
  date,
  datetime,
  image,
  number,
  object,
  reference,
  slug,
  string,
  text,
  url,
];

export const schemaTypes = types;
