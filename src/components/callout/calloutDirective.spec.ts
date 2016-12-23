import * as angular from 'angular';

describe('calloutDirectives:', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.callout');
  });

  describe('HTML rendering', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      element = angular.element('<uif-callout></uif-callout>');
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
    }));

    it('main element should be DIV', () => {
      element = jQuery(element[0]);
      let calloutElement: JQuery = element.children().first();

      expect(calloutElement[0].tagName === 'DIV').toBeTruthy();
    });

    it('should not throw error on mouseenter and leave', inject(($compile: angular.ICompileService) => {
      let jqlElement: angular.IAugmentedJQuery = angular.element('<uif-callout></uif-callout>');
      $compile(jqlElement)(scope);
      scope.$digest();

      jqlElement.triggerHandler('mouseenter');
      scope.$digest();

      expect(() => {
        jqlElement.triggerHandler('mouseleave');
      }).not.toThrow(new Error('[$compile:nonassign] Expression \'undefined\' ' +
        'used with directive \'uifCallout\' is non-assignable!\n' +
        'http://errors.angularjs.org/1.4.9/$compile/nonassign?p0=undefined&p1=uifCallout'));


    }));

    it('main element should have callout CSS class', () => {
      let calloutElement: JQuery = element.find('div').first();

      expect(calloutElement[0]).toHaveClass('ms-Callout');
    });

    it('should have div with proper CSS as first child', () => {
      let mainElement: JQuery = element.find('div.ms-Callout > div').first();

      expect(mainElement[0]).toHaveClass('ms-Callout-main');
    });

    it('should have inner div rendered with proper CSS', () => {
      let innerElement: JQuery = element.find('div.ms-Callout-inner');

      expect(innerElement[0]).toBeDefined();
      expect(innerElement[0]).toHaveClass('ms-Callout-inner');

      let parentElement: JQuery = innerElement.parent();
      expect(parentElement[0]).toBeDefined();
      expect(parentElement[0]).toHaveClass('ms-Callout-main');
    });

    it('plain callout should have left arrow', () => {
      let calloutElement: JQuery = element.find('div').first();

      expect(calloutElement[0]).toHaveClass('ms-Callout--arrowLeft');
    });

    it(
      'main element should have proper arrow CSS class',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-arrow="top"></uif-callout>' +
          '<uif-callout uif-arrow="bottom"></uif-callout>' +
          '<uif-callout uif-arrow="left"></uif-callout>' +
          '<uif-callout uif-arrow="right"></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element);

        let topArrowElement: JQuery = element.find('div.ms-Callout').eq(0);
        let bottomArrowElement: JQuery = element.find('div.ms-Callout').eq(1);
        let leftArrowElement: JQuery = element.find('div.ms-Callout').eq(2);
        let rightArrowElement: JQuery = element.find('div.ms-Callout').eq(3);

        expect(topArrowElement[0]).toHaveClass('ms-Callout--arrowTop');
        expect(bottomArrowElement[0]).toHaveClass('ms-Callout--arrowBottom');
        expect(leftArrowElement[0]).toHaveClass('ms-Callout--arrowLeft');
        expect(rightArrowElement[0]).toHaveClass('ms-Callout--arrowRight');
      }));

    it(
      'empty arrow attribute logs error',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $log: angular.ILogService) => {
        element = angular.element('<uif-callout uif-arrow></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.callout - "' +
          '" is not a valid value for uifArrow. It should be left, right, top, bottom.');
        // expect(calloutElement[0]).toHaveClass('ms-Callout--arrowLeft');
      }));

    it(
      'main element has CSS class when uif-separator is present',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-separator></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element[0]);

        let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
        expect(calloutElement[0]).toHaveClass('ms-Callout--actionText');
      }));

    it(
      'main element has CSS class when uif-action-text is present',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-action-text></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element[0]);

        let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
        expect(calloutElement[0]).toHaveClass('ms-Callout--actionText');
      }));

    it('main element has no separator when uif-action-text and uif-separator not present', () => {
      let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
      expect(calloutElement[0]).not.toHaveClass('ms-Callout--actionText');
    });

    it(
      'main element has proper CSS class uif-type=oobe',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-type="oobe"></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element[0]);

        let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
        expect(calloutElement[0]).toHaveClass('ms-Callout--OOBE');
      }));

    it(
      'main element has proper CSS class uif-type=peek',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-type="peek"></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element[0]);

        let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
        expect(calloutElement[0]).toHaveClass('ms-Callout--Peek');
      }));

    it(
      'should log error when uif-type empty',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $log: angular.ILogService) => {
        element = angular.element('<uif-callout uif-type></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.callout - ' +
          '"" is not a valid value for uifType. It should be oobe or peek');
      }));

    it('main element has no type CSS and no error if uif-type not applied', inject(($log: angular.ILogService) => {
      let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
      expect(calloutElement[0]).not.toHaveClass('ms-Callout--Peek');
      expect(calloutElement[0]).not.toHaveClass('ms-Callout--OOBE');
      expect($log.error.length === 0).toBeTruthy();
    }));

    it(
      'main element has proper CSS and HTML when uif-close attribute present',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        element = angular.element('<uif-callout uif-close></uif-callout>');
        scope = $rootScope;
        $compile(element)(scope);
        scope.$digest();

        element = jQuery(element[0]);

        let calloutElement: JQuery = element.find('div.ms-Callout').eq(0);
        expect(calloutElement[0]).toHaveClass('ms-Callout--close');

        let closeButton: JQuery = calloutElement.find('button.ms-Callout-close').eq(0);
        expect(closeButton).toBeDefined();
        expect(closeButton).not.toBeNull();
        expect(closeButton).toHaveAttr('type', 'button');

        let buttonIcon: JQuery = closeButton.find('i').eq(0);
        expect(buttonIcon[0]).toHaveClass('ms-Icon');
        expect(buttonIcon[0]).toHaveClass('ms-Icon--x');
      }));

  });

  describe('callout visibility', () => {
    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService) => {
      element = angular.element('<uif-callout ng-show="vm.isOpen"></uif-callout>');
      scope = $rootScope.$new();

      scope.vm = {
        isOpen: false
      };
    }));

    it('intially callout is closed', inject(($compile: angular.ICompileService) => {
      $compile(element)(scope);
      scope.$digest();
      element = jQuery(element[0]);

      let calloutElement: JQuery = element.eq(0);
      expect(calloutElement[0]).toHaveClass('ng-hide');
    }));

    it('intially callout is open', inject(($compile: angular.ICompileService) => {
      $compile(element)(scope);
      scope.vm.isOpen = true;

      element = jQuery(element[0]);

      scope.$digest();

      let calloutElement: JQuery = element.eq(0);
      expect(calloutElement[0]).not.toHaveClass('ng-hide');
    }));

    it('callout opens/closes on uif-is-open change', inject(($compile: angular.ICompileService) => {
      scope.vm.isOpen = true;

      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      // close it
      scope.vm.isOpen = false;
      scope.$digest();

      let calloutElement: JQuery = element.eq(0);
      expect(calloutElement[0]).toHaveClass('ng-hide');

      // reopen
      scope.vm.isOpen = true;
      scope.$digest();

      calloutElement = element.find('div.ms-Callout').eq(0);
      expect(calloutElement[0]).not.toHaveClass('ng-hide');
    }));

    it('clicking close button closes callout', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout ng-show="vm.isOpen" uif-close></uif-callout>');

      scope.vm.isOpen = true;

      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      expect(element[0]).not.toHaveClass('ng-hide');

      let closeButton: JQuery = element.find('button.ms-Callout-close').eq(0);

      closeButton.click();
      scope.$digest();

      expect(element[0]).toHaveClass('ng-hide');
      expect(scope.vm.isOpen).toBeFalsy();
    }));

    it('should not close by itself when mouse is over callout', inject(($compile: angular.ICompileService) => {
      let jqlElement: angular.IAugmentedJQuery = angular.element('<uif-callout ng-show="vm.isOpen"></uif-callout>');

      scope.vm.isOpen = true;

      $compile(jqlElement)(scope);
      scope.$digest();

      element = jQuery(jqlElement);

      jqlElement.triggerHandler('mouseenter');
      scope.$digest();

      scope.vm.isOpen = false;
      scope.$digest();

      expect(element[0]).not.toHaveClass('ng-hide');

    }));

    it('should close by itself when mouse outside callout', inject(($compile: angular.ICompileService) => {
      let jqlElement: angular.IAugmentedJQuery = angular.element('<uif-callout ng-show="vm.isOpen"></uif-callout>');
      scope.vm.isOpen = true;
      $compile(jqlElement)(scope);
      scope.$digest();

      let jqueryElement: JQuery = jQuery(jqlElement[0]);
      expect(jqueryElement[0]).not.toHaveClass('ng-hide');

      jqlElement.triggerHandler('mouseenter');
      scope.$digest();
      expect(jqueryElement[0]).not.toHaveClass('ng-hide');

      jqlElement.triggerHandler('mouseleave');
      scope.$digest();
      expect(jqueryElement[0]).toHaveClass('ng-hide');

    }));

    it('should close itself when mouse over callout and close button clicked', inject(($compile: angular.ICompileService) => {
      let jqlElement: angular.IAugmentedJQuery = angular.element('<uif-callout ng-show="vm.isOpen" uif-close></uif-callout>');
      element = jQuery(jqlElement[0]);


      scope.vm.isOpen = true;
      $compile(element)(scope);
      scope.$digest();

      jqlElement.triggerHandler('mouseenter');
      scope.$digest();

      expect(element[0]).not.toHaveClass('ng-hide');

      let closeButton: JQuery = jqlElement.find('button').eq(0);
      closeButton.triggerHandler('click');
      scope.$digest();

      expect(element[0]).toHaveClass('ng-hide');
    }));

    it('should not close when mouse moves outside callout but there is close button', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout ng-show="vm.isOpen" uif-close></uif-callout>');

      scope.vm.isOpen = true;

      $compile(element)(scope);
      scope.$digest();

      element.triggerHandler('mouseenter');
      scope.$digest();

      expect(element[0]).not.toHaveClass('ng-hide');

      element.triggerHandler('mouseleave');
      scope.$digest();

      expect(element[0]).not.toHaveClass('ng-hide');
    }));
  });

  describe('callout header directive tests', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-header></uif-callout-header>');
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
    }));

    it('should be rendered as DIV', () => {
      let headerDiv: JQuery = element.children('div').first();

      expect(headerDiv.length === 1).toBeTruthy();
      expect(headerDiv[0].tagName === 'DIV').toBeTruthy();
    });

    it('should have proper CSS', () => {
      let headerDiv: JQuery = element.find('div').first();

      expect(headerDiv[0]).toHaveClass('ms-Callout-header');
    });

    it('main DIV should have child P', () => {
      let headerDiv: JQuery = element.find('div').first();
      let headerParagrah: JQuery = headerDiv.children().first();

      expect(headerParagrah[0].tagName === 'P').toBeTruthy();

    });

    it('should have proper CSS on title P', () => {
      let headerParagrah: JQuery = element.find('p').first();

      expect(headerParagrah[0]).toHaveClass('ms-Callout-title');
    });

    it('should trasnsclude inside P', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-header>Callout header test!</uif-callout-header>');
      $compile(element)(scope);

      element = jQuery(element[0]);

      let headerParagrah: JQuery = element.find('p.ms-Callout-title').eq(0);

      expect(headerParagrah[0].innerHTML.indexOf('Callout header test!')).toBeGreaterThan(-1);
    }));

  });

  describe('callout content directive tests', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-content></uif-callout-content>');
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
    }));

    it('should be rendered as DIV', () => {
      let headerDiv: JQuery = element.children('div').first();

      expect(headerDiv.length === 1).toBeTruthy();
      expect(headerDiv[0].tagName === 'DIV').toBeTruthy();
    });

    it('should have proper CSS', () => {
      let headerDiv: JQuery = element.find('div').first();

      expect(headerDiv[0]).toHaveClass('ms-Callout-content');
    });

    it('main DIV should have child P', () => {
      let headerDiv: JQuery = element.find('div').first();
      let headerParagrah: JQuery = headerDiv.children().first();

      expect(headerParagrah[0].tagName === 'P').toBeTruthy();

    });

    it('should have proper CSS on content P', () => {
      let headerParagrah: JQuery = element.find('p').first();

      expect(headerParagrah[0]).toHaveClass('ms-Callout-subText');
    });

    it('should trasnsclude inside P', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-content>Callout content test!</uif-callout-content>');
      $compile(element)(scope);

      element = jQuery(element[0]);

      let headerParagrah: JQuery = element.find('p.ms-Callout-subText').eq(0);

      expect(headerParagrah[0].innerHTML.indexOf('Callout content test!')).toBeGreaterThan(-1);
    }));

  });

  describe('callout actions directive tests', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-actions></uif-callout-actions>');
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
    }));

    it('should be rendered as DIV', () => {
      let headerDiv: JQuery = element.children('div').first();

      expect(headerDiv.length === 1).toBeTruthy();
      expect(headerDiv[0].tagName === 'DIV').toBeTruthy();
    });

    it('should have proper CSS', () => {
      let headerDiv: JQuery = element.find('div').first();

      expect(headerDiv[0]).toHaveClass('ms-Callout-actions');
    });

    it('should trasnsclude inside main element', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout-actions>Callout actions test!</uif-callout-actions>');
      $compile(element)(scope);

      element = jQuery(element[0]);

      expect(element[0].innerHTML.indexOf('Callout actions test!')).toBeGreaterThan(-1);
    }));

  });

  describe('callout directives rendering together', () => {
    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      element = angular.element('<uif-callout uif-arrow="left">' +
        '<uif-callout-header>All of your favorite people</uif-callout-header>' +
        '<uif-callout-content>Message body is optional. If help documentation is available</uif-callout-content>' +
        '<uif-callout-actions><a href="#" class="ms-Callout-link ms-Link ms-Link--hero">Learn more</a></uif-callout-actions>' +
        '</uif-callout>');

      scope = $rootScope.$new();
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
    }));

    it('should render ms-Callout-inner & header should be appended there', () => {
      let mainWrapper: JQuery = element.find('div.ms-Callout-main');
      let innerWrapper: JQuery = element.find('div.ms-Callout-inner');

      expect(mainWrapper.length === 1).toBeTruthy();
      expect(innerWrapper.length === 1).toBeTruthy();

      let header: JQuery = mainWrapper.children().eq(0);

      expect(header[0].tagName === 'UIF-CALLOUT-HEADER').toBeTruthy();
    });

    it('action buttons get proper CSS when uif-actiontext is used', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout uif-action-text>' +
        '<uif-callout-actions>' +
        '<uif-button uif-type="command">' +
        '<uif-icon uif-type="check"></uif-icon>' +
        'Save' +
        '</uif-button>' +
        '<uif-button uif-type="command">' +
        '<uif-icon uif-type="x"></uif-icon>' +
        'Cancel' +
        '</uif-button>' +
        '</uif-callout-actions>' +
        '</uif-callout>');

      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      let buttons: JQuery = element.find('button.ms-Button');
      expect(buttons.length).toBe(2);
      // expect(buttons).toHaveClass('ms-Callout-action');

      let firstButton: JQuery = buttons.eq(0);
      let secondButton: JQuery = buttons.eq(1);

      expect(firstButton).toHaveClass('ms-Callout-action');
      expect(secondButton).toHaveClass('ms-Callout-action');


      let firstButtonSpans: JQuery = firstButton.children('span');
      expect(firstButtonSpans.length).toBe(2);
      expect(firstButtonSpans).toHaveClass('ms-Callout-actionText');

      let secondButtonSpans: JQuery = secondButton.children('span');
      expect(secondButtonSpans.length).toBe(2);
      expect(secondButtonSpans).toHaveClass('ms-Callout-actionText');
    }));

    it('action links get proper CSS when uif-actiontext is used', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout uif-action-text>' +
        '<uif-callout-actions>' +
        '<uif-button uif-type="command" ng-href="#">' +
        '<uif-icon uif-type="x"></uif-icon>' +
        'Cancel' +
        '</uif-button>' +
        '</uif-callout-actions>' +
        '</uif-callout>');

      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      let actions: JQuery = element.find('a');
      expect(actions.length).toBe(1);
      // expect(buttons).toHaveClass('ms-Callout-action');

      let firstAction: JQuery = actions.eq(0);

      expect(firstAction).toHaveClass('ms-Callout-action');

      let firstActionSpans: JQuery = firstAction.children('span');
      expect(firstActionSpans.length).toBe(2);
      expect(firstActionSpans).toHaveClass('ms-Callout-actionText');

      // deepest span should not have the ms-Callout-actionText class
      let deepestSpan: JQuery = firstActionSpans.children('span');
      expect(deepestSpan.length).toBe(1);
      expect(deepestSpan).not.toHaveClass('ms-Callout-actionText');
    }));

    it('clicking close button inside callout actions directive closes callout', inject(($compile: angular.ICompileService) => {
      element = angular.element('<uif-callout ng-show="vm.isOpen" uif-close>' +
        '<uif-callout-actions>' +
        '<uif-button uif-type="command" ng-click="vm.isOpen = false">' +
        '<uif-icon uif-type="x"></uif-icon>' +
        'Cancel' +
        '</uif-button>' +
        '</uif-callout-actions>' +
        '</uif-callout>');

      // intially callout is open
      scope.vm = {
        isOpen: true
      };

      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);
      expect(element[0]).not.toHaveClass('ng-hide');

      // close
      let cancelButton: JQuery = element.find('button.ms-Button.ms-Button--command').eq(0);
      cancelButton.click();
      scope.$digest();

      let calloutElement: JQuery = element.eq(0);
      expect(element[0]).toHaveClass('ng-hide');
    }));

  });

});

