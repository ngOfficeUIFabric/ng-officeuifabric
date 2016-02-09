describe('datepicker: <uif-datepicker />', () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.core');
        angular.mock.module('officeuifabric.components.datepicker');
    });

    it('Should be able to configure months', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);

        // verify default months
        let monthsContainer: JQuery = datepicker.find('.ms-DatePicker-optionGrid .ms-DatePicker-monthOption');
        expect(monthsContainer.length).toBe(12, 'Default month configuration');

        // verify valid set of months
        $scope = $rootScope.$new();
        datepicker = $compile('<uif-datepicker ng-model="value" ' +
            'uif-months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);
        monthsContainer = datepicker.find('.ms-DatePicker-optionGrid .ms-DatePicker-monthOption');
        expect(monthsContainer.length).toBe(12, 'Custom months configuration');
        expect(monthsContainer.get(2).innerHTML).toBe('Maa');

        // verify valid set of months
        $scope = $rootScope.$new();

        let exception: boolean = false;
        try {
            $compile('<uif-datepicker ng-model="value" uif-months="Jan,Feb,Maa,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov"></uif-datepicker>')($scope);
            $scope.$digest();
        } catch (e) {
            exception = true;
        }
        expect(exception).toBe(true, 'Invalid list of months should have failed.');
    }));
    it('Should be able to use the custom month and date selector', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {

        let $scope: any = $rootScope.$new();
        $scope.value = new Date(2015, 2, 1);
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        datepicker = jQuery(datepicker[0]);

        // add the element to the DOM, otherwise click event is not registered
        datepicker.appendTo(document.body);

        let monthPickerSwitcher: JQuery = datepicker.find('.js-showMonthPicker');
        let yearPickerSwitcher: JQuery = datepicker.find('.js-showMonthPicker');

        yearPickerSwitcher.click();
        let yearPicker: JQuery = datepicker.find('.ms-DatePicker-yearPicker');
        let monthPicker: JQuery = datepicker.find('.ms-DatePicker-monthPicker');
        expect(yearPicker).toBeVisible();
        expect(monthPicker).not.toBeVisible();

        monthPickerSwitcher.click();
        expect(monthPicker).toBeVisible();
        expect(yearPicker).not.toBeVisible();

        let highlightedMonth: JQuery = datepicker.find('.ms-DatePicker-monthOption.is-highlighted');

        expect(highlightedMonth.html()).toContain('Feb', 'Selected month in month picker should be Feb');

        let juneMonth: JQuery = datepicker.find('.js-changeDate.ms-DatePicker-monthOption[data-month=5]');

        juneMonth.triggerHandler('click');
        juneMonth.click();
//        $scope.$digest();

        expect(juneMonth).toHaveClass('is-highlighted');

        let yearOptions: JQuery = datepicker.find('.ms-DatePicker-yearOption');
        expect(yearOptions.length).toBe(11, 'There should be 11 year options');
        let highlightedYear: JQuery = datepicker.find('.ms-DatePicker-yearOption.is-highlighted');
        expect(highlightedYear.length).toBe(1, 'There should be one active year');
        //console.log( datepicker.find('.ms-DatePicker-yearPicker').html());
        expect(highlightedYear.html().trim()).toContain('2015');


    }));


    it('Should be able to set and retrieve a value', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = '';
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value" uif-placeholder-text="TEST"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);
        expect($scope.value).toBe('');

        let goToday: JQuery = datepicker.find('.ms-DatePicker-goToday');
        expect(goToday.length).toBe(1, 'Go to today should be present');
        goToday.triggerHandler('click');
        $scope.$digest();
        expect(new Date($scope.value).getDay()).toBe(new Date().getDay());
        expect(new Date($scope.value).getMonth()).toBe(new Date().getMonth());
        expect(new Date($scope.value).getFullYear()).toBe(new Date().getFullYear());


        $scope.value = '2015-01-02';
        $scope.$digest();

        expect(jQuery(datepicker[0]).find('.ms-TextField-field').val()).toBe('2 January, 2015');

    }));

    it('Should be able to set start label', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let datepicker: any = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        let startLabel: JQuery = jQuery(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe('Start Date', 'Default start label should be Start Date');

        datepicker = $compile('<uif-datepicker uif-label="First Date" ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        startLabel = jQuery(datepicker[0]).find('.ms-Label');
        expect(startLabel.text()).toBe('First Date', 'Setting custom start date label');

    }));

    it('Should be able to set placeholder', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify default value
        let input: JQuery = jQuery(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr('Placeholder')).toBe('Select a date');

        datepicker = $compile('<uif-datepicker ng-model="value" uif-placeholder-text="Please, find a date"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        input = jQuery(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr('Placeholder')).toBe('Please, find a date');

    }));
});
