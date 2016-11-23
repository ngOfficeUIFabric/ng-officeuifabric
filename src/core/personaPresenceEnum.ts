'use strict';

/**
 * Enum for supported presence statuses of persona-based components: Persona, PersonaCard & OrgChart.
 * This enum is intended to be used as a striangular.
 *
 * @readonly
 * @enum {string}
 * @usage
 *
 * This is used to generate the string that you pass into the `uif-presence` attribute of the following components:
 * - uif-persona
 * - ufi-persona-card
 * - uif-org-chart
 * as follows:
 *
 * let presence: string = PresenceEnum[PresenceEnum.offline];
 */
export enum PresenceEnum {
  available,
  away,
  blocked,
  busy,
  dnd,
  offline
};
