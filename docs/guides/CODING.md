- [Project Structure](#project-structure)
- [Coding Style & Rules](#coding-style--rules)
- [TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?](#typescript-javascript-es5-or-ecmascript-2015-es6)

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

### Documentation

- All non-trivial functions should have a JSDoc description.

## TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?

The use of TypeScript is not required, but it is encouraged. Both JavaScript (ES5) and EcmaScript 2015 (ES6 / ES2015) are permitted. 

  > **NOTE:** At the present time, all directives are authored using TypeScript. Contact the project owner(s) if you are going to write a directive in JavaScript so the project documentation & build rules can be setup accordingly.

Do not author components using CoffeeScript or other languages that need to be transpiled to JavaScript.

If your directive needs to include JavaScript, manually add an override line item in the `.gitignore` and `BuildConfig.APP_KEEP_JS` property found in the `\build\gulp\config.ts` file to ensure the file is:
  1. not deleted by the cleanup process
  1. are included in source control