'use strict';

import * as ng from 'angular';
import * as iconModule from '../components/icon/iconDirective';
import * as searchBoxModule from '../components/searchbox/searchboxDirective';

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
    searchBoxModule.module.name
  ]);
