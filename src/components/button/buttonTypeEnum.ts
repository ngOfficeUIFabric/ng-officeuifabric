/**
 * Enum for all possible button types supported by Office UI Fabric. Enums in JavaScript are always indexed but this enum is
 * intended to be used as a striangular.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the <uif-button /> directive. Specifically, the string is passed
 * to the `uif-type` attribute. To evaluate the enum value as a string:
 *
 * let buttonType: string = ButtonTypeEnum[ButtonTypeEnum.primary];
 */
export enum ButtonTypeEnum {
  primary,
  command,
  compound,
  hero
};
