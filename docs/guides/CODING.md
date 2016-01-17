# Coding Guidelines

- [Project Structure](#project-structure)
- [Angular Directives](#angular-directives)
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
│   │   ├── demo
│   │   │   ├── index.html
│   │   │   └── index.ts
│   │   ├── <component>Directive.spec.ts
│   │   ├── <component>Directive.ts
│   │   ├── demoBasicUsage
│   │   │   ├── index.html
│   │   │   └── index.ts
│   │   ├── <component>Directive.spec.ts
│   │   ├── <component>Directive.ts
│   └── icon
│       ├── demo
│       │   ├── index.html
│       │   └── index.ts
│       ├── demoBasicUsage
│       │   ├── index.html
│       │   └── index.ts
│       ├── iconDirective.spec.ts
│       └── iconDirective.ts
└── core
    ├── components.spec.ts
    ├── components.ts
    ├── core.spec.ts
    └── core.ts
```

All components will depend on the `core.ts` file which contains the shared assets in the library. The `components.ts` file contains the `officeuidabric.components` module declaration which consumers can use to import all components rather than one at a time.

Each component should have at least a `demo` folder that contains the HTML & script that demonstrates how the component can be used. This should be a fully working sample. Additional demo folders can be provided for alternate implementations of the component. use the naming convention `demo[..]` for these alternate implementations. In addition, feel free to include a `README.md` within the demo folders for additional explanation when warranted.

Components are compiled and distributed as a library to:

```
/dist
├── ngOfficeUiFabric.js
└── ngOfficeUiFabric.min.js
```

> **NOTE**: The `dist` folder is not version controlled. In addition, both files are generated based on the parameters passed to the gulp **build-lib** task.

## Angular Directives

Refer to the [DIRECTIVE-CHECKLIST](DIRECTIVE-CHECKLIST.md) for a list of all the requirements and guidelines for creating new or updating existing directives

## Coding Style & Rules

All code should be clear & well commented.

### Coding Conventions
- All components must depend on the `officeuifabric.components` module.
- All components must have unique & understandable module names prefixed with `officeuifabric.components`, such as `officeuifabric.components.iconß`.
- All directives must use the `uif-` prefix for both the directive names & any directive attributes.
- Directive templates should be defined inline.

### Testing

- All components must have valid & passing unit tests.
- All features / bug fixes must be tested by one or more specs.

> **NOTE:** See **[Developer Testing](TESTING.md)** for more information on testing.

### Coding

- All code styles are defined in the [tslint.json](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/tslint.json) file.
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

All directives should be authored in TypeScript

## Commit Messages

Do your best to factor commits appropriately, i.e not too large with unrelated things in the same commit, and not too small with the same small change applied N times in N different commits. If there was some accidental reformatting or whitespace changes during the course of your commits, please rebase them away before submitting the PR.

## Versioning

We use [semver](http://semver.org/) for versioning with one exception: the goal is to march to 1.0.0 which means this project has complete component & theming coverage with the Office UI Fabric 1.0.0 release.

With each new component, we will bump the minor version and with each bug fix / patch we'll bump the patch version.
