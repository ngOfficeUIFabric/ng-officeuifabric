'use strict';

import * as ng from 'angular';
import {IconEnum} from './../iconEnum';

export class DemoController {
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

    // fill with real options
    icons.push(IconEnum[IconEnum.arrowDownLeft]);
    icons.push(IconEnum[IconEnum.circleEmpty]);
    icons.push(IconEnum[IconEnum.circleFill]);
    icons.push(IconEnum[IconEnum.plus]);
    icons.push(IconEnum[IconEnum.minus]);
    icons.push(IconEnum[IconEnum.question]);

    // add one fake option... this should be a real icon tho!!! :)
    icons.push('ngOfficeUiFabric');

    return icons;
  };
}

export var module: ng.IModule = ng.module('demoApp', [
    'officeuifabric.core',
    'officeuifabric.components.icon'])
  .controller('demoController', [DemoController]);
