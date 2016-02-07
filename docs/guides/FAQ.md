# FAQ - Frequently Asked Questions

As we get commonly asked questions, we will post them here.

- [How has ngOfficeUiFabric Helped the Community?](#)
- [What Version of Angular is Supported?](#)
- [What are the Plans for Angular 2 Support?](#)
- [What is the Release Schedule?](#)
- [What Dependencies does ngOficeUiFabric Have?](#)

---

## How has ngOfficeUiFabric Helped the Community?

In working on this library, the contributors have found and reported numerous bugs / issues within the Office UI Fabric project including these:

  - [#262](https://github.com/OfficeDev/Office-UI-Fabric/issues/262) - Version number in header of distribution CSS incorrect for 1.2.0 (says 1.1.3)
  - [#281](https://github.com/OfficeDev/Office-UI-Fabric/issues/281) - Progress Indicator's CSS not in main CSS distro
  - [#283](https://github.com/OfficeDev/Office-UI-Fabric/issues/283) - ContextualMenu header text out of alignment
  - [#287](https://github.com/OfficeDev/Office-UI-Fabric/issues/287) - Fix ContextualMenu animations
  - [#292](https://github.com/OfficeDev/Office-UI-Fabric/issues/292) - Design responsive behavior for tables
  - [#302](https://github.com/OfficeDev/Office-UI-Fabric/issues/302) - Label consisting of multiple words wrapped on each word
  - [#316](https://github.com/OfficeDev/Office-UI-Fabric/issues/316) - TextField: Placeholder interferes with input field hover

## What Version of Angular is Supported?

At the current time ngOfficeUiFabric supports **Angular 1.4+**.

## What are the Plans for Angular 2 Support?

Angular 2 is absolutely on the roadmap!

Once ngOfficeUiFabric has full coverage of all the components in Office UI Fabric for Angular 1.4+. Once that's finished we will start on Angular 2.

## What is the Release Schedule?

Generally speaking, as early & often as features & fixes warrant. Typically this means we cut a new release on a weekly basis.

## What Dependencies does ngOficeUiFabric Have?

This library has only two dependencies:

- Office UI Fabric's CSS

  This library only takes a dependency on the CSS for the Office UI Fabric. We are not using the jQuery sample extensions that the Office UI Fabric uses in their demos and samples. Instead we implement everything using vanilla JavaScript & Angular.

  In addition, because many CSS issues were solved in v2.*, we depend on the latest CSS libraries.

- Angular 1.4+

  The library has been developed against Angular 1.4.x.

There is one exception to the dependencies above. The date picker component in the Office UI Fabric has a tight dependency on the [pickadate.js](http://amsul.ca/pickadate.js/) library. Because this library is a [jQuery](http://jquery.com/) plugin & the Office UI Fabric CSS is written for this plugin, when using our date picker component, you will need:

  - [jQuery](https://www.npmjs.com/package/jquery) v2.2.0
  - [pickadate](https://www.npmjs.com/package/pickadate) v3.4.6