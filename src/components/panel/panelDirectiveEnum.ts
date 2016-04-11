'use strict';

/**
 * Enum for all icons supported by Office UI Fabric. Enums in JavaScript are always number indexed, but this enum is
 * intended to be used as a string.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the <uif-icon /> directive. Specifically, the string is passed
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 *
 * let icon: string = IconEnum[IconEnum.alert];
 */


 /**
  * @ngdoc class
  * @name PanelTypes
  * @module officeuifabric.components.panel
  *
  * @description
  * Determines size of panel, default is 1
  */
 export enum PanelTypes {
   small,
   medium,
   large,
   extralarge,
   left
 }
