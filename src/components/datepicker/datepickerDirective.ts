'use strict';

import * as ng from 'angular';

export interface IDatepickerDirectiveScope extends ng.IScope {
    months: string;
    startLabel: string;
    placeHolderText: string;
    monthsArray: string[];
    textValue: string;
    value: string;
}

export class DatepickerController {
    public static $inject: string[] = ['$element', '$scope'];
    constructor($element: JQuery, public $scope: IDatepickerDirectiveScope) {
    }

    public getPicker($element: JQuery): Pickadate.DatePicker {
        return $element.find('.ms-TextField-field').pickadate('picker');
    }

    public setValue($element: JQuery, value: any): void {
        this.getPicker($element).set('select', value);
    }

    public initDatepicker($element: JQuery, ngModel: ng.INgModelController): void {
        let self: DatepickerController = this;
        $element.find('.ms-TextField-field').pickadate({
            // don't render the buttons
            clear: '',
            close: '',

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
                self.initCustomView($element);
            },
            today: '',
            // strings and translations
            weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        });
        let picker: Pickadate.DatePicker = this.getPicker($element);
        /** Respond to built-in picker events. */
        picker.on({
            open: function (): void {
                self.scrollUp($element);
            },
            render: function (): void {
                self.updateCustomView($element);
            },
            set: function (value: string): void {
                let formattedValue: string = picker.get('select', 'yyyy-mm-dd');
                ngModel.$setViewValue(formattedValue);
            }
        });
    }

    private initCustomView($element: JQuery): void {

        /** Get some variables ready. */
        let $monthControls: JQuery = $element.find('.ms-DatePicker-monthComponents');
        let $goToday: JQuery = $element.find('.ms-DatePicker-goToday');
        // let $dayPicker: JQuery = $element.find('.ms-DatePicker-dayPicker');
        let $monthPicker: JQuery = $element.find('.ms-DatePicker-monthPicker');
        let $yearPicker: JQuery = $element.find('.ms-DatePicker-yearPicker');
        let $pickerWrapper: JQuery = $element.find('.ms-DatePicker-wrap');
        let $picker: Pickadate.DatePicker = this.getPicker($element);
        let self: DatepickerController = this;

        /** Move the month picker into position. */

        $monthControls.appendTo($pickerWrapper);
        $goToday.appendTo($pickerWrapper);
        $monthPicker.appendTo($pickerWrapper);
        $yearPicker.appendTo($pickerWrapper);

        /** Update the custom view. */
        this.updateCustomView($element);

        /** Move back one month. */
        $monthControls.on('click', '.js-prevMonth', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newMonth: number = $picker.get('highlight').month - 1;
            self.changeHighlightedDate($element, null, newMonth, null);
        });

        /** Move ahead one month. */
        $monthControls.on('click', '.js-nextMonth', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newMonth: number = $picker.get('highlight').month + 1;
            self.changeHighlightedDate($element, null, newMonth, null);
        });

        /** Move back one year. */
        $monthPicker.on('click', '.js-prevYear', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year - 1;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move ahead one year. */
        $monthPicker.on('click', '.js-nextYear', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year + 1;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move back one decade. */
        $yearPicker.on('click', '.js-prevDecade', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year - 10;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move ahead one decade. */
        $yearPicker.on('click', '.js-nextDecade', function (event: JQueryEventObject): void {
            event.preventDefault();
            let newYear: number = $picker.get('highlight').year + 10;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Go to the current date, shown in the day picking view. */
        $goToday.click(function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Select the current date, while keeping the picker open. */
            let now: Date = new Date();
            $picker.set('select', [now.getFullYear(), now.getMonth(), now.getDate()]);

            /** Switch to the default (calendar) view. */
            $element.removeClass('is-pickingMonths').removeClass('is-pickingYears');

        });

        /** Change the highlighted month. */
        $monthPicker.on('click', '.js-changeDate', function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            let newYear: number = +$(this).attr('data-year');
            let newMonth: number = +$(this).attr('data-month');
            let newDay: number = +$(this).attr('data-day');

            /** Update the date. */
            self.changeHighlightedDate($element, newYear, newMonth, newDay);

            /** If we've been in the "picking months" state on mobile, remove that state so we show the calendar again. */
            if ($element.hasClass('is-pickingMonths')) {
                $element.removeClass('is-pickingMonths');
            }
        });

        /** Change the highlighted year. */
        $yearPicker.on('click', '.js-changeDate', function (event: JQueryEventObject): void {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            let newYear: number = +$(this).attr('data-year');
            let newMonth: number = +$(this).attr('data-month');
            let newDay: number = +$(this).attr('data-day');

            /** Update the date. */
            self.changeHighlightedDate($element, newYear, newMonth, newDay);

            /** If we've been in the "picking years" state on mobile, remove that state so we show the calendar again. */
            if ($element.hasClass('is-pickingYears')) {
                $element.removeClass('is-pickingYears');
            }
        });

        /** Switch to the default state. */
        $monthPicker.on('click', '.js-showDayPicker', function (event: JQueryEventObject): void {
            $element.removeClass('is-pickingMonths');
            $element.removeClass('is-pickingYears');
        });

        /** Switch to the is-pickingMonths state. */
        $monthControls.on('click', '.js-showMonthPicker', function (event: JQueryEventObject): void {
            $element.toggleClass('is-pickingMonths');
        });

        /** Switch to the is-pickingYears state. */
        $monthPicker.on('click', '.js-showYearPicker', function (event: JQueryEventObject): void {
            $element.toggleClass('is-pickingYears');
        });
    }

    private updateCustomView($element: JQuery): void {
        /** Get some variables ready. */
        let $monthPicker: JQuery = $element.find('.ms-DatePicker-monthPicker');
        let $yearPicker: JQuery = $element.find('.ms-DatePicker-yearPicker');
        let $picker: Pickadate.DatePicker = this.getPicker($element);

        /** Set the correct year. */
        $monthPicker.find('.ms-DatePicker-currentYear').text($picker.get('view').year);

        /** Highlight the current month. */
        $monthPicker.find('.ms-DatePicker-monthOption').removeClass('is-highlighted');
        $monthPicker.find('.ms-DatePicker-monthOption[data-month="' + $picker.get('highlight').month + '"]').addClass('is-highlighted');

        /** Generate the grid of years for the year picker view. */

        // start by removing any existing generated output. */
        $yearPicker.find('.ms-DatePicker-currentDecade').remove();
        $yearPicker.find('.ms-DatePicker-optionGrid').remove();

        // generate the output by going through the years.
        let startingYear: number = $picker.get('highlight').year - 11;
        let decadeText: string = startingYear + ' - ' + (startingYear + 11);
        let output: string = '<div class="ms-DatePicker-currentDecade">' + decadeText + '</div>';
        output += '<div class="ms-DatePicker-optionGrid">';
        for (let year: number = startingYear; year < (startingYear + 12); year++) {
            output += '<span class="ms-DatePicker-yearOption js-changeDate" data-year="' + year + '">' + year + '</span>';
        }
        output += '</div>';

        // output the title and grid of years generated above.
        $yearPicker.append(output);

        /** Highlight the current year. */
        $yearPicker.find('.ms-DatePicker-yearOption').removeClass('is-highlighted');
        $yearPicker.find('.ms-DatePicker-yearOption[data-year="' + $picker.get('highlight').year + '"]').addClass('is-highlighted');
    }

    private scrollUp($element: JQuery): void {
        $('html, body').animate({ scrollTop: $element.offset().top}, 367);
    }

    private changeHighlightedDate($element: JQuery, newYear: number, newMonth: number, newDay: number): void {
        let picker: Pickadate.DatePicker = this.getPicker($element);
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

    }
}

export class DatepickerDirective implements ng.IDirective {
    public template: string = '<span>{{bar}}</span><div class="ms-TextField">' +
        '<label class="ms-Label">{{startLabel}}</label>' +
        '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>' +
        '<input class="ms-TextField-field" type="text" placeholder="{{placeholderText}}">' +
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
        '<div class="ms-DatePicker-currentYear js-showYearPicker"></div>' +
        '</div>' +
    '<div class="ms-DatePicker-optionGrid" >' +
    '<span ng-repeat="month in monthsArray" class="ms-DatePicker-monthOption js-changeDate" data-month="{{$index}}">{{month}}</span>' +
    '</div></div>' +
        '<div class="ms-DatePicker-yearPicker">' +
        '<div class="ms-DatePicker-decadeComponents">' +
        '<span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>' +
        '<span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>' +
        '</div></div>';
    public controller: typeof DatepickerController = DatepickerController;
    public restrict: string = 'E';

    public scope: any = {
        months: '@',
        placeholderText : '@',
        startLabel: '@'
    };
    public require: string[] = ['uifDatepicker', 'ngModel'];

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DatepickerDirective();

        return directive;
    }
    // todo scope interface
    public link($scope: any, $element: JQuery, attrs: any, ctrls: any[]): void {
        let datepickerController: DatepickerController = ctrls[0];
        let ngModel: ng.INgModelController = ctrls[1];
        if (!$scope.months) {
            $scope.months = "'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'";
        }
        if (!$scope.startLabel) {
            $scope.startLabel = 'Start Date';
        }

        if (!$scope.placeholderText) {
            $scope.placeholderText = 'Select a date';
        }

        $scope.monthsArray = $scope.months.split(',');
        if ($scope.monthsArray.length !== 12) {
            throw 'Months setting should have 12 months, separated by a comma';
        }
        datepickerController.initDatepicker(jQuery($element), ngModel);
        ngModel.$render = function (): void {
            if (ngModel.$modelValue !== '' && typeof ngModel.$modelValue !== 'undefined') {
                datepickerController.setValue($($element), new Date(ngModel.$modelValue));
            }
        };
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
export let module: ng.IModule = ng.module('officeuifabric.components.datepicker', [
    'officeuifabric.components'
  ])
  .directive('uifDatepicker', DatepickerDirective.factory());
