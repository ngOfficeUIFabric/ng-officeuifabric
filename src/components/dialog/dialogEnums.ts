'use strict';

/**
 * Enumeration of the different dialog types supported by the dialog directive.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This enumeration is used to specify the type of dialog generated.
 */
export enum DialogTypeEnum {
  none,
  header,
  multiline
}

/**
 * Enumeration of the different dialog action alignment types supported by the dialog directive.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This enumeration is used to specify the alignment of action button inside <uif-dialog-actions> element
 */
export enum DialogActionsPositionEnum {
  none,
  left,
  right
}
