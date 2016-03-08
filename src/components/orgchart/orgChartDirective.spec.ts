'use strict';

import * as ng from 'angular';

describe('orgChartDirective: <uif-org-chart />', () => {
    let element: JQuery;
    let scope: any;

    // sample data

    let items: any = [
        {
            department: 'Good guys',
            firstname: 'Luke',
            imageUrl: 'Persona.Person2.png',
            name: 'Luke Skywalker',
            presence: 'available',
            title: 'Hero'
        },
        {
            department: 'Bad guys',
            firstname: 'Darth',
            imageUrl: 'Persona.Person2.png',
            name: 'Darth Vader',
            presence: 'busy',
            title: 'Right hand'
        },
        {
            department: 'Good guys',
            firstname: 'Han',
            imageUrl: 'Persona.Person2.png',
            name: 'Han Solo',
            presence: 'away',
            title: 'Hero'
        },
        {
            department: 'Bad guys',
            firstname: 'Emperor',
            imageUrl: 'Persona.Person2.png',
            name: 'Mr. Emperor',
            presence: 'blocked',
            title: 'Emperor Supreme'
        }
    ];

    let htmlMinimalTag: string = '<uif-org-chart></uif-org-chart>';
    let htmlMinimalWithData: string = '<uif-org-chart uif-items="items" ></uif-org-chart>';

    let htmlNotGroupedDefaultStyle: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" > </uif-org-chart>';
    let htmlGroupedSquareStyle: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-style="square" > </uif-org-chart>';

    let htmlSelectableSingle: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-select-mode="single" '
        + 'uif-selected-items="selected" > </uif-org-chart>';
    let htmlSelectableMulti: string = '<uif-org-chart uif-items="items" uif-group="department" uif-primary-text="name" '
        + 'uif-secondary-text="title" uif-image="imageUrl" uif-presence="presence" uif-select-mode="multiple" '
        + 'uif-selected-items="selected" > </uif-org-chart>';

    let htmlErrorStyle: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" uif-style="notvalid" > </uif-org-chart>';
    let htmlErrorSelectMode: string = '<uif-org-chart uif-items="items" uif-primary-text="name" uif-secondary-text="title" '
        + 'uif-image="imageUrl" uif-presence="presence" uif-select-mode="notvalid" > </uif-org-chart>';

    // setup

    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.orgchart');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        scope = $rootScope;
        scope.items = items;
        scope.selected = [];
    }));


    // basic rendering tests

    it('should render orgchart DIV with correct class \'ms-OrgChart\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalTag);
        $compile(element)(scope);
        scope.$digest();
        expect(element.prop('tagName')).toEqual('DIV');
        expect(element).toHaveClass('ms-OrgChart');
    }));

    it('should render group DIV with correct class \'ms-OrgChart-group\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).prop('tagName')).toEqual('DIV');
        expect(element.children().eq(0)).toHaveClass('ms-OrgChart-group');
    }));

    it('should render group title DIV with correct class \'ms-OrgChart-groupTitle\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(0).prop('tagName')).toEqual('DIV');
        expect(element.children().eq(0).children().eq(0)).toHaveClass('ms-OrgChart-groupTitle');
    }));

    it('should render group UL with correct class \'ms-OrgChart-list\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        expect(element.children().eq(0).children().eq(1).prop('tagName')).toEqual('UL');
        expect(element.children().eq(0).children().eq(1)).toHaveClass('ms-OrgChart-list');
    }));

    it('should render person LI with correct class \'ms-OrgChart-listItem\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        expect(listElement.prop('tagName')).toEqual('LI');
        expect(listElement).toHaveClass('ms-OrgChart-listItem');
    }));

    it('should render person div with correct class \'ms-Persona\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        expect(personElement.prop('tagName')).toEqual('DIV');
        expect(personElement).toHaveClass('ms-Persona');
    }));

    it('should render person imageArea div with correct class \'ms-Persona-imageArea\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageElement: JQuery = personElement.children().eq(0);
        expect(imageElement.prop('tagName')).toEqual('DIV');
        expect(imageElement).toHaveClass('ms-Persona-imageArea');
    }));

    it('should render person imageArea i with classes \'ms-Persona-placeHolder\' \'ms-Icon\' \'ms-Icon-person\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageElement: JQuery = personElement.children().eq(0);
        expect(imageElement.children().eq(0).prop('tagName')).toEqual('I');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Persona-placeholder');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Icon');
        expect(imageElement.children().eq(0)).toHaveClass('ms-Icon--person');
    }));

    it('should render person imageArea img with class \'ms-Persona-image\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageAreaElement: JQuery = personElement.children().eq(0);
        expect(imageAreaElement.children().eq(1).prop('tagName')).toEqual('IMG');
        expect(imageAreaElement.children().eq(1)).toHaveClass('ms-Persona-image');
    }));

    it('should render person presence div with correct class \'ms-Persona-presence\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        expect(personElement.children().eq(1).prop('tagName')).toEqual('DIV');
        expect(personElement.children().eq(1)).toHaveClass('ms-Persona-presence');
    }));

    it('should render person details div with correct class \'ms-Persona-details\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.prop('tagName')).toEqual('DIV');
        expect(detailsElement).toHaveClass('ms-Persona-details');
    }));

    it('should render person details primarytext div with correct class \'ms-Persona-primaryText\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(0).prop('tagName')).toEqual('DIV');
        expect(detailsElement.children().eq(0)).toHaveClass('ms-Persona-primaryText');
    }));

    it('should render person details primarytext div with correct class \'ms-Persona-secondaryText\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(1).prop('tagName')).toEqual('DIV');
        expect(detailsElement.children().eq(1)).toHaveClass('ms-Persona-secondaryText');
    }));

    it('should render correct number of items',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlMinimalWithData);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let listElements: JQuery = ulElement.children();
        expect(listElements.length).toEqual(4);
    }));

    // group
    it('should render group title div when uif-group is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let groupElement: JQuery = element.children().eq(0);
        expect(groupElement.children().eq(0).html()).toEqual('Good guys');
    }));

    it('should render multiple groups when uif-group is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let groups: JQuery = element.children();
        expect(groups.length).toEqual(2);
    }));

    // primarytext
    it('should render primary text when uif-primary-text is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(0).text()).toEqual('Luke Skywalker');
    }));

    // secondary text
    it('should render secondary text when uif-secondary-text is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let detailsElement: JQuery = personElement.children().eq(2);
        expect(detailsElement.children().eq(1).text()).toEqual('Hero');
    }));

    // image
    it('should render image src with uif-image if supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let listElement: JQuery = element.children().eq(0).children().eq(1).children().eq(0);
        let personElement: JQuery = listElement.children().eq(0);
        let imageAreaElement: JQuery = personElement.children().eq(0);
        expect(imageAreaElement.children().eq(1)).toHaveAttr('SRC');
    }));

    // presence
    it('should render persona DIV with with uif-presence is supplied',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlNotGroupedDefaultStyle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--available');
        expect(ulElement.children().eq(1).children().eq(0)).toHaveClass('ms-Persona--busy');
        expect(ulElement.children().eq(2).children().eq(0)).toHaveClass('ms-Persona--away');
        expect(ulElement.children().eq(3).children().eq(0)).toHaveClass('ms-Persona--blocked');
    }));

    // style
    it('should render persone DIV with \'ms-Persone--square is uif-style is \'square\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlGroupedSquareStyle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children();
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--square');
    }));

    // selectMode
    it('should render render person div with class \'ms-Persona--selectable\' when uif-select-mode=\'multi\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableMulti);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--selectable');
    }));

    it('should render render person div with class \'ms-Persona--selectable\' when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        expect(ulElement.children().eq(0).children().eq(0)).toHaveClass('ms-Persona--selectable');
    }));

    it('should throw an error if invalid value is supplied for uif-select-mode',
       inject(($compile: Function, $rootScope: ng.IRootScopeService, $log: ng.ILogService) => {
        element = ng.element(htmlErrorSelectMode);
        $compile(element)(scope);
        scope.$digest();
        expect($log.error.logs.length).toEqual(1);
    }));

    it('should throw an error if invalid value is supplied for uif-select-mode',
       inject(($compile: Function, $rootScope: ng.IRootScopeService, $log: ng.ILogService) => {
        element = ng.element(htmlErrorStyle);
        $compile(element)(scope);
        scope.$digest();
        expect($log.error.logs.length).toEqual(1);
    }));

    it('should render class \'is-selected\' on person DIV if person is selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        expect(personElement).toHaveClass('is-selected');
    }));

    it('should remove class \'is-selected\' on person DIV if person is selected and unselected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        personElement.triggerHandler('click');
        expect(personElement).not.toHaveClass('is-selected');
    }));

    // selectable single
    it('should contain one item in collection supplied in uif-selected-items person is selected when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        expect(scope.selected.length).toEqual(1);
    }));

    it('should contain zero selected items when person is selected and unselected when uif-select-mode=\'single\'',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let personElement: JQuery = ulElement.children().eq(0).children().eq(0);
        personElement.triggerHandler('click');
        personElement.triggerHandler('click');
        expect(scope.selected.length).toEqual(0);
    }));

    it('should contain one item in collection supplied in uif-selected-items if two different persons are selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableSingle);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let person1Element: JQuery = ulElement.children().eq(0).children().eq(0);
        let person2Element: JQuery = ulElement.children().eq(1).children().eq(0);
        person1Element.triggerHandler('click');
        person2Element.triggerHandler('click');
        expect(scope.selected.length).toEqual(1);
    }));

    // selectable multi
    it('should contain two items in collection supplied in uif-selected-items if two different persons are selected',
       inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        element = ng.element(htmlSelectableMulti);
        $compile(element)(scope);
        scope.$digest();
        let ulElement: JQuery = element.children().eq(0).children().eq(1);
        let person1Element: JQuery = ulElement.children().eq(0).children().eq(0);
        let person2Element: JQuery = ulElement.children().eq(1).children().eq(0);
        person1Element.triggerHandler('click');
        person2Element.triggerHandler('click');
        expect(scope.selected.length).toEqual(2);
    }));



});
