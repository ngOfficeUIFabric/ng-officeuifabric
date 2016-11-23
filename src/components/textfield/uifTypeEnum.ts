'use strict';

/**
 * Enum for supported input types of the uif-textfield directive
 * This enum is intended to be used as a striangular.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-type` attribute of the following components:
 *
 * let style: string = InputTypeEnum[InputTypeEnum.text];
 */
export enum InputTypeEnum {
  text,
  password,
  email,
  url,
  tel,
  range,
  number
}
