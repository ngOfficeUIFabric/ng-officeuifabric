'use strict';

import * as ng from 'angular';
import {IconEnum} from '../iconEnum';

let demoApp: ng.IModule = ng.module('demoApp', [
  'officeuifabric.core',
  'officeuifabric.components.icon'
]);

demoApp.controller('demoController', [
  '$scope', DemoController]);

class DemoController {
  public icons: string[] = [];
  public selectedIcon: any = {};

  constructor() {
    // set the collection
    this.icons = this._fillIconCollection();
    // pick one
    this.selectedIcon = this.icons[3];
  };

  /**
   * @description
   * Populates the icon collection using the provided enum.
   * 
   * @returns {string[]}  - Array of icons as strings.
   */
  private _fillIconCollection(): string[] {
    let icons: string[] = [];

    icons.push(IconEnum[IconEnum.arrowDownLeft]);
    icons.push(IconEnum[IconEnum.circleEmpty]);
    icons.push(IconEnum[IconEnum.circleFill]);
    icons.push(IconEnum[IconEnum.plus]);
    icons.push(IconEnum[IconEnum.minus]);
    icons.push(IconEnum[IconEnum.question]);

    return icons;
  };
}
