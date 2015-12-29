# Developer Guide

This describes the guidelines developers should follow when making contributions to this repo.

## Development Tasks

Gulp is used to automate some test and style checks within this repo. To view a list of all the tasks available, run the following from the root of the repo:

```bash
$ gulp
```

Refer to **[GULP-TASKS](GULP-TASKS.md)** for more details on the available gulp tasks in this project.

## Commit Messages

Do your best to factor commits appropriately, i.e not too large with unrelated things in the same commit, and not too small with the same small change applied N times in N different commits. If there was some accidental reformatting or whitespace changes during the course of your commits, please rebase them away before submitting the PR.

## Versioning

We use [semver](http://semver.org/) for versioning with one exception: the goal is to march to 1.0.0 which means this project has complete component & theming coverage with the Office UI Fabric 1.0.0 release.

With each new component, we will bump the minor version and with each bug fix / patch we'll bump the patch version.

## Coding Style

All TypeScript code must pass the [tslint](https://www.npmjs.com/package/tslint) rules defined `/ngofficeuifabric/ng-officeuifabric/blob/master/tslint.json`.

Check all source files to ensure they meet these guidelines using the provided gulp task **vet**:

```
$ gulp vet
```

## Angular Directive Types

All directives should be element directives, not attribute directives.

## Angular Directive Prefix

All directives should use the prefix **uif-**

```html
<uif-choicefield-group id="choiceValue" name="choiceValue" label="Select something"
                       ng-model="choiceValue" 
                       ng-required="choiceRequired">
	<uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>
	<uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>
	<uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>
</uif-choicefield-group>
```

## Documentation

Directive documentation will be dynamically built at some point and therefore it is important all components are well documented. This process will use the Angular [dgeni](https://github.com/angular/dgeni) JavaScript documentation generator used by Angular, Protractor and other JavaScript projects. It is derived from [jsdoc](http://usejsdoc.org/). 

- All non-trival functions should have a [jsdoc](http://usejsdoc.org/) description.
- All Angular directives should have a comprehensive [jsdoc](http://usejsdoc.org/) block that explains the directive complete with the following:
  - Name
  - Module
  - Restrictions
  - Description
  - Usage example
  - Parameters with type details.

Refer to the Angular Material project for good examples of directive documentation, such as the [md-autocomplete](https://github.com/angular/material/blob/master/src/components/autocomplete/js/autocompleteDirective.js) directive.