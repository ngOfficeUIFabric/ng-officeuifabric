'use strict';

import * as ng from 'angular';
import * as choicefieldModule from '../components/choicefield/choicefieldDirective';
import * as contextualMenuModule from '../components/contextualmenu/contextualMenu';
import * as dropdownModule from '../components/dropdown/dropdownDirective';
import * as iconModule from '../components/icon/iconDirective';
import * as linkModule from '../components/link/linkDirective';
import * as overlayModule from '../components/overlay/overlayDirective';
import * as progressIndicatorModule from '../components/progressindicator/progressIndicatorDirective';
import * as searchboxModule from '../components/searchbox/searchboxDirective';
import * as spinnerModule from '../components/spinner/spinnerDirective';
import * as tableModule from '../components/table/tableDirective';
import * as textFieldModule from '../components/textfield/textFieldDirective';
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
  choicefieldModule.module.name,
  contextualMenuModule.module.name,
  dropdownModule.module.name,
  iconModule.module.name,
  linkModule.module.name,
  overlayModule.module.name,
  progressIndicatorModule.module.name,
  searchboxModule.module.name,
  spinnerModule.module.name,
  tableModule.module.name,
  textFieldModule.module.name,
  toggleModule.module.name
]);
