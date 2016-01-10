'use strict';

import * as ng from 'angular';
import * as iconModule from '../components/icon/iconDirective';
import * as textFieldModule from '../components/textfield/textFieldDirective';
import * as spinnerModule from '../components/spinner/spinnerDirective';
import * as toggleModule from '../components/toggle/toggleDirective';


/**
 * @ngdoc module
 * @name officeuifabric.components
 *
 * @description
 * Office UI Fabric Angular directives components module that includes all
 * other directives within the library.
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components', [
    iconModule.module.name,
    textFieldModule.module.name,
    spinnerModule.module.name,
    toggleModule.module.name
  ]);
