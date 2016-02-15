'use strict';

/**
 * Enum for all possible types supported by link in Office UI Fabric. This enum in intended
 * to be used as a string
 *
 * @readonly
 * @enum {string}
 *
 * @usage
 *
 * This is used to generate the string that you pass into the <uif-link /> directive. Specifically, the string is passed
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 *
 * let linkType: string = LinkType[LinkType.hero];
 */
export enum LinkType {
  regular,
  hero
}
