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
    it('Should be able to use the custom year selector', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = new Date(2015, 2, 1);
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);
        datepicker.appendTo(document.body);

        let prevYear: JQuery = datepicker.find('.js-prevYear');
        let nextYear: JQuery = datepicker.find('.js-nextYear');

        let yearPickerSwitcher: JQuery = datepicker.find('.js-showYearPicker');
        expect(yearPickerSwitcher.length).toBe(1);

        yearPickerSwitcher.click();
        expect(datepicker).toHaveClass('is-pickingYears');

        let yearOptions: JQuery = datepicker.find('.ms-DatePicker-yearOption');
        expect(yearOptions.length).toBe(11, 'There should be 11 year options');
        let highlightedYear: JQuery = datepicker.find('.ms-DatePicker-yearOption.is-highlighted');
        expect(highlightedYear.length).toBe(1, 'There should be one active year');
        expect(highlightedYear.html()).toBe('2015', 'Highlighted year should be 2015');

        prevYear.click();
        prevYear.click();
        highlightedYear = datepicker.find('.ms-DatePicker-yearOption.is-highlighted');
        expect(highlightedYear.html()).toBe('2013', 'Highlighted year should be 2015');

        nextYear.click();
        highlightedYear = datepicker.find('.ms-DatePicker-yearOption.is-highlighted');
        expect(highlightedYear.html()).toBe('2014', 'Highlighted year should be 2015');

        let year2010: JQuery = datepicker.find('.js-changeDate.ms-DatePicker-yearOption[data-year=2010]');
        year2010.click();

        expect(year2010).toHaveClass('is-highlighted');
    }));
    it('Should be able to use the custom month selector', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {

        let $scope: any = $rootScope.$new();
        // important to take the first of the month, as previously this test failed due to time zone issues
        $scope.value = new Date(2015, 2, 1);
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);

        // add the element to the DOM, otherwise click event is not registered
        datepicker.appendTo(document.body);

        let prevMonth: JQuery = datepicker.find('.js-prevMonth');
        let nextMonth: JQuery = datepicker.find('.js-nextMonth');

        let monthPickerSwitcher: JQuery = datepicker.find('.js-showMonthPicker');
        expect(monthPickerSwitcher.length).toBe(1);

        monthPickerSwitcher.click();
        expect(datepicker).toHaveClass('is-pickingMonths');

        let highlightedMonth: JQuery = datepicker.find('.ms-DatePicker-monthOption.is-highlighted');

        // months are zero based => 02 is March
        expect(highlightedMonth.html().trim()).toBe('Mar', 'Selected month in month picker should be Mar');

        let juneMonth: JQuery = datepicker.find('.js-changeDate.ms-DatePicker-monthOption[data-month=5]');
        let julyMonth: JQuery = datepicker.find('.js-changeDate.ms-DatePicker-monthOption[data-month=6]');
        let mayMonth: JQuery = datepicker.find('.js-changeDate.ms-DatePicker-monthOption[data-month=4]');

        juneMonth.click();
        expect(mayMonth).not.toHaveClass('is-highlighted');
        expect(julyMonth).not.toHaveClass('is-highlighted');
        expect(juneMonth).toHaveClass('is-highlighted');

        nextMonth.click();
        expect(juneMonth).not.toHaveClass('is-highlighted');
        expect(julyMonth).toHaveClass('is-highlighted');

        prevMonth.click();
        prevMonth.click();
        expect(juneMonth).not.toHaveClass('is-highlighted');
        expect(mayMonth).toHaveClass('is-highlighted');
        expect(julyMonth).not.toHaveClass('is-highlighted');
    }));

    it('Should be able to click  next and prev decade', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = new Date(2015, 1, 1);
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value" placeholder="TEST"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);
        datepicker.appendTo(document.body);

        let yearPickerSwitcher: JQuery = datepicker.find('.js-showYearPicker');
        let prevDecade: JQuery = datepicker.find('.js-prevDecade');
        expect(prevDecade.length).toBe(1);
        let nextDecade: JQuery = datepicker.find('.js-nextDecade');
        expect(nextDecade.length).toBe(1);
        let currentDecade: JQuery = datepicker.find('.ms-DatePicker-currentDecade');

        yearPickerSwitcher.click();
        expect(currentDecade.html()).toBe('2005 - 2015');
        nextDecade.click();
        expect(currentDecade.html()).toBe('2015 - 2025');

        prevDecade.click();
        prevDecade.click();
        expect(currentDecade.html()).toBe('1995 - 2005');
    }));
    it('Should be able to set and retrieve a value', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
        let $scope: any = $rootScope.$new();
        $scope.value = '';
        let datepicker: JQuery = $compile('<uif-datepicker ng-model="value" placeholder="TEST"></uif-datepicker>')($scope);
        $scope.$digest();
        datepicker = jQuery(datepicker[0]);
        expect($scope.value).toBe('');

        let goToday: JQuery = datepicker.find('.ms-DatePicker-goToday');
        expect(goToday.length).toBe(1, 'Go to today should be present');
        goToday.triggerHandler('click');
        $scope.$digest();

        // we are using UTC Dates here, as otherwise this test will fail in certain timezones.
        // $scope.value is e.g. "2015-02-01", which is February 1st. However, left of UTC new Date("2015-02-01").getDate() == 31 (January).
        // that's why we take the UTC Date of $scope.value
        // with new Date() this is not necessary as that is always the local date.

        expect(new Date($scope.value).getUTCDate()).toBe(new Date().getDate(), 'Day Today');
        expect(new Date($scope.value).getUTCMonth()).toBe(new Date().getMonth(), 'Month Today');
        expect(new Date($scope.value).getUTCFullYear()).toBe(new Date().getFullYear(), 'Year Today');

        let date: Date = new Date('2015-01-02');
        $scope.value = date;
        $scope.$digest();
        let textboxValue: string = jQuery(datepicker[0]).find('.ms-TextField-field').val();

        let monthNames: string[] =
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let formattedValue: string = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;

        expect(textboxValue).toBe(formattedValue);

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

        datepicker = $compile('<uif-datepicker ng-model="value" placeholder="Please, find a date"></uif-datepicker>')($scope);
        $scope.$digest();

        // verify custom value
        input = jQuery(datepicker[0]).find('.ms-TextField-field');
        expect(input.attr('Placeholder')).toBe('Please, find a date');

    }));
});
