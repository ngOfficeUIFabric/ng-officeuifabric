'use strict';

import * as ng from 'angular';

describe('uif-persona-card', () => {

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.personacard');
  });

  describe('<uif-persona-card-detail-label></uif-persona-card-detail-label>', () => {

    describe('HTML rendering', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-persona-card-detail-label>Sample Label</uif-persona-card-detail-label>');
        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
      }));

      it('should render as SPAN', () => {
        expect(element[0].tagName === 'SPAN').toBeTruthy();
      });

      it('should have proper CSS applied', () => {
        expect(element).toHaveClass('ms-PersonaCard-detailLabel');
      });

      it('should transclude content', () => {
        expect(element.html()).toContain('Sample Label');
      });

    });

  });

  describe('<uif-persona-card-detail-line></uif-persona-card-detail-line>', () => {

    describe('HTML rendering', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element(`
          <uif-persona-card-detail-line>
            <uif-persona-card-detail-label>Skype:</uif-persona-card-detailLabel> 555 123 456
          </uif-persona-card-detail-line>`);
        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        scope.$digest();
        element = jQuery(liteElement[0]);
      }));

      it('should render as DIV', () => {
        expect(element[0].tagName === 'DIV').toBeTruthy();
      });

      it('should have proper CSS applied', () => {
        expect(element).toHaveClass('ms-PersonaCard-detailLine');
      });

      it('should transclude content', () => {
        let label: JQuery = element.find('span.ms-PersonaCard-detailLabel');

        expect(label.length === 1).toBeTruthy();
        expect(element.html()).toContain('555 123 456');
      });

    });

  });

  describe('<uif-persona-card-*-text /> directives', () => {

    describe('HTML rendering', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-persona-card-primary-text>Alton Lafferty</uif-persona-card-primary-text>' +
        '<uif-persona-card-secondary-text>Interior Designer, Contoso</uif-persona-card-secondary-text>' +
        '<uif-persona-card-tertiary-text>Office: 7/1234</uif-persona-card-tertiary-text>' +
        '<uif-persona-card-optional-text>Available - Video capable</uif-persona-card-optional-text>');

        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        scope.$digest();
        element = jQuery(liteElement);

      }));

      it('should not replace the markup', () => {
          expect(element[0].tagName === 'UIF-PERSONA-CARD-PRIMARY-TEXT').toBeTruthy();
          expect(element[1].tagName === 'UIF-PERSONA-CARD-SECONDARY-TEXT').toBeTruthy();
          expect(element[2].tagName === 'UIF-PERSONA-CARD-TERTIARY-TEXT').toBeTruthy();
          expect(element[3].tagName === 'UIF-PERSONA-CARD-OPTIONAL-TEXT').toBeTruthy();
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

  describe('<uif-persona-card /> directive', () => {
      let liteElement: ng.IAugmentedJQuery;
      let element: JQuery;
      let scope: ng.IScope;
      let _rootScope: ng.IRootScopeService;
      let _compile: ng.ICompileService;

      describe('HTML rendering', () => {

        beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
          _rootScope = $rootScope;
          _compile = $compile;

          liteElement = ng.element('<uif-persona-card uif-style="round" uif-size="xlarge"></uif-persona-card>');
          scope = _rootScope.$new();
          _compile(liteElement)(scope);
          scope.$digest();

          element = jQuery(liteElement);

        }));

        it('renders as DIV with proper CSS', () => {
          expect(element[0].tagName === 'DIV').toBeTruthy();
          expect(element[0]).toHaveClass('ms-PersonaCard');
        });

        it('renders inner DIV (ms-PersonaCard-persona) with proper CSS', () => {
          let innerDiv: JQuery = element.children('div').first();
          expect(innerDiv).toHaveClass('ms-PersonaCard-persona');
        });

        it('renders inner DIV (ms-Persona) with proper CSS', () => {
          let innerDiv: JQuery = element.find('div.ms-Persona');
          expect(innerDiv.length === 1).toBeTruthy();
          expect(innerDiv).toHaveClass('ms-Persona');

          let parentDiv: JQuery = innerDiv.parent();
          expect(parentDiv).toHaveClass('ms-PersonaCard-persona');
        });

        it('ms-Persona DIV has CSS for size', () => {
          let personaCards: ng.IAugmentedJQuery[] = [
            ng.element('<uif-persona-card uif-size="xsmall"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-size="small"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-size="large"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-size="xlarge"></uif-persona-card>')
          ];

          let expectedClass: string[] = ['ms-Persona--xs', 'ms-Persona--sm', 'ms-Persona--lg', 'ms-Persona--xl'];

          for (let i: number = 0; i < personaCards.length; i++) {
            _compile(personaCards[i])(scope);
          }
          scope.$digest();

          let personaCard: JQuery;
          let innerDiv: JQuery;

          for (let i: number = 0; i < personaCards.length; i++) {
            personaCard = jQuery(personaCards[i]);
            innerDiv = personaCard.find('div.ms-Persona');
            expect(innerDiv).toHaveClass(expectedClass[i]);
          }

        });

        it('ms-Persona DIV has no CSS for medium size', () => {
          liteElement = ng.element('<uif-persona-card uif-size="medium"></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          element = jQuery(liteElement);
          let innerDiv: JQuery = element.find('div.ms-Persona');

          let notExpectedClasses: string[] = ['ms-Persona--xs', 'ms-Persona--sm', 'ms-Persona--lg', 'ms-Persona--xl'];

          ng.forEach(notExpectedClasses, (className: string) => {
            expect(innerDiv).not.toHaveClass(className);
          });
        });

        it('should log error when invalid size is used', inject(($log: ng.ILogService) => {
          liteElement = ng.element('<uif-persona-card uif-size="invalid"></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          expect($log.error.logs.length === 1).toBeTruthy();

          let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.personacard - "invalid"' +
            ' is not a valid value for uifSize. It should be xsmall, small, medium, large, xlarge.';

          expect($log.error.logs[0]).toContain(expectedMessage);

        }));

        it('ms-Persona DIV has no CSS for size when uif-size not specified', () => {
          liteElement = ng.element('<uif-persona-card></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          element = jQuery(liteElement);
          let innerDiv: JQuery = element.find('div.ms-Persona');

          let notExpectedClasses: string[] = ['ms-Persona--xs', 'ms-Persona--sm', 'ms-Persona--lg', 'ms-Persona--xl'];

          ng.forEach(notExpectedClasses, (className: string) => {
            expect(innerDiv).not.toHaveClass(className);
          });
        });

        it('main & ms-Persona DIV have proper CSS when uif-style is round', () => {
            expect(element).not.toHaveClass('ms-PersonaCard--square');

            let personaDiv: JQuery = element.find('div.ms-Persona');
            expect(personaDiv).not.toHaveClass('ms-PersonaCard--square');
        });

        it('main & ms-Persona DIV has proper CSS when uif-style is square', () => {
          liteElement = ng.element('<uif-persona-card uif-style="square"></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          element = jQuery(liteElement);

          expect(element).toHaveClass('ms-PersonaCard--square');
          let personaDiv: JQuery = element.find('div.ms-Persona');
          expect(personaDiv).toHaveClass('ms-Persona--square');
        });

        it('should log error when uif-style is incorrect', inject(($log: ng.ILogService) => {
          liteElement = ng.element('<uif-persona-card uif-style="invalid"></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          expect($log.error.logs.length === 1).toBeTruthy();

          let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.personacard - "invalid"' +
            ' is not a valid value for uifStyle. It should be round or square.';

          expect($log.error.logs[0]).toContain(expectedMessage);
        }));

        it('should have image area with proper CSS', () => {
          let imageArea: JQuery = element.find('div.ms-Persona').children().first();

          expect(imageArea.length === 1).toBeTruthy();
          expect(imageArea[0].tagName === 'DIV');
          expect(imageArea).toHaveClass('ms-Persona-imageArea');
        });

        it('should have IMG with proper source and CSS', () => {
          liteElement = ng.element('<uif-persona-card uif-image-url="' +
            'http://dev.office.com/Modules/DevOffice.Fabric/Fabric/components/persona/Persona.Person2.png"></uif-persona-card>');
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

        it('should have icon placeholder with proper CSS', () => {
          let placeholderIcon: JQuery = element.find('div.ms-Persona-imageArea uif-icon');
          expect(placeholderIcon.length === 1).toBeTruthy();
          expect(placeholderIcon).toHaveClass('ms-Persona-placeholder');

        });

        it('should not render IMG tag when picture URL not set', () => {
          let image: JQuery = element.find('img');
          expect(image.length === 0 ).toBeTruthy();
        });

        it('should have presence DIV with proper CSS', () => {
          let presence: JQuery = element.find('div.ms-Persona-presence');
          expect(presence.length === 1).toBeTruthy();

          let parent: JQuery = presence.parent();
          expect(parent).toHaveClass('ms-Persona');

        });

        it('should have proper CSS class for presence', () => {
          let personaCards: ng.IAugmentedJQuery[] = [
            ng.element('<uif-persona-card uif-presence="available"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-presence="away"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-presence="blocked"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-presence="busy"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-presence="dnd"></uif-persona-card>'),
            ng.element('<uif-persona-card uif-presence="offline"></uif-persona-card>')
          ];

          for (let i: number = 0; i < personaCards.length; i++) {
            _compile(personaCards[i])(scope);
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

          let personaCard: JQuery;

          for (let i: number = 0; i < personaCards.length; i++) {
            personaCard = jQuery(personaCards[i]);

            let personaDiv: JQuery = personaCard.find('div.ms-Persona');
            expect(personaDiv.length === 1).toBeTruthy();
            expect(personaDiv).toHaveClass(expectedClasses[i]);
          }

        });

        it('should have presence "offline" if uif-presence not set', () => {
            let personaDiv: JQuery = element.find('div.ms-Persona');
            expect(personaDiv.length === 1).toBeTruthy();
            expect(personaDiv).toHaveClass('ms-Persona--offline');
        });

        it('should validate presence attribute', inject(($log: ng.ILogService) => {
          liteElement = ng.element('<uif-persona-card uif-presence="invalid"></uif-persona-card>');
          _compile(liteElement)(scope);
          scope.$digest();

          expect($log.error.logs.length === 1).toBeTruthy();

          let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.personacard - "invalid"' +
            ' is not a valid value for uifPresence. It should be available, away, blocked, busy, dnd or offline.';

          expect($log.error.logs[0]).toContain(expectedMessage);
        }));

        it('should have details DIV with proper CSS', () => {
          let personaDetails: JQuery = element.find('div.ms-Persona-details');

          expect(personaDetails.length === 1).toBeTruthy();
          expect(personaDetails.parent()).toHaveClass('ms-Persona');
        });

        it('should transclude uif-persona-card-primary-text inside details DIV', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
          '<uif-persona-card-primary-text>Alton Lafferty</uif-persona-card-primary-text>' +
          '<uif-persona-card-secondary-text>Interior Designer, Contoso</uif-persona-card-secondary-text>' +
          '<uif-persona-card-tertiary-text>Office: 7/1234</uif-persona-card-tertiary-text>' +
          '<uif-persona-card-optional-text>Available - Video capable</uif-persona-card-optional-text>' +
          '</uif-persona-card>');
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

      });

      it('should have actions container', () => {
        let actionsContainer: JQuery = element.find('ul.ms-PersonaCard-actions');

        expect(actionsContainer.length === 1).toBeTruthy();
        expect(actionsContainer.parent()).toHaveClass('ms-PersonaCard');
      });

      it('should have actions body container', () => {
        let actionsContainer: JQuery = element.find('div.ms-PersonaCard-actionDetailBox');
        expect(actionsContainer.length === 1).toBeTruthy();
      });

      it('detail list should have proper CSS class initially', () => {
        let actionDetailBox: JQuery = element.find('div.ms-PersonaCard-actionDetailBox');
        let actionDetailList: JQuery = actionDetailBox.children('ul');

        expect(actionDetailList.length === 1).toBeTruthy();
        expect(actionDetailList).toHaveClass('ms-PersonaCard-detailChat');

      });

      describe('<uif-persona-card-action /> directive', () => {

        beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
          _rootScope = $rootScope;
          _compile = $compile;

          scope = $rootScope.$new();

          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
            '<uif-persona-card-action uif-icon="video" uif-placeholder="regular">' +
              '<p>This should be transcluded.</p>' +
            '</uif-persona-card-action>' +
          '</uif-persona-card>');

          _compile(liteElement)(scope);
          scope.$digest();
          element = jQuery(liteElement[0]);

        }));

        it('should have UL inside action detail box', () => {
          let actionDetailList: JQuery = element.find('div.ms-PersonaCard-actionDetailBox ul').first();

          expect(actionDetailList.length === 1).toBeTruthy();
          expect(actionDetailList[0].tagName === 'UL').toBeTruthy();
        });


        it('should render as LI element with proper CSS', () => {

          let actionElement: JQuery = element.find('div.ms-PersonaCard-actionDetailBox ul').find('li').first();

          expect(actionElement.length === 1).toBeTruthy();

          expect(actionElement).toHaveClass('ms-PersonaCard-actionDetails');

        });

        it('should transclude content', () => {

          element = jQuery(liteElement[0]);
          scope.$digest();

          let listElement: JQuery = element.find('li.ms-PersonaCard-actionDetails');
          expect(listElement.length === 1).toBeTruthy();

          let paragraph: JQuery = listElement.find('p');
          expect(paragraph.length === 1).toBeTruthy();
          expect(paragraph.text()).toContain('This should be transcluded.');

        });

        it('should throw error on invalid placeholder', inject(($log: ng.ILogService) => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
            '<uif-persona-card-action uif-icon="video" uif-placeholder="invalid"></uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);

          scope.$digest();

          expect($log.error.logs.length === 1).toBeTruthy();

          let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.personacard - "invalid"' +
            ' is not a valid value for uifPlaceholder. It should be regular, topright or overflow.';

          expect($log.error.logs[0]).toContain(expectedMessage);

        }));

        it('should add list item to actions UL', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
            '<uif-persona-card-action uif-icon="video" uif-placeholder="regular">' +
              'This should be transcluded.' +
            '</uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);
          element = jQuery(liteElement[0]);
          scope.$digest();

          let actions: JQuery = element.find('ul.ms-PersonaCard-actions');
          expect(actions.children().length === 1).toBeTruthy();

          let action: JQuery =  actions.children().first();
          expect(action[0].tagName === 'LI').toBeTruthy();
          expect(action).toHaveClass('ms-PersonaCard-action');

          let icon: JQuery = action.find('uif-icon');
          expect(icon.length === 1);
          expect(icon).toHaveAttr('uif-type', 'video');
        });

        it('actions in detail box should have detail CSS', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
           '<uif-persona-card-action uif-icon="chat" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="phone" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="video" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="mail" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="org" uif-placeholder="topright"></uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);
          element = jQuery(liteElement[0]);
          scope.$digest();

          let action: JQuery = element.find('li.ms-PersonaCard-actionDetails');
          expect(action.length === 5).toBeTruthy();

          for (let i: number = 0; i < 4; i++) {
            let expectedClass: string = 'detail-' + (i + 1);
            expect(action[i]).toHaveClass(expectedClass);
          }

          // orgchart should have 'detail-5'
          expect(action.eq(4)).toHaveClass('detail-5');

        });

        it('should render overflow action in actions div', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
           '<uif-persona-card-action uif-placeholder="overflow">View profile</uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);
          element = jQuery(liteElement[0]);
          scope.$digest();

          let actions: JQuery = element.find('ul.ms-PersonaCard-actions');
          expect(actions.children().length === 1).toBeTruthy();

          let action: JQuery = actions.find('li').first();
          expect(action).toHaveClass('ms-PersonaCard-overflow');
          expect(action).not.toHaveClass('ms-PersonaCard-action');

          let icon: JQuery = action.find('i');
          expect(icon.length === 0).toBeTruthy();

        });

        it('overflow action should not be in action details box', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
           '<uif-persona-card-action uif-placeholder="overflow">View profile</uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);
          element = jQuery(liteElement[0]);
          scope.$digest();

          let actions: JQuery = element.find('div.ms-PersonaCard-actionDetailBox').children('ul');
          expect(actions.length === 1).toBeTruthy();
          expect(actions.children().length === 0 ).toBeTruthy();

        });

        it('overflow action text is transcluded', () => {
          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
           '<uif-persona-card-action uif-placeholder="overflow">View profile</uif-persona-card-action>' +
          '</uif-persona-card>');
          _compile(liteElement)(scope);
          element = jQuery(liteElement[0]);
          scope.$digest();

          let actions: JQuery = element.find('ul.ms-PersonaCard-actions');

          let action: JQuery = actions.find('li.ms-PersonaCard-overflow').first();

          expect(action[0].innerHTML).toContain('View profile');
        });
      });

      describe('<uif-persona-card /> interactins', () => {

        beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
          _rootScope = $rootScope;
          _compile = $compile;

          scope = $rootScope.$new();

          liteElement = ng.element('<uif-persona-card uif-presence="available">' +
           '<uif-persona-card-action uif-icon="chat" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="phone" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="video" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="mail" uif-placeholder="regular"></uif-persona-card-action>' +
           '<uif-persona-card-action uif-icon="org" uif-placeholder="topright"></uif-persona-card-action>' +
          '</uif-persona-card>');

          _compile(liteElement)(scope);
          scope.$digest();
          element = jQuery(liteElement[0]);

        }));

        it('initially first action should be active', () => {
          let actions: JQuery = element.find('ul.ms-PersonaCard-actions li');

          expect(actions[0]).toHaveClass('is-active');

          for (let i: number = 1; i < actions.length; i++ ) {
            expect(actions[i]).not.toHaveClass('is-active');
          }

        });

        it('should change active action on click', () => {
          let firstAction: JQuery = element.find('ul.ms-PersonaCard-actions li').eq(0);
          let thirdAction: JQuery = element.find('ul.ms-PersonaCard-actions li').eq(2);
          let actionDetailList: JQuery = element.find('div.ms-PersonaCard-actionDetailBox').children('ul').first();

          expect(firstAction).toHaveClass('is-active');
          expect(thirdAction).not.toHaveClass('is-active');
          expect(actionDetailList).toHaveClass('ms-PersonaCard-detailChat');

          thirdAction.click();
          scope.$digest();

          firstAction = element.find('ul.ms-PersonaCard-actions li').eq(0);
          thirdAction = element.find('ul.ms-PersonaCard-actions li').eq(2);
          expect(actionDetailList).toHaveClass('ms-PersonaCard-detailVideo');

          expect(firstAction).not.toHaveClass('is-active');
          expect(thirdAction).toHaveClass('is-active');
        });


      });

  });

});
