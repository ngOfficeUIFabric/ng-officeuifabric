describe('choicefieldDirective <uif-breadcrumb />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.breadcrumb');
    });

    it('should render correct html', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();

        let breadcrumb: JQuery = $compile('<uif-breadcrumb>' +
        '<uif-breadcrumb-link ng-href="\'http://github.com\'">GitHub</uif-breadcrumb-link>' +
        '<uif-breadcrumb-link uif-current="XXX" current="TEST">RolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarmRolandOldengarm</uif-breadcrumb-link>' +
        '</uif-breadcrumb>')($scope);
        $scope.$digest();
        breadcrumb = jQuery(breadcrumb[0]);
        
        console.log(breadcrumb.html());
    }));

});

