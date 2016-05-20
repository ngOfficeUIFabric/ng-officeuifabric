'use strict';

/**
 * Enum for supported types of the uif-messagebar directive
 * This enum is intended to be used as a string.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-type` attribute of the `<uif-message-bar>` component:
 *
 * let type: string = MessageBarTypeEnum[MessageBarTypeEnum.error];
 */
export enum MessageBarTypeEnum {
    error,
    remove,
    severewarning,
    success,
    warning
}
