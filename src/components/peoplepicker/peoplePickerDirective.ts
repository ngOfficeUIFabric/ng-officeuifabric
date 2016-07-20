import * as ng from 'angular';

import {PersonaStyleEnum} from '../../core/personaStyleEnum';
import {PersonaSize} from '../persona/sizeEnum';
import {IPerson} from '../../core/person';
import {IconEnum} from '../icon/iconEnum';


let peopleSearchEventName: string = 'uif-people-search';

/**
 * @ngdoc interface
 * @name IPersonPicker
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Helper interface used by the people picker directive.
 *
 * @property {interface} group                        - Reference to person's group
 * @property {Array of IPersonPicker} additionalData  - Additional persons to populate under current person
 */
export interface IPersonPicker extends IPerson {
  group: IGroup;
  additionalData: IPersonPicker[];
}

/**
 * @ngdoc interface
 * @name IGroup
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Helper interface used by the people picker directive.
 *
 * @property {string} name     - Reference to person's group
 * @property {number} order    - Group order, used when displaying search result with groups
 */
export interface IGroup {
  name: string;
  order: number;
}

/**
 * @ngdoc class
 * @name GroupedPeopleData
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Helper class used by the people picker directive.
 *
 * @property {interface} group                  - Group reference
 * @property {Array of IPersonPicker} people    - Persons who belongs to this particular group
 */
export class GroupedPeopleData {
  public group: IGroup;
  public people: IPersonPicker[] = [];
}

/**
 * @ngdoc controller
 * @name PeoplePickerController
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Controller used for the `<uif-people-picker>` directive.
 */
export class PeoplePickerController {
  public static $inject: string[] = ['$scope', '$filter', '$element'];

  constructor(
    private $scope: IPeoplePickerScope,
    private $filter: ng.IFilterService,
    private $element: ng.IAugmentedJQuery) {
  }

  public getSelectedPersons(): IPersonPicker[] {
    return this.$scope.selectedPersons;
  }

  public pickerType(): string {
    let type: string = this.$scope.type;

    if (ng.isUndefined(type)) {
      return PeoplePickerTypes[PeoplePickerTypes.grouped];
    }

    return this.$scope.type;
  }

  public searchQuery(): string {
    return this.$scope.searchQuery;
  }

  public search(): void {
    this.bindPeople(this.$scope.searchQuery);
    this.$scope.$broadcast(peopleSearchEventName, this.searchQuery());
  }

  public bindPeople(query?: string): void {
    let peopleData: IPersonPicker[] | ng.IPromise<IPersonPicker[]> = this.$scope.peopleCallback()(query);
    peopleData = peopleData || [];

    if (peopleData instanceof Array) {                                    // array
      this.$scope.groups = this.createPeopleDataStructure(peopleData);

    } else if (typeof peopleData.then === 'function') {                  // promise, async scenario
      let searchMoreCtrl: PeopleSearchMoreController = angular.element(this.$element[0].querySelector('.ms-PeoplePicker-searchMore'))
        .controller(`${PeopleSearchMoreDirective.directiveName}`);
      if (searchMoreCtrl) {
        searchMoreCtrl.isSearching(true);
      }

      let that: PeoplePickerController = this;
      peopleData
        .then(data => {
          that.$scope.groups = this.createPeopleDataStructure(data);
        })
        .finally(() => {
          if (searchMoreCtrl) {
            searchMoreCtrl.isSearching(false);
          }
        });
    }
  }

  private createPeopleDataStructure(people: IPersonPicker[]): GroupedPeopleData[] {
    let peopleData: GroupedPeopleData[] = [];

    angular.forEach(people, (person: IPersonPicker) => {

      let existingGroups: GroupedPeopleData[] = this.$filter('filter')(peopleData, { group: person.group });
      let hasGroup: boolean = existingGroups.length === 1;

      if (!hasGroup) {
        let newPeopleData: GroupedPeopleData = new GroupedPeopleData();
        newPeopleData.group = person.group;
        newPeopleData.people.push(person);

        peopleData.push(newPeopleData);
      } else {
        let existingData: GroupedPeopleData = existingGroups[0];
        existingData.people.push(person);
      }
    });
    return peopleData;
  }
}

/**
 * @ngdoc enum
 * @name PeoplePickerTypes
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Determines people picker type
 */
enum PeoplePickerTypes {
  grouped = 0,
  compact = 1,
  memberList = 2,
  facePile = 3
}

/**
 * @ngdoc interface
 * @name IPeoplePickerAttributes
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Interface describing attributes for people picker directive
 *
 * @property {string} uifType     - People picker type
 * @property {string} ngDisabled  - Disabled state varible name
 */
interface IPeoplePickerAttributes extends ng.IAttributes {
  uifType: string;
  ngDisabled: string;
}

/**
 * @ngdoc interface
 * @name IPeoplePickerScope
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Interface describing scope for people picker directive
 *
 * @property {object} ngModel                            - Reference to NgModelController
 * @property {function} peopleCallback                   - Function called every time when search event occur
 * @property {string} searchQuery                        - Search query typed into the search input
 * @property {string} placeholder                        - Placeholder for the search input
 * @property {string} type                               - People picker type, based on PeoplePickerTypes enum
 * @property {number} delay                              - Used by type-ahead scenario, dealy after which search query will be run
 * @property {object} groups                             - Groups used by the people picker
 * @property {function} onPeoplePickerActive             - Reference to NgModelController
 * @property {function} addPersonToSelectedPeople        - Function called when user click on person in search results
 * @property {function} removePersonFromSelectedPeople   - Function called when user click on close icon under selected persons
 * @property {array} selectedPersons                     - People picker's selected persons
 * @property {function} removePersonFromSearchResults    - Function called when user click on close icon under search results
 * @property {function} onSearchKeyUp                    - Callback for the keyup event
 * @property {string} facePileHeader                     - FacePile header, used only in face pile mode
 * @property {boolean} ngDisabled                        - Support for ng-disabled directive
 */
export interface IPeoplePickerScope extends ng.IScope {
  ngModel: ng.INgModelController;
  peopleCallback: () => (query: string) => IPersonPicker[] | ng.IPromise<IPersonPicker[]>;
  searchQuery: string;
  placeholder: string;
  type: string;
  delay: number;
  groups: GroupedPeopleData[];
  onPeoplePickerActive: ($event: KeyboardEvent | MouseEvent) => void;
  addPersonToSelectedPeople: (person: IPersonPicker) => void;
  removePersonFromSelectedPeople: (person: IPersonPicker, $event: MouseEvent) => void;
  selectedPersons: IPersonPicker[];
  removePersonFromSearchResults: (people: IPersonPicker[], person: IPersonPicker, $event: MouseEvent) => void;
  onSearchKeyUp: ($event: KeyboardEvent) => void;
  facePileHeader: string;
  ngDisabled: boolean;
}

/**
 * @ngdoc directive
 * @name uifPeoplePicker
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-people-picker>` directive.
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-people-picker
 * uif-people="onSearch(query)"
 * ng-model="selectedPeople"
 * placeholder="Search for people"
 * uif-selected-person-click="personClicked">
 *   <uif-people-search-more>
 *     <uif-secondary-text>Showing {{sourcePeople.length}} results</uif-secondary-text>
 *     <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
 *   </uif-people-search-more>
 * </uif-people-picker>
 */
export class PeoplePickerDirective implements ng.IDirective {

  public static directiveName: string = 'uifPeoplePicker';

  public replace: boolean = true;
  public require: string[] = ['ngModel', `${PeoplePickerDirective.directiveName}`];
  public restrict: string = 'E';
  public transclude: boolean = true;
  public controller: any = PeoplePickerController;

  public scope: {} = {
    delay: '@uifSearchDelay',
    facePileHeader: '@?uifFacepileHeader',
    ngDisabled: '=?',
    ngModel: '=',
    onSelectedPersonClick: '&?uifSelectedPersonClick',
    peopleCallback: '&uifPeople',
    placeholder: '@?',
    type: '@?uifType'
  };

  private templateTypes: { [peoplePickerType: number]: string } = {};

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = (
      $document: ng.IDocumentService, $timeout: ng.ITimeoutService, $log: ng.ILogService, $window: ng.IWindowService) =>
      new PeoplePickerDirective($document, $timeout, $log, $window);
    directive.$inject = ['$document', '$timeout', '$log', '$window'];
    return directive;
  }

  constructor(
    private $document: ng.IDocumentService,
    private $timeout: ng.ITimeoutService,
    private $log: ng.ILogService,
    private $window: ng.IWindowService) {
    this.templateTypes[PeoplePickerTypes.grouped] =
      `<div class="ms-PeoplePicker">
        <div class="ms-PeoplePicker-searchBox">
            <div class="ms-PeoplePicker-persona" ng-repeat="person in selectedPersons track by $index">
              <uif-persona ng-click="onSelectedPersonClick()(person)"
                uif-style="${PersonaStyleEnum[PersonaStyleEnum.square]}"
                uif-size="${PersonaSize[PersonaSize.xsmall]}"
                uif-presence="{{person.presence}}"
                uif-image-url="{{person.icon}}">
                <uif-persona-initials uif-color="{{person.color}}">{{person.initials}}</uif-persona-initials>
                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>
              </uif-persona>
              <button type="button" ng-click="removePersonFromSelectedPeople(person, $event)" class="ms-PeoplePicker-personaRemove">
                <uif-icon uif-type="${IconEnum[IconEnum.x]}"></uif-icon>
              </button>
            </div>
            <input ng-click="onPeoplePickerActive($event)"
            placeholder="{{placeholder}}"
            ng-model="searchQuery"
            class="ms-PeoplePicker-searchField"
            ng-focus="onPeoplePickerActive($event)"
            ng-keyup="onSearchKeyUp($event)"
            type="text">
        </div>
        <div class="ms-PeoplePicker-results">
          <div class="ms-PeoplePicker-resultGroups">
            <div class="ms-PeoplePicker-resultGroup" ng-repeat="groupData in groups | orderBy:'-order'">
              <div class="ms-PeoplePicker-resultGroupTitle">{{groupData.group.name}}</div>
              <uif-people-picker-result-list
              ng-model="groupData.people"
              uif-person-click="addPersonToSelectedPeople"
              uif-person-close-click="removePersonFromSearchResults"
              uif-style="${PersonaStyleEnum[PersonaStyleEnum.square]}"
              uif-size="${PersonaSize[PersonaSize.medium]}"></uif-people-picker-result-list>
            </div>
          </div>
          <ng-transclude />
        </div>
      </div>`;

    this.templateTypes[PeoplePickerTypes.compact] =
      `<div class="ms-PeoplePicker ms-PeoplePicker--compact">
        <div class="ms-PeoplePicker-searchBox">
            <div class="ms-PeoplePicker-persona" ng-repeat="person in selectedPersons track by $index">
              <uif-persona ng-click="onSelectedPersonClick()(person)"
                uif-style="${PersonaStyleEnum[PersonaStyleEnum.square]}"
                uif-size="${PersonaSize[PersonaSize.xsmall]}"
                uif-presence="{{person.presence}}"
                uif-image-url="{{person.icon}}">
                <uif-persona-initials uif-color="{{person.color}}">{{person.initials}}</uif-persona-initials>
                <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>
              </uif-persona>
              <button type="button" ng-click="removePersonFromSelectedPeople(person, $event)" class="ms-PeoplePicker-personaRemove">
                <uif-icon uif-type="${IconEnum[IconEnum.x]}"></uif-icon>
              </button>
            </div>
            <input ng-click="onPeoplePickerActive($event)"
            ng-model="searchQuery"
            placeholder="{{placeholder}}"
            class="ms-PeoplePicker-searchField"
            ng-focus="onPeoplePickerActive($event)"
            ng-keyup="onSearchKeyUp($event)"
            type="text">
        </div>
        <div class="ms-PeoplePicker-results">
          <div class="ms-PeoplePicker-resultGroups">
            <div class="ms-PeoplePicker-resultGroup" ng-repeat="groupData in groups | orderBy:'-order'">
              <div class="ms-PeoplePicker-resultGroupTitle">{{groupData.group.name}}</div>
              <uif-people-picker-result-list
              ng-model="groupData.people"
              uif-picker-type="${PeoplePickerTypes[PeoplePickerTypes.compact]}"
              uif-person-click="addPersonToSelectedPeople"
              uif-person-close-click="removePersonFromSearchResults"
              uif-style="${PersonaStyleEnum[PersonaStyleEnum.square]}"
              uif-size="${PersonaSize[PersonaSize.xsmall]}"></uif-people-picker-result-list>
            </div>
          </div>
          <ng-transclude />
        </div>
      </div>`;
    this.templateTypes[PeoplePickerTypes.memberList] = `
      <div class="ms-PeoplePicker ms-PeoplePicker--membersList">
        <div class="ms-PeoplePicker-searchBox">
            <input ng-click="onPeoplePickerActive($event)"
            placeholder="{{placeholder}}"
            ng-model="searchQuery"
            class="ms-PeoplePicker-searchField"
            ng-focus="onPeoplePickerActive($event)"
            ng-keyup="onSearchKeyUp($event)"
            type="text">
        </div>
        <div class="ms-PeoplePicker-results">
          <div class="ms-PeoplePicker-resultGroups">
            <div class="ms-PeoplePicker-resultGroup" ng-repeat="groupData in groups | orderBy:'-order'">
              <uif-people-picker-result-list
              ng-model="groupData.people"
              uif-person-click="addPersonToSelectedPeople"
              uif-style="${PersonaStyleEnum[PersonaStyleEnum.round]}"
              uif-size="${PersonaSize[PersonaSize.medium]}"></uif-people-picker-result-list>
            </div>
          </div>
        </div>
        <uif-people-picker-selected ng-model="selectedPersons"
        uif-selected-person-click="onSelectedPersonClick()"
        uif-person-close="removePersonFromSelectedPeople">
          <ng-transclude></ng-transclude>
        </uif-people-picker-selected>
      </div>`;
    this.templateTypes[PeoplePickerTypes.facePile] = `
      <div class="ms-PeoplePicker ms-PeoplePicker--Facepile">
        <div class="ms-PeoplePicker-searchBox">
            <input ng-click="onPeoplePickerActive($event)"
            placeholder="{{placeholder}}"
            ng-model="searchQuery"
            class="ms-PeoplePicker-searchField"
            ng-focus="onPeoplePickerActive($event)"
            ng-keyup="onSearchKeyUp($event)"
            type="text">
        </div>
        <div class="ms-PeoplePicker-results">
          <div class="ms-PeoplePicker-peopleListHeader">
              <span>{{facePileHeader}}</span>
          </div>
          <div ng-repeat="groupData in groups | orderBy:'-order'">
            <uif-people-picker-result-list
            ng-model="groupData.people"
            uif-person-click="addPersonToSelectedPeople"
            uif-style="${PersonaStyleEnum[PersonaStyleEnum.round]}"
            uif-size="${PersonaSize[PersonaSize.small]}"></uif-people-picker-result-list>
          </div>
          <div class="uif-search-more"></div>
        </div>
        <uif-people-picker-selected ng-model="selectedPersons"
        uif-selected-person-click="onSelectedPersonClick()"
        uif-person-close="removePersonFromSelectedPeople">
          <div class="uif-people-header"></div>
        </uif-people-picker-selected>

      </div>`;
  }

  public template: ng.IComponentTemplateFn = ($element: ng.IAugmentedJQuery, $attrs: IPeoplePickerAttributes) => {
    let type: string = $attrs.uifType;

    if (ng.isUndefined(type)) {
      return this.templateTypes[PeoplePickerTypes.grouped];
    }

    if (PeoplePickerTypes[type] === undefined) {
      this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.peoplepicker - unsupported people picker type:\n' +
        'the type \'' + type + '\' is not supported by ng-Office UI Fabric as valid type for people picker.' +
        'Supported types can be found under PeoplePickerTypes enum here:\n' +
        'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/peoplepicker/peoplePickerDirective.ts');
      throw '[ngOfficeUiFabric] - Error';
    }

    return this.templateTypes[PeoplePickerTypes[type]];
  };

  public link: ng.IDirectiveLinkFn = (
    $scope: IPeoplePickerScope,
    $element: ng.IAugmentedJQuery,
    $attrs: IPeoplePickerAttributes,
    ctrls: [ng.INgModelController, PeoplePickerController],
    $transclude: ng.ITranscludeFunction): void => {

    let ngModelCtrl: ng.INgModelController = ctrls[0];
    let peoplePickerCtrl: PeoplePickerController = ctrls[1];

    this.initDisabledState($element, $scope, $attrs);

    $scope.facePileHeader = $scope.facePileHeader || 'Suggested contacts';

    $scope.$watchCollection('selectedPersons', (data: any, data2: any, data3: any) => {
      this.resizeSearchField($element);
    });

    ngModelCtrl.$render = () => {
      if (ngModelCtrl.$viewValue) {
        $scope.selectedPersons = ngModelCtrl.$viewValue;
      } else {
        $scope.selectedPersons = [];
      }
      this.resizeSearchField($element);
    };

    peoplePickerCtrl.search();

    let searchTimeout: ng.IPromise<void> = null;
    $scope.onSearchKeyUp = ($event: KeyboardEvent) => {
      let $searchMore: JQuery = angular.element($element[0].querySelector('.ms-PeoplePicker-searchMore'));
      if ($searchMore.length !== 0) {
        $scope.searchQuery ? $element.addClass('is-searching') : $element.removeClass('is-searching');
        $scope.searchQuery ? $searchMore.addClass('is-active') : $searchMore.removeClass('is-active');

        this.animateSelectedPeople($element);
      }

      if (!$scope.delay) {
        return;
      }

      if (searchTimeout != null) {
        this.$timeout.cancel(searchTimeout);
      }

      searchTimeout = this.$timeout(
        () => {
          peoplePickerCtrl.search();
        },
        $scope.delay);
    };

    $scope.onPeoplePickerActive = ($event: KeyboardEvent | MouseEvent) => {

      this.smoothScrollTo($element[0]);

      if ($scope.type !== PeoplePickerTypes[PeoplePickerTypes.facePile]) {
        let $results: JQuery = angular.element($element[0].querySelector('.ms-PeoplePicker-results'));
        $results[0].style.width = $element[0].clientWidth - 2 + 'px';
      } else if ($scope.type === PeoplePickerTypes[PeoplePickerTypes.facePile]) {
        this.animateSelectedPeople($element);
      }

      $event.stopPropagation();

      $element.addClass('is-active');
    };

    $scope.addPersonToSelectedPeople = (person) => {
      if ($scope.selectedPersons.indexOf(person) !== -1) {
        return;
      }

      $scope.selectedPersons.push(person);
      ngModelCtrl.$setViewValue($scope.selectedPersons);
    };

    $scope.removePersonFromSelectedPeople = (person: IPersonPicker, $event: MouseEvent) => {
      let indx: number = $scope.selectedPersons.indexOf(person);
      $scope.selectedPersons.splice(indx, 1);
      ngModelCtrl.$setViewValue($scope.selectedPersons);

      $event.stopPropagation();
    };

    $scope.removePersonFromSearchResults = (people: IPersonPicker[], person: IPersonPicker, $event: MouseEvent) => {
      $event.stopPropagation();
      let indx: number = people.indexOf(person);
      people.splice(indx, 1);
    };

    this.$document.on('click', () => {
      $element.removeClass('is-active');
    });

    if ($scope.type === PeoplePickerTypes[PeoplePickerTypes.facePile]) {
      $transclude((clone: ng.IAugmentedJQuery) => {
        this.insertFacePileHeader(clone, $scope, $element);
        this.insertFacePileSearchMore(clone, $scope, $element);
      });
    }

  };

  private initDisabledState($element: JQuery, $scope: IPeoplePickerScope, $attrs: IPeoplePickerAttributes): void {
    let $searchField: JQuery = angular.element($element[0].querySelector('.ms-PeoplePicker-searchField'));

    $attrs.$observe('disabled', (disabled) => {
      if (disabled) {
        $searchField.attr('disabled', 'disabled');
      } else {
        $searchField.removeAttr('disabled');
      }
    });
  }

  private animateSelectedPeople($element: JQuery): void {
    let $selectedPeople: JQuery = angular.element($element[0].querySelector('.ms-PeoplePicker-selectedPeople'));
    $selectedPeople.addClass('ms-u-slideDownIn20');
    setTimeout(() => { $selectedPeople.removeClass('ms-u-slideDownIn20'); }, 1000);
  }

  private currentYPosition(): number {
    if (this.$window.pageYOffset) {
      return this.$window.pageYOffset;
    }
    let body: HTMLElement = angular.element(this.$document[0]).find('body')[0];
    if (body.scrollTop) {
      return body.scrollTop;
    }
    return 0;
  }

  private elmYPosition(element: HTMLElement): number {
    let y: number = element.offsetTop;
    let node: any = element;
    while (node.offsetParent && node.offsetParent !== document.body) {
      node = <Element>(node.offsetParent);
      y += node.offsetTop;
    }
    return y;
  }

  private smoothScrollTo(element: HTMLElement): void {
    let startY: number = this.currentYPosition();
    let stopY: number = this.elmYPosition(element);
    let distance: number = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      window.scrollTo(0, stopY);
      return;
    }
    let speed: number = Math.round(distance / 30);
    if (speed >= 20) {
      speed = 20;
    }
    let step: number = Math.round(distance / 25);
    let leapY: number = stopY > startY ? startY + step : startY - step;
    let timer: number = 0;
    if (stopY > startY) {
      for (let i: number = startY; i < stopY; i += step) {
        ((lY: number, t: number) => {
          setTimeout(
            () => {
              window.scrollTo(0, lY);
            },
            t * speed);
        })(leapY, timer);

        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
        }
        timer++;
      }
      return;
    }
    for (let i: number = startY; i > stopY; i -= step) {
      ((lY: number, t: number) => {
        setTimeout(
          () => {
            window.scrollTo(0, lY);
          },
          t * speed);
      })(leapY, timer);
      leapY -= step;
      if (leapY < stopY) {
        leapY = stopY;
      }
      timer++;
    }
  }

  private insertFacePileHeader(clone: ng.IAugmentedJQuery, $scope: IPeoplePickerScope, $element: ng.IAugmentedJQuery): void {
    let elementToReplace: JQuery = angular.element($element[0].querySelector('.uif-people-header'));

    for (let i: number = 0; i < clone.length; i++) {
      let element: ng.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass('ms-PeoplePicker-selectedCount')) {
        elementToReplace.replaceWith(element);
        break;
      }
    }
  }

  private insertFacePileSearchMore(clone: ng.IAugmentedJQuery, $scope: IPeoplePickerScope, $element: ng.IAugmentedJQuery): void {
    let elementToReplace: JQuery = angular.element($element[0].querySelector('.uif-search-more'));

    for (let i: number = 0; i < clone.length; i++) {
      let element: ng.IAugmentedJQuery = angular.element(clone[i]);
      if (element.hasClass('ms-PeoplePicker-searchMore')) {
        elementToReplace.replaceWith(element);
        break;
      }
    }
  }

  private resizeSearchField($peoplePicker: JQuery): void {
    let $searchBox: JQuery = angular.element($peoplePicker[0].querySelector('.ms-PeoplePicker-searchBox'));
    let $searchField: JQuery = angular.element($peoplePicker[0].querySelector('.ms-PeoplePicker-searchField'));

    let searchBoxLeftEdge: number = $searchBox.prop('offsetLeft');
    let searchBoxWidth: number = $searchBox[0].clientWidth;
    let searchBoxRightEdge: number = searchBoxLeftEdge + searchBoxWidth;


    let $personaNodes: NodeListOf<Element> = $searchBox[0].querySelectorAll('.ms-PeoplePicker-persona');
    if ($personaNodes.length === 0) {
      $searchField[0].style.width = '100%';
      return;
    }

    let $lastPersona: JQuery = angular.element($personaNodes[$personaNodes.length - 1]);
    let lastPersonaLeftEdge: number = $lastPersona.prop('offsetLeft');
    let lastPersonaWidth: number = $lastPersona[0].clientWidth;
    let lastPersonaRightEdge: number = lastPersonaLeftEdge + lastPersonaWidth;

    let newFieldWidth: number | string = searchBoxRightEdge - lastPersonaRightEdge - 5;

    if (newFieldWidth < 100) {
      newFieldWidth = '100%';
      $searchField[0].style.width = '100%';
    } else {
      $searchField[0].style.width = newFieldWidth + 'px';
    }
  }
}

/**
 * @ngdoc interface
 * @name IPeoplePickerResultListScope
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Interface used by the people picker result list directive.
 *
 * @property {array} people                     - Persons in search results
 * @property {function} expandAdditionalData    - Callback when clicking on "expand" button under search results
 */
export interface IPeoplePickerResultListScope extends ng.IScope {
  people: IPersonPicker[];
  expandAdditionalData: ($event: MouseEvent) => void;
}

/**
 * @ngdoc directive
 * @name uifPeoplePickerResultList
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-people-picker-result-list>` is a helper directive used by people picker.
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-people-picker-result-list
 *   ng-model="groupData.people"
 *   uif-person-click="addPersonToSelectedPeople"
 *   uif-person-close-click="removePersonFromSearchResults"
 *   uif-style="${PersonaStyleEnum[PersonaStyleEnum.square]}"
 *   uif-size="${PersonaSize[PersonaSize.medium]}">
 * </uif-people-picker-result-list>
 */
export class PeoplePickerResultListDirective implements ng.IDirective {

  public static directiveName: string = 'uifPeoplePickerResultList';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = `
  <ul class="ms-PeoplePicker-resultList">
    <li class="ms-PeoplePicker-result" ng-repeat="person in people track by $index">
      <div role="button" class="ms-PeoplePicker-resultBtn"
      ng-class="{'ms-PeoplePicker-resultBtn--compact': pickerType === 'compact'}" ng-click="onPersonClick()(person)">
        <uif-persona
          uif-style="{{personStyle}}"
          uif-size="{{personSize}}"
          uif-presence="{{person.presence}}"
          uif-image-url="{{person.icon}}">
          <uif-persona-initials uif-color="{{person.color}}">{{person.initials}}</uif-persona-initials>
          <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>
          <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>
        </uif-persona>
        <button type="button"
          ng-if="!person.additionalData && onPersonCloseClick()"
          ng-click="onPersonCloseClick()(people, person, $event)"
          class="ms-PeoplePicker-resultAction js-resultRemove">
          <uif-icon uif-type="${IconEnum[IconEnum.x]}"></uif-icon>
        </button>
        <button type="button"
          ng-if="person.additionalData"
          ng-click="expandAdditionalData($event)"
          class="ms-PeoplePicker-resultAction js-resultRemove">
          <uif-icon uif-type="${IconEnum[IconEnum.chevronsDown]}"></uif-icon>
        </button>
      </div>
      <div ng-if="person.additionalData" class="ms-PeoplePicker-resultAdditionalContent">
        <uif-people-picker-result-list
        ng-model="person.additionalData"
        uif-person-click="onPersonClick()"
        uif-person-close-click="onPersonCloseClick()"
        uif-picker-type="{{pickerType}}"
        uif-style="{{personStyle}}"
        uif-size="{{personSize}}"></uif-people-picker-result-list>
      </div>
    </li>
  </ul>`;

  public scope: {} = {
    onPersonClick: '&uifPersonClick',
    onPersonCloseClick: '&uifPersonCloseClick',
    people: '=ngModel',
    personSize: '@uifSize',
    personStyle: '@uifStyle',
    pickerType: '@uifPickerType'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PeoplePickerResultListDirective();

    return directive;
  }

  constructor() {
    //
  }

  public link: ng.IDirectiveLinkFn = (
    $scope: IPeoplePickerResultListScope,
    $element: ng.IAugmentedJQuery,
    $attrs: ng.IAttributes,
    peoplePickerCtrl: PeoplePickerController,
    $transclude: ng.ITranscludeFunction): void => {

    $scope.expandAdditionalData = ($event: MouseEvent) => {
      $event.stopPropagation();

      let $button: JQuery = angular.element($event.target);

      for (let i: number = 0; i < 10; i++) {
        let $parent: JQuery = $button.parent();
        if ($parent.hasClass('ms-PeoplePicker-result')) {
          $parent.toggleClass('is-expanded');
          break;
        }
        $button = $parent;
      }
    };
  };
}

/**
 * @ngdoc interface
 * @name IPeopleSearchMoreScope
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Interface used by the scope for people search more directive.
 *
 * @property {function} onSearch        - Function called when user click by "search more" component
 * @property {boolean} processing       - Boolean indicating that search in progress (in async scenarious)
 * @property {string} pickerType        - Determines people picker type (from parent directive people picker)
 * @property {boolean} disconnected     - Boolean indicating disconnected scenario
 */
export interface IPeopleSearchMoreScope extends ng.IScope {
  onSearch: ($event: MouseEvent) => void;
  processing: boolean;
  pickerType: string;
  disconnected: boolean;
}

/**
 * @ngdoc controller
 * @name PeopleSearchMoreController
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Controller used for the `<uif-people-search-more>` directive.
 */
export class PeopleSearchMoreController {
  public static $inject: string[] = ['$scope', '$element'];

  public searchCallbacks: { (): void; }[] = [];

  constructor(
    private $scope: IPeopleSearchMoreScope,
    private $element: ng.IAugmentedJQuery) {
  }

  public isSearching(searching: boolean): void {
    this.$scope.processing = searching;
    searching ? this.$element.addClass('is-searching') : this.$element.removeClass('is-searching');
  }
}

export class PeopleSearchMoreDirective implements ng.IDirective {

  public static directiveName: string = 'uifPeopleSearchMore';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public require: string = `^^${PeoplePickerDirective.directiveName}`;
  public controller: any = PeopleSearchMoreController;
  public template: string = `
  <div class="ms-PeoplePicker-searchMore js-searchMore"
    ng-class="{'ms-PeoplePicker-searchMore--disconnected': disconnected}">
    <button type="button" ng-if="pickerType === '${PeoplePickerTypes[PeoplePickerTypes.grouped]}' && !disconnected"
      ng-click="onSearch($event)" class="ms-PeoplePicker-searchMoreBtn">
      <div class="ms-PeoplePicker-searchMoreIcon">
        <uif-icon ng-if="!disconnected" uif-type="${IconEnum[IconEnum.search]}"></uif-icon>
        <uif-icon ng-if="disconnected" uif-type="${IconEnum[IconEnum.alert]}"></uif-icon>
      </div>
      <ng-transclude />
    </button>
    <div role="button" ng-if="pickerType === '${PeoplePickerTypes[PeoplePickerTypes.compact]}' && !disconnected"
      ng-click="onSearch($event)" class="ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact">
      <div class="ms-PeoplePicker-searchMoreIcon">
        <uif-icon ng-if="!disconnected" uif-type="${IconEnum[IconEnum.search]}"></uif-icon>
        <uif-icon ng-if="disconnected" uif-type="${IconEnum[IconEnum.alert]}"></uif-icon>
      </div>
      <ng-transclude />
    </div>
    <div role="button" ng-if="pickerType === '${PeoplePickerTypes[PeoplePickerTypes.facePile]}' && !disconnected"
      ng-click="onSearch($event)" class="ms-PeoplePicker-searchMoreBtn ms-PeoplePicker-searchMoreBtn--compact">
      <div class="ms-PeoplePicker-searchMoreIcon">
        <uif-icon ng-if="!disconnected" uif-type="${IconEnum[IconEnum.search]}"></uif-icon>
        <uif-icon ng-if="disconnected" uif-type="${IconEnum[IconEnum.alert]}"></uif-icon>
      </div>
      <ng-transclude />
    </div>
    <div role="button" ng-if="disconnected" class="ms-PeoplePicker-searchMoreBtn">
      <div class="ms-PeoplePicker-searchMoreIcon">
        <uif-icon uif-type="${IconEnum[IconEnum.alert]}"></uif-icon>
      </div>
      <ng-transclude />
    </div>
    <uif-spinner ng-show="processing"></uif-spinner>
  </div>`;

  public scope: {} = {
    disconnected: '=uifDisconnected'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PeopleSearchMoreDirective();

    return directive;
  }

  constructor() {
    //
  }

  public link: ng.IDirectiveLinkFn = (
    $scope: IPeopleSearchMoreScope,
    $element: ng.IAugmentedJQuery,
    $attrs: ng.IAttributes,
    peoplePickerCtrl: PeoplePickerController,
    $transclude: ng.ITranscludeFunction): void => {

    $scope.pickerType = peoplePickerCtrl.pickerType();
    $scope.onSearch = ($event: MouseEvent) => {
      $event.stopPropagation();
      peoplePickerCtrl.search();

      $scope.$broadcast(peopleSearchEventName, peoplePickerCtrl.searchQuery());
    };
  };
}

/**
 * @ngdoc interface
 * @name IPrimaryTextScope
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Interface used by the primary text directive.
 *
 * @property {string} searchingForText    - Template for label "Search for"
 * @property {string} searchQuery         - Search query from parent directive, i.e. people picker
 */
export interface IPrimaryTextScope extends ng.IScope {
  searchingForText: string;
  searchQuery: string;
}

/**
 * @ngdoc controller
 * @name PrimaryTextController
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Controller used for the `<uif-primary-text>` directive.
 */
export class PrimaryTextController {
  public static $inject: string[] = ['$scope'];

  constructor(
    private $scope: IPrimaryTextScope) {
    this.$scope.$on(peopleSearchEventName, ($event: ng.IAngularEvent, query: string) => {
      this.$scope.searchQuery = query;
    });
  }
}

/**
 * @ngdoc directive
 * @name uifPrimaryText
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-primary-text>` is a helper directive for search more component
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
 */
export class PrimaryTextDirective implements ng.IDirective {

  public static directiveName: string = 'uifPrimaryText';

  public replace: boolean = true;
  public restrict: string = 'E';
  public require: string[] = [`^^${PeopleSearchMoreDirective.directiveName}`, `^^${PeoplePickerDirective.directiveName}`];
  public transclude: boolean = true;
  public controller: any = PrimaryTextController;
  public template: string = `
  <div ng-show="!$parent.$parent.disconnected" class="ms-PeoplePicker-searchMorePrimary">
    <div ng-show="$parent.$parent.processing">{{searchingForText}} {{searchQuery}}</div>
    <ng-transclude ng-show="!$parent.$parent.processing"></ng-transclude>
  </div>`;

  public scope: {} = {
    searchingForText: '@?uifSearchForText'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PrimaryTextDirective();

    return directive;
  }

  constructor() {
    //
  }

  public link: ng.IDirectiveLinkFn = (
    $scope: IPrimaryTextScope,
    $element: ng.IAugmentedJQuery,
    $attrs: ng.IAttributes,
    ctrls: [PeopleSearchMoreController, PeoplePickerController],
    $transclude: ng.ITranscludeFunction): void => {

    $scope.searchingForText = $scope.searchingForText || 'Searching for';
  };
}

/**
 * @ngdoc directive
 * @name uifSecondaryText
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-secondary-text>` is a helper directive for search more component
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-secondary-text>Showing {{sourcePeople.length}} results</uif-secondary-text>
 */
export class SecondaryTextDirective implements ng.IDirective {

  public static directiveName: string = 'uifSecondaryText';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = `
  <div ng-show="!$parent.$parent.disconnected" class="ms-PeoplePicker-searchMoreSecondary">
    <ng-transclude></ng-transclude>
  </div>`;

  public scope: boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new SecondaryTextDirective();

    return directive;
  }

  constructor() {
    //
  }
}

/**
 * @ngdoc directive
 * @name uifDisconnectedText
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-disconnected-text>` is a helper directive for search more component
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-disconnected-text> We are having trouble connecting to the server.
 *             <br> Please try again in a few minutes.
 * </uif-disconnected-text>
 */
export class DisconnectedTextDirective implements ng.IDirective {

  public static directiveName: string = 'uifDisconnectedText';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = `
  <div ng-show="$parent.$parent.disconnected" class="ms-PeoplePicker-searchMorePrimary">
    <ng-transclude></ng-transclude>
  </div>`;

  public scope: boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new DisconnectedTextDirective();

    return directive;
  }

  constructor() {
    //
  }
}

/**
 * @ngdoc directive
 * @name uifPeoplePickerSelected
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-people-picker-selected>` is a helper directive used in memeberList and facePile modes
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-people-picker-selected ng-model="selectedPersons"
 *   uif-selected-person-click="onSelectedPersonClick()"
 *   uif-person-close="removePersonFromSelectedPeople">
 *      <ng-transclude></ng-transclude>
 * </uif-people-picker-selected>
 */
export class PeoplePickerSelectedDirective implements ng.IDirective {

  public static directiveName: string = 'uifPeoplePickerSelected';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public template: string = `
    <div class="ms-PeoplePicker-selected" ng-class="{'is-active': selectedPeople && selectedPeople.length > 0}">
        <div class="ms-PeoplePicker-selectedHeader">
            <ng-transclude></ng-transclude>
        </div>
        <ul class="ms-PeoplePicker-selectedPeople">
          <li class="ms-PeoplePicker-selectedPerson" ng-repeat="person in selectedPeople track by $index">
            <uif-persona ng-click="onSelectedPersonClick()(person)"
              uif-style="${PersonaStyleEnum[PersonaStyleEnum.round]}"
              uif-size="${PersonaSize[PersonaSize.small]}"
              uif-presence="{{person.presence}}"
              uif-image-url="{{person.icon}}">
              <uif-persona-initials uif-color="{{person.color}}">{{person.initials}}</uif-persona-initials>
              <uif-persona-primary-text>{{person.primaryText}}</uif-persona-primary-text>
              <uif-persona-secondary-text>{{person.secondaryText}}</uif-persona-secondary-text>
            </uif-persona>
            <button type="button"
                    ng-click="removePersonFromSelectedPeople()(person, $event)"
                    class="ms-PeoplePicker-resultAction js-resultRemove">
              <uif-icon uif-type="${IconEnum[IconEnum.x]}"></uif-icon>
            </button>
          </li>
        </ul>
    </div>`;

  public scope: {} = {
    onSelectedPersonClick: '&?uifSelectedPersonClick',
    removePersonFromSelectedPeople: '&uifPersonClose',
    selectedPeople: '=ngModel'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PeoplePickerSelectedDirective();

    return directive;
  }

  constructor() {
    //
  }
}

/**
 * @ngdoc interface
 * @name IGroup
 * @module officeuifabric.components.peoplepicker
 *
 * @description
 * Helper interface used by the people picker directive.
 *
 * @property {Array} selectedPersons   - Persons selected in people picker
 */
export interface ISelectedPeopleHeaderScope extends ng.IScope {
  selectedPersons: IPersonPicker[];
}

/**
 * @ngdoc directive
 * @name uifSelectedPeopleHeader
 * @module officeuifabric.components.peoplepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-selected-people-header>` is a helper directive used in memeberList and facePile modes
 *
 * @see {link http://dev.office.com/fabric/components/peoplepicker}
 *
 * @usage
 *
 * <uif-selected-people-header>{{selectedPeople.length}} selected person(s)</uif-selected-people-header>
 */
export class SelectedPeopleHeaderDirective implements ng.IDirective {
  public static directiveName: string = 'uifSelectedPeopleHeader';

  public require: string = `^^${PeoplePickerDirective.directiveName}`;
  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public scope: boolean = true;
  public template: string = `<span class="ms-PeoplePicker-selectedCount" ng-transclude></span>`;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new SelectedPeopleHeaderDirective();
    return directive;
  }

  public link: ng.IDirectiveLinkFn = (
    $scope: ISelectedPeopleHeaderScope,
    $element: ng.IAugmentedJQuery,
    $attrs: ng.IAttributes,
    peoplePickerCtrl: PeoplePickerController,
    $transclude: ng.ITranscludeFunction): void => {
    $scope.selectedPersons = peoplePickerCtrl.getSelectedPersons();
  };
}

export var module: ng.IModule = ng.module('officeuifabric.components.peoplepicker', [
  'officeuifabric.components'])
  .directive(PeoplePickerDirective.directiveName, PeoplePickerDirective.factory())
  .directive(PrimaryTextDirective.directiveName, PrimaryTextDirective.factory())
  .directive(SecondaryTextDirective.directiveName, SecondaryTextDirective.factory())
  .directive(PeoplePickerResultListDirective.directiveName, PeoplePickerResultListDirective.factory())
  .directive(DisconnectedTextDirective.directiveName, DisconnectedTextDirective.factory())
  .directive(PeoplePickerSelectedDirective.directiveName, PeoplePickerSelectedDirective.factory())
  .directive(SelectedPeopleHeaderDirective.directiveName, SelectedPeopleHeaderDirective.factory())
  .directive(PeopleSearchMoreDirective.directiveName, PeopleSearchMoreDirective.factory());
