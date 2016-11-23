'use strict';

import * as angular from 'angular';
import { ContextualMenuDirective, ContextualMenuController } from './../contextualmenu/contextualMenu';

/**
 * @ngdoc interface
 * @name INavBarScope
 * @module officeuifabric.components.navbar
 *
 * @description
 * This is the scoped used by the `<uif-nav-bar>` directive.
 *
 * @property {string} overlay     - Overlay name for the nav bar, see OverlayMode enum
 * @property {function} openMenu  - Open menu callback
 * @property {function} closeMenu - Close menu callback
 */
interface INavBarScope extends angular.IScope {
  overlay: string;
  openMenu: () => void;
  closeMenu: () => void;
}

/**
 * @ngdoc controller
 * @name NavBarController
 * @module officeuifabric.components.navbar
 *
 * @description
 * Controller used for the `<uif-nav-bar>` directive.
 */
export class NavBarController {
  public static $inject: string[] = ['$scope', '$animate', '$element', '$log'];

  constructor(
    private $scope: INavBarScope,
    private $animate: angular.animate.IAnimateService,
    private $element: angular.IAugmentedJQuery,
    public $log: angular.ILogService) {
  }

  public openMobileMenu(): void {
    let menuVisible: boolean = this.$element.hasClass('is-open');

    this.$animate[menuVisible ? 'removeClass' : 'addClass'](this.$element, 'is-open');
  }

  public closeMobileMenu(): void {
    if (this.$element.hasClass('is-open')) {
      this.$animate.removeClass(this.$element, 'is-open');
    }
  }

  public closeAllContextMenus(): void {
    let navBarItems: NodeListOf<Element> = this.$element[0].querySelectorAll('.ms-NavBar-item');

    for (let i: number = 0; i < navBarItems.length; i++) {
      let ngElement: angular.IAugmentedJQuery = angular.element(navBarItems[i]);
      let navBarItemCtrl: NavBarItemController = ngElement.controller(NavBarItemDirective.directiveName);
      if (navBarItemCtrl) {
        navBarItemCtrl.closeContextualMenu();
        navBarItemCtrl.deselectItem();
      }
    }
  }

  public hideSearchTextBox(): void {
    let navBarItems: NodeListOf<Element> = this.$element[0].querySelectorAll('.ms-NavBar-item--search');

    for (let i: number = 0; i < navBarItems.length; i++) {
      let ngElement: angular.IAugmentedJQuery = angular.element(navBarItems[i]);
      let navSearchCtrl: NavBarSearchController = ngElement.controller(NavBarSearch.directiveName);
      if (navSearchCtrl) {
        navSearchCtrl.closeSearch();
      }
    }
  }
}

/**
 * @ngdoc directive
 * @name uifNavBar
 * @module officeuifabric.components.navbar
 *
 * @restrict E
 *
 * @description
 * `<uif-nav-bar>` is a nav bar directive.
 *
 * @see {link http://dev.office.com/fabric/components/navbar}
 *
 * @usage
 *
 * <uif-nav-bar uif-overlay="dark">
 *  <uif-nav-bar-search placeholder="search for smth" uif-on-search="onSearch(search)">
 *  </uif-nav-bar-search>
 *  <uif-nav-bar-item uif-text="'Home'" ng-click="logClick('Home item clicked')"></uif-nav-bar-item>
 *  <uif-nav-bar-item uif-text="'Contacts'"></uif-nav-bar-item>
 *  <uif-nav-bar-item>
 *   <uif-nav-item-content>
 *     <uif-icon uif-type="arrowRight"></uif-icon><b>Item in bold with icons</b>
 *     <uif-icon uif-type="arrowLeft"></uif-icon>
 *   </uif-nav-item-content>
 *  </uif-nav-bar-item>
 * </uif-nav-bar>
 */
export class NavBarDirective implements angular.IDirective {

  public static directiveName: string = 'uifNavBar';
  public static overlayValues: string[] = ['light', 'dark'];

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public controller: any = NavBarController;
  public controllerAs: string = 'nav';
  public template: string = `
  <div class=\"ms-NavBar\">
    <div class="ms-NavBar-openMenu js-openMenu" ng-click="nav.openMobileMenu()">
      <uif-icon uif-type="menu"></uif-icon>
    </div>
    <uif-overlay uif-mode="{{overlay}}" ng-click="nav.closeMobileMenu()"></uif-overlay>
    <ul class=\"ms-NavBar-items\">
      <div class='uif-nav-items'></div>
    </ul>
  </div>`;

  public scope: {} = {
    overlay: '@?uifOverlay'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = (
      $log: angular.ILogService,
      $animate: angular.animate.IAnimateService,
      $document: angular.IDocumentService
    ) => new NavBarDirective($log, $animate, $document);
    directive.$inject = ['$log', '$animate', '$document'];
    return directive;
  }

  public link: angular.IDirectiveLinkFn = (
    $scope: INavBarScope,
    $element: angular.IAugmentedJQuery,
    $attrs: angular.IAttributes,
    navBarController: NavBarController,
    $transclude: angular.ITranscludeFunction): void => {

    this.$document.on('click', () => {
      navBarController.closeAllContextMenus();
      navBarController.hideSearchTextBox();
    });

    $transclude((clone: angular.IAugmentedJQuery) => {
      let elementToReplace: angular.IAugmentedJQuery = angular.element($element[0].querySelector('.uif-nav-items'));
      elementToReplace.replaceWith(clone);
    });
  }

  constructor(
    private $log: angular.ILogService, private $animate: angular.animate.IAnimateService, private $document: angular.IDocumentService) { }
}

/**
 * @ngdoc interface
 * @name INavBarItemScope
 * @module officeuifabric.components.navbar
 *
 * @description
 * This is the scope used by the `<uif-nav-bar-item>` directive.
 *
 * @property {boolean} hasChildMenu   - Indicates if nav bar item has child menu (contexual menu)
 * @property {object} contextMenuCtrl - Reference to contextual menu controller
 * @property {string} text            - Text used by the nav bar item
 * @property {string} type            - Menu type, string represents one of the values for the NavBarItemTypes enum
 * @property {function} selectItem    - Nav bar item click callback
 * @property {boolean} isDisabled     - Indicates that menu item is disabled
 */
interface INavBarItemScope extends angular.IScope {
  hasChildMenu: boolean;
  contextMenuCtrl: ContextualMenuController;
  text: string;
  type: string;
  selectItem: ($event: JQueryEventObject) => void;
  isDisabled: boolean;
}

/**
 * @ngdoc interface
 * @name INavBarItemAttributes
 * @module officeuifabric.components.navbar
 *
 * @description
 * Attributs for the `<uif-nav-bar-item>` directive.
 *
 * @property {string} uifType - The type of the nav bar menu item, based on `NavBarItemTypes` enum
 */
interface INavBarItemAttributes extends angular.IAttributes {
  uifType: string;
}

/**
 * @ngdoc enum
 * @name NavBarItemTypes
 * @module officeuifabric.components.navbar
 *
 * @description
 * Determines which nav bar item type, default is `link`
 */
enum NavBarItemTypes {
  link = 0,
  menu = 1
}

/**
 * @ngdoc controller
 * @name NavBarItemController
 * @module officeuifabric.components.navbar
 *
 * @description
 * Controller used for the `<uif-nav-bar-item>` directive.
 */
export class NavBarItemController {
  public static $inject: string[] = ['$scope', '$element'];

  constructor(private $scope: INavBarItemScope, private $element: angular.IAugmentedJQuery) { }

  public closeContextualMenu(): void {
    if (this.$scope.hasChildMenu) {
      this.$scope.contextMenuCtrl.closeMenu();
    }
  }

  public deselectItem(): void {
    this.$element.removeClass('is-selected');
  }
}

/**
 * @ngdoc directive
 * @name uifNavBarItem
 * @module officeuifabric.components.navbar
 *
 * @restrict E
 *
 * @description
 * `<uif-nav-bar-item>` is a nav bar item directive.
 *
 * @see {link http://dev.office.com/fabric/components/navbar}
 *
 * @usage
 *
 * <uif-nav-bar-item uif-text="'Regular menu item'" ng-click="logClick('Menu item clicked')"></uif-nav-bar-item>
 * <uif-nav-bar-item>
 *   <uif-nav-item-content>
 *     <uif-icon uif-type="arrowRight"></uif-icon><b>Item in bold with icons</b>
 *     <uif-icon uif-type="arrowLeft"></uif-icon>
 *   </uif-nav-item-content>
 * </uif-nav-bar-item>
 * <uif-nav-bar-item uif-type="menu">
 *   <uif-nav-item-content>Sub Menu</uif-nav-item-content>
 *   <uif-contextual-menu>
 *     <uif-contextual-menu-item uif-text="'Delete'"></uif-contextual-menu-item>
 *     <uif-contextual-menu-item uif-text="'Flag'"></uif-contextual-menu-item>
 *     </uif-contextual-menu-item>
 *   </uif-contextual-menu>
 * </uif-nav-bar-item>
 */
export class NavBarItemDirective implements angular.IDirective {
  public static directiveName: string = 'uifNavBarItem';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public controller: any = NavBarItemController;
  public require: string = `^${NavBarDirective.directiveName}`;

  public scope: {} = {
    isDisabled: '@?disabled',
    position: '@?uifPosition',
    text: '=?uifText',
    type: '@?uifType'
  };

  private templateTypes: { [menuType: number]: string } = {};

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = ($log: angular.ILogService) => new NavBarItemDirective($log);
    directive.$inject = ['$log'];
    return directive;
  }

  constructor(private $log: angular.ILogService) {
    this.templateTypes[NavBarItemTypes.link] = `
    <li class="ms-NavBar-item"
    ng-class="{\'is-disabled\': isDisabled, 'ms-NavBar-item--right': position === 'right'}">
      <a class="ms-NavBar-link" href=""><span class='uif-nav-item-content'></span></a>
    </li>`;

    this.templateTypes[NavBarItemTypes.menu] = `
    <li class="ms-NavBar-item ms-NavBar-item--hasMenu" ng-class="{\'is-disabled\': isDisabled}">
      <a class="ms-NavBar-link" href=""><span class='uif-nav-item-content'></span></a>
      <i class="ms-NavBar-chevronDown ms-Icon ms-Icon--chevronDown"></i>
      <div class='uif-submenu'></div>
    </li>`;
  }

  public template: any = ($element?: angular.IAugmentedJQuery, $attrs?: INavBarItemAttributes): string => {
    let type: string = $attrs.uifType;

    if (angular.isUndefined(type)) {
      return this.templateTypes[NavBarItemTypes.link];
    }

    if (NavBarItemTypes[type] === undefined) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.navbar - unsupported nav bar item type:\n' +
        'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for nav bar item.' +
        'Supported types can be found under NavBarItemTypes enum here:\n' +
        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/navbar/navbarDirective.ts');
      return '<div></div>';
    }

    return this.templateTypes[NavBarItemTypes[type]];
  }

  public link: angular.IDirectiveLinkFn = (
    $scope: INavBarItemScope,
    $element: angular.IAugmentedJQuery,
    $attrs: angular.IAttributes,
    navBarController: NavBarController,
    $transclude: angular.ITranscludeFunction): void => {

    if ($scope.isDisabled) {
      let navBarLinkEelement: JQuery = angular.element($element[0].querySelector('.ms-NavBar-link'));
      navBarLinkEelement.removeAttr('href');
    }

    if (angular.isUndefined($scope.type)) {
      $scope.type = NavBarItemTypes[NavBarItemTypes.link];
    }

    $scope.selectItem = ($event: JQueryEventObject) => {
      $event.stopPropagation();

      if ($element.hasClass('is-disabled')) {
        return;
      }

      $element.parent().find('li').removeClass('is-selected');
      navBarController.closeAllContextMenus();
      navBarController.hideSearchTextBox();

      $element.toggleClass('is-selected');
      if ($scope.hasChildMenu && $scope.contextMenuCtrl.isMenuOpened()) {
        $scope.contextMenuCtrl.closeMenu();
        $element.removeClass('is-selected');
      } else if ($scope.hasChildMenu && !$scope.contextMenuCtrl.isMenuOpened()) {
        $scope.contextMenuCtrl.openMenu();
        $element.addClass('is-selected');
      } else if (!$scope.hasChildMenu) {
        navBarController.closeMobileMenu();
      }

      $scope.$apply();
    };

    $element.on('click', $scope.selectItem);

    this.transcludeChilds($scope, $element, $transclude);

    let contextMenuCtrl: ContextualMenuController = angular.element($element[0].querySelector('.ms-ContextualMenu'))
      .controller(ContextualMenuDirective.directiveName);

    if (contextMenuCtrl) {
      $scope.hasChildMenu = true;
      $scope.contextMenuCtrl = contextMenuCtrl;
      $scope.contextMenuCtrl.onRootMenuClosed.push(() => {
        navBarController.closeMobileMenu();
        $element.removeClass('is-selected');
      });
    }
  }

  private transcludeChilds($scope: INavBarItemScope, $element: angular.IAugmentedJQuery, $transclude: angular.ITranscludeFunction): void {
    $transclude((clone: angular.IAugmentedJQuery) => {
      let hasContent: boolean = this.hasItemContent(clone);

      if (!hasContent && !$scope.text) {
        this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.navbar - ' +
          'you need to provide a text for a nav bar menu item.\n' +
          'For <uif-nav-bar-item> you need to specify either \'uif-text\' as attribute or <uif-nav-item-content> as a child directive');
      }

      this.insertLink(clone, $scope, $element);
      this.insertMenu(clone, $scope, $element);
    });
  }

  private insertLink(clone: angular.IAugmentedJQuery, $scope: INavBarItemScope, $element: angular.IAugmentedJQuery): void {
    let elementToReplace: JQuery = angular.element($element[0].querySelector('.uif-nav-item-content'));

    if (this.hasItemContent(clone)) { /* element provided */
      for (let i: number = 0; i < clone.length; i++) {
        let element: angular.IAugmentedJQuery = angular.element(clone[i]);
        if (element.hasClass('uif-content')) {
          elementToReplace.replaceWith(element);
          break;
        }
      }
    } else { /* text attribute provided */
      elementToReplace.replaceWith(angular.element('<span>' + $scope.text + '</span>'));
    }
  }

  private insertMenu(clone: angular.IAugmentedJQuery, $scope: INavBarItemScope, $element: angular.IAugmentedJQuery): void {
    for (let i: number = 0; i < clone.length; i++) {
      let element: angular.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass('ms-ContextualMenu')) {
        angular.element($element[0].querySelector('.uif-submenu')).replaceWith(element);
      }
    }
  }

  private hasItemContent(clone: angular.IAugmentedJQuery): boolean {
    for (let i: number = 0; i < clone.length; i++) {
      let element: angular.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass('uif-content')) {
        return true;
      }
    }

    return false;
  }
}

/**
 * @ngdoc interface
 * @name INavBarSearchScope
 * @module officeuifabric.components.navbar
 *
 * @description
 * This is the scope used by the `<uif-nav-bar-search>` directive.
 *
 * @property {string} searchText         - Text being searched
 * @property {function} onSearch         - Search UI element click callback
 * @property {string} placeholder        - Placeholder for the html search input
 * @property {function} onSearchCallback - User defined callback, firing by search event
 * @property {function} skipOnClick      - Helper search div click callback
 */
interface INavBarSearchScope extends angular.IScope {
  searchText: string;
  onSearch: ($event: KeyboardEvent | MouseEvent) => void;
  placeholder: string;
  onSearchCallback: (map: { search: string }) => void;
  skipOnClick: ($event: MouseEvent) => void;
}

/**
 * @ngdoc controller
 * @name NavBarSearchController
 * @module officeuifabric.components.navbar
 *
 * @description
 * Controller used for the `<uif-nav-bar-search>` directive.
 */
export class NavBarSearchController {
  public static $inject: string[] = ['$scope', '$element', '$document', '$animate', '$timeout'];

  constructor(
    private $scope: INavBarSearchScope,
    private $element: angular.IAugmentedJQuery,
    private $document: angular.IDocumentService,
    private $animate: angular.animate.IAnimateService,
    private $timeout: angular.ITimeoutService) {
  }

  public closeSearch(): void {
    this.$timeout(() => {
      if (!this.$scope.searchText) {
        this.$animate.removeClass(this.$element, 'is-open');
      }

      this.$animate.removeClass(this.$element, 'is-selected');
    });
  }
}

/**
 * @ngdoc directive
 * @name uifNavBarSearch
 * @module officeuifabric.components.navbar
 *
 * @restrict E
 *
 * @description
 * `<uif-nav-bar-search>` is a nav bar search directive.
 *
 * @see {link http://dev.office.com/fabric/components/navbar}
 *
 * @usage
 *
 * <uif-nav-bar-search placeholder="search for smth" uif-on-search="onSearch(search)">
 * </uif-nav-bar-search>
 */
export class NavBarSearch implements angular.IDirective {
  public static directiveName: string = 'uifNavBarSearch';

  public replace: boolean = true;
  public restrict: string = 'E';
  public controller: any = NavBarSearchController;
  public require: string[] = [`^${NavBarDirective.directiveName}`, `${NavBarSearch.directiveName}`];
  public transclude: boolean = true;
  public scope: {} = {
    onSearchCallback: '&?uifOnSearch',
    placeholder: '@?placeholder'
  };

  public template: string = `
    <li class="ms-NavBar-item ms-NavBar-item--search ms-u-hiddenSm" ng-click="onSearch($event)">
      <div class="ms-TextField" ng-click="skipOnClick($event)">
        <input placeholder={{placeholder}} class="ms-TextField-field" type="text" ng-keypress="onSearch($event)" ng-model="searchText">
      </div>
    </li>`;

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = (
      $document: angular.IDocumentService,
      $animate: angular.animate.IAnimateService,
      $timeout: angular.ITimeoutService) =>
      new NavBarSearch($document, $animate, $timeout);
    directive.$inject = ['$document', '$animate', '$timeout'];
    return directive;
  }

  constructor(
    private $document: angular.IDocumentService,
    private $animate: angular.animate.IAnimateService,
    private $timeout: angular.ITimeoutService) { }

  public link: angular.IDirectiveLinkFn = (
    $scope: INavBarSearchScope,
    $element: angular.IAugmentedJQuery,
    $attrs: angular.IAttributes,
    ctrls: [NavBarController, NavBarSearchController],
    $transclude: angular.ITranscludeFunction): void => {

    this.$document.on('click', () => {
      ctrls[1].closeSearch();
    });

    $scope.skipOnClick = ($event: MouseEvent) => {
      this.applyCssClasses($element);
      $event.stopPropagation();
    };

    $scope.onSearch = ($event: KeyboardEvent | MouseEvent) => {
      ctrls[0].closeAllContextMenus();

      if ($event instanceof KeyboardEvent && $event.which === 13 && $scope.onSearchCallback) {
        $scope.onSearchCallback({ search: $scope.searchText });
      } else if ($event instanceof MouseEvent && $element.hasClass('is-open') && $scope.onSearchCallback) {
        $scope.onSearchCallback({ search: $scope.searchText });
      }

      this.applyCssClasses($element);

      $event.stopPropagation();
    };
  }

  private applyCssClasses($element: angular.IAugmentedJQuery): void {
    if (!$element.hasClass('is-open')) {
      this.$animate.addClass($element, 'is-open');

      this.$timeout(
        () => {
          angular.element($element[0].querySelector('.ms-TextField-field'))[0].focus();
        },
        1);
    }
    $element.parent().find('li').removeClass('is-selected');
    this.$animate.addClass($element, 'is-selected');
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.navbar
 *
 * @description
 * NavBar Module
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.navbar', [
  'officeuifabric.components'])
  .directive(NavBarDirective.directiveName, NavBarDirective.factory())
  .directive(NavBarItemDirective.directiveName, NavBarItemDirective.factory())
  .directive(NavBarSearch.directiveName, NavBarSearch.factory());
