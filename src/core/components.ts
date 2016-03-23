'use strict';

import * as ng from 'angular';
import * as breadcrumbModule from '../components/breadcrumb/breadcrumbDirective';
import * as buttonModule from '../components/button/buttonDirective';
import * as calloutModule from '../components/callout/calloutDirective';
import * as choicefieldModule from '../components/choicefield/choicefieldDirective';
import * as commandBarModule from '../components/commandbar/commandBarDirective';
import * as contentModule from '../components/content/contentDirective';
import * as contextualMenuModule from '../components/contextualmenu/contextualMenu';
import * as datepickerModule from '../components/datepicker/datepickerDirective';
import * as dialogModule from '../components/dialog/dialogDirective';
import * as dropdownModule from '../components/dropdown/dropdownDirective';
import * as iconModule from '../components/icon/iconDirective';
import * as labelModule from '../components/label/labelDirective';
import * as linkModule from '../components/link/linkDirective';
import * as listModule from '../components/list/listDirective';
import * as navBarModule from '../components/navbar/navbarDirective';
import * as overlayModule from '../components/overlay/overlayDirective';
import * as panelModule from '../components/panel/panelDirective';
import * as personacardModule from '../components/personacard/personacardDirective';
import * as personaModule from '../components/persona/personaDirective';
import * as pivotModule from '../components/pivot/pivotDirective';
import * as progressIndicatorModule from '../components/progressindicator/progressIndicatorDirective';
import * as searchboxModule from '../components/searchbox/searchboxDirective';
import * as spinnerModule from '../components/spinner/spinnerDirective';
import * as tableModule from '../components/table/tableDirective';
import * as textFieldModule from '../components/textfield/textFieldDirective';
import * as toggleModule from '../components/toggle/toggleDirective';
import * as orgChartModule from '../components/orgchart/orgChartDirective';
import * as peoplePickerModule from '../components/peoplepicker/peoplePickerDirective';

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
  breadcrumbModule.module.name,
  buttonModule.module.name,
  calloutModule.module.name,
  choicefieldModule.module.name,
  commandBarModule.module.name,
  contentModule.module.name,
  contextualMenuModule.module.name,
  datepickerModule.module.name,
  dialogModule.module.name,
  dropdownModule.module.name,
  iconModule.module.name,
  labelModule.module.name,
  linkModule.module.name,
  listModule.module.name,
  navBarModule.module.name,
  overlayModule.module.name,
  panelModule.module.name,
  peoplePickerModule.module.name,
  personacardModule.module.name,
  personaModule.module.name,
  pivotModule.module.name,
  progressIndicatorModule.module.name,
  searchboxModule.module.name,
  spinnerModule.module.name,
  tableModule.module.name,
  textFieldModule.module.name,
  toggleModule.module.name,
  orgChartModule.module.name
]);
