'use strict';

import * as ng from 'angular';
import { Component, Attr, Inject, provide, OnInit } from 'ng-metadata/core';
import {IconEnum} from './iconEnum';

/**
 * @ngdoc component
 * @name uifIcon
 * @module officeuifabric.components.icon
 *
 * @restrict E
 *
 * @description
 * `<uif-icon>` is an icon component.
 *
 * @see {link http://dev.office.com/fabric/styles}
 *
 * @usage
 *
 * <uif-icon uif-type="arrowDownLeft"></uif-icon>
 */
@Component( {
  selector: 'uif-icon',
  template: `<i class="ms-Icon ms-Icon--{{ $ctrl.uifType }}" aria-hidden="true"></i>`,
  legacy: {
    transclude: true
  }
} )
export class IconComponent implements OnInit {

  @Attr() uifType: string;

  constructor(
    @Inject( '$attrs' ) public $attrs: ng.IAttributes,
    @Inject( '$log' ) public $log: ng.ILogService
  ) {}

  ngOnInit() {
    // add watcher
    this.$attrs.$observe( 'uifType', ( newValue: string ) => {
      // verify a valid icon was passed in
      if ( IconEnum[ newValue ] === undefined ) {
        this.$log.error( `Error [ngOfficeUiFabric] officeuifabric.components.icon - Unsupported icon: 
        The icon ('${this.uifType}') is not supported by the Office UI Fabric. 
        Supported options are listed here: 
        https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/icon/iconEnum.ts` );
      }
    } );
  }

}

/**
 * @ngdoc module
 * @name officeuifabric.components.icon
 *
 * @description
 * Icon
 *
 */
export const module: ng.IModule = ng.module('officeuifabric.components.icon', [
  'officeuifabric.components'
])
  .directive(...provide(IconComponent));
