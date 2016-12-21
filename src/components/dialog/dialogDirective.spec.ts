import * as angular from 'angular';

describe('uifDialog: <uif-dialog />', () => {
  let element: JQuery;
  let scope: any;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.dialog');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    scope = $rootScope;
  }));

  it('should set correct Office UI Fabric classes on the Dialog', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-dialog></uif-dialog>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.hasClass('ms-Dialog')).toBe(true);
  }));

  it(
    'should set correct Office UI Fabric attribute [uif-type] on the Dialog',
    inject(
      ($compile: Function, $rootScope: angular.IRootScopeService) => {
        element = angular.element('<uif-dialog uif-type="header" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element.hasClass('ms-Dialog--lgHeader')).toBe(true);
        element = angular.element('<uif-dialog uif-type="multiline" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog--multiline');
      }));

  it(
    'should set correct Office UI Fabric attribute [uif-close] on the Dialog',
    inject(
      ($compile: Function, $rootScope: angular.IRootScopeService) => {
        element = angular.element('<uif-dialog uif-close="true" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect(element).toHaveClass('ms-Dialog--close');
      }));

  it(
    'should set correct Office UI Fabric classes on the DialogHeader',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let elem: JQuery = $compile('<uif-dialog><uif-dialog-header></uif-dialog-header></uif-dialog>')(scope);
      scope.$digest();
      let root: JQuery = jQuery(elem[0]);
      expect(root.find('.ms-Dialog-header').length).toBe(1);
    }));

  it(
    'should validate log messages on uifType',
    inject(
      ($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
        element = angular.element('<uif-dialog uif-type="unknown" ></uif-dialog>');
        $compile(element)(scope);
        scope.$digest();
        expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
          'The type (\'unknown\') is not supported by the Office UI Fabric.' +
          'Supported options are listed here: ' +
          'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts');
      }));

  it(
    'should validate log messages on uifPosition',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-dialog-actions uif-position="unknown"></uif-dialog-actions>');
      $compile(element)(scope);
      scope.$digest();
      expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.dialog - Unsupported type:' +
        'The type (\'unknown\') is not supported by the Office UI Fabric.' +
        'Supported options are listed here: ' +
        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/dialog/dialogEnums.ts'
      );
    }));

  it(
    'should set correct Office UI Fabric classes on the DialogContent',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let elem: JQuery = $compile('<uif-dialog-content></uif-dialog-content>')(scope);
      scope.$digest();
      let root: JQuery = jQuery(elem[0]);
      expect(root.hasClass('ms-Dialog-content')).toBe(true);
    }));

  it(
    'should set correct Office UI Fabric classes on the DialogInner',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let elem: JQuery = $compile('<uif-dialog-inner></uif-dialog-inner>')(scope);
      scope.$digest();
      let root: JQuery = jQuery(elem[0]);
      expect(root.hasClass('ms-Dialog-inner')).toBe(true);
    }));

  it(
    'should set correct Office UI Fabric classes on the DialogSubText',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let elem: JQuery = $compile('<uif-dialog-subtext></uif-dialog-subtext>')(scope);
      scope.$digest();
      let root: JQuery = jQuery(elem[0]);
      expect(root.hasClass('ms-Dialog-subText')).toBe(true);
    }));
});
