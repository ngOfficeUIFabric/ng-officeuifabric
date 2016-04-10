/**
 * @ngdoc interface
 * @name IPerson
 * @module officeuifabric.components.core
 *
 * @description
 * This is helper interface used by person-related directives (<uif-people-picker>, <uif-facepile> and others)
 *
 * @property {string} icon             - Person's avatar
 * @property {string} initials         - Person's initials
 * @property {string} primaryText      - Person's primary text, usually that's person's full name
 * @property {string} secondaryText    - Person's secondary text, here can be person's group or job title
 * @property {string} color            - Person's color
 * @property {string} presence         - String representing person's presense, based on PresenceEnum
 */
export interface IPerson {
  icon: string;
  initials: string;
  primaryText: string;
  secondaryText: string;
  color: string;
  presence: string;
}
