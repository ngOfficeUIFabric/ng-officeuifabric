describe('choicefieldDirective <uif-breadcrumb />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.breadcrumb');
    });

    it('should render correct html', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let breadcrumb: JQuery = $compile('<uif-breadcrumb>' +
        '<uif-breadcrumb-link ng-href="\'http://github1.com\'">GitHub1</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github2.com\'">GitHub2</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github3.com\'">GitHub3</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github4.com\'">GitHub4</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link uif-current>Current</uif-breadcrumb-link>' +
        '</uif-breadcrumb>')($scope);
        $scope.$digest();
        breadcrumb = jQuery(breadcrumb[0]);

        let links: JQuery = breadcrumb.find('.ms-Breadcrumb').children();
        let currentLarge: JQuery = links.first();

        expect(currentLarge).toHaveClass('ms-Breadcrumb-currentLarge');
        expect(currentLarge.html()).toBe('Current');

        let current: JQuery = links.last();
        expect(current).toHaveClass('ms-Breadcrumb-current');
        expect(current.html()).toBe('Current');

        for (let i: number = 1; i < links.length - 1; i++) {
          let link: JQuery = $(links.get(i));
          expect(link.html()).toBe('GitHub' + i);
        }
    }));

    it('should render correct html without an active link', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let breadcrumb: JQuery = $compile('<uif-breadcrumb>' +
        '<uif-breadcrumb-link ng-href="\'http://github1.com\'">GitHub1</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github2.com\'">GitHub2</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github3.com\'">GitHub3</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link ng-href="\'http://github4.com\'">GitHub4</uif-breadcrumb-link>' +
        '</uif-breadcrumb>')($scope);
        $scope.$digest();
        breadcrumb = jQuery(breadcrumb[0]);

        let links: JQuery = breadcrumb.find('.ms-Breadcrumb').children();

        for (let i: number = 0; i < links.length; i++) {
          let link: JQuery = $(links.get(i));
          expect(link.html()).toBe('GitHub' + (i + 1));
        }
    }));

});

