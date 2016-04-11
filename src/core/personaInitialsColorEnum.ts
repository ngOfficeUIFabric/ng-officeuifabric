'use strict';

/**
 * Enum for supported initials color of persona-based components, Persona, PersonaCard & OrgChart.
 * This enum is intended to be used as a string.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-initials-color` attribute of the following components,
 * - uif-persona
 * - ufi-persona-card
 * - uif-org-chart
 * as follows,
 *
 * let color, string = PersonaInitialsColor[PersonaInitialsColor.blue];
 */
export enum PersonaInitialsColor {
  lightBlue,
  blue,
  darkBlue,
  teal,
  lightGreen,
  green,
  darkGreen,
  lightPink,
  pink,
  magenta,
  purple,
  black,
  orange,
  red,
  darkRed
};
