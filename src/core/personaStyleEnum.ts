'use strict';

/**
 * Enum for supported styles of persona-based components: Persona, PersonaCard & OrgChart.
 * This enum is intended to be used as a string.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-style` attribute of the following components:
 * - uif-persona
 * - ufi-persona-card
 * - uif-org-chart
 * as follows:
 *
 * let style: string = PersonaStyleEnum[PersonaStyleEnum.round];
 */
export enum PersonaStyleEnum {
  round,
  square
}
