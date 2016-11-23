'use strict';

import * as angular from 'angular';
import {ButtonTypeEnum} from './buttonTypeEnum';

describe('buttonDirective: <uif-button />', () => {

  /**
   * before each test load all required modules
   */
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.icon');
    angular.mock.module('officeuifabric.components.button');
  });

  /**
   * tests for the description directive used in the button
   */
  describe('buttonDescriptionDirective: <uif-button-description />', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      let html: string = '<uif-button-description>Lorem Ipsum</uif-button>';
      scope = $rootScope;

      element = $compile(html)(scope);  // jqLite object
      element = jQuery(element[0]);     // jQuery object

      scope.$digest();
    }));

    it('should create correct HTML', () => {
      // expected rendered HTML:
      // <span class="ms-Button-description">Some description goes here of the button</span>

      // verify expected HTML tag
      expect(element.prop('tagName')).toEqual('SPAN');
    });

    it('should set correct Office UI Fabric CSS class', () => {
      // expected rendered HTML:
      // <span class="ms-Button-description">Some description goes here of the button</span>

      // check expected CSS classes
      expect(element).toHaveClass('ms-Button-description');
    });

    // the value specified should render within the body of the rendered element
    it('should be able to set the description', () => {
      // expected rendered HTML:
      // <span class="ms-Button-description">Lorem Ipsum</span>

      // check value of the span
      let spanElement: JQuery = element.find('span');
      expect(spanElement[0].innerText).toBe('Lorem Ipsum');
    });
  });




  /**
   * tests when the button should be rendered as a <button> tag
   */
  describe('rendered as <button>', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      let html: string = '<uif-button>Lorem Ipsum</uif-button>';
      scope = $rootScope;

      element = $compile(html)(scope);    // jqLite object
      element = jQuery(element[0]);       // jQuery object

      scope.$digest();
    }));

    it('should create correct HTML', () => {
      // expected rendered HTML:
      // <button class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </button>

      // verify expected HTML tag
      expect(element.prop('tagName')).toEqual('BUTTON');

      // check child
      let spanElement: JQuery = element.find('span');
      expect(spanElement.prop('tagName')).toEqual('SPAN');
    });

    it('should set correct Office UI Fabric CSS class', () => {
      // expected rendered HTML:
      // <button class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </button>

      // verify button CSS
      expect(element[0]).toHaveClass('ms-Button');

      // verify inner span CSS
      let spanElement: JQuery = element.find('span');
      expect(spanElement[0]).toHaveClass('ms-Button-label');
    });

    // should not throw an error when null button type enum passed in
    it('should not log error on null button types', inject(($log: angular.ILogService, $compile: Function) => {
      // create button with no attributes
      let html: string = '<uif-button>Lorem Ipsum</uif-button>';
      $compile(html)(scope);
      scope.$digest();

      // verify no errors logged
      expect($log.error.logs.length).toBe(0);
    }));

    // should not throw an error when valid button type enum passed in
    it('should not log error on valid button types', inject(($log: angular.ILogService, $compile: Function) => {
      let html: string = '';

      // create buttons for each enum option
      Object.keys(ButtonTypeEnum)
        .forEach((buttonType: string) => {
          html = '<uif-button uif-type="' + buttonType + '">Lorem Ipsum</uif-button>';
          $compile(html)(scope);
          scope.$digest();

          // verify no errors logged
          expect($log.error.logs.length).toBe(0);
        });
    }));

    // should log an error when invalid button type passed specified
    it('should log error on invalid button types', inject(($log: angular.ILogService, $compile: Function) => {
      // check no error when no type specified
      let html: string = '<uif-button uif-type="INVALID">Lorem Ipsum</uif-button>';
      $compile(html)(scope);
      scope.$digest();

      // verify error logged
      expect($log.error.logs.length).toBe(1);
    }));

    // the value specified should render within the body of the rendered element
    it('should be able to set the label', () => {
      // expected rendered HTML:
      // <button class="ms-Button">
      //   <span class="ms-Button-label">Lorem Ipsum</span>
      // </button>

      // check value of the span
      let spanElement: JQuery = element.find('span');
      expect(spanElement[0].innerText).toBe('Lorem Ipsum');
    });

    // the rendered element should render enabled by default
    it('should be able to set enabled', () => {
      // expected rendered HTML:
      // <button class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </button>

      // verify no disabled class present
      expect(element).not.toHaveClass('is-disabled');
      expect(element.attr('disabled')).toBe(undefined, 'button should not be disabled');
    });

    // if set to disabled, this should render on the button rendered element
    it('should be able to set disabled', inject(($compile: Function) => {
      // expected rendered HTML:
      // <button class="ms-Button is-disabled" disabled="disabled">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </button>

      let html: string = '<uif-button disabled="disabled">Lorem Ipsum</uif-button>';
      let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
      buttonElement = jQuery(buttonElement[0]);           // jQuery object
      scope.$digest();

      // verify no disabled class present
      expect(buttonElement[0]).toHaveClass('is-disabled');
      expect(buttonElement.attr('disabled')).toBe('disabled', 'button should be disabled');
    }));

    it('should call preventDefault in disabled state', inject(($compile: Function) => {
      let html: string = '<uif-button disabled="disabled">Lorem Upsum</uif-button>';
      let buttonElement: JQuery = $compile(html)(scope);
      buttonElement = jQuery(buttonElement[0]);
      scope.$digest();

      // button calls event.preventDefault on click
      let e: Event = $.Event('click');
      buttonElement.trigger('e');
      expect(e.preventDefault).toBeTruthy();
    }));

    it('should be able to be toggled between enabled and disabled', inject(($compile: Function) => {
      let currentScope: any = scope.$new();
      currentScope.btnDisabled = true;

      let html: string = '<uif-button ng-disabled="btnDisabled">Lorem Upsum</uif-button>';
      let buttonElement: JQuery = $compile(html)(currentScope);
      buttonElement = jQuery(buttonElement[0]);
      scope.$digest();

      expect(buttonElement).toHaveClass('is-disabled');
      expect(buttonElement.attr('disabled')).toBe('disabled', 'button should be disabled');

      currentScope.btnDisabled = false;
      currentScope.$digest();

      expect(element).not.toHaveClass('is-disabled');
      expect(element.attr('disabled')).toBe(undefined, 'button should not be disabled');
    }));

    /**
     * action (default) button tests
     */
    describe('action (default) button', () => {
      // the rendered button should not have any button type decorator classes
      it('should not have any button decorator classes', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = '<uif-button>Lorem Ipsum</uif-button>';
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no decorator classes rendered by the directive
        expect(buttonElement).not.toHaveClass('ms-Button--primary');
        expect(buttonElement).not.toHaveClass('ms-Button--command');
        expect(buttonElement).not.toHaveClass('ms-Button--compound');
        expect(buttonElement).not.toHaveClass('ms-Button--hero');
      }));

      // the icon specified should not be rendered (action doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = `<uif-button>
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no wrapper was created
        expect(buttonElement.find('span.ms-Button-icon').length).toBe(0);
        // verify no icon was added
        expect(buttonElement.find('uif-icon').length).toBe(0);
      }));
    }); // describe('action (default) button')

    describe('primary button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = '<uif-button uif-type="primary">Lorem Ipsum</uif-button>';
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify correct decorator class
        expect(buttonElement).toHaveClass('ms-Button--primary');
      }));

      // the icon specified should not be rendered (primary doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = `<uif-button uif-type="primary">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no wrapper was created
        expect(buttonElement.find('span.ms-Button-icon').length).toBe(0);
        // verify no icon was added
        expect(buttonElement.find('uif-icon').length).toBe(0);
      }));

      // the icon specified should not be rendered (primary doesn't support icon)
      it('should log error when icon specified', inject(($log: angular.ILogService, $compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = `<uif-button uif-type="primary">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        $compile(html)(scope);
        scope.$digest();

        // verify error logged
        expect($log.error.logs.length).toBe(1);
      }));
    }); // describe('primary button')

    /**
     * command button tests
     */
    describe('command button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--command">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = '<uif-button uif-type="command">Lorem Ipsum</uif-button>';
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no icon was rendered by the directive
        expect(buttonElement).toHaveClass('ms-Button--command');
      }));

      // the icon specified should render within the body of the rendered element
      it('should be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        //   <span class="ms-Button-label">+ Button as &lt;button&gt;</span>
        // </button>
        // >>> REALLY should render
        // <button class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </button>

        let html: string = `<uif-button uif-type="command">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify class on inner label
        expect(buttonElement.children('span.ms-Button-label').length).toBe(1);
        // verify icon was rendered by the directive
        expect(buttonElement.children('span.ms-Button-icon').length).toBe(1);
      }));

      it('should not log error when icon specified', inject(($log: angular.ILogService, $compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </button>

        let html: string = `<uif-button uif-type="command">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        $compile(html)(scope);
        scope.$digest();

        // verify error logged
        expect($log.error.logs.length).toBe(0);
      }));
    }); // describe('command button')

    /**
     * compound button tests
     */
    describe('compound button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class (label only)', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = '<uif-button uif-type="compound">Lorem Ipsum</uif-button>';
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify class on button element
        expect(buttonElement).toHaveClass('ms-Button--compound');
        // verify class on inner label
        expect(buttonElement.children('span.ms-Button-label').length).toBe(1);
      }));

      it('should include correct CSS class (label & description only)', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        //   <span class="ms-Button-description">Button description</span>
        // </button>

        let html: string = `<uif-button uif-type="compound">
                              Lorem Ipsum
                              <uif-button-description>Button Description</uif-button-description>
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify class on button element
        expect(buttonElement).toHaveClass('ms-Button--compound');
        // verify class on inner label
        expect(buttonElement.children('span.ms-Button-label').length).toBe(1);
        // verify class on inner description
        expect(buttonElement.children('span.ms-Button-description').length).toBe(1);
      }));

      // the icon specified should not be rendered (compound doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        //   <span class="ms-Button-description">Some description goes here of the button</span>
        // </button>

        let html: string = `<uif-button uif-type="compound">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no icon was rendered by the directive
        expect(buttonElement.children('span.ms-Button-icon').length).toBe(0);
        expect(buttonElement.find('uif-icon').length).toBe(0);
      }));
    }); // describe('compound button')

    /**
     * hero button tests
     */
    describe('hero button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </button>

        let html: string = '<uif-button uif-type="hero">Lorem Ipsum</uif-button>';
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify no icon was rendered by the directive
        expect(buttonElement).toHaveClass('ms-Button--hero');
      }));

      // the icon specified should render within the body of the rendered element
      it('should be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </button>
        // >>> REALLY should render
        // <button class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </button>

        let html: string = `<uif-button uif-type="hero">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let buttonElement: JQuery = $compile(html)(scope);  // jqLite object
        buttonElement = jQuery(buttonElement[0]);           // jQuery object

        // verify class on inner label
        expect(buttonElement.children('span.ms-Button-label').length).toBe(1);
        // verify icon was rendered by the directive
        expect(buttonElement.children('span.ms-Button-icon').length).toBe(1);
      }));
    }); // describe('hero button')

  }); // describe('rendered as <button>')










  /**
   * tests when the button should be rendered as an <a> tag
   */
  describe('rendered as <a>', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      let html: string = '<uif-button ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
      scope = $rootScope;

      // element = jqLite object
      element = $compile(html)(scope);
      // element = jQuery object
      element = jQuery(element[0]);

      scope.$digest();
    }));

    it('should create HTML <a> tag', () => {
      // expected rendered HTML:
      // <a class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </a>

      // verify expected HTML tag
      expect(element.prop('tagName')).toEqual('A');

      // check child
      let spanElement: JQuery = element.find('span');
      expect(spanElement.prop('tagName')).toEqual('SPAN');
    });

    it('should set correct Office UI Fabric CSS class', () => {
      // expected rendered HTML:
      // <a class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
      // </a>

      // verify button CSS
      expect(element[0]).toHaveClass('ms-Button');

      // check child
      let spanElement: JQuery = element.find('span');
      expect(spanElement.prop('tagName')).toEqual('SPAN');
    });

    // should not throw an error when valid button type enum passed in
    it('should not log error on null button types', inject(($log: angular.ILogService, $compile: Function) => {
      // check no error when no type specified
      let html: string = '<uif-button ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
      $compile(html)(scope);
      scope.$digest();

      expect($log.error.logs.length).toBe(0);
    }));

    // should not throw an error when valid button type enum passed in
    it('should not log error on valid button types', inject(($log: angular.ILogService, $compile: Function) => {
      let html: string = '';
      // for all enum options...
      // check no error when no type specified
      Object.keys(ButtonTypeEnum)
        .forEach((buttonType: string) => {
          html = '<uif-button uif-type="' + buttonType + '" ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
          $compile(html)(scope);
          scope.$digest();

          // verify no errors logged
          expect($log.error.logs.length).toBe(0);
        });
    }));

    // should throw an error when invalid button type passed in
    it('should log error on invalid button types', inject(($log: angular.ILogService, $compile: Function) => {
      // check no error when no type specified
      let html: string = '<uif-button uif-type="INVALID" ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
      $compile(html)(scope);
      scope.$digest();

      // verify error logged
      expect($log.error.logs.length).toBe(1);
    }));

    // the value specified should render within the body of the rendered element
    it('should be able to set the label', () => {
      // expected rendered HTML:
      // <a class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
      // </a>

      // check value of the span
      let spanElement: JQuery = element.find('span');
      expect(spanElement[0].innerText).toBe('Lorem Ipsum');
    });

    // the rendered element should render enabled by default
    it('should be able to set enabled', () => {
      // expected rendered HTML:
      // <a class="ms-Button">
      //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
      // </a>

      // verify no disabled class present
      expect(element).not.toHaveClass('is-disabled');
    });

    // if set to disabled, this should render on the button rendered element
    it('should be able to set disabled', inject(($compile: Function) => {
      // expected rendered HTML:
      // <a class="ms-Button is-disabled">
      //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
      // </a>

      let html: string = '<uif-button disabled="disabled" ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
      let linkElement: JQuery = $compile(html)(scope);  // jqLite object
      linkElement = jQuery(linkElement[0]);             // jQuery object
      scope.$digest();

      // verify disabled class present
      expect(linkElement[0]).toHaveClass('is-disabled');
    }));

    it('should call preventDefault in disabled state', inject(($compile: Function) => {
      let html: string = '<uif-button disabled="disabled" ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
      let linkElement: JQuery = $compile(html)(scope);  // jqLite object
      linkElement = jQuery(linkElement[0]);             // jQuery object
      scope.$digest();

      // link calls event.preventDefault on click
      let e: Event = $.Event('click');
      linkElement.trigger('e');
      expect(e.preventDefault).toBeTruthy();
    }));

    it('should be able to be toggled between enabled and disabled', inject(($compile: Function) => {
      let currentScope: any = scope.$new();
      currentScope.btnDisabled = true;

      let html: string = '<uif-button ng-disabled="btnDisabled" ng-href="http://ngOfficeUiFabric.com">Lorem Upsum</uif-button>';
      let buttonElement: JQuery = $compile(html)(currentScope);
      buttonElement = jQuery(buttonElement[0]);
      scope.$digest();

      expect(buttonElement).toHaveClass('is-disabled');

      currentScope.btnDisabled = false;
      currentScope.$digest();

      expect(element).not.toHaveClass('is-disabled');
    }));
    /**
     * action (default) button tests
     */
    describe('action (default) button', () => {
      // the rendered button should not have any button type decorator classes
      it('should not have any button decorator classes', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = '<uif-button ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no decorator classes rendered by the directive
        expect(linkElement).not.toHaveClass('ms-Button--primary');
        expect(linkElement).not.toHaveClass('ms-Button--command');
        expect(linkElement).not.toHaveClass('ms-Button--compound');
        expect(linkElement).not.toHaveClass('ms-Button--hero');
      }));

      // the icon specified should not be rendered (action doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button">
        //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
        // </a>

        let html: string = `<uif-button ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no wrapper was created
        expect(linkElement.find('span.ms-Button-icon').length).toBe(0);
        // verify no icon was added
        expect(linkElement.find('uif-icon').length).toBe(0);
      }));

    }); // describe('action (default) button')

    /**
     * primary button tests
     */
    describe('primary button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = '<uif-button uif-type="primary" ng-href="http://ngOfficeUiFabric.com">Lorem Ipsum</uif-button>';
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify correct decorator class
        expect(linkElement).toHaveClass('ms-Button--primary');
      }));

      // the icon specified should not be rendered (primary doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
        // </a>

        let html: string = `<uif-button uif-type="primary" ng-href="http://ngOfficeUiFabric.com">'
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no wrapper was created
        expect(linkElement.find('span.ms-Button-icon').length).toBe(0);
        // verify no icon was added
        expect(linkElement.find('uif-icon').length).toBe(0);
      }));

      // the icon specified should not be rendered (primary doesn't support icon)
      it('should log error when icon specified', inject(($log: angular.ILogService, $compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--primary">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = `<uif-button uif-type="primary" ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        $compile(html)(scope);
        scope.$digest();

        // verify error logged
        expect($log.error.logs.length).toBe(1);
      }));
    }); // describe('primary button')

    describe('command button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--command">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = '<uif-button uif-type="command">Lorem Ipsum</uif-button>';
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no icon was rendered by the directive
        expect(linkElement).toHaveClass('ms-Button--command');
      }));

      // the icon specified should render within the body of the rendered element
      it('should be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        //   <span class="ms-Button-label">+ Button as &lt;a&gt;</span>
        // </a>
        // >>> REALLY should render
        // <a class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">+ Button as &lt;a&gt;</span>
        // </a>

        let html: string = `<uif-button uif-type="command" ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify class on inner label
        expect(linkElement.children('span.ms-Button-label').length).toBe(1);
        // verify icon was rendered by the directive
        expect(linkElement.children('span.ms-Button-icon').length).toBe(1);
      }));

      it('should not log error when icon specified', inject(($log: angular.ILogService, $compile: Function) => {
        // expected rendered HTML:
        // <button class="ms-Button ms-Button--command">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </button>

        let html: string = `<uif-button uif-type="command" ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        $compile(html)(scope);
        scope.$digest();

        // verify error logged
        expect($log.error.logs.length).toBe(0);
      }));
    }); // describe('command button')

    /**
     * compound button tests
     */
    describe('compound button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class (label only)', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = `<uif-button uif-type="compound" ng-href="http://ngOfficeUiFabric.com">
                              Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no icon was rendered by the directive
        expect(linkElement).toHaveClass('ms-Button--compound');
        // verify class on inner label
        expect(linkElement.children('span.ms-Button-label').length).toBe(1);
      }));

      it('should include correct CSS class (label & description only)', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        //   <span class="ms-Button-description">Button description</span>
        // </a>

        let html: string = `<uif-button uif-type="compound" ng-href="http://ngOfficeUiFabric.com">
                              Lorem Ipsum
                              <uif-button-description>Button Description</uif-button-description>
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);           // jQuery object

        // verify class on button element
        expect(linkElement).toHaveClass('ms-Button--compound');
        // verify class on inner label
        expect(linkElement.children('span.ms-Button-label').length).toBe(1);
        // verify class on inner description
        expect(linkElement.children('span.ms-Button-description').length).toBe(1);
      }));

      // the icon specified should not be rendered (compound doesn't support icon)
      it('should not be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--compound">
        //   <span class="ms-Button-label">Button as &lt;a&gt;</span>
        //   <span class="ms-Button-description">Some description goes here of the button</span>
        // </a>

        let html: string = `<uif-button ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no icon was rendered by the directive
        expect(linkElement.children('span.ms-Button-icon').length).toBe(0);
        expect(linkElement.find('uif-icon').length).toBe(0);
      }));
    }); // describe('compound button')

    /**
     * hero button tests
     */
    describe('hero button', () => {
      // ensure that the button has the correct CSS class for the button type
      it('should include correct CSS class', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-label">Button as &lt;button&gt;</span>
        // </a>

        let html: string = `<uif-button uif-type="hero" ng-href="http://ngOfficeUiFabric.com">
                              Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify no icon was rendered by the directive
        expect(linkElement).toHaveClass('ms-Button--hero');
      }));

      // the icon specified should render within the body of the rendered element
      it('should be able to set an icon', inject(($compile: Function) => {
        // expected rendered HTML:
        // <a class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </a>
        // >>> REALLY should render
        // <a class="ms-Button ms-Button--hero">
        //   <span class="ms-Button-icon"><uif-icon uif-type="plus"></uif-icon></span>
        //   <span class="ms-Button-label">Hero Button</span>
        // </a>

        let html: string = `<uif-button uif-type="hero" ng-href="http://ngOfficeUiFabric.com">
                              <uif-icon uif-type="plus"></uif-icon>Lorem Ipsum
                            </uif-button>`;
        let linkElement: JQuery = $compile(html)(scope);  // jqLite object
        linkElement = jQuery(linkElement[0]);             // jQuery object

        // verify class on inner label
        expect(linkElement.children('span.ms-Button-label').length).toBe(1);
        // verify icon was rendered by the directive
        expect(linkElement.children('span.ms-Button-icon').length).toBe(1);
      }));
    }); // describe('hero button')

  }); // describe('rendered as <a>')

});
