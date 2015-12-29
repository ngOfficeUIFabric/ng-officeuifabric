# Coding Guidelines

- [Project Structure](#project-structure)
- [Angular Directive Types](#angular-directive-types)
- [Angular Directive Prefix](#angular-directive-prefix)
- [Coding Style & Rules](#coding-style--rules)
- [Documentation](#documentation)
- [TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?](#typescript-javascript-es5-or-ecmascript-2015-es6)
- [Commit Messages](#commit-messages)

## Project Structure

The components within the ngOfficeUIFabric are organized as follows:

```
/src
├── components
│   ├── <component folder>
│   │   └── demoBasicUsage
│   │   │   ├── index.html
│   │   │   └── index.ts
│   │   ├── <component>Directive.spec.ts
│   │   ├── <component>Directive.ts
│   └── textfield
│       ├── demoBasicUsage
│       │   ├── index.html
│       │   └── index.ts
│       ├── textBoxDirective.spec.ts
│       └── textBoxDirective.ts
└── core
    └── core.ts
```

> **NOTE**: You can use TypeScript or JavaScript in the authoring of components. Refer to the section [TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?](#typescript-javascript-es5-or-ecmascript-2015-es6) for more information.

All components will share the `core.ts` file which contains the top-level module declaration of the library.

Each component should have at least a `demoBasicUsage` folder that contains the HTML & script that demonstrates how the component should be used. Additional demo folders can be provided for alternate implementations of the component. use the naming convention `demo[..]` for these alternate implementations. In addition, feel free to include a `README.md` within the demo folders for additional explanation when warranted.

Components are compiled and distributed as a library to:

```
/dist
├── ngOfficeUiFabric-0.1.0.js
└── ngOfficeUiFabric-0.1.0.min.js
```

> **NOTE**: The `dist` folder is not version controlled.

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

## Coding Style & Rules

All code should be clear & well commented.

### Coding Conventions
- All components must depend on the `fabric.ui.components` module.
- All components must have unique & understandable module names prefixed with `fabric.ui.components`, such as `fabric.ui.components.choidefield`.
- All directives must use the `uif-` prefix for both the directive names & any directive attributes.
- Directive templates should be defined inline.

### Testing

- All components must have valid & passing unit tests.
- All features / bug fixes must be tested by one or more specs.

> **NOTE:** See **[Developer Testing](Developer-Testing.md)** for more information on testing.

### Coding

- All code styles are defined in the [tslint.json](/ngOfficeUIFabric/ng-officeuifabric/blob/master/tslint.json) file. 

  > **NOTE:** At the present time, all directives are authored using TypeScript. Contact the project owner(s) if you are going to write a directive in JavaScript so the appropriate linting can be setup in the project.

- Ensure all code has valid style by running the gulp task `vet` to perform checks.
- When fixing / enhancing existing code:
  - Do not reformat author's code.
  - Conform to standards & practices used within that code.
  - Update any JSDocs for functions & single-line comments for code blocks.
  - Be careful of regression errors introduced by your changes.
  - Always test your changes with unit tests & manual user testing.
- Do not introduce variables into the global namespace
- Do not take a dependency on jQuery or other libraries unless absolutely required (*like `pickadate.js` for some controls*).
- If your directive depends on a 3rd party library

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

## TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?

The use of TypeScript is not required, but it is encouraged. Both JavaScript (ES5) and EcmaScript 2015 (ES6 / ES2015) are permitted. 

  > **NOTE:** At the present time, all directives are authored using TypeScript. Contact the project owner(s) if you are going to write a directive in JavaScript so the project documentation & build rules can be setup accordingly.

Do not author components using CoffeeScript or other languages that need to be transpiled to JavaScript.

If your directive needs to include JavaScript, manually add an override line item in the `.gitignore` and `BuildConfig.APP_KEEP_JS` property found in the `\build\gulp\config.ts` file to ensure the file is:
  1. not deleted by the cleanup process
  1. are included in source control

## Commit Messages

Do your best to factor commits appropriately, i.e not too large with unrelated things in the same commit, and not too small with the same small change applied N times in N different commits. If there was some accidental reformatting or whitespace changes during the course of your commits, please rebase them away before submitting the PR.

## Versioning

We use [semver](http://semver.org/) for versioning with one exception: the goal is to march to 1.0.0 which means this project has complete component & theming coverage with the Office UI Fabric 1.0.0 release.

With each new component, we will bump the minor version and with each bug fix / patch we'll bump the patch version.

