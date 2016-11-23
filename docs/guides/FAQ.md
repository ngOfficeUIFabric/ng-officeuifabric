# FAQ - Frequently Asked Questions

As we get commonly asked questions, we will post them here.

- [How has ngOfficeUiFabric Helped the Community?](#how-has-ngofficeuifabric-helped-the-community)
- [What Version of Angular is Supported?](#what-are-the-plans-for-angular-2-support)
- [What are the Plans for Angular 2 Support?](#what-are-the-plans-for-angular-2-support)
- [What is the Release Schedule?](#what-is-the-release-schedule)
- [What Dependencies does ngOficeUiFabric Have?](#what-dependencies-does-ngoficeuifabric-have)

---

## How has ngOfficeUiFabric Helped the Community?

In working on this library, the contributors have found and reported numerous bugs / issues within the Office UI Fabric project including these:

- [#262](https://github.com/OfficeDev/Office-UI-Fabric/issues/262) - Version number in header of distribution CSS incorrect for 1.2.0 (says 1.1.3)
- [#281](https://github.com/OfficeDev/Office-UI-Fabric/issues/281) & [#325](https://github.com/OfficeDev/Office-UI-Fabric/issues/325) - Progress Indicator's CSS not in main CSS distro
- [#283](https://github.com/OfficeDev/Office-UI-Fabric/issues/283) - ContextualMenu header text out of alignment
- [#287](https://github.com/OfficeDev/Office-UI-Fabric/issues/287) - Fix ContextualMenu animations
- [#292](https://github.com/OfficeDev/Office-UI-Fabric/issues/292) - Design responsive behavior for tables
- [#302](https://github.com/OfficeDev/Office-UI-Fabric/issues/302) - Label consisting of multiple words wrapped on each word
- [#316](https://github.com/OfficeDev/Office-UI-Fabric/issues/316) - TextField: Placeholder interferes with input field hover
- [#328](https://github.com/OfficeDev/Office-UI-Fabric/issues/328) - Large spinner misplaced
- [#336](https://github.com/OfficeDev/Office-UI-Fabric/issues/336) - Datepicker does not work with pickadate @ 3.5.6
- [#346](https://github.com/OfficeDev/Office-UI-Fabric/issues/346) - Hero button icon not centered
- [#389](https://github.com/OfficeDev/Office-UI-Fabric/issues/389) - Remove content-specific classes from PersonaCard

## What Version of Angular is Supported?

At the current time ngOfficeUiFabric supports **Angular 1.5+**.

## What are the Plans for Angular 2 Support?

Angular 2 is absolutely on the roadmap!

Once ngOfficeUiFabric has full coverage of all the components in Office UI Fabric for Angular 1.5+. Once that's finished we will start on Angular 2.

## What is the Release Schedule?

Generally speaking, as early & often as features & fixes warrant. Typically this means we cut a new release on a weekly basis.

## What Dependencies does ngOficeUiFabric Have?

This library has only two dependencies:

- Office UI Fabric's CSS

  This library only takes a dependency on the CSS for the Office UI Fabric. We are not using the jQuery sample extensions that the Office UI Fabric uses in their demos and samples. Instead we implement everything using vanilla JavaScript & Angular.

  In addition, because many CSS issues were solved in v2.*, we depend on the latest CSS libraries.

- Angular 1.5+

  The library has been developed against Angular 1.5.x.

There is one exception to the dependencies above. The date picker component in the Office UI Fabric has a tight dependency on the [pickadate.js](http://amsul.ca/pickadate.js/) library. Because this library is a [jQuery](http://jquery.com/) plugin & the Office UI Fabric CSS is written for this plugin, when using our date picker component, you will need:

- [jQuery](https://www.npmjs.com/package/jquery) v2.2.0
- [pickadate](https://www.npmjs.com/package/pickadate) v3.4.6
