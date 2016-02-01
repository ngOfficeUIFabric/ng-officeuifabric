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

    public getPicker($element): Pickadate.DatePicker { 
        return $element.find('.ms-TextField-field').pickadate('picker');
    }

    public setValue($element, value) {
        this.getPicker($element).set('select', value);
    }

    public initDatepicker($element: JQuery, ngModel: any): void {
        let self: DatepickerController = this;
        $element.find('.ms-TextField-field').pickadate({
            // strings and translations
            weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

            // don't render the buttons
            today: '',
            clear: '',
            close: '',

            // events
            onStart: function () {
                self.initCustomView($element);
            },

            // classes
            klass: {

                // the element states
                input: 'ms-DatePicker-input',
                active: 'ms-DatePicker-input--active',

                // the root picker and states
                picker: 'ms-DatePicker-picker',
                opened: 'ms-DatePicker-picker--opened',
                focused: 'ms-DatePicker-picker--focused',

                // the picker holder
                holder: 'ms-DatePicker-holder',

                // the picker frame, wrapper, and box
                frame: 'ms-DatePicker-frame',
                wrap: 'ms-DatePicker-wrap',
                box: 'ms-DatePicker-dayPicker',

                // the picker header
                header: 'ms-DatePicker-header',

                // month & year labels
                month: 'ms-DatePicker-month',
                year: 'ms-DatePicker-year',

                // table of dates
                table: 'ms-DatePicker-table',

                // weekday labels
                weekdays: 'ms-DatePicker-weekday',

                // day states
                day: 'ms-DatePicker-day',
                disabled: 'ms-DatePicker-day--disabled',
                selected: 'ms-DatePicker-day--selected',
                now: 'ms-DatePicker-day--today',
                infocus: 'ms-DatePicker-day--infocus',
                outfocus: 'ms-DatePicker-day--outfocus'
            }
        });

        var picker = this.getPicker($element);
        /** Respond to built-in picker events. */
        picker.on({
            render: function () {
                self.updateCustomView($element);
            },
            open: function () {
                self.scrollUp($element);
            },
            set: function (value) {
                var formattedValue = picker.get('select', 'yyyy-mm-dd');
                ngModel.$setViewValue(formattedValue);
            }
        });
    }

    private initCustomView($element) {

        /** Get some variables ready. */
        var $monthControls = $element.find('.ms-DatePicker-monthComponents');
        var $goToday = $element.find('.ms-DatePicker-goToday');
        var $dayPicker = $element.find('.ms-DatePicker-dayPicker');
        var $monthPicker = $element.find('.ms-DatePicker-monthPicker');
        var $yearPicker = $element.find('.ms-DatePicker-yearPicker');
        var $pickerWrapper = $element.find('.ms-DatePicker-wrap');
        var $picker = this.getPicker($element);
        //var $picker = this.picker;
        var self = this;
        
        /** Move the month picker into position. */
        
        $monthControls.appendTo($pickerWrapper);
        $goToday.appendTo($pickerWrapper);
        $monthPicker.appendTo($pickerWrapper);
        $yearPicker.appendTo($pickerWrapper);

        /** Update the custom view. */
        this.updateCustomView($element);

        /** Move back one month. */
        $monthControls.on('click', '.js-prevMonth', function (event) {
            event.preventDefault();
            var newMonth = $picker.get('highlight').month - 1;
            self.changeHighlightedDate($element, null, newMonth, null);
        });
        
        /** Move ahead one month. */
        $monthControls.on('click', '.js-nextMonth', function (event) {
            event.preventDefault();
            var newMonth = $picker.get('highlight').month + 1;
            self.changeHighlightedDate($element, null, newMonth, null);
        });

        /** Move back one year. */
        $monthPicker.on('click', '.js-prevYear', function (event) {
            event.preventDefault();
            var newYear = $picker.get('highlight').year - 1;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move ahead one year. */
        $monthPicker.on('click', '.js-nextYear', function (event) {
            event.preventDefault();
            var newYear = $picker.get('highlight').year + 1;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move back one decade. */
        $yearPicker.on('click', '.js-prevDecade', function (event) {
            event.preventDefault();
            var newYear = $picker.get('highlight').year - 10;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Move ahead one decade. */
        $yearPicker.on('click', '.js-nextDecade', function (event) {
            event.preventDefault();
            var newYear = $picker.get('highlight').year + 10;
            self.changeHighlightedDate($element, newYear, null, null);
        });

        /** Go to the current date, shown in the day picking view. */
        $goToday.click(function (event) {
            event.preventDefault();

            /** Select the current date, while keeping the picker open. */
            var now = new Date();
            $picker.set('select', [now.getFullYear(), now.getMonth(), now.getDate()]);

            /** Switch to the default (calendar) view. */
            $element.removeClass('is-pickingMonths').removeClass('is-pickingYears');

        });

        /** Change the highlighted month. */
        
        $monthPicker.on('click', '.js-changeDate', function (event) {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            var newYear = $(this).attr('data-year');
            var newMonth = $(this).attr('data-month');
            var newDay = $(this).attr('data-day');

            /** Update the date. */
            self.changeHighlightedDate($element, newYear, newMonth, newDay);

            /** If we've been in the "picking months" state on mobile, remove that state so we show the calendar again. */
            if ($element.hasClass('is-pickingMonths')) {
                $element.removeClass('is-pickingMonths');
            }
        });

        /** Change the highlighted year. */
        $yearPicker.on('click', '.js-changeDate', function (event) {
            event.preventDefault();

            /** Get the requested date from the data attributes. */
            var newYear = $(this).attr('data-year');
            var newMonth = $(this).attr('data-month');
            var newDay = $(this).attr('data-day');

            /** Update the date. */
            self.changeHighlightedDate($element, newYear, newMonth, newDay);

            /** If we've been in the "picking years" state on mobile, remove that state so we show the calendar again. */
            if ($element.hasClass('is-pickingYears')) {
                $element.removeClass('is-pickingYears');
            }
        });

        /** Switch to the default state. */
        $monthPicker.on('click', '.js-showDayPicker', function (event) {
            $element.removeClass('is-pickingMonths');
            $element.removeClass('is-pickingYears');
        });

        /** Switch to the is-pickingMonths state. */
        $monthControls.on('click', '.js-showMonthPicker', function (event) {
            $element.toggleClass('is-pickingMonths');
        });

        /** Switch to the is-pickingYears state. */
        $monthPicker.on('click', '.js-showYearPicker', function (event) {
            $element.toggleClass('is-pickingYears');
        });



    }

    private updateCustomView($element) {
        /** Get some variables ready. */
        var $monthPicker = $element.find('.ms-DatePicker-monthPicker');
        var $yearPicker = $element.find('.ms-DatePicker-yearPicker');
        var $pickerWrapper = $element.find('.ms-DatePicker-wrap');
        var $picker = this.getPicker($element);
        //var $picker = this.picker;

        /** Set the correct year. */
        $monthPicker.find('.ms-DatePicker-currentYear').text($picker.get('view').year);

        /** Highlight the current month. */
        $monthPicker.find('.ms-DatePicker-monthOption').removeClass('is-highlighted')
        $monthPicker.find('.ms-DatePicker-monthOption[data-month="' + $picker.get('highlight').month + '"]').addClass('is-highlighted');

        /** Generate the grid of years for the year picker view. */

        // Start by removing any existing generated output. */
        $yearPicker.find('.ms-DatePicker-currentDecade').remove();
        $yearPicker.find('.ms-DatePicker-optionGrid').remove();

        // Generate the output by going through the years.
        var startingYear = $picker.get('highlight').year - 11;
        var decadeText = startingYear + " - " + (startingYear + 11);
        var output = '<div class="ms-DatePicker-currentDecade">' + decadeText + '</div>';
        output += '<div class="ms-DatePicker-optionGrid">';
        for (var year = startingYear; year < (startingYear + 12); year++) {
            output += '<span class="ms-DatePicker-yearOption js-changeDate" data-year="' + year + '">' + year + '</span>';
        }
        output += '</div>';

        // Output the title and grid of years generated above.
        $yearPicker.append(output);

        /** Highlight the current year. */
        $yearPicker.find('.ms-DatePicker-yearOption').removeClass('is-highlighted')
        $yearPicker.find('.ms-DatePicker-yearOption[data-year="' + $picker.get('highlight').year + '"]').addClass('is-highlighted');
    }

    private scrollUp($element) {
        $('html, body').animate({
            scrollTop: $element.offset().top
        }, 367);
    }

    private changeHighlightedDate($element, newYear, newMonth, newDay) {
        var picker = this.getPicker($element);
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
    public template: string = '<span>{{bar}}</span><div class="ms-TextField">'+
        '<label class="ms-Label">{{startLabel}}</label>'+
        '<i class="ms-DatePicker-event ms-Icon ms-Icon--event"></i>'+
        '<input class="ms-TextField-field" type="text" placeholder="{{placeholderText}}">'+
        '</div>'+
        '<div class="ms-DatePicker-monthComponents">'+
        '<span class="ms-DatePicker-nextMonth js-nextMonth"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
        '<span class="ms-DatePicker-prevMonth js-prevMonth"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
        '<div class="ms-DatePicker-headerToggleView js-showMonthPicker"></div>'+
        '</div>'+
        '<span class="ms-DatePicker-goToday js-goToday">Go to today</span>'+
        '<div class="ms-DatePicker-monthPicker">'+
        '<div class="ms-DatePicker-header">'+
        '<div class="ms-DatePicker-yearComponents">'+
        '<span class="ms-DatePicker-nextYear js-nextYear"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
        '<span class="ms-DatePicker-prevYear js-prevYear"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
        '</div>'+
        '<div class="ms-DatePicker-currentYear js-showYearPicker"></div>'+
        '</div>'+
    '<div class="ms-DatePicker-optionGrid" >' +
    
    '<span ng-repeat="month in monthsArray" class="ms-DatePicker-monthOption js-changeDate" data-month="{{$index}}">{{month}}</span>' + 
    '</div></div>' +
        '<div class="ms-DatePicker-yearPicker">'+
        '<div class="ms-DatePicker-decadeComponents">'+
        '<span class="ms-DatePicker-nextDecade js-nextDecade"><i class="ms-Icon ms-Icon--chevronRight"></i></span>'+
        '<span class="ms-DatePicker-prevDecade js-prevDecade"><i class="ms-Icon ms-Icon--chevronLeft"></i></span>'+
        '</div></div>';

    public restrict: string = 'E';

    public scope: any = {
        months: "@",
        startLabel: "@",
        placeholderText : "@"
    };
    public require: string[] = ['uifDatepicker', 'ngModel'];

    public link($scope, $element, attrs, ctrls: any[]): void {
        let datepickerController: DatepickerController = ctrls[0];
        let ngModel: ng.INgModelController = ctrls[1];
        if (!$scope.months) {
            $scope.months = "'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'";
        }
        if (!$scope.startLabel) {
            $scope.startLabel = "Start Date";
        }

        if (!$scope.placeholderText) {
            $scope.placeholderText = "Select a date";
        }
        
        $scope.monthsArray = $scope.months.split(',');
        if ($scope.monthsArray.length !== 12) {
            throw "Months setting should have 12 months, separated by a comma";
        }

        datepickerController.initDatepicker($($element), ngModel);
        ngModel.$render = function () {
            if (ngModel.$modelValue !== "" && typeof ngModel.$modelValue !== "undefined") {
                datepickerController.setValue($($element), new Date(ngModel.$modelValue));
            }
        }
    }

    public controller: typeof DatepickerController = DatepickerController;

    public static factory(): ng.IDirectiveFactory {
        const directive = () => new DatepickerDirective();

        return directive;
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
export var module: ng.IModule = ng.module('officeuifabric.components.datepicker', [
    'officeuifabric.components'
  ])
  .directive('uifToggle', DatepickerDirective.factory());
