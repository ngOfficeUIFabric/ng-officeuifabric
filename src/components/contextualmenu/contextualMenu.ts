import * as angular from 'angular';

/**
 * @ngdoc enum
 * @name MenuItemTypes
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * Determines which menu template to use, default is `link`
 */
enum MenuItemTypes {
  link = 0,
  divider = 1,
  header = 2,
  subMenu = 3
}

/**
 * @ngdoc interface
 * @name IContextualMenuItemAttributes
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * Attributs for the `<uif-contextual-menu-item>` directive.
 *
 * @property {string} uifType    - The type of the menu item, based on `MenuItemTypes` enum
 */
interface IContextualMenuItemAttributes extends angular.IAttributes {
  uifType: string;
}

/**
 * @ngdoc directive
 * @name uifContextualMenuItem
 * @module officeuifabric.components.contextualmenu
 *
 * @restrict E
 *
 * @description
 * `<uif-contextual-menu-item>` is a contextual menu item directive.
 *
 * @see {link http://dev.office.com/fabric/components/contextualmenu}
 *
 * @usage
 *
 * <uif-contextual-menu-item uif-text="'Item1'" uif-on-click="menuOnClick()"></uif-contextual-menu-item>
 */
export class ContextualMenuItemDirective implements angular.IDirective {
  public static directiveName: string = 'uifContextualMenuItem';

  public restrict: string = 'E';
  public require: string = '^uifContextualMenu';
  public transclude: boolean = true;
  public controller: any = ContextualMenuItemController;

  public replace: boolean = true;

  public scope: {} = {
    isSelected: '=?uifIsSelected',
    onClick: '&ngClick',
    text: '=?uifText',
    type: '@uifType'
  };

  private templateTypes: { [menuType: number]: string } = {};

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = ($log: angular.ILogService) => new ContextualMenuItemDirective($log);
    directive.$inject = ['$log'];
    return directive;
  }

  constructor(private $log: angular.ILogService) {
    this.templateTypes[MenuItemTypes.subMenu] =
      `<li class="ms-ContextualMenu-item">
          <a class="ms-ContextualMenu-link ms-ContextualMenu-link--hasMenu"
          ng-class="{\'is-selected\': isSelected, \'is-disabled\': isDisabled}" ng-click="selectItem($event)" href>
            <span class='uif-item-content'></span></a>
          <i class="ms-ContextualMenu-subMenuIcon ms-Icon ms-Icon--chevronRight"></i>
          <div class="uif-context-submenu"></div>
       </li>`;

    this.templateTypes[MenuItemTypes.link] =
      `<li class="ms-ContextualMenu-item">
            <a class="ms-ContextualMenu-link" ng-class="{\'is-selected\': isSelected, \'is-disabled\': isDisabled}"
            ng-click="selectItem($event)" href><span class='uif-item-content'></span></a>
        </li>`;
    this.templateTypes[MenuItemTypes.header] = `
    <li class="ms-ContextualMenu-item ms-ContextualMenu-item--header">
      <span class='uif-item-content'></span>
    </li>`;
    this.templateTypes[MenuItemTypes.divider] = `<li class="ms-ContextualMenu-item ms-ContextualMenu-item--divider"></li>`;
  }

  public template: any = ($element: angular.IAugmentedJQuery, $attrs: IContextualMenuItemAttributes) => {
    let type: string = $attrs.uifType;

    if (angular.isUndefined(type)) {
      return this.templateTypes[MenuItemTypes.link];
    }

    if (MenuItemTypes[type] === undefined) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - unsupported menu type:\n' +
        'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for context menu.' +
        'Supported types can be found under MenuItemTypes enum here:\n' +
        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/contextualmenu/contextualMenu.ts');
    }

    return this.templateTypes[MenuItemTypes[type]];
  }

  public link: angular.IDirectiveLinkFn = (
    $scope: IContextualMenuItemScope,
    $element: angular.IAugmentedJQuery,
    $attrs: angular.IAttributes,
    contextualMenuController: ContextualMenuController,
    $transclude: angular.ITranscludeFunction): void => {

    if (typeof $scope.isSelected !== 'boolean' && $scope.isSelected !== undefined) {
      contextualMenuController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
        'invalid attribute type: \'uif-is-selected\'.\n' +
        'The type \'' + typeof $scope.isSelected + '\' is not supported as valid type for \'uif-is-selected\' attribute for ' +
        '<uif-contextual-menu-item />. The valid type is boolean.');
    }

    $attrs.$observe('disabled', (disabled) => {
      $scope.isDisabled = !!disabled;
    });

    this.transcludeChilds($scope, $element, $transclude);

    $scope.selectItem = ($event: MouseEvent) => {
      if (!contextualMenuController.isMultiSelectionMenu()) {
        contextualMenuController.deselectItems();
      }

      if (angular.isUndefined($scope.isSelected) && !$scope.isDisabled) {
        $scope.isSelected = true;
      } else {
        $scope.isSelected = !$scope.isSelected;
      }

      /*close all menus if link is clicked, do not close if submenu clicked */
      if (!$scope.hasChildMenu) {
        contextualMenuController.closeSubMenus(null, true);
        if (!contextualMenuController.isRootMenu()) {
          contextualMenuController.deselectItems(true);
        }
      } else {
        contextualMenuController.closeSubMenus($scope.$id);
      }

      if ($scope.hasChildMenu) {
        $scope.childMenuCtrl.openMenu();
      }

      if (!angular.isUndefined($scope.onClick)) {
        $scope.onClick();
      }

      $event.stopPropagation();
    };

    $scope.$on('uif-menu-deselect', () => {
      $scope.isSelected = false;
    });

    $scope.$on('uif-menu-close', (event: angular.IAngularEvent, menuItemId: number) => {
      if ($scope.hasChildMenu && $scope.$id !== menuItemId) {
        $scope.childMenuCtrl.closeMenu();
      }
    });
  }

  private transcludeChilds(
    $scope: IContextualMenuItemScope,
    $element: angular.IAugmentedJQuery,
    $transclude: angular.ITranscludeFunction): void {
    $transclude((clone: angular.IAugmentedJQuery) => {
      let hasContent: boolean = this.hasItemContent(clone);

      if (!hasContent && !$scope.text && !$scope.hasChildMenu && $scope.type !== 'divider') {
        this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - ' +
          'you need to provide a text for a contextual menu item.\n' +
          'For <uif-contextual-menu-item> you need to specify either \'uif-text\' as attribute or <uif-content> as a child directive');
      }

      this.insertItemContent(clone, $scope, $element);
      this.insertSubMenu(clone, $scope, $element);
    });
  }

  private insertItemContent(clone: angular.IAugmentedJQuery, $scope: IContextualMenuItemScope, $element: angular.IAugmentedJQuery): void {
    let elementToReplace: JQuery = angular.element($element[0].querySelector('.uif-item-content'));

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

  private insertSubMenu(clone: angular.IAugmentedJQuery, $scope: IContextualMenuItemScope, $element: angular.IAugmentedJQuery): void {
    for (let i: number = 0; i < clone.length; i++) {
      let element: angular.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass('ms-ContextualMenu')) {
        angular.element($element[0].querySelector('.uif-context-submenu')).replaceWith(element);
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
 * @name IContextualMenuItemScope
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * This is the scope used by the `<uif-contextual-menu-item>` directive.
 *
 * @property {boolean} isSelected    - Indicates if particular item is selected
 * @property {boolean} isDisabled    - Indicates if particular item is disabled
 * @property {boolean} hasChildMenu  - Indicates if current menu item has child sub-menu
 * @property {function} selectItem   - Function which is called by clicking on menu item
 * @property {function} onClick      - On click callback for parent scope
 * @property {object} childMenuCtrl  - Reference to child controller (will be initialized only if `hasChildMenu` is true)
 * @property {string} text           - Represents text used by menu item
 * @property {string} type           - Menu type
 */
export interface IContextualMenuItemScope extends angular.IScope {
  isSelected?: boolean;
  isDisabled?: boolean;
  hasChildMenu: boolean;
  text: string;
  type: string;

  selectItem: ($event: MouseEvent) => void;
  onClick: () => void;

  childMenuCtrl: ContextualMenuController;
}

/**
 * @ngdoc controller
 * @name ContextualMenuItemController
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * Controller used for the `<uif-contextual-menu-item>` directive.
 */
export class ContextualMenuItemController {

  public static $inject: string[] = ['$scope', '$element'];

  constructor(private $scope: IContextualMenuItemScope, private $element: angular.IAugmentedJQuery) {
  }

  public setChildMenu(childMenuCtrl: ContextualMenuController): void {
    this.$scope.hasChildMenu = true;
    this.$scope.childMenuCtrl = childMenuCtrl;
  }
}

/**
 * @ngdoc directive
 * @name uifContextualMenu
 * @module officeuifabric.components.contextualmenu
 *
 * @restrict E
 *
 * @description
 * `<uif-contextual-menu>` is a contextual menu directive.
 *
 * @see {link http://dev.office.com/fabric/components/contextualmenu}
 *
 * @usage
 *
 * <uif-contextual-menu uif-is-open="isOpen">
 *  <uif-contextual-menu-item uif-text="'Item1'" uif-on-click="menuOnClick()"></uif-contextual-menu-item>
 *  <uif-contextual-menu-item uif-text="'Item2'"></uif-contextual-menu-item>
 * </uif-contextual-menu>
 */
export class ContextualMenuDirective implements angular.IDirective {
  public static directiveName: string = 'uifContextualMenu';

  public restrict: string = 'E';
  public require: string = ContextualMenuDirective.directiveName;
  public transclude: boolean = true;
  public template: string = `<ul class="ms-ContextualMenu" ng-transclude></ul>`;
  public replace: boolean = true;
  public controller: any = ContextualMenuController;
  public scope: {} = {
    closeOnClick: '@uifCloseOnClick',
    isOpen: '=?uifIsOpen',
    multiselect: '@uifMultiselect'
  };

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new ContextualMenuDirective();
    return directive;
  }

  public link(
    $scope: IContextualMenuScope,
    $element: angular.IAugmentedJQuery,
    $attrs: angular.IAttributes,
    contextualMenuController: ContextualMenuController): void {

    let setCloseOnClick: (value?: string | boolean) => void = (value: string | boolean) => {
      if (angular.isUndefined(value)) {
        $scope.closeOnClick = true;
      } else {
        $scope.closeOnClick = value.toString().toLowerCase() === 'true';
      }
    };

    setCloseOnClick($scope.closeOnClick);

    $attrs.$observe('uifCloseOnClick', setCloseOnClick);

    let parentMenuItemCtrl: ContextualMenuItemController = $element.controller(ContextualMenuItemDirective.directiveName);

    if (!angular.isUndefined(parentMenuItemCtrl)) {
      parentMenuItemCtrl.setChildMenu(contextualMenuController);
    }

    if (!angular.isUndefined($scope.multiselect) && $scope.multiselect.toLowerCase() === 'true') {
      $element.addClass('ms-ContextualMenu--multiselect');
    }
  }
}

/**
 * @ngdoc interface
 * @name IContextualMenuItemScope
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * This is the scope used by the `<uif-contextual-menu-item>` directive.
 *
 * @property {boolean} isOpen        - Indicates if menu is open
 * @property {boolean} isRootMenu    - Indicates if this is root menu and not child
 * @property {string} multiselect    - Indicates if current menu is multiselection menu
 * @property {boolean} closeOnClick  - Indicates if root menu should be closed after clicking on menu item
 */
export interface IContextualMenuScope extends angular.IScope {
  isOpen: boolean;
  isRootMenu: boolean;
  multiselect: string;
  closeOnClick: boolean;
}

/**
 * @ngdoc controller
 * @name ContextualMenuController
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * Controller used for the `<uif-contextual-menu>` directive.
 */
export class ContextualMenuController {

  public static $inject: string[] = ['$scope', '$animate', '$element', '$log'];
  public onRootMenuClosed: (() => void)[] = [];

  private isOpenClassName: string = 'is-open';

  constructor(
    private $scope: IContextualMenuScope,
    private $animate: angular.animate.IAnimateService,
    private $element: angular.IAugmentedJQuery,
    public $log: angular.ILogService) {

    if (angular.isUndefined($element.controller(ContextualMenuItemDirective.directiveName))) {
      $scope.isRootMenu = true;
    }

    $scope.$watch('isOpen', (newValue: boolean) => {
      if (typeof newValue !== 'boolean' && newValue !== undefined) {
        this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.contextualmenu - invalid attribute type: \'uif-is-open\'.\n' +
          'The type \'' + typeof newValue + '\' is not supported as valid type for \'uif-is-open\' attribute for ' +
          '<uif-contextual-menu />. The valid type is boolean.');
      }

      $animate[newValue ? 'addClass' : 'removeClass']($element, this.isOpenClassName);
    });

    this.onRootMenuClosed.push(() => {
      this.closeMenu();
      this.deselectItems(true);
    });

    $scope.$on('uif-menu-close', () => {
      if ($scope.isRootMenu && $scope.closeOnClick) {
        this.onRootMenuClosed.forEach((callback: () => void) => {
          callback();
        });
      }
    });
  }

  public deselectItems(deselectParentMenus?: boolean): void {
    this.$scope.$broadcast('uif-menu-deselect');

    if (deselectParentMenus) {
      this.$scope.$emit('uif-menu-deselect');
    }
  }

  public closeSubMenus(menuItemToSkip?: number, closeRootMenu?: boolean): void {
    this.$scope.$broadcast('uif-menu-close', menuItemToSkip);

    if (closeRootMenu) {
      this.$scope.$emit('uif-menu-close');
    }
  }

  public openMenu(): void {
    this.$scope.isOpen = true;
  }

  public closeMenu(): void {
    this.$scope.isOpen = false;
  }

  public isRootMenu(): boolean {
    return this.$scope.isRootMenu;
  }

  public isMultiSelectionMenu(): boolean {
    if (angular.isUndefined(this.$scope.multiselect)) {
      return false;
    }

    return this.$scope.multiselect.toLowerCase() === 'true';
  }

  public isMenuOpened(): boolean {
    return this.$element.hasClass('is-open');
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.contextualmenu
 *
 * @description
 * Contextual Menu Module
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.contextualmenu', [
  'officeuifabric.components'])
  .directive(ContextualMenuDirective.directiveName, ContextualMenuDirective.factory())
  .directive(ContextualMenuItemDirective.directiveName, ContextualMenuItemDirective.factory());
