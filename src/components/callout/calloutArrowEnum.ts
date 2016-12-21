/**
 * Enum for callout arrow direction. It is intended to use as string as `uif-arrow` attribute value on `uif-callout` directive.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the <uif-callout /> directive. Specifically, the string is passed
 * to the `uif-arrow` attribute. To evaluate the enum value as a string:
 *
 * let arrow: string = CalloutArrow[CalloutArrow.left];
 */
export enum CalloutArrow {
  left,
  right,
  top,
  bottom
}
