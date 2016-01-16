# Angular Directive Checklist

This document details the guidelines & requirements for submitting pull requests (PR) that either submit new or update existing Angular directives to the library. The library managers will refer to this checklist when evaluating your PRs.

Most of the guidance is based on the [Angular Material](http://material.angularjs.org) project as we want to follow a lot of the rules & styles they have chosen.

## Table of Contents

- [Directives](#directives)
  - (001) [Directive Candidates](#directive-candidates)
  - (002) [Directive Types](#directive-types)
  - (003) [Directive Prefix](#directive-prefix)
  - (004) [Module Naming](#module-naming)
  - (005) [Use External Modules](#use-external-modules)
  - (006) [Directive Attributes](#directive-attributes)
  - (007) [Directive Attribute Validation](#directive-attribute-validation)
  - (008) [Error Messages](#error-messages)
- [Testing](#testing)
  - (101) [Verify Coverage with Tests](#verify-coverage-with-tests)
  - (102) [Organizing Tests](#organizing-tests)
  - (103) [Code Analysis](#code-analysis)
- [Documentation](#documentation)
  - (201) [Document all Directives](#document-all-directives)
- [Examples](#examples)
  - (301) [Include Example Usage](#include-example-usage)
  - (302) [Include Complete Demo](#include-complete-demo)
  - (303) [Include Spot Demos](#include-spot-demos)



## Directives

### Directive Candidates 
###### [Guideline [001](#guideline-001)]

All directives submitted should be an implementation of one of the existing Office UI Fabric components listed on http://dev.office.com/fabric/components. 

*Why?*: We are not trying to create a competing project... this library is simply an Angular directive port of the Office UI Fabric library. 

### Directive Types
###### [Guideline [002](#guideline-002)]

All directives should be *element directives*, not *attribute directives*. In some cases it will make sense to create attribute directives for element directives. 

*Why?* : Simply put, this is how the Angular Material team does it.

For instance, do not do the following:

```html
<input type="text" uif-textfield />
```

Rather you would create a directive:

```html
<uif-textfield />
```

### Directive Prefix
###### [Guideline [003](#guideline-003)]

All directives should use the prefix `uif-`. This stands for *UI Fabric* which is the common name the Office UI Fabric is referred as.

*Why?*: This makes it easier to spot directives directly related to this library.

```html
<uif-choicefield-group id="choiceValue" name="choiceValue" label="Select something"
                       ng-model="choiceValue" 
                       ng-required="choiceRequired">
  <uif-choicefield value="Test1"><a href="#">Test 1</a></uif-choicefield>
  <uif-choicefield value="Test2"><a href="#">Test 2</a></uif-choicefield>
  <uif-choicefield value="Test3"><a href="#">Test 3</a></uif-choicefield>
</uif-choicefield-group>
```

### Module Naming
###### [Guideline [004](#guideline-004)]

Put all directives within the module `officeuifabric.components.[]`. This should be defined in the directive code file. 

It should also be added as a dependency in the `officeuifabric.components` module so developers can add just a single module that will load all directives.

For example, the button would be in `officeuifabric.components.button`. 

Here's an example how you can register the button directive after you've defined the class.

```javascript
export var module: ng.IModule = 
  ng.module('officeuifabric.components.button', [
            'officeuifabric.components'
  ])
  .directive('uifButton', 
             ButtonDirective.factory()
  );
```

*Why?*: This scopes each directive within it's own module.


###Use External Modules
###### [Guideline [005](#guideline-005)]

Define directives using the TypeScript external module syntax as shown below. Do **not** use the internal module (ie: *namespace*) syntax.

```javascript
'use strict';
import * as ng from 'angular';

interface IButtonScope extends ng.IScope {
  disabled: boolean;
}

class ButtonDirective implements ng.IDirective {
  public restrict: string = 'E';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new ButtonDirective();

    return directive;
  }

  public link(scope: IButtonScope, 
              instanceElement: ng.IAugmentedJQuery, 
              attrs: ng.IAttributes): void {
  }
}
```

The library uses [webpack](http://webpack.github.io/) as a module loader as modules are not supported by all browsers.

###Directive Attributes
###### [Guideline [006](#guideline-006)]

Any element directive that requires custom attributes must prefix those attributes with `uif-` to indicate they are ngOfficeUiFabric specific attributes.

However if you can reuse an existing HTML attribute that would be used for the same or similar purpose, do that. For example, don't create a `uif-value` attribute on a input control to set the value of the control when you can easily use `value` which would do the same thing on a `<input type="text" />` control.

###Directive Attribute Validation
###### [Guideline [007](#guideline-007)]

Directives that have an attribute that a developer can set, if the attribute has expected & defined values it should:

- include an enumeration that includes all possible options
- validation logic that logs an error on failures in the console using the Angular `$log.error()`

For example, here's what the enumeration looks like for the `uif-icon` directive:

```javascript
export enum IconEnum {
  alert,
  alert2
}
```

Here is an example of validation within a directive's `link()` function:

```javascript
public link(scope: IIconScope, 
            instanceElement: ng.IAugmentedJQuery, 
            attrs: ng.IAttributes, 
            controller: IconController): void {
  // add watcher
  scope.$watch('uifType', (newValule: string, oldValue: string) => {
    // verify a valid icon was passed in
    if (IconEnum[newValule] === undefined) {
      controller.$log.error('Error [ngOfficeUiFabric] {{module}} - {{error}}: {{error details + link to enum of options}}');
    }
  });
};
```

> Look at the `uif-icon` directive (in release v0.2.0+) for an example of how this is done.

###Error Messages
###### [Guideline [008](#guideline-008)]

When logging errors from the library to the console, always use the Angular `$log` service.

Error messages should have the format of:

```
Error [ngOfficeUiFabric] {{module}} - {{error}}: {{error details + link to enum of options}}
```

- **{{module}}**: should be the name of the module the error is logged from
- **{{error}}**: short name of the error
- **{{error details}}**: detailed description of the error; if you can reference something, do so... for instance, if something failed validation you could point to the enumeration file within the `master` branch of the repo.

**[Back to top](#table-of-contents)**




## Testing
Refer to the [TESTING](TESTING.md) guide for details on how to execute and load tests.

### Verify Coverage with Tests
###### [Guideline [101](#guideline-101)]

All directives must have ample test coverage with unit tests written using [Jasmine](http://jasmine.github.io/) & run using [Karma](http://karma-runner.github.io/).

Refer to existing directives for good test examples.

*Why?*: Multiple people are working on this library... unit tests make it easy to identify issues for code you aren't familiar with and to verify directives worked as intended.

### Organizing Tests
###### [Guideline [102](#guideline-102)]

Tests for a directive should be in a file with the same name as the directive, but with the word **spec** in the name.

For instance:
  - Directive: `myDirective.ts`
  - Tests: `myDirective.spec.ts`

*Why?*: Keep directives and tests well organized.

### Code Analysis
###### [Guideline [103](#guideline-103)]

Use **[tslint](https://www.npmjs.com/package/tslint)** to analyze your directive code as well as your tests. Use the gulp task **[vet-lib-ts](GULP-TASKS.md#-gulp-vet-lib-ts)** to do this.

*Why?*: Tests are code too. Clean & well-formed code without quality issues can ensure tests work properly.

**[Back to top](#table-of-contents)**




## Documentation

### Document all Directives
###### [Guideline [201](#guideline-201)]

Include [JSDOC](http://usejsdoc.org/) style documentation for all directives. This is so we can dynamically generate documentation at a future date.

Refer to the [button Angular Material directive](https://github.com/angular/material/blob/master/src/components/button/button.js) for a good example.

You should include:
  - declaration (`@ngdoc`)
  - module (`@module`)
  - name (`@name`)
  - description (`@description`)
    - in the first line, include the directive
  - see (`@see`)
    - point to the Office UI Fabric component)
  - restrictions (`@restirct`)
  - public parameters (`@param`)
  - usage example (`@usage`)

For example:

```javascript
/**
 * @ngdoc directive
 * @name uifButton
 * @module officefabricui.components.button
 *
 * @restrict E
 *
 * @description
 * `<uif-button>` is a button directive.
 *
 * If you supply a `href` or `ng-href` attribute, it will become an `<a>` element.
 * Otherwise, it will become a `<button>` element.
 *
 * @param {expression=} ng-disabled En/Disable based on the expression
 * @param {string=} aria-label Adds alternative text to button for accessibility, 
 *                             useful for icon buttons.
 * If no default text is found, a warning will be logged.
 * 
 * @see {link dev.office.com/fabric/components/button}
 * 
 * @usage
 *
 * Regular buttons:
 *
 * <div lang="html">
 *  <uif-button> Flat Button </uif-button>
 *  <uif-button href="http://google.com"> Flat link </uif-button>
 *  <uif-button ng-disabled="true"> Disabled Button </uif-button>
 *  <uif-button>
 *    <uif-icon uif-type="your/icon.svg"></uif-icon>
 *    Register Now
 *  </uif-button>
 * </div>
 */
```

**[Back to top](#table-of-contents)**




## Examples

### Include Example Usage
###### [Guideline [301](#guideline-301)]

Include example usage for each directive. This example should be able to be run by anyone who does the following:

1. Clone `master` branch of the repo locally.
1. Build the library to the `/dist` folder.
1. Open the directive's example file in the browser to se it running.

The folder organization should look like the following:

  ```shell
  .
  ├── demo
  │   ├── index.html
  │   ├── index.js
  │   └── index.ts
  ├── demoBasicUsage
  │   ├── index.html
  │   ├── index.js
  │   └── index.ts
  ├── demoCommandButton
  │   ├── index.html
  │   ├── index.js
  │   └── index.ts
  ├── demoCompoundButton
  │   ├── index.html
  │   ├── index.js
  │   └── index.ts
  ├── myDirective.spec.ts
  └── myDirective.ts
  ```

Each `index.html` file would reference the generated library file in the `/dist` folder.

In the future we will dynamically build an example site, but for now we need an easy way for developers to see the directives work.

*Why?*: It should be easy for anyone to try out the directive.

### Include Complete Demo
###### [Guideline [302](#guideline-302)]

Each directive *must* include a `demo` folder with an `html` and JavaScript or TypeScript file. This should include a verbose demo and optionally usage documentation of the directive.

**THIS IS REQUIRED**

### Include Spot Demos
###### [Guideline [303](#guideline-303)]

Each directive *can* include a `demo[*]` folder with an `html` and JavaScript or TypeScript file. These folders can include broken down demos. Each `index.html` file should include *ONLY* the HTML required to use the directive.

These will not run independently... they will be used later in the dynamic generation of an example site.

**THIS IS NOT REQUIRED**

**[Back to top](#table-of-contents)**
