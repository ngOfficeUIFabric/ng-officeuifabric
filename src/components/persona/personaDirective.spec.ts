'use strict';

import * as ng from 'angular';

describe('uif-persona', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.persona');
  });

  describe('<uif-persona-text /> directives', () => {

    describe('HTML rendering', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-persona-primary-text>Alton Lafferty</uif-persona-primary-text>' +
          '<uif-persona-secondary-text>Interior Designer, Contoso</uif-persona-secondary-text>' +
          '<uif-persona-tertiary-text>Office: 7/1234</uif-persona-tertiary-text>' +
          '<uif-persona-optional-text>Available - Video capable</uif-persona-optional-text>');

        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        scope.$digest();
        element = jQuery(liteElement);

      }));

      it('should not replace the markup', () => {
        expect(element[0].tagName === 'UIF-PERSONA-PRIMARY-TEXT').toBeTruthy();
        expect(element[1].tagName === 'UIF-PERSONA-SECONDARY-TEXT').toBeTruthy();
        expect(element[2].tagName === 'UIF-PERSONA-TERTIARY-TEXT').toBeTruthy();
        expect(element[3].tagName === 'UIF-PERSONA-OPTIONAL-TEXT').toBeTruthy();
      });

      it('should render as DIV in directive template', () => {
        for (let i: number = 0; i < element.length; i++) {
          expect(element.eq(i).children().first()[0].tagName === 'DIV').toBeTruthy();
        }
      });

      it('should have proper CSS applied', () => {
        expect(element.eq(0).children('div').first()).toHaveClass('ms-Persona-primaryText');
        expect(element.eq(1).children('div').first()).toHaveClass('ms-Persona-secondaryText');
        expect(element.eq(2).children('div').first()).toHaveClass('ms-Persona-tertiaryText');
        expect(element.eq(3).children('div').first()).toHaveClass('ms-Persona-optionalText');
      });

      it('should transclude content', () => {
        expect(element.eq(0).html()).toContain('Alton Lafferty');
        expect(element.eq(1).html()).toContain('Interior Designer, Contoso');
        expect(element.eq(2).html()).toContain('Office: 7/1234');
        expect(element.eq(3).html()).toContain('Available - Video capable');
      });

    });

  });

  describe('<uif-persona-initials /> directive', () => {
    describe('HTML rendering', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;
      let _rootScope: ng.IRootScopeService;
      let _compile: ng.ICompileService;

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        _rootScope = $rootScope;
        _compile = $compile;

        liteElement = ng.element('<uif-persona><uif-persona-initials>AL</uif-persona-initials></uif-persona>');

        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        scope.$digest();
        element = jQuery(liteElement);

      }));

      it('should not replace the markup', () => {
        let initials: JQuery = element.find('uif-persona-initials');
        expect(initials.length === 1).toBeTruthy();

      });

      it('should render as DIV in directive template', () => {
        expect(element.eq(0).children().first()[0].tagName === 'DIV').toBeTruthy();
      });

      it('should have proper CSS applied', () => {
        let initials: JQuery = element.find('div.ms-Persona-imageArea').eq(0).find('div').first();
        expect(initials).toHaveClass('ms-Persona-initials');
        expect(initials).toHaveClass('ms-Persona-initials--blue');
      });

      it('should transclude content', () => {
        expect(element.eq(0).html()).toContain('AL');
      });


      it('should render proper color for initials', () => {
        let expectedClasses: string[] = [
          'ms-Persona-initials--lightBlue',
          'ms-Persona-initials--blue',
          'ms-Persona-initials--darkBlue',
          'ms-Persona-initials--teal',
          'ms-Persona-initials--lightGreen',
          'ms-Persona-initials--green',
          'ms-Persona-initials--darkGreen',
          'ms-Persona-initials--lightPink',
          'ms-Persona-initials--pink',
          'ms-Persona-initials--magenta',
          'ms-Persona-initials--purple',
          'ms-Persona-initials--black',
          'ms-Persona-initials--orange',
          'ms-Persona-initials--red',
          'ms-Persona-initials--darkRed'
        ];

        let initials: ng.IAugmentedJQuery[] = [
          ng.element('<uif-persona><uif-persona-initials uif-color="lightBlue">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="blue">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="darkBlue">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="teal">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="lightGreen">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="green">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="darkGreen">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="lightPink">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="pink">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="magenta">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="purple">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="black">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="orange">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="red">AL</uif-persona-initials></uif-persona>'),
          ng.element('<uif-persona><uif-persona-initials uif-color="darkRed">AL</uif-persona-initials></uif-persona>')
        ];

        scope = _rootScope.$new();

        for (let i: number = 0; i < initials.length; i++) {
          _compile(initials[i])(scope);
        }

        scope.$digest();

        let initialsElement: JQuery;
        let initialsDiv: JQuery;

        for (let i: number = 0; i < initials.length; i++) {
          initialsElement = jQuery(initials[i]);
          initialsDiv = initialsElement.find('.ms-Persona-initials').first();
          expect(initialsDiv).toHaveClass(expectedClasses[i]);
        }
      });

      it('should have blue color if uifColor not specified', () => {
        expect(element.find('div.ms-Persona-initials').first()).toHaveClass('ms-Persona-initials--blue');
      });

      it('should validate initials color', inject(($log: ng.ILogService) => {
        liteElement = ng.element('<uif-persona><uif-persona-initials uif-color="invalid">AL</uif-persona-initials></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        let expectedError: string = 'Error [ngOfficeUiFabric] officeuifabric.components.persona - "invalid"' +
          ' is not a valid value for uifColor.' +
          ' It should be lightBlue, blue, darkBlue, teal, lightGreen, green,' +
          ' darkGreen, lightPink, pink, magenta, purple, black, orange, red or darkRed.';

        expect($log.error.logs.length === 1).toBeTruthy();
        expect($log.error.logs[0]).toContain(expectedError);
      }));

    });
  });

  describe('<uif-persona /> directive', () => {
    let liteElement: ng.IAugmentedJQuery;
    let element: JQuery;
    let scope: ng.IScope;
    let _rootScope: ng.IRootScopeService;
    let _compile: ng.ICompileService;

    describe('HTML rendering', () => {
      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        _rootScope = $rootScope;
        _compile = $compile;

        liteElement = ng.element('<uif-persona uif-style="round" uif-size="xlarge"></uif-persona>');
        scope = _rootScope.$new();
        _compile(liteElement)(scope);
        scope.$digest();

        element = jQuery(liteElement);

      }));

      it('renders as DIV with proper CSS', () => {
        // let personaDiv: JQuery = element.children('div');
        expect(element[0].tagName === 'DIV').toBeTruthy();
        expect(element).toHaveClass('ms-Persona');
      });

      it('should have CSS for size', () => {
        let personas: ng.IAugmentedJQuery[] = [
          ng.element('<uif-persona uif-size="tiny"></uif-persona>'),
          ng.element('<uif-persona uif-size="xsmall"></uif-persona>'),
          ng.element('<uif-persona uif-size="small"></uif-persona>'),
          ng.element('<uif-persona uif-size="large"></uif-persona>'),
          ng.element('<uif-persona uif-size="xlarge"></uif-persona>')
        ];

        let expectedClass: string[] = ['ms-Persona--tiny', 'ms-Persona--xs', 'ms-Persona--sm', 'ms-Persona--lg', 'ms-Persona--xl'];

        for (let i: number = 0; i < personas.length; i++) {
          _compile(personas[i])(scope);
        }
        scope.$digest();

        let persona: JQuery;
        // let innerDiv: JQuery;

        for (let i: number = 0; i < personas.length; i++) {
          persona = jQuery(personas[i]);
          // innerDiv = persona.find('div.ms-Persona');
          expect(persona).toHaveClass(expectedClass[i]);
        }
      });

      it('should have no CSS for medium size', () => {
        liteElement = ng.element('<uif-persona uif-size="medium"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        element = jQuery(liteElement);
        // let innerDiv: JQuery = element.find('div.ms-Persona');

        let notExpectedClasses: string[] = ['ms-Persona--tiny', 'ms-Persona--xs', 'ms-Persona--sm', 'ms-Persona--lg', 'ms-Persona--xl'];

        ng.forEach(notExpectedClasses, (className: string) => {
          expect(element).not.toHaveClass(className);
        });
      });

      it('should log error when invalid size is used', inject(($log: ng.ILogService) => {
        liteElement = ng.element('<uif-persona uif-size="invalid"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        expect($log.error.logs.length === 1).toBeTruthy();

        let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.persona - "invalid"' +
          ' is not a valid value for uifSize. It should be tiny, xsmall, small, medium, large, xlarge.';

        expect($log.error.logs[0]).toContain(expectedMessage);

      }));

      it('should have proper CSS when uif-style is round', () => {
        expect(element).not.toHaveClass('ms-Persona--square');
      });

      it('should have proper CSS when uif-style is square', () => {
        liteElement = ng.element('<uif-persona uif-style="square"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        element = jQuery(liteElement);

        expect(element).toHaveClass('ms-Persona--square');
      });

      it('should log error when uif-style is incorrect', inject(($log: ng.ILogService) => {
        liteElement = ng.element('<uif-persona uif-style="invalid"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        expect($log.error.logs.length === 1).toBeTruthy();

        let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.persona - "invalid"' +
          ' is not a valid value for uifStyle. It should be round or square.';

        expect($log.error.logs[0]).toContain(expectedMessage);
      }));

      it('should have image area with proper CSS', () => {
        let imageArea: JQuery = element.children().first();

        expect(imageArea.length === 1).toBeTruthy();
        expect(imageArea[0].tagName === 'DIV');
        expect(imageArea).toHaveClass('ms-Persona-imageArea');
      });

      it('should have IMG with proper source and CSS', () => {
        liteElement = ng.element('<uif-persona uif-image-url="' +
          'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();
        element = jQuery(liteElement);

        let imageArea: JQuery = element.find('div.ms-Persona-imageArea');
        let image: JQuery = imageArea.find('img');

        expect(image.length === 1).toBeTruthy();
        expect(image).toHaveClass('ms-Persona-image');
        expect(image).toHaveAttr('src', 'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/' +
          'persona/Persona.Person2.png');

      });

      it('should not render IMG tag when picture URL not set', () => {
        let image: JQuery = element.find('img');
        expect(image.length === 0).toBeTruthy();
      });

      it('should not render image area when size is tiny', () => {
        liteElement = ng.element('<uif-persona uif-size="tiny"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        element = jQuery(liteElement);

        let imageArea: JQuery = element.find('div.ms-Persona-imageArea');

        expect(imageArea).toHaveClass('ng-hide');
      });

      it('should have presence DIV with proper CSS', () => {
        let presence: JQuery = element.find('div.ms-Persona-presence');
        expect(presence.length === 1).toBeTruthy();

        let parent: JQuery = presence.parent();
        expect(parent).toHaveClass('ms-Persona');

      });

      it('should have proper CSS class for presence', () => {
        let personas: ng.IAugmentedJQuery[] = [
          ng.element('<uif-persona uif-presence="available"></uif-persona>'),
          ng.element('<uif-persona uif-presence="away"></uif-persona>'),
          ng.element('<uif-persona uif-presence="blocked"></uif-persona>'),
          ng.element('<uif-persona uif-presence="busy"></uif-persona>'),
          ng.element('<uif-persona uif-presence="dnd"></uif-persona>'),
          ng.element('<uif-persona uif-presence="offline"></uif-persona>')
        ];

        for (let i: number = 0; i < personas.length; i++) {
          _compile(personas[i])(scope);
        }

        scope.$digest();

        let expectedClasses: string[] = [
          'ms-Persona--available',
          'ms-Persona--away',
          'ms-Persona--blocked',
          'ms-Persona--busy',
          'ms-Persona--dnd',
          'ms-Persona--offline'
        ];

        let personaDiv: JQuery;

        for (let i: number = 0; i < personas.length; i++) {
          personaDiv = jQuery(personas[i]);

          // let personaDiv: JQuery = persona.find('div.ms-Persona');
          expect(personaDiv.length === 1).toBeTruthy();
          expect(personaDiv).toHaveClass(expectedClasses[i]);
        }

      });

      it('should have presence "offline" if uif-presence not set', () => {
        // let personaDiv: JQuery = element.find('div.ms-Persona');
        // expect(personaDiv.length === 1).toBeTruthy();
        expect(element).toHaveClass('ms-Persona--offline');
      });

      it('should validate presence attribute', inject(($log: ng.ILogService) => {
        liteElement = ng.element('<uif-persona uif-presence="invalid"></uif-persona>');
        _compile(liteElement)(scope);
        scope.$digest();

        expect($log.error.logs.length === 1).toBeTruthy();

        let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.persona - "invalid"' +
          ' is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.';

        expect($log.error.logs[0]).toContain(expectedMessage);
      }));

      it('should have details DIV with proper CSS', () => {
        let personaDetails: JQuery = element.find('div.ms-Persona-details');

        expect(personaDetails.length === 1).toBeTruthy();
        expect(personaDetails.parent()).toHaveClass('ms-Persona');
      });

      it('should transclude uif-persona-primary-text inside details DIV', () => {
        liteElement = ng.element('<uif-persona uif-presence="available">' +
          '<uif-persona-primary-text>Alton Lafferty</uif-persona-primary-text>' +
          '<uif-persona-secondary-text>Interior Designer, Contoso</uif-persona-secondary-text>' +
          '<uif-persona-tertiary-text>Office: 7/1234</uif-persona-tertiary-text>' +
          '<uif-persona-optional-text>Available - Video capable</uif-persona-optional-text>' +
          '</uif-persona>');
        _compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();

        let detailsDiv: JQuery = element.find('div.ms-Persona-details');
        expect(detailsDiv.children().length === 4).toBeTruthy();

        let textDivs: JQuery = detailsDiv.find('div');
        expect(textDivs.eq(0)).toHaveClass('ms-Persona-primaryText');
        expect(textDivs.eq(1)).toHaveClass('ms-Persona-secondaryText');
        expect(textDivs.eq(2)).toHaveClass('ms-Persona-tertiaryText');
        expect(textDivs.eq(3)).toHaveClass('ms-Persona-optionalText');
      });

      it('should transclude uif-persona-initials into image area', () => {
        liteElement = ng.element('<uif-persona uif-presence="available">' +
          '<uif-persona-initials>AL</uif-persona-initials>' +
          '</uif-persona>');
        _compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();

        let imageArea: JQuery = element.find('div.ms-Persona-imageArea');
        let initials: JQuery = imageArea.find('div.ms-Persona-initials');

        expect(initials.length === 1).toBeTruthy();

      });

    });
  });
});
