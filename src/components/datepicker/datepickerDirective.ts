'use strict';

import * as angular from 'angular';

/**
 * @ngdoc class
 * @name DatepickerController
 * @module officeuifabric.components.datepicker
 *
 * @restrict E
 *
 * @description
 * DatepickerController is the controller for the <uif-datepicker> directive
 *
 */
export class DatepickerController {
    public static $inject: string[] = ['$element', '$scope'];
    public isPickingYears: boolean = false;
    public isPickingMonths: boolean = false;
    public displayDateFormat: string = 'd mmmm, yyyy';

    private jElement: JQuery;

    constructor($element: JQuery, public $scope: IDatepickerDirectiveScope) {
        this.jElement = $($element[0]);
        this.displayDateFormat = $scope.uifDateFormat;
        $scope.ctrl = this;
    }
    public range(min: number, max: number, step: number): number[] {
        step = step || 1;
        let input: number[] = [];
        for (let i: number = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    }

    public getPicker(): Pickadate.DatePicker {
        return this.jElement.find('.ms-TextField-field').pickadate('picker');
    }

    public setValue(value: Date): void {
        this.getPicker().set('select', value);
        this.changeHighlightedDate(value.getFullYear(), value.getMonth(), value.getDate());
    }

    public initDatepicker(ngModel: angular.INgModelController): void {
        let self: DatepickerController = this;

        this.jElement.find('.ms-TextField-field').pickadate({
            // don't render the buttons
            clear: '',
            close: '',

            // formats
            format: self.displayDateFormat,
            // classes
            klass: {
                active: 'ms-DatePicker-input--active',
                box: 'ms-DatePicker-dayPicker',
                day: 'ms-DatePicker-day',
                disabled: 'ms-DatePicker-day--disabled',
                focused: 'ms-DatePicker-picker--focused',
                frame: 'ms-DatePicker-frame',
                header: 'ms-DatePicker-header',
                holder: 'ms-DatePicker-holder',
                infocus: 'ms-DatePicker-day--infocus',
                input: 'ms-DatePicker-input',
                month: 'ms-DatePicker-month',
                now: 'ms-DatePicker-day--today',
                opened: 'ms-DatePicker-picker--opened',
                outfocus: 'ms-DatePicker-day--outfocus',
                picker: 'ms-DatePicker-picker',
                selected: 'ms-DatePicker-day--selected',
                table: 'ms-DatePicker-table',
                weekdays: 'ms-DatePicker-weekday',
                wrap: 'ms-DatePicker-wrap',
                year: 'ms-DatePicker-year'
            },
            // events
            onStart: function (): void {
                self.initCustomView();
            },
            today: '',
            // strings and translations
            weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        });
        let picker: Pickadate.DatePicker = this.getPicker();
        /** Respond to built-in picker events. */
        picker.on({
            open: function (): void {
                self.scrollUp();

                if (angular.isDefined(ngModel) && ngModel  !== null) {
                    ngModel.$setTouched();
                }

                self.$scope.$apply();
            },
            set: function (value: string): void {
                let formattedValue: string = picker.get('select', 'yyyy-mm-dd');
                if (angular.isDefined(ngModel) && ngModel  !== null) {
                    ngModel.$setViewValue(formattedValue);
                }
            }
        });
    }

    private initCustomView(): void {

        /** Get some variables ready. */
        let $monthControls: JQuery = this.jElement.find('.ms-DatePicker-monthComponents');
        let $goToday: JQuery = this.jElement.find('.ms-DatePicker-goToday');
        // let $dayPicker: JQuery = jElement.find('.ms-DatePicker-dayPicker');
        let $monthPicker: JQuery = this.jElement.find('.ms-DatePicker-monthPicker');
        let $yearPicker: JQuery = this.jElement.find('.ms-DatePicker-yearPicker');
        let $pickerWrapper: JQuery = this.jElement.find('.ms-DatePicker-wrap');
        let $picker: Pickadate.DatePicker = this.getPicker();
        let self: DatepickerController = this;

        /** Move the month picker into position. */

        $monthControls.appendTo($pickerWrapper);
        $goToday.appendTo($pickerWrapper);
        $monthPicker.appendTo($pickerWrapper);
        $yearPicker.appendTo($pickerWrapper);

        /** Move back one month. */
        $monthControls.on('click', '.js-prevMonth', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newMonth: number = $picker.get('highlight').month - 1;
            self.changeHighlightedDate(null, newMonth, null);
            self.$scope.$apply();
        });

        /** Move ahead one month. */
        $monthControls.on('click', '.js-nextMonth', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newMonth: number = $picker.get('highlight').month + 1;
            self.changeHighlightedDate(null, newMonth, null);
            self.$scope.$apply();
        });

        /** Move back one year. */
        $monthPicker.on('click', '.js-prevYear', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year - 1;
            self.changeHighlightedDate(newYear, null, null);
            self.$scope.$apply();
        });

        /** Move ahead one year. */
        $monthPicker.on('click', '.js-nextYear', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year + 1;
            self.changeHighlightedDate(newYear, null, null);
            self.$scope.$apply();
        });

        /** Move back one decade. */
        $yearPicker.on('click', '.js-prevDecade', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year - 10;
            self.changeHighlightedDate(newYear, null, null);
            self.$scope.$apply();
        });

        /** Move ahead one decade. */
        $yearPicker.on('click', '.js-nextDecade', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year + 10;
            self.changeHighlightedDate(newYear, null, null);
            self.$scope.$apply();
        });

        /** Go to the current date, shown in the day picking view. */
        $goToday.on('click', function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Select the current date, while keeping the picker open. */
            let now: Date = new Date();
            $picker.set('select', now);

            /** Switch to the default (calendar) view. */
            self.jElement.removeClass('is-pickingMonths').removeClass('is-pickingYears');
            self.$scope.$apply();
        });

        /** Change the highlighted month. */
        $monthPicker.on('click', '.js-changeDate', function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            let currentDate: Pickadate.DateItem = $picker.get('highlight');
            let newYear: number = currentDate.year;
            let newMonth: number = +$(this).attr('data-month');
            let newDay: number = currentDate.day;

            /** Update the date. */
            self.changeHighlightedDate(newYear, newMonth, newDay);

            /** If we've been in the "picking months" state on mobile, remove that state so we show the calendar again. */
            if (self.jElement.hasClass('is-pickingMonths')) {
                self.jElement.removeClass('is-pickingMonths');
            }
            self.$scope.$apply();
        });

        /** Change the highlighted year. */
        $yearPicker.on('click', '.js-changeDate', function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            let currentDate: Pickadate.DateItem = $picker.get('highlight');
            let newYear: number = +$(this).attr('data-year');
            let newMonth: number = currentDate.month;
            let newDay: number = currentDate.day;

            /** Update the date. */
            self.changeHighlightedDate(newYear, newMonth, newDay);

            /** If we've been in the "picking years" state on mobile, remove that state so we show the calendar again. */
            if (self.jElement.hasClass('is-pickingYears')) {
                self.jElement.removeClass('is-pickingYears');
            }
            self.$scope.$apply();
        });

        /** Switch to the is-pickingMonths state. */
        $monthControls.on('click', '.js-showMonthPicker', function (event: JQueryEventObject): void {
            self.isPickingMonths = !self.isPickingMonths;
            self.$scope.$apply();
        });

        /** Switch to the is-pickingYears state. */
        $monthPicker.on('click', '.js-showYearPicker', function (event: JQueryEventObject): void {
            self.isPickingYears = !self.isPickingYears;
            self.$scope.$apply();
        });

        // set the highlighted value
        self.$scope.highlightedValue = $picker.get('highlight');
    }

    private scrollUp(): void {
        $('html, body').animate({ scrollTop: this.jElement.offset().top}, 367);
    }

    private changeHighlightedDate(newYear: number, newMonth: number, newDay: number): void {
        let picker: Pickadate.DatePicker = this.getPicker();
        /** All variables are optional. If not provided, default to the current value. */
        if (newYear == null) {
            newYear = picker.get('highlight').year;
        }
        if (newMonth == null) {
            newMonth = picker.get('highlight').month;
        }
        if (newDay == null) {
            newDay = picker.get('highlight').date;
        }

        /** Update it. */
        picker.set('highlight', [newYear, newMonth, newDay]);
        this.$scope.highlightedValue = picker.get('highlight');
    }
}

/**
 * @ngdoc interface
 * @name IDatepickerDirectiveScope
 * @module officeuifabric.components.datepicker
 *
 * @description
 * This is the scope used by the directive.
 *
 *
 * @property {string} uifMonths - Comma separated list of all months
 * @property {string} placeholder - The placeholder to display in the text box
 */
export interface IDatepickerDirectiveScope extends angular.IScope {
    uifMonths: string;
    uifDateFormat: string;
    placeholder: string;
    monthsArray: string[];
    highlightedValue: Pickadate.DateItem;
    ctrl: DatepickerController;
    isDisabled: boolean;
}

/**
 * @ngdoc directive
 * @name uifDatepicker
 * @module officeuifabric.components.datepicker
 *
 * @restrict E
 *
 * @description
 * `<uif-datepicker>` is an directive for rendering a datepicker
 *
 * @usage
 * <uif-datepicker
 *      ng-model="value"
 *      placeholder="Please, find a date"
 *      uif-months="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec" />
 */

export class DatepickerDirective implements angular.IDirective {
    public template: string =
        '<div ng-class="{\'ms-DatePicker\': true, \'is-pickingYears\': ctrl.isPickingYears, \'is-pickingMonths\': ctrl.isPickingMonths}">' +
            '<div class="ms-TextField">' +
                '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>' +
                '<input class="ms-TextField-field" type="text" placeholder="{{placeholder}}" ng-disabled="isDisabled">' +
            '</div>' +
            '<div class="ms-DatePicker-monthComponents">' +
                '<span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
                '<span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
                '<div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>' +
            '</div>' +
            '<span class="ms-DatePicker-goToday js-goToday">Go to today</span>' +
            '<div class="ms-DatePicker-monthPicker">' +
                '<div class="ms-DatePicker-header">' +
                    '<div class="ms-DatePicker-yearComponents">' +
                        '<span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
                        '<span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
                    '</div>' +
                    '<div class="ms-DatePicker-currentYear js-showYearPicker">{{highlightedValue.year}}</div>' +
                '</div>' +
                '<div class="ms-DatePicker-optionGrid" >' +
                    '<span ng-repeat="month in monthsArray"' +
                        'ng-class="{\'ms-DatePicker-monthOption js-changeDate\': true, ' +
                            '\'is-highlighted\': highlightedValue.month == $index}"' +
                        'data-month="{{$index}}">' +
                    '{{month}}</span>' +
                '</div>' +
            '</div>' +
            '<div class="ms-DatePicker-yearPicker">' +
                '<div class="ms-DatePicker-decadeComponents">' +
                    '<span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
                    '<span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
                '</div>' +
                '<div class="ms-DatePicker-currentDecade">{{highlightedValue.year - 10}} - {{highlightedValue.year}}</div>' +
                '<div class="ms-DatePicker-optionGrid">' +
                    '<span ng-class="{\'ms-DatePicker-yearOption js-changeDate\': true,' +
                        '\'is-highlighted\': highlightedValue.year == year}" ' +
                        'ng-repeat="year in ctrl.range(highlightedValue.year - 10, highlightedValue.year)"' +
                        'data-year="{{year}}">{{year}}</span>' +
                '</div>' +
            '</div>' +
        '</div>';
    public controller: typeof DatepickerController = DatepickerController;
    public restrict: string = 'E';
    public replace: boolean = true;

    public scope: any = {
        placeholder : '@',
        uifDateFormat: '@',
        uifMonths: '@'
    };
    public require: string[] = ['uifDatepicker', '?ngModel'];

    public static factory(): angular.IDirectiveFactory {
        const directive: angular.IDirectiveFactory = () => new DatepickerDirective();

        return directive;
    }
    public compile (templateElement: angular.IAugmentedJQuery,
                    templateAttributes: angular.IAttributes,
                    transclude: angular.ITranscludeFunction): angular.IDirectivePrePost {
        return {
            post: this.postLink,
            pre: this.preLink
        };
    }

    private preLink(
        $scope: IDatepickerDirectiveScope, instanceElement: angular.IAugmentedJQuery,
        instanceAttributes: angular.IAttributes, ctrls: {}): void {
        if (!$scope.uifMonths) {
            $scope.uifMonths = 'Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec';
        }
        if (!$scope.placeholder) {
            $scope.placeholder = 'Select a date';
        }
        if (!$scope.uifDateFormat) {
            $scope.uifDateFormat = 'd mmmm, yyyy';
        }
        $scope.monthsArray = $scope.uifMonths.split(',');
        if ($scope.monthsArray.length !== 12) {
            throw 'Months setting should have 12 months, separated by a comma';
        }

        instanceAttributes.$observe('disabled', (disabled) => {
            $scope.isDisabled = !!disabled;
        });
    }

    private postLink($scope: IDatepickerDirectiveScope, $element: JQuery, attrs: any, ctrls: any[]): void {
        let datepickerController: DatepickerController = ctrls[0];
        let ngModel: angular.INgModelController = ctrls[1];

        datepickerController.initDatepicker(ngModel);
        if (angular.isDefined(ngModel) && ngModel !== null) {
            ngModel.$render = function (): void {
                if (ngModel.$modelValue !== '' && typeof ngModel.$modelValue !== 'undefined') {
                    if (typeof ngModel.$modelValue === 'string') {
                        let date: Date = new Date(ngModel.$modelValue);
                        datepickerController.setValue(date);
                    } else {
                    datepickerController.setValue(ngModel.$modelValue);
                    }
                    ngModel.$setPristine();
                }
            };
        }
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.datepicker
 *
 * @description
 * datepicker. Depends on angular-pickadate https://github.com/restorando/angular-pickadate
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.datepicker', [
    'officeuifabric.components'
  ])
  .directive('uifDatepicker', DatepickerDirective.factory());
