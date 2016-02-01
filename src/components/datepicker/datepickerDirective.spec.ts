describe('toggleDirective: <uif-toggle />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.datepicker');
    });

    // let datepicker1: JQuery;
    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
        // let $scope: ng.IScope = $rootScope.$new();
        // angular.mock.module('officeuifabric.components.toggle');
        // datepicker1 = $compile('<uif-textfield placeholder="Placeholder contents"></uif-textfield>')($scope);
        // $scope.$apply();
        // datepicker1 = jQuery(datepicker1[0]);
    }));

    it('should have unique ids', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        console.log('LINK');
    }));
});
