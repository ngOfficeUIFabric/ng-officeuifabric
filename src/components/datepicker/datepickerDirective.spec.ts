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

    it("Should be able to configure months", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();
        // verify default months
        var monthsContainer = $(datepicker[0]).find('.ms-DatePicker-optionGrid .ms-DatePicker-monthOption');
        expect(monthsContainer.length).toBe(12);  
        
        // verify valid set of months
        $scope = $rootScope.$new();
        datepicker = $compile('<uif-datepicker ng-model="value" months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec"></uif-datepicker>')($scope);
        $scope.$digest();
        monthsContainer = $(datepicker[0]).find('.ms-DatePicker-optionGrid .ms-DatePicker-monthOption');
        expect(monthsContainer.length).toBe(12, "Custom months configuration");
        expect(monthsContainer.get(2).innerHTML).toBe('Maa');

        // verify valid set of months
        $scope = $rootScope.$new();
        
        var exc = false;
        try {
            $compile('<uif-datepicker ng-model="value" months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov"></uif-datepicker>')($scope);
            $scope.$digest();    
        }
        catch (e) {
            exc = true;
        }
        expect(exc).toBe(true, "Invalid list of months should have failed.");
        
    }));

    it("Should be able to set and retrieve a value", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope.value = "";
        console.log("1");
        var datepicker = $compile('<uif-datepicker ng-model="value" placeholder-text="TEST"></uif-datepicker>')($scope);
        $scope.$digest();
        console.log("2");
        expect($scope.value).toBe("");
        console.log("3");
        var goToday = $(datepicker[0]).find('.ms-DatePicker-goToday');
        goToday.click();
        $scope.$digest();

        $scope.$digest();
        expect(new Date($scope.value).getDay()).toBe(new Date().getDay());
        expect(new Date($scope.value).getMonth()).toBe(new Date().getMonth());
        expect(new Date($scope.value).getFullYear()).toBe(new Date().getFullYear());


        $scope.value = "2015-01-02";
        $scope.$digest();

        expect($(datepicker[0]).find('.ms-TextField-field').val()).toBe("2 January, 2015");
        

    }));

    it("Should be able to set start label", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        var startLabel = $(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe("Start Date", "Default start label should be Start Date");

        datepicker = $compile('<uif-datepicker start-label="First Date" ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        startLabel = $(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe("First Date", "Setting custom start date label");

    }));

    it("Should be able to set placeholder", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        var datepicker = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        var input = $(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr("Placeholder")).toBe("Select a date");

        datepicker = $compile('<uif-datepicker ng-model="value" placeholder-text="Please, find a date"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        input = $(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr("Placeholder")).toBe("Please, find a date");

    }));
});
