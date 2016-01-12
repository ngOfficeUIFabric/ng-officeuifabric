describe("dropdownDirective", () => {
    beforeEach(() => {
        angular.mock.module('officeuifabric.components.dropdown');
        jQuery.noConflict();        
    });

    afterEach(() => {
        // myfunc.reset();
    });
    it("should render correct html", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
                
        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue">' +
        '<uif-option value="value1">Text 1</uif-option>' +
        '<uif-option value="value2">Text 2</uif-option>' +
        '<uif-option value="value3">Text 3</uif-option>' +
        '<uif-option value="value4">Text 4</uif-option>' +
        '</uif-dropdown>')($scope);
        $scope.$digest();
        let container = dropdown.find('div.ms-Dropdown');
        
        expect(container.length).toBe(1, 'Container should be present');
        
        let items = dropdown.find('option');
        expect(items.length).toBe(4, 'There should be 4 options');         
    }));
    
    it("should be able to set options", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope["options"] = [
            { text: "Option 1", value:"Option1"},
            { text: "Option 2", value:"Option2"},
            { text: "Option 3", value:"Option3"},
            { text: "Option 4", value:"Option4"}
        ];        
        $scope.selectedValue = "Option1";
        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue"><uif-option ng-repeat="o in options" value="{{o.value}}">{{o.text}}</uif-option></uif-dropdown>')($scope);
        
        $scope.$digest();
        console.log("HTML: " + dropdown.html());
        var items = dropdown.find('option');
        expect(items.length).toBe(4);
        expect(items[2].innerText).toBe("Option 3");
    }));
    it("should be able to click", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        let dropdown: JQuery = $compile('<uif-dropdown></uif-dropdown>')($scope);
        $scope.$digest();
        
        dropdown.click();
        
        expect(dropdown.hasClass("is-open")).toBe(true);
        
        dropdown.click();
        expect(dropdown.hasClass("is-open")).toBe(false);
        
    }));
    it("should be able to select an option", inject(($compile, $rootScope) => {
        var $scope = $rootScope.$new();
        $scope["options"] = [
            { text: "Option 1", value: "Option1"},
            { text: "Option 2", value: "Option2"},
            { text: "Option 3", value: "Option3"},
            { text: "Option 4", value: "Option4"}
        ];
        $scope["selectedValue"] = "Option1";
        
        let dropdown: JQuery = $compile('<uif-dropdown ng-model="selectedValue"><uif-option ng-repeat="option in options" value="{{option.value}}">{{option.text}}</uif-option></uif-dropdown>')($scope);
        $scope.$digest();
        dropdown.appendTo(document.body);
        var option3 = jQuery(dropdown.find('option')[2]);
        
        option3.click();
        var title = dropdown.find('span.ms-Dropdown-title');
        expect(title.text()).toBe("Option 3", "Displayed text should be Option 3");
        expect($scope["selectedValue"]).toBe("Option3", "Selected value should be Option3");
        
        
    }));
// 
//     it("should be able to disable a select", inject(($compile, $rootScope) => {
//         var $scope = $rootScope.$new();
//         $scope["options"] = [
//             { text: "Option 1"},
//             { text: "Option 2"},
//             { text: "Option 3"},
//             { text: "Option 4"}
//         ];
//         $scope["selectedValue"] = "Option 1";
//         $scope["isDisabled"] = true;
//         var dropdown = $compile('<uif-dropdown is-disabled="isDisabled" options="options" selected-value="selectedValue"></uif-dropdown>')($scope);
//         $scope.$digest();
// 
//         var title = $(dropdown[0]).find('.ms-Dropdown-title');
//         expect(title.text()).toBe("Option 1");
//         var items = $(dropdown[0]).find('.ms-Dropdown-item');
// 
// 
//         console.log("3:" + items[3].outerHTML);
//         $(items[3]).click();
// 
//         title = $(dropdown[0]).find('.ms-Dropdown-title');
//         expect(title.text()).toBe("Option 1");
//     }));

    

});

