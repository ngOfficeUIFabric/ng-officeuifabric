import * as angular from 'angular';
import { OrgChartPresenceEnum } from './orgChartPresenceEnum';
import { OrgChartSelectModeEnum } from './orgChartSelectModeEnum';

describe('orgChartDirective: <uif-org-chart />', () => {

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.orgchart');
  });


  describe('OrgChartGroupFilter', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: angular.ILogService;
    let sample: any;

    let html: string = `
      <uif-org-chart>
        <uif-org-chart-group ng-repeat="team in data | uifOrgChartGroupBy: \'team\'">
          <uif-org-chart-group-title>{{team}}</uif-org-chart-group-title>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data | filter: {'team': team}" >
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $log: angular.ILogService) => {
      scope = $rootScope;
      compile = $compile;
      log = $log;

      // sample data
      sample = [
        {
          country: 'Denmark',
          imageUrl: 'Persona.Person2.png',
          name: 'Kevin Magnussen',
          presence: 'available',
          selected: false,
          team: 'Renault'
        },
        {
          country: '	Germany',
          imageUrl: 'Persona.Person2.png',
          name: 'Sebastian Vettel',
          presence: 'busy',
          selected: false,
          team: 'Ferrari'
        },
        {
          country: '	United Kingdom',
          imageUrl: 'Persona.Person2.png',
          name: 'Jolyon Palmer',
          presence: 'away',
          selected: false,
          team: 'Renault'
        },
        {
          country: 'United Kingdom',
          imageUrl: 'Persona.Person2.png',
          name: 'Lewis Hamilton',
          presence: 'blocked',
          selected: false,
          team: '	Mercedes'
        }
      ];

    }));

    it('should render expected groups', () => {

      // expect 3 groups given the sample data

      scope.data = sample;

      element = angular.element(html);
      compile(element)(scope);
      scope.$digest();

      expect(element.children().length).toEqual(3);

    });




  });

  describe('orgchart <org-chart />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: angular.ILogService;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $log: angular.ILogService) => {
      scope = $rootScope;
      compile = $compile;
      log = $log;
    }));

    it('should render DIV with class \'ms-OrgChart\'', () => {

      element = angular.element('<uif-org-chart>TEST</uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart');
      expect(element).toHaveText('TEST');

    });

    it('should not log error on correct select-mode', () => {

      Object.keys(OrgChartSelectModeEnum)
        .filter((v: any) => isNaN(parseInt(v, 10)))
        .forEach((selectMode: any) => {

          element = angular.element(`<uif-org-chart uif-select-mode="` + selectMode + `"></uif-org-chart`);
          compile(element)(scope);
          scope.$digest();

        });

      expect(log.error.logs.length).toEqual(0);

    });

    it('should log error on invalid select-mode', () => {

      element = angular.element(`<uif-org-chart uif-select-mode="INVALID"></uif-org-chart`);
      compile(element)(scope);
      scope.$digest();

      expect(log.error.logs.length).toEqual(1);

    });

  });

  describe('orgchartgroup <org-chart-group />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-OrgChart-group\'', inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      element = $compile('<uif-org-chart-group>TEST</uif-org-chart-group>')(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart-group');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgchartgrouptitle <org-chart-group-title />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-OrgChart-groupTitle\'', inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      element = $compile('<uif-org-chart-group-title>TEST</uif-org-chart-group-title>')(scope);
      element = jQuery(element[0]);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-OrgChart-groupTitle');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgChartPersonaDirective <org-chart-persona />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;
    let log: angular.ILogService;
    let sample: any;

    let htmlSingleSelect: string = `
      <uif-org-chart uif-select-mode="single" uif-selected-items="selectedItems">
        <uif-org-chart-group>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data"
                                  uif-item="person"
                                  uif-selected="person.selected">
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    let htmlMultipleSelect: string = `
      <uif-org-chart uif-select-mode="multiple" uif-selected-items="selectedItems">
        <uif-org-chart-group>
          <uif-org-chart-persona-list>
            <uif-org-chart-persona ng-repeat="person in data"
                                  uif-item="person"
                                  uif-selected="person.selected">
            </uif-org-chart-persona>
          </uif-org-chart-persona-list>
        </uif-org-chart-group>
      </uif-org-chart>
      `;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $log: angular.ILogService) => {

      scope = $rootScope;
      compile = $compile;
      log = $log;

      // sample data
      sample = [
        {
          country: 'Denmark',
          imageUrl: 'Persona.Person2.png',
          name: 'Kevin Magnussen',
          presence: 'available',
          selected: false,
          team: 'Renault'
        },
        {
          country: '	Germany',
          imageUrl: 'Persona.Person2.png',
          name: 'Sebastian Vettel',
          presence: 'busy',
          selected: false,
          team: 'Ferrari'
        },
        {
          country: '	United Kingdom',
          imageUrl: 'Persona.Person2.png',
          name: 'Jolyon Palmer',
          presence: 'away',
          selected: false,
          team: 'Renault'
        },
        {
          country: 'United Kingdom',
          imageUrl: 'Persona.Person2.png',
          name: 'Lewis Hamilton',
          presence: 'blocked',
          selected: false,
          team: '	Mercedes'
        }
      ];

    }));

    it('should render LI with class \'ms-Orgchart-listItem\' and nested DIV with class \'ms-Persona\'', () => {

      element = angular.element('<uif-org-chart><uif-org-chart-persona>TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);

      expect(liElement.prop('tagName')).toEqual('LI');
      expect(liElement).toHaveClass('ms-OrgChart-listItem');

      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement.prop('tagName')).toEqual('DIV');
      expect(divElement).toHaveClass('ms-Persona');

    });

    it('should render class \'ms-Persona--square\' when uif-style square', () => {

      element = angular.element('<uif-org-chart><uif-org-chart-persona uif-style="square" >TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).toHaveClass('ms-Persona--square');

    });

    it('should not render class \'ms-Persona--square\' when uif-style standard', () => {

      element = angular.element('<uif-org-chart><uif-org-chart-persona uif-style="standard" >TEST</uif-org-chart-persona></uif-org-chart>');
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).not.toHaveClass('ms-Persona--square');

    });

    it('should not render class \'ms-Persona--square\' when no uif-style', () => {

      element = angular.element(`<uif-org-chart>
                             <uif-org-chart-persona uif-style="standard" >TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      let liElement: JQuery = element.children().eq(0);
      let divElement: JQuery = liElement.children().eq(0);

      expect(divElement).not.toHaveClass('ms-Persona--square');

    });

    it('should throw error when invalid uif-style', () => {

      element = angular.element(`<uif-org-chart >
                              <uif-org-chart-persona uif-style="INVALID" >TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      expect(log.error.logs.length).toEqual(1);

    });

    it('should not log error on correct presence-type with correct class', () => {

      Object.keys(OrgChartPresenceEnum)
        .filter((v: any) => isNaN(parseInt(v, 10)))
        .forEach((presence: string) => {

          scope.person = {
            status: presence
          };

          element = angular.element(`<uif-org-chart>
                                  <uif-org-chart-persona uif-presence="person.status">TEST</uif-org-chart-persona>
                                </uif-org-chart>`);
          compile(element)(scope);
          scope.$digest();

          let liElement: JQuery = element.children().eq(0);
          let divElement: JQuery = liElement.children().eq(0);

          expect(log.error.logs.length).toEqual(0);
          expect(divElement).toHaveClass('ms-Persona--' + presence);

        });


    });

    it('should log error on invalid presence-type', () => {

      scope.person = {
        status: 'INVALID'
      };

      element = angular.element(`<uif-org-chart >
                                  <uif-org-chart-persona uif-presence="person.status">TEST</uif-org-chart-persona>
                            </uif-org-chart>`);
      compile(element)(scope);
      scope.$digest();

      expect(log.error.logs.length).toEqual(1);

    });

    it('should select only 1 item when in single-mode even if more items has uif-selected=true', () => {

      scope.data = sample.slice(0);
      scope.data[0].selected = true;
      scope.data[2].selected = true;
      scope.selectedItems = [];

      element = angular.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(1);

    });

    it('Should select expected items when in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.data[0].selected = true;
      scope.data[2].selected = true;
      scope.selectedItems = [];

      element = angular.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      expect(scope.selectedItems.length).toEqual(2);

    });

    it('should toggle \'is-selected\' class when clicked', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = angular.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(personaElement).toHaveClass('is-selected');

      personaElement.triggerHandler('click');
      expect(personaElement).not.toHaveClass('is-selected');

    });

    it('should select/unselect item when clicked in single-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = angular.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(0);

    });

    it('should select/unselect item when clicked in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = angular.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0).children().eq(0);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      personaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(0);

    });

    it('should unselect item when another is clicked when in single-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = angular.element(htmlSingleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let firstPersonaElement: JQuery = listElement.children().eq(0).children().eq(0);
      let lastPersonaElement: JQuery = listElement.children().eq(3).children().eq(0);

      firstPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      lastPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

    });

    it('should not unselect item when another is clicked in multiple-mode', () => {

      scope.data = sample.slice(0);
      scope.selectedItems = [];

      element = angular.element(htmlMultipleSelect);
      compile(element)(scope);
      scope.$digest();

      let groupElement: JQuery = element.children().eq(0);
      let listElement: JQuery = groupElement.children().eq(0);
      let firstPersonaElement: JQuery = listElement.children().eq(0).children().eq(0);
      let lastPersonaElement: JQuery = listElement.children().eq(3).children().eq(0);

      firstPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(1);

      lastPersonaElement.triggerHandler('click');
      expect(scope.selectedItems.length).toEqual(2);

    });

  });

  describe('orgChartImageDirective <org-chart-image />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-imageArea\'', () => {

      element = angular.element('<uif-org-chart-image  ng-src="TEST"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-imageArea');

    });

    it('should contain I with classes \'ms-Persona-placeholder\' and \'ms-Icon\' and \'ms-Icon--person\'', () => {

      element = angular.element('<uif-org-chart-image ng-src="test.jpg"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.children().eq(0).prop('tagName')).toEqual('I');
      expect(element.children().eq(0)).toHaveClass('ms-Persona-placeholder');
      expect(element.children().eq(0)).toHaveClass('ms-Icon');
      expect(element.children().eq(0)).toHaveClass('ms-Icon--person');

    });

    it('should render IMG with class \'ms-Persona-image\'', () => {

      element = angular.element('<uif-org-chart-image ng-src="test.jpg"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      expect(element.children().eq(1).prop('tagName')).toEqual('IMG');
      expect(element.children().eq(1)).toHaveClass('ms-Persona-image');

    });

    it('should render IMG with src set to image-url', () => {

      scope.person = {
        imageUrl: 'http://test/test.jpg'
      };

      element = angular.element('<uif-org-chart-image ng-src="person.imageUrl"></uif-org-chart-image>');
      compile(element)(scope);
      scope.$digest();

      let imgElement: JQuery = element.children().eq(1);

      expect(imgElement.prop('src')).toEqual('http://test/test.jpg');

    });

  });


  describe('orgchartpresence <uif-org-chart-presence />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-presence\'', () => {

      scope.person = {
        status: 'away'
      };

      element = angular.element(`
        <uif-org-chart>
            <uif-org-chart-persona uif-status="person.status">
              <uif-org-chart-presence></uif-org-chart-presence>
            </uif-org-chart-persona>
          </uif-org-chart>
      `);

      compile(element)(scope);
      scope.$digest();

      let listElement: JQuery = element.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0);
      let presenceElement: JQuery = personaElement.children().eq(0);

      expect(presenceElement.prop('tagName')).toEqual('DIV');
      expect(presenceElement).toHaveClass('ms-Persona-presence');

    });

    it('should not render if status is missing', () => {

      element = angular.element(`
        <uif-org-chart>
            <uif-org-chart-persona uif-status="person.status">
              <uif-org-chart-presence></uif-org-chart-presence>
            </uif-org-chart-persona>
          </uif-org-chart>
      `);

      compile(element)(scope);
      scope.$digest();

      let listElement: JQuery = element.children().eq(0);
      let personaElement: JQuery = listElement.children().eq(0);
      let presenceElement: JQuery = personaElement.children().eq(0);

      expect(presenceElement.prop('tagName')).toEqual('DIV');
      expect(presenceElement).toHaveClass('ms-Persona-presence');
      expect(presenceElement).toHaveCss({ display: 'none' });

    });

  });

  describe('orgChartDetailsDirective <org-chart-details />', () => {

    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
    }));

    it('should render DIV with class \'ms-Persona-details\'', inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      element = angular.element('<uif-org-chart-details>TEST</uif-org-chart-details>');
      $compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-details');
      expect(element).toHaveText('TEST');

    }));

  });

  describe('orgchartprimarytext <org-chart-primary-text />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-primaryText\' and transclude', () => {

      element = angular.element('<uif-org-chart-primary-text>TEST</uif-org-chart-primary-text>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-primaryText');
      expect(element).toHaveText('TEST');

    });

  });

  describe('orgchartsecondarytext <org-chart-secondary-text />', () => {

    let element: JQuery;
    let scope: any;
    let compile: Function;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      scope = $rootScope;
      compile = $compile;
    }));

    it('should render DIV with class \'ms-Persona-secondaryText\' and transclude', () => {

      element = angular.element('<uif-org-chart-secondary-text>TEST</uif-org-chart-secondary-text>');
      compile(element)(scope);
      scope.$digest();

      expect(element.prop('tagName')).toEqual('DIV');
      expect(element).toHaveClass('ms-Persona-secondaryText');
      expect(element).toHaveText('TEST');

    });

  });

});
