import * as angular from 'angular';
import { ListItemSelectModeEnum } from './listItemSelectModeEnum';
import { ListItemTypeEnum } from './listItemTypeEnum';
import { ListLayoutEnum } from './listLayoutEnum';


describe('listDirective: <uif-list />', () => {
  let element: JQuery;
  let scope: any;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.list');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    scope = $rootScope;
  }));

  it('should render list using a ul tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list></uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).prop('tagName')).toEqual('UL');
  }));

  it(
    'should set correct Office UI Fabric classes on the list',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list></uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0)).toHaveClass('ms-List');
      expect(element.children().eq(0)).not.toHaveClass('ms-List--grid');
    }));

  it(
    'should throw an error on an invalid value for the \'uif-layout\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<div>\
            <uif-list uif-layout="invalid"></uif-list>\
            <uif-list uif-layout="grid"></uif-list>\
            <uif-list uif-layout="list"></uif-list>\
          </div>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it(
    'should use the list layout as default if no list layout has been specified',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list></uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0)).not.toHaveClass('ms-List--grid');
    }));

  it(
    'should set correct Office UI Fabric classes on the list ' +
    'displayed as grid',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list uif-layout="grid"></uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0)).toHaveClass('ms-List--grid');
    }));

  it(
    'should throw an error on an invalid value for the \'uif-item-select-mode\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<div>\
            <uif-list uif-item-select-mode="invalid"></uif-list>\
            <uif-list uif-item-select-mode="none"></uif-list>\
            <uif-list uif-item-select-mode="single"></uif-list>\
            <uif-list uif-item-select-mode="multiple"></uif-list>\
          </div>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it('should render the list item using a li tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list><uif-list-item></uif-list-item></uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0).children().eq(0).children().eq(0).prop('tagName')).toEqual('LI');
  }));

  it(
    'should set correct Office UI Fabric classes on the list item',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list><uif-list-item></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0).children().eq(0).children().eq(0)).toHaveClass('ms-ListItem');
    }));

  it(
    'should throw an error on an invalid value for the \'uif-selected\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list><uif-list-item uif-selected="invalid"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it(
    'should throw an error on an invalid value for the \'uif-type\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list>\
        <uif-list-item uif-type="invalid"></uif-list-item>\
        <uif-list-item uif-type="item"></uif-list-item>\
        <uif-list-item uif-type="itemWithIcon"></uif-list-item>\
        <uif-list-item uif-type="itemWithImage"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let numTypeErrors: number = 0;
      for (let i: number = 0; i < $log.error.logs.length; i++) {
        if ($log.error.logs[i][0].indexOf('uif-type') > -1) {
          numTypeErrors++;
        }
      }

      expect(numTypeErrors).toEqual(1);
    }));

  it(
    'should set correct Office UI Fabric classes on list items with icon',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
        <uif-list-item uif-type="itemWithIcon"></uif-list-item>\
        <uif-list-item uif-type="item"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      expect(element.find('li').length).toEqual(2);
      expect(element.find('li')[0]).toHaveClass('ms-ListItem--document');
      expect(element.find('li')[1]).not.toHaveClass('ms-ListItem--document');
    }));

  it(
    'should throw an error when using item of type itemWithIcon ' +
    'without a child uif-list-item-icon directive',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list>\
        <uif-list-item uif-type="itemWithIcon"></uif-list-item>\
        <uif-list-item uif-type="itemWithIcon">\
          <uif-list-item-icon></uif-list-item-icon>\
        </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let numErrors: number = 0;
      for (let i: number = 0; i < $log.error.logs.length; i++) {
        if ($log.error.logs[i][0].indexOf('uif-list-item-icon') > -1) {
          numErrors++;
        }
      }

      expect(numErrors).toEqual(1);
    }));

  it(
    'should set correct Office UI Fabric classes on list items with image',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
        <uif-list-item uif-type="itemWithImage"></uif-list-item>\
        <uif-list-item uif-type="item"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      expect(element.find('li').length).toEqual(2);
      expect(element.find('li')[0]).toHaveClass('ms-ListItem--image');
      expect(element.find('li')[1]).not.toHaveClass('ms-ListItem--image');
    }));

  it(
    'should throw an error when using item of type itemWithImage ' +
    'without a child uif-list-item-image directive',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list>\
        <uif-list-item uif-type="itemWithImage"></uif-list-item>\
        <uif-list-item uif-type="itemWithImage">\
          <uif-list-item-image></uif-list-item-image>\
        </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let numErrors: number = 0;
      for (let i: number = 0; i < $log.error.logs.length; i++) {
        if ($log.error.logs[i][0].indexOf('uif-list-item-image') > -1) {
          numErrors++;
        }
      }

      expect(numErrors).toEqual(1);
    }));

  it(
    'should throw an error on an invalid value for the \'uif-unread\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list><uif-list-item uif-unread="invalid"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it(
    'should throw an error on an invalid value for the \'uif-unseen\' attribute',
    inject(($compile: Function, $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      element = angular.element('<uif-list><uif-list-item uif-unseen="invalid"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      expect($log.error.logs.length).toEqual(1);
    }));

  it(
    'should not allow to select items by default', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-list uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataItem: JQuery = element.children().eq(0).children().eq(0);
      firstDataItem.click();

      expect(scope.selectedItems.length).toEqual(0);
    }));

  it('should allow to explicitly disable item selecting', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    scope.selectedItems = [];
    element = angular.element('<uif-list uif-item-select-mode="none" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    element = jQuery(element[0]);
    scope.$digest();

    let firstDataItem: JQuery = element.children().eq(0).children().eq(0);
    firstDataItem.click();

    expect(scope.selectedItems.length).toEqual(0);
  }));

  it(
    'for item select mode \'single\' should allow to select single item',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-list uif-item-select-mode="single" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataItem: JQuery = element.children().eq(0).children().eq(0);
      let secondDataItem: JQuery = element.children().eq(0).children().eq(1);
      firstDataItem.click();
      secondDataItem.click();

      expect(scope.selectedItems.length).toEqual(1);
    }));

  it(
    'for item select mode \'single\' should return the correct selected item',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-list uif-item-select-mode="single" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let secondDataItem: JQuery = element.children().eq(0).children().eq(1);
      secondDataItem.click();

      expect(scope.selectedItems[0]).toEqual(2);
    }));

  it(
    'for item select mode \'single\' should preselect the correct item',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.items = [1, 2, 3];
      scope.selectedItems = [scope.items[1]];
      element = angular.element('<uif-list uif-item-select-mode="single" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in items" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(1);
      expect(scope.selectedItems[0]).toEqual(2);
    }));

  it(
    'for item mode select \'multiple\' should allow to select multiple items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-list uif-item-select-mode="multiple" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataItem: JQuery = element.children().eq(0).children().eq(0);
      let secondDataItem: JQuery = element.children().eq(0).children().eq(1);
      firstDataItem.click();
      secondDataItem.click();

      expect(scope.selectedItems.length).toEqual(2);
    }));

  it(
    'for item select mode \'multiple\' should return the correct selected items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.selectedItems = [];
      element = angular.element('<uif-list uif-item-select-mode="multiple" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      let firstDataItem: JQuery = element.children().eq(0).children().eq(0);
      let secondDataItem: JQuery = element.children().eq(0).children().eq(1);
      firstDataItem.click();
      secondDataItem.click();

      expect(scope.selectedItems[0]).toEqual(1);
      expect(scope.selectedItems[1]).toEqual(2);
    }));

  it(
    'for item select mode \'multiple\' should preselect the correct items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      scope.items = [1, 2, 3];
      scope.selectedItems = [scope.items[1]];
      element = angular.element('<uif-list uif-item-select-mode="multiple" uif-selected-items="selectedItems">\
        <uif-list-item ng-repeat="n in items" uif-item="n"></uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(1);
      expect(scope.selectedItems[0]).toEqual(2);
    }));

  it(
    'should set correct Office UI Fabric classes on the selected and unselected list items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list><uif-list-item></uif-list-item>\
    <uif-list-item uif-selected="true"></uif-list-item><uif-list-item uif-selected="false"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let items: JQuery = element.children().eq(0).children();
      expect(items.length).toEqual(3);
      expect(items.eq(0).children().eq(0)).not.toHaveClass('is-selected');
      expect(items.eq(1).children().eq(0)).toHaveClass('is-selected');
      expect(items.eq(2).children().eq(0)).not.toHaveClass('is-selected');
    }));

  it(
    'should set correct Office UI Fabric classes on the read and unread list items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list><uif-list-item></uif-list-item>\
    <uif-list-item uif-unread="true"></uif-list-item><uif-list-item uif-unread="false"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let items: JQuery = element.children().eq(0).children();
      expect(items.length).toEqual(3);
      expect(items.eq(0).children().eq(0)).not.toHaveClass('is-unread');
      expect(items.eq(1).children().eq(0)).toHaveClass('is-unread');
      expect(items.eq(2).children().eq(0)).not.toHaveClass('is-unread');
    }));

  it(
    'should set correct Office UI Fabric classes on the seen and unseen list items',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list><uif-list-item></uif-list-item>\
    <uif-list-item uif-unseen="true"></uif-list-item><uif-list-item uif-unseen="false"></uif-list-item></uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let items: JQuery = element.children().eq(0).children();
      expect(items.length).toEqual(3);
      expect(items.eq(0).children().eq(0)).not.toHaveClass('is-unseen');
      expect(items.eq(1).children().eq(0)).toHaveClass('is-unseen');
      expect(items.eq(2).children().eq(0)).not.toHaveClass('is-unseen');
    }));

  it(
    'should set correct Office UI Fabric classes on list items that can be selected',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list uif-item-select-mode="single">\
            <uif-list-item></uif-list-item>\
          </uif-list>');
      $compile(element)(scope);
      scope.$digest();

      let items: JQuery = element.children().eq(0).children();
      expect(items.length).toEqual(1);
      expect(items.eq(0).children().eq(0)).toHaveClass('is-selectable');
    }));

  it(
    'should render list item primary text using a span tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-primary-text></uif-list-item-primary-text>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-primary-text
        .children().eq(0).prop('tagName')).toEqual('SPAN');
    }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item primary text',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-primary-text></uif-list-item-primary-text>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-primary-text
        .children().eq(0)).toHaveClass('ms-ListItem-primaryText');
    }));

  it('should render list item secondary text using a span tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-secondary-text></uif-list-item-secondary-text>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-secondary-text
      .children().eq(0).prop('tagName')).toEqual('SPAN');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item secondary text',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-secondary-text></uif-list-item-secondary-text>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-secondary-text
        .children().eq(0)).toHaveClass('ms-ListItem-secondaryText');
    }));

  it('should render list item tertiary text using a span tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-tertiary-text></uif-list-item-tertiary-text>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-tertiary-text
      .children().eq(0).prop('tagName')).toEqual('SPAN');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item tertiary text',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-tertiary-text></uif-list-item-tertiary-text>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-tertiary-text
        .children().eq(0)).toHaveClass('ms-ListItem-tertiaryText');
    }));

  it('should render list item meta text using a span tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-meta-text></uif-list-item-meta-text>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-meta-text
      .children().eq(0).prop('tagName')).toEqual('SPAN');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item meta text',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-meta-text></uif-list-item-meta-text>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-meta-text
        .children().eq(0)).toHaveClass('ms-ListItem-metaText');
    }));

  it('should render list item image using a div tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-image></uif-list-item-image>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-image
      .children().eq(0).prop('tagName')).toEqual('DIV');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item image',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-image></uif-list-item-image>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-image
        .children().eq(0)).toHaveClass('ms-ListItem-image');
    }));

  it('should render list item icon using a div tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-icon></uif-list-item-icon>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-icon
      .children().eq(0).prop('tagName')).toEqual('DIV');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item icon',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-icon></uif-list-item-icon>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-icon
        .children().eq(0)).toHaveClass('ms-ListItem-itemIcon');
    }));

  it('should render list item selection target using a div tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-selection-target></uif-list-item-selection-target>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-selection-target
      .children().eq(0).prop('tagName')).toEqual('DIV');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item selection target',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-selection-target></uif-list-item-selection-target>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-selection-target
        .children().eq(0)).toHaveClass('ms-ListItem-selectionTarget');
    }));

  it('should render list item actions using a div tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-actions></uif-list-item-actions>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-actions
      .children().eq(0).prop('tagName')).toEqual('DIV');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item actions',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-actions></uif-list-item-actions>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-actions
        .children().eq(0)).toHaveClass('ms-ListItem-actions');
    }));

  it('should render list item action using a div tag', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
    element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-actions>\
              <uif-list-item-action></uif-list-item-action>\
            </uif-list-item-actions>\
          </uif-list-item>\
        </uif-list>');
    $compile(element)(scope);
    scope.$digest();
    expect(element.children().eq(0) // ul
      .children().eq(0) // uif-list-item
      .children().eq(0) // li
      .children().eq(0) // uif-list-item-actions
      .children().eq(0) // div.ms-ListItem-actions
      .children().eq(0) // uif-list-item-action
      .children().eq(0).prop('tagName')).toEqual('DIV');
  }));

  it(
    'should set correct Office UI Fabric classes on ' +
    'list item action',
    inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-list>\
          <uif-list-item>\
            <uif-list-item-actions>\
              <uif-list-item-action></uif-list-item-action>\
            </uif-list-item-actions>\
          </uif-list-item>\
        </uif-list>');
      $compile(element)(scope);
      scope.$digest();
      expect(element.children().eq(0) // ul
        .children().eq(0) // uif-list-item
        .children().eq(0) // li
        .children().eq(0) // uif-list-item-actions
        .children().eq(0) // div.ms-ListItem-actions
        .children().eq(0) // uif-list-item-action
        .children().eq(0)).toHaveClass('ms-ListItem-action');
    }));

  /**
   * test different selection modes: single / multiple
   */
  it(
    'should allow interpolation of list select mode value',
    inject((
      $compile: angular.ICompileService,
      $rootScope: angular.IRootScopeService) => {

      let subjectElement: JQuery,
        firstListItem: JQuery,
        secondListItem: JQuery = null;
      let html: string = `
        <uif-list uif-item-select-mode="{{type}}" uif-selected-items="selectedItems">
          <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>
        </uif-list>`;
      let ngElement: JQuery = angular.element(html);
      let localScope: any = $rootScope.$new();
      $compile(ngElement)(localScope);

      // setup scope
      localScope.type = undefined;
      localScope.selectedItems = [];


      // >>> test 1
      localScope.type = ListItemSelectModeEnum[ListItemSelectModeEnum.single];
      localScope.selectedItems = [];

      // run digest cycle
      localScope.$digest();
      subjectElement = jQuery(ngElement[0]);

      // test for correct setting
      // >>>> try to select two+ items...
      firstListItem = subjectElement.children().eq(0).children().eq(0);
      firstListItem.click();
      secondListItem = subjectElement.children().eq(0).children().eq(1);
      secondListItem.click();
      // >>>> ... test how many selected
      expect(localScope.selectedItems.length).toEqual(1);

      // >>> test 2
      localScope.type = ListItemSelectModeEnum[ListItemSelectModeEnum.multiple];
      localScope.selectedItems = [];

      // run digest cycle
      scope.$digest();
      element = jQuery(ngElement[0]);

      // test for correct setting
      // >>>> try to select two+ items...
      firstListItem = subjectElement.children().eq(0).children().eq(0);
      firstListItem.click();
      secondListItem = subjectElement.children().eq(0).children().eq(1);
      secondListItem.click();
      // >>>> ... test how many selected
      expect(localScope.selectedItems.length).toEqual(2);
    }));

  /**
   * test two layout types: grid / list
   */
  it(
    'should allow interpolation of list display mode value',
    inject((
      $compile: angular.ICompileService,
      $rootScope: angular.IRootScopeService) => {

      let subjectElement: JQuery = null;
      let html: string = `
        <uif-list uif-layout="{{type}}">
          <uif-list-item ng-repeat="n in [1, 2, 3]" uif-item="n"></uif-list-item>
        </uif-list>`;
      let ngElement: JQuery = angular.element(html);
      let localScope: any = $rootScope.$new();
      $compile(ngElement)(localScope);


      // >>> test 1
      localScope.type = ListLayoutEnum[ListLayoutEnum.list];

      // run digest cycle
      localScope.$digest();
      subjectElement = jQuery(ngElement[0]).find('ul');

      // test for correct setting
      expect(subjectElement).toHaveClass('ms-List');
      expect(subjectElement).not.toHaveClass('ms-List--grid');


      // >>> test 2
      localScope.type = ListLayoutEnum[ListLayoutEnum.grid];

      // run digest cycle
      localScope.$digest();
      subjectElement = jQuery(ngElement[0]).find('ul');

      // test for correct setting
      expect(subjectElement).toHaveClass('ms-List');
      expect(subjectElement).toHaveClass('ms-List--grid');
    }));

  /**
   * test different ways to render list items: with icon / image
   */
  it(
    'should allow interpolation of list item display mode value',
    inject((
      $compile: angular.ICompileService,
      $rootScope: angular.IRootScopeService) => {

      let subjectElement: JQuery = null;
      let html: string = `
        <uif-list>
          <uif-list-item-image><img ng-src="image.png" /></uif-list-item-image>
          <uif-list-item-icon><uif-icon uif-type="mail"></uif-icon></uif-list-item-icon>
          <uif-list-item uif-type="{{type}}"></uif-list-item>
        </uif-list>`;
      let ngElement: JQuery = angular.element(html);
      let localScope: any = $rootScope.$new();
      $compile(ngElement)(localScope);

      // >>> test 1
      localScope.type = ListItemTypeEnum[ListItemTypeEnum.itemWithIcon];

      // run digest cycle
      localScope.$digest();
      subjectElement = jQuery(ngElement[0]);
      // test for correct setting
      expect(subjectElement.find('li')).toHaveClass('ms-ListItem--document');


      // >>> test 2
      localScope.type = ListItemTypeEnum[ListItemTypeEnum.itemWithImage];

      // run digest cycle
      localScope.$digest();
      subjectElement = jQuery(ngElement[0]);

      // test for correct setting
      expect(subjectElement.children().eq(0).children().eq(2).children().eq(0)).toHaveClass('ms-ListItem--image');
      expect(subjectElement.find('li')).toHaveClass('ms-ListItem--image');
    }));
});
