/**
 *
 * Enum for callout type. It is intended to use as string as `uif-type` attribute value on `uif-callout` directive.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the <uif-callout /> directive. Specifically, the string is passed
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 *
 * let type: string = CalloutType[CalloutType.peek];
 */
export enum CalloutType {
  oobe,
  peek
}
