# Coding Guidelines

- [Project Structure](#project-structure)
- [Angular Directives](#angular-directives)
- [Coding Style & Rules](#coding-style--rules)
- [Documentation](#documentation)
- [TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)?](#typescript-javascript-es5-or-ecmascript-2015-es6)
- [Commit Messages](#commit-messages)
- [Versioning](#versioning)

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
│   │   └── <component>Directive.ts
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

All components will depend on the `core.ts` file which contains the shared assets in the library. The `components.ts` file contains the `officeuifabric.components` module declaration which consumers can use to import all components rather than one at a time.

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

## TypeScript, JavaScript (ES5) or EcmaScript 2015 (ES6)

All directives should be authored in TypeScript.

## Commit Messages

> The following guidelines should be followed but we recognize that not everyone has strong git-fu. Therefore while we appreciate you respecting the following guidelines, if a pull request is submitted that does not follow them, the branch managers may modify your commits, including the commit message and breaking up or squashing commits when merging your pull request.

> Look at the existing commits to see examples of how these rules are applied. The easiest way to view commits is to run `git log` to see the full commit or `git log --oneline` to see just the first line of the commit. Scroll the list by pressing `ENTER` and leave the log list by pressing `q`.

Do your best to factor commits appropriately. Commits should not be too large with unrelated things in the same commit, and not too small with the same small change applied *N* times in *N* different commits. If there was some accidental reformatting or whitespace changes during the course of your commits, please [squash them into a single commit](http://www.andrewconnell.com/blog/squash-multiple-git-commits-into-one).

Each commit message consists of a **header**, **body** and a **footer**. The header includes three parts: a **type**, **scope** and **subject**:

```
type(scope): subject
-BLANK LINE-
body
-BLANK LINE-
footer
```

The header line should not exceed 75 characters... the idea is to be able to quickly read the topic of the commit in any git tool including GitHub, the console/terminal or other tool of choice.

### Commitizen
When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time. This way, you don't have to wait until git commit hook verfies your commit (though that can still be helpful). Don't have to remember the commit message format and digg through Coding.md to find what the preferred format is. Commitizen gives feedback on your commit message formatting and be prompted for required fields.

You would run ```npm run commit``` instead of good old git commit and commitizen will take care of formating the commit message for you.
When you fetch latest, make sure you run ```npm install``` to get the module in you local.


### Type

The type must be one of the following options. This is used to explain what was included in the commit:

- **feat**: a new feature
- **fix**: bug fix
- **docs**: documentation only changes, including releases
- **style**: change that doesn not affect meaning of the code (*white-space, missing semi-colons, formatting, etc)
- **refactor**: code change that neither fixes a bug or adds a feature
- **perf**: code change that improves performance
- **test**: adds, updates or changes tests
- **chore**: changes to the build process or auxiliary tools & libraries

### Scope

Anything specifying the place of the commit change. This is not always required and can be left blank, but in those cases leave an empty parents `()`.

### Subject

A short description of what the commit addresses. The goal is to be able to run `git log --oneline` and get a quick view of what each commit does without extra details.

- use the present tense, imperative (use *add* and *fix*, not *adding* or *adds* or *fixed*, *fixing*, *fixed*)
- don't capitalize the first letter
- don't end with a dot (.)

### Body

Just like the **subject**, use imperative, present tense. The body should include the motivation for the change and contrast with previous behavior. Don't include things obvious from looking at the code that changed like "added missing semi colon to breaking test". For simple changes the body may be omitted as the header & easily looking at the code may be enough to convey what the commit does.

In the case of breaking changes, you should include a 2-space indented section that explains the breaking change and how you should change your code. Start the breaking change explanation with **BREAKING CHANGE:** and an explanation followed by two sections that explain how to change your code.

A good example of a breaking change is as follows:

````
refactor(navbar): update to use `uif-content`
Update the `uif-navbar` directive to use the new `uif-content` directive for displaying rich content within the control.

  BREAKING CHANGE: Where using rich content in a `uif-navbar` (like when displaying text), replace the `uif-nav-item-content` with `uif-content`

  Change your code from this:

  ```html
  <uif-nav-bar-item>
    <uif-nav-item-content>
      <uif-icon uif-type="arrowRight"></uif-icon><b>Item in bold with icons</b>
      <uif-icon uif-type="arrowLeft"></uif-icon>
    </uif-nav-item-content>
  </uif-nav-bar-item>
  ```

  To this:

  ```html
  <uif-nav-bar-item>
    <uif-content>
      <uif-icon uif-type="arrowRight"></uif-icon><b>Item in bold with icons</b>
      <uif-icon uif-type="arrowLeft"></uif-icon>
    </uif-content>
  </uif-nav-bar-item>
  ```

Closes #201.
````

### Footer

Be sure to state what this commit does if it addresses a specific issue. For instance, if a commit closes issue 374, add `Closes #374.`. Notice the period on the end. If it addresses multiple issues, repeat the word *closes* or *references* if it simply references the issue and doesn't close it like so: `Closes #374. References #375. Closes #374.`.

> By including this at the end, GitHub and other external tools can link the commit to the issue automatically as you can see in this example for this commit: https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/98b142a2e99c32b98a2a0e8ba4f3169c35d9f708.

## Versioning

We use [semver](http://semver.org/) for versioning with one exception: the goal is to march to 1.0.0 which means this project has complete component & theming coverage with the Office UI Fabric 1.0.0 release.

With each new component, we will bump the minor version and with each bug fix / patch we'll bump the patch version.
