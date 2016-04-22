'use strict';

/**
 * Enum for supported input types of the uif-table directive
 * This enum is intended to be used as a string.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-table-type` attribute of the following components:
 *
 * let style: string = InputTypeEnum[InputTypeEnum.text];
 */
export enum TableTypeEnum {
  fluid,
  fixed
}
