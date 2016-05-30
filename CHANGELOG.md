<a name="next"></a>
### [next (TBD)](https://github.com/ngOfficeUIFabric/ng-officeuifabric/tree/dev)

#### Features

- **uif-messagebar**
  - new directive ([fb6e579](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/fb6e579), Closes [#339](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/339))

#### Fixes

- **build dependencies**
  - set explicit version dependencies for NPM packages ([14e8e64](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/14e8e64), Closes [#347](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/347))
  - update typings to v1.x ([1e355d7](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1e355d7), [31cd8d9](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/31cd8d9), [87e1602](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/87e1602), Closes [#346](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/346))
- **uif-breadcrumb**
  - missing responsiveness fixed ([8c020dc](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/8c020dc), [#342](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/342))
- **uif-dropdown**
  - initial value not set correctly for integer keys ([c987430](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c987430), Closes [#327](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/327))
- **uif-datepicker**
  - disabled not watched ([5073fa4](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/5073fa4), References [#268](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/268))
- **uif-searchbox**
  - dsiabled not watched ([5f71af3](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/5f71af3), References [#268](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/268)).


#### Special Notes for This Release

Two updates involved in this release have significant updates to the repo. First, we updated Typings to v1.x ([1e355d7](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1e355d7)) which had some breaking changes to how Typings referenced type definitions and the folder structure. Second, we changed the `package.json` to use explicit package version numbers ([14e8e64](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/14e8e64)) to avoid any issues.

One option to update your repo is to delete your fork & refork... but if you have existing work & branches that's not a good option. In that case do the following.

Before doing anything, update your dev & master branches:

  ```shell
  git checkout dev
  git pull --rebase upstream dev
  git checkout master
  get pull --rebase upstream master
  ```

To update your folder for the Typings update...

1. Update Typings to v1:

  ```shell
  npm install -g typings
  ```

1. Delete the old `/typings` folder (as it will have extra folders you don't need
1. Recreate the typings folder:

  ```shell
  typings install
  ```

  > At this point, if you refreshed from upstream `master` and `dev`, running `git status` should show no changes.

To update NPM with the current modules...

1. Delete the NPM `/node_modules` folder
1. Reinstall the specific NPM package versions:

  ```shell
  npm install
  ```

------------------


<a name="0.10.3"></a>
### [0.10.3 - May 24, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.10.3)

#### Fixes

- **dependencies**
  - update library dependency on **Office UI Fabric 2.6.0** ([79cc25c](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/79cc25c), Closes [#341](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/341))
- **uif-breadcrumb**
  - breadcrumb with ng-repeat ([da1f32a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/da1f32a), Closes [#330](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/330))
- **uif-icon**
  - update supported icon list ([920a174](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/920a174), Closes [#336](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/336))


------------------


<a name="0.10.2"></a>
### [0.10.2 - May 11, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.10.2)

#### Features

- **uif-textfield**
  - add support for input additional types ([3cf3ec8](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/3cf3ec8), Closes [#323](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/323))

#### Fixes

- **dependencies**
  - update karma version dependencies ([8e04ed6](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/8e04ed6))
  - update library dependency on **Office UI Fabric 2.5.0** ([2fe77c1](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/2fe77c1), Closes [#331](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/331))
- **uif-messagebanner**
  - fixed `uif-is-visible` binding ([5de4175](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/5de4175), Closes [#333](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/333))
- **uif-pivot**
  - fixed Pivot demo to display contextual menu in ellipsis ([414ba41](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/414ba41))


------------------


<a name="0.10.1"></a>
### [0.10.1 - May 4, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.10.1)


#### Fixes

- **uif-textfield**
  - ng-change not working ([0b33058](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0b33058), Closes [#324](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/324))


------------------


<a name="0.10.0"></a>
### [0.10.0 - April 27, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.10.0)

#### Features

- **uif-messagebanner**
  - add directive ([79748c0](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/79748c0), Closes [#299](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/299))
- **uif-pivot**
  - add directive ([76d4748](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/76d4748), Closes [#33](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/33))

#### Fixes

- **dependencies**
  - updated various build / dev dependencies
- **uif-peoplepicker**
  - issue when person not removed in demo ([18636c6](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/18636c6), Closes [#317](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/317))
- **uif-button**
  - ng-disabled not watched correctly ([aff3fd3](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/aff3fd3), Closes [#319](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/319))


------------------


<a name="0.9.0"></a>
### [0.9.0 - April 25, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.9.0)

#### Features

- **uif-peoplepicker**
  - add directive ([6e0ba80](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/6e0ba80), Closes [#30](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/30))
- **uif-table**
  - add new table type ([c643a25](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c643a25), [#308](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/308))
- **uif-toggle**
  - add ng checkbox attributes support ([bccfb64](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/bccfb64), Closes [#289](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/289))

#### Fixes

- **dependencies**
  - update library dependencies & verify working with **Office UI Fabric 2.4.1** ([c643a25](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c643a25))
- **uif-contextualmenu**
  - diabled not watched ([c914b96](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c914b96))
- **uif-commandbar**, **uif-contextualmenu**, **uif-navbar** & **uif-panel** 
  - change 'let' keyword in all demos ([8af391f](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/8af391f), Closes [#313](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/313))

------------------


<a name="0.8.4"></a>
### [0.8.4 - April 21, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.8.4)

#### Fixes

- **uif-button**
  - disabled not watched and handled ([59a2b87](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/59a2b87))
- **uif-textfield**
  - clear placeholder on click ([1ed03de](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1ed03de), Closes [#305](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/305))


------------------


<a name="0.8.3"></a>
### [0.8.3 - April 19, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.8.3)

#### Fixes

- **uif-datepicker**
  - remove label ([fe974ef](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/fe974ef), Closes [#295](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/295))
- **uif-dropdown**
  - selecting initial value ([1da267d](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1da267d), Closes [#230](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/230))
- **uif-textfield**
  - update demo multiline & type='password' test ([c3d4327](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c3d4327), Closes [#300](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/300), [#301](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/301))

#### Breaking Changes

- **uif-table**
  - changed rendering to use table markup ([d7822c8](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/d7822c8), Closes [#294](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/294))

  BREAKING CHANGE: although the table won't break it's recommended to add the `uif-table-head` and `uif-table-body` directives to the table for accessibility and rendering purposes.

  Change your code from:

  ```html
  <uif-table>
      <uif-table-row>
          <uif-table-row-select></uif-table-row-select>
          <uif-table-header>File name</uif-table-header>
          <uif-table-header>Location</uif-table-header>
          <uif-table-header>Modified</uif-table-header>
          <uif-table-header>Type</uif-table-header>
      </uif-table-row>
      <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
          <uif-table-row-select></uif-table-row-select>
          <uif-table-cell>{{f.fileName}}</uif-table-cell>
          <uif-table-cell>{{f.location}}</uif-table-cell>
          <uif-table-cell>{{f.modified | date}}</uif-table-cell>
          <uif-table-cell>{{f.type}}</uif-table-cell>
      </uif-table-row>
  </uif-table>
  ```

  to:

  ```html
  <uif-table>
      <uif-table-head>
          <uif-table-row>
              <uif-table-row-select></uif-table-row-select>
              <uif-table-header>File name</uif-table-header>
              <uif-table-header>Location</uif-table-header>
              <uif-table-header>Modified</uif-table-header>
              <uif-table-header>Type</uif-table-header>
          </uif-table-row>
      </uif-table-head>
      <uif-table-body>
          <uif-table-row ng-repeat="f in files" uif-selected="{{f.isSelected}}">
              <uif-table-row-select></uif-table-row-select>
              <uif-table-cell>{{f.fileName}}</uif-table-cell>
              <uif-table-cell>{{f.location}}</uif-table-cell>
              <uif-table-cell>{{f.modified | date}}</uif-table-cell>
              <uif-table-cell>{{f.type}}</uif-table-cell>
          </uif-table-row>
      </uif-table-body>
  </uif-table>
  ```


------------------


<a name="0.8.2"></a>
### [0.8.2 - April 19, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.8.2)

#### Features

- **uif-textfield**
  - multiline and password ([7d78807](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/7d78807), Closes [#227](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/227))


------------------


<a name="0.8.1"></a>
### [0.8.1 - April 19, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.8.1)

#### Fixes

- **dependencies**
  - update library dependencies & verify working with **Angular 1.5.5** & **Office UI Fabric 2.3.0** ([09bf108](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/09bf108), Closes [#287](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/287))
- **uif-textfield**
  - disabled attribute missing ([1e30042](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1e30042))
- **uif-toggle**
  - disabled attribute missing ([86675be](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/86675be))


------------------


<a name="0.8.0"></a>
### [0.8.0 - April 18, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.8.0)

#### Features

- **uif-list**
  - add directive ([7cd02dc](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/7cd02dc), Closes [#24](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/24))
- **uif-panel**
  - add directive ([774f44e](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/774f44e), Closes [#29](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/29))

#### Fixes

- **uif-icon**
  - fixed typo with newValue parameter ([588f7ba](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/588f7ba))
- **uif-textfield**
  - disabled not watched ([b811381](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/b811381))
  - fixed placeholder to hide when textfield gets focus ([c9a08d5](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c9a08d5))


------------------


<a name="0.7.4"></a>
### [0.7.4 - April 12, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.7.4)

#### Fixes
- **uif-choicefield**
  - setting disabled dynamically ([1881150](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1881150), Closes [#257](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/257))


------------------


<a name="0.7.3"></a>
### [0.7.3 - April 10, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.7.3)

#### Fixes
- **uif-datepicker**
  - lable should be removed if empty ([316d588](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/316d588), Closes [#272](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/272))
- **uif-dropdown**
  - disabled not watched ([6d71569](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/6d71569), Closes [#259](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/259))
- **uif-nav-bar**
  - cursor default for disabled item ([a8fac31](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/a8fac31), Closes [#249](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/249))


------------------


<a name="0.7.2"></a>
### [0.7.2 - March 31, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.7.2)

#### Features

- **uif-choicefield**
  - implement customizeable choicefield group title ([a5c473b](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/a5c473b), Closes [#244](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/244))

#### Fixes

- **dependencies**
  - update library dependencies & verify working with **Angular 1.5.3** & **Office UI Fabric 2.2.0** ([4d2b5c6](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/4d2b5c6), closes [#255](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/255))
  - update build dependencies ([4d2b5c6](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/4d2b5c6), closes [#266](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/266))
- **uif-breadcrumb**
  - updated to match refactored fabric control ([7abeb65](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/7abeb65), closes [#260](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/260))
- **uif-choicefield**
  - click outside dropdown closes dropdown ([a8c83ea](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/a8c83ea), closes [#254](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/254))


------------------


<a name="0.7.1"></a>
### [0.7.1 - March 28, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.7.1)

#### Fixes

- **uif-choicefield**
  - ng-change test case & demo ([27efbc2](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/27efbc2), closes [#252](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/252))
- **uif-dropdown**
  - setting ngModel to unknown ([53401da](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/53401da), closes [#245](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/245))
- **uif-textfield**
  - cannot set required or disabled ([678471a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/678471a), closes [#240](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/240))


------------------


<a name="0.7.0"></a>
### [0.7.0 - March 15, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.7.0)

#### Features

- **uif-persona**
  - add directive ([74b5a2a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/74b5a2a), closes [#31](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/31))
- **uif-persona-card**
  - add directive ([227405d](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/227405d), closes [#32](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/32))
- **uif-org-chart**
  - add directive ([03b3550](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/03b3550), closes [#27](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/27))


#### Fixes

- **uif-callout**
  - close button type set to "button" ([1fb923a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1fb923a), closes [#221](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/221))


------------------


<a name="0.6.0"></a>
### [0.6.0 - February 29, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.6.0)

#### Features

- **uif-commandbar**
  - add directive ([cff4b58](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/cff4b58), closes [#17](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/17))
- **uif-dialog**
  - add directive ([d71f587](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/d71f587), closes [#20](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/20))


#### Fixes

- **uif-textfield**
  - can't type when ng-model set ([0e8e1de](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0e8e1de), closes [#217](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/217))
  - hide label when using placeholder ([0adaef3](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0adaef3), closes [#218](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/218))


#### Breaking Changes

- **uif-link**
  - remove hero link option ([c058641](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/c058641), closes [#187](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/187))


------------------


<a name="0.5.1"></a>
### [0.5.1 - February 29, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.5.1)

#### Breaking Changes

- **uif-contextual-menu**
  - update to match other directives ([e4ca786](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/e4ca786), closes [#201](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/201))

  BREAKING CHANGE: Where using rich content in a `uif-commandmenu` (like when displaying text), use the `uif-content` directive:

  Change your code from this:

  ```html
  <uif-contextual-menu uif-is-open="isOpen" uif-close-on-click="false">
    <uif-contextual-menu-item uif-text="'Delete'"></uif-contextual-menu-item>
    <uif-contextual-menu-item uif-text="'Flag'"></uif-contextual-menu-item>
  </uif-contextual-menu>
  ```

  To this:

  ```html
  <uif-contextual-menu uif-is-open="isOpen" uif-close-on-click="false">
    <uif-contextual-menu-item>
      <uif-content>
        <uif-icon uif-type="flag"></uif-icon> Flag
      </uif-content>
    </uif-contextual-menu-item>
  </uif-contextual-menu>
  ```

  BREAKING CHANGE: Use the native `ng-click` for click events instead of the custom attribute.

  Change your code from this

  ```html
  <uif-contextual-menu-item uif-type="subMenu" uif-click="logClick('Tools clicked!')">
  ```

  To this:

  ```html
  <uif-contextual-menu-item uif-type="subMenu" ng-click="logClick('Tools clicked!')">
  ``````

  BREAKING CHANGE: Use the native `disabled` instead of the custom `uif-is-disabled`.

  Change your code from this:

  ```html
  <uif-contextual-menu-item uif-is-disabled="true"></uif-contextual-menu-item>
  ```

  To this:

  ```html
  <uif-contextual-menu-item disabled="true"></uif-contextual-menu-item>
  ```

- **uif-navbar**
  - update to use `uif-content` ([4c0e25b](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/4c0e25b), closes [#201](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/201))

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

------------------


<a name="0.5.0"></a>
### [0.5.0 - February 24, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.5.0)

#### Features
- **uif-breadcrumb**: 
  - add directive ([ad05f37d](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/ad05f37d) closes [#13](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/13))
- **uif-datepicker**
  - add directive ([11b9e0ab](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/11b9e0ab), closes [#19](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/19))
- **uif-navbar**
  - add directive ([507ddf48](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/507ddf48), closes [#26](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/26))


------------------


<a name="0.4.1"></a>
### [0.4.1 - February 17, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.4.1)

#### Fixes

- **uif-link**
  - added support for "hero" link ([50d3feb](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/50d3feb), closes [#187](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/187))


------------------


<a name="0.4.0"></a>
### [0.4.0 - February 9, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.4.0)

#### Features
- **uif-button**
  - add directive ([0550008](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0550008), closes [#14](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/14))
- **uif-label**
  - add directive ([95afeaa](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/95afeaa), closes [#22](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/22))


#### Fixes

- **uif-callout**
  - update directive prop def ([6cdf1a5](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/6cdf1a5), closes [#139](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/139), [#142](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/142))
  - fixed CSS when separator used ([238d502](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/238d502), closes [#122](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/122), [#146](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/146))
- **uif-contextual-menu**
  - update directive prop def ([fd75634](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/fd75634), closes [#139](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/139))
- **uif-textfield**
  - fixed placeholder and overlap issue ([4726a677](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/4726a677), closes [#152](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/152))
- **uif-toggle**
  - update directive prop def ([413dc98](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/413dc98), closes [#139](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/139))
- **uif-searchbox**
  - update directive prop def ([6f89700](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/6f89700), closes [#139](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/139))
- **uif-spinner**
  - invalid closing tag in demo ([5b6059a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/5b6059a), closes [#150](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/150))


#### Breaking Changes

- **uif-dropdown**
  - rename uif-option directive ([5d087404](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/5d087404), closes [#107](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/107))

  BREAKING CHANGE: `uif-option` renamed to `uif-dropdown-option`

  Change your code from this:

  ```html
  <uif-dropdown ng-model="dropdownValue">
    <uif-option value="value1">Value 1</uif-option>
  </uif-dropdown>
  ```

  To this:

  ```html
  <uif-dropdown ng-model="dropdownValue">
    <uif-dropdown-option value="value1">Value 1</uif-dropdown-option>
  </uif-dropdown>
  ```


------------------


<a name="0.3.0"</a>
### [0.3.0 - January 25, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.3.0)

#### Features

- **uif-callout**
  - add directive ([72834f8](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/72834f8), closes [#15](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/15))
- **uif-contextual-menu**
  - add attribute validation & error logging to console ([9d2a30e](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/9d2a30e), closes [#99](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/99))
- **uif-table**
  - add support to select multiple rows ([567e620](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/567e620), closes [#61](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/61))
  - add attribute validation & error logging to console ([d101e10](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/d101e10), closes [#101](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/101))
- **uif-spinner**
  - add attribute validation & error logging to console ([9ce8adc](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/9ce8adc), closes [#100](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/100))


#### Breaking Changes

- **uif-spinner**
  - updated attribute name `uif-spinnersize` to `uif-size` ([9ce8adc](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/9ce8adc), closes [#102](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/102))

  BREAKING CHANGE: uif-spinner's `uif-spinnersize` attribute changed to `uif-size`.

  Change your code from this:

  ```html
  <uif-spinner uif-spinnersize="large"></uif-spinner>
  ```

  To this:

  ```html
  <uif-spinner uif-size="large"></uif-spinner>
  ```

------------------


<a name="0.2.0"</a>
### [0.2.0 - January 19, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.2.0)

#### Features

- **build**
  - added auto watcher for easier dev ([284dbe3](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/284dbe3), closes [#49](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/49))
- **uif-choicefield**
  - add directive ([2c2d9d4](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/2c2d9d4), closes [#16](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/16))
- **uif-icon**
  - added validation to specified icon ([54bcf6a9](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/54bcf6a9), closes [#88](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/88))
- **uif-link**
  - add directive ([db77b14](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/db77b14), closes [#23](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/23))
- **uif-overlay**
  - add directive ([a1ac39f](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/a1ac39f), closes [#28](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/28))
- **uif-progress-indicator**
  - add directive ([f1f6a9f](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/f1f6a9f), closes [#34](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/34))


#### Bug Fixes

- **chore**
  - fixed angular duped dependency & tsd script ([0ef5b42](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0ef5b42), closes [#82](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/82), [#83](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/83))
- **uif-dropdown**
  - fixed issue to support jqlite ([7c4dabe](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/7c4dabe), closes [#98](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues/98))


------------------


<a name="0.1.3"</a>
### [0.1.3 - January 13, 2016](https://github.com/ngOfficeUIFabric/ng-officeuifabric/releases/tag/0.1.3)

#### Features

- **uif-contextual-menu**
  - add directive ([de25f0a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/de25f0a), closes [#18](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/18))
- **uif-dropdown**
  - add directive ([0927d7a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0927d7a), closes [#21](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/21))
- **uif-icon**
  - add directive ([0acbd78](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/0acbd78), closes [#40](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/40))
- **uif-table**
  - add directive ([ed23026](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/ed23026), closes [#36](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/36))
- **uif-textfield**
  - add directive ([12f573e](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/12f573e), closes [#37](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/37))
- **uif-toggle**
  - add directive ([d48401a](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/d48401a), closes [#38](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/38))
- **uif-searchbox**
  - add directive ([caa588c](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/caa588c), closes [#39](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/39))
- **uif-spinner**
  - add directive ([1efc99f](https://github.com/ngOfficeUIFabric/ng-officeuifabric/commit/1efc99f), closes [#35](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pull/35))
