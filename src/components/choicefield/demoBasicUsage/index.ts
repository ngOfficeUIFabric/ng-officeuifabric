angular.module('testApp').controller('testController', function ($scope: any): void {
    $scope.selectedValue = 'Undefined';
    $scope.choiceRequired = true;
    $scope.choiceValue = 'Option 1';
    $scope.options = [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
        { text: 'Option 4' }
    ];
});
