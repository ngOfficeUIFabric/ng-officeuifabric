/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ng = __webpack_require__(1);
	var iconEnum_1 = __webpack_require__(2);
	var DemoController = (function () {
	    function DemoController() {
	        this.icons = [];
	        this.selectedIcon = {};
	        this.icons = this._fillIconCollection();
	        this.selectedIcon = this.icons[3];
	    }
	    ;
	    DemoController.prototype._fillIconCollection = function () {
	        var icons = [];
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.arrowDownLeft]);
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.circleEmpty]);
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.circleFill]);
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.plus]);
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.minus]);
	        icons.push(iconEnum_1.IconEnum[iconEnum_1.IconEnum.question]);
	        icons.push('ngOfficeUiFabric');
	        return icons;
	    };
	    ;
	    return DemoController;
	})();
	exports.DemoController = DemoController;
	exports.module = ng.module('demoApp', [
	    'officeuifabric.core',
	    'officeuifabric.components.icon'])
	    .controller('demoController', [DemoController]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	(function (IconEnum) {
	    IconEnum[IconEnum["alert"] = 0] = "alert";
	    IconEnum[IconEnum["alert2"] = 1] = "alert2";
	    IconEnum[IconEnum["alertOutline"] = 2] = "alertOutline";
	    IconEnum[IconEnum["arrowDown"] = 3] = "arrowDown";
	    IconEnum[IconEnum["arrowDown2"] = 4] = "arrowDown2";
	    IconEnum[IconEnum["arrowDownLeft"] = 5] = "arrowDownLeft";
	    IconEnum[IconEnum["arrowDownRight"] = 6] = "arrowDownRight";
	    IconEnum[IconEnum["arrowLeft"] = 7] = "arrowLeft";
	    IconEnum[IconEnum["arrowRight"] = 8] = "arrowRight";
	    IconEnum[IconEnum["arrowUp"] = 9] = "arrowUp";
	    IconEnum[IconEnum["arrowUp2"] = 10] = "arrowUp2";
	    IconEnum[IconEnum["arrowUpLeft"] = 11] = "arrowUpLeft";
	    IconEnum[IconEnum["arrowUpRight"] = 12] = "arrowUpRight";
	    IconEnum[IconEnum["ascending"] = 13] = "ascending";
	    IconEnum[IconEnum["at"] = 14] = "at";
	    IconEnum[IconEnum["attachment"] = 15] = "attachment";
	    IconEnum[IconEnum["bag"] = 16] = "bag";
	    IconEnum[IconEnum["balloon"] = 17] = "balloon";
	    IconEnum[IconEnum["bell"] = 18] = "bell";
	    IconEnum[IconEnum["boards"] = 19] = "boards";
	    IconEnum[IconEnum["bold"] = 20] = "bold";
	    IconEnum[IconEnum["bookmark"] = 21] = "bookmark";
	    IconEnum[IconEnum["books"] = 22] = "books";
	    IconEnum[IconEnum["briefcase"] = 23] = "briefcase";
	    IconEnum[IconEnum["bundle"] = 24] = "bundle";
	    IconEnum[IconEnum["cake"] = 25] = "cake";
	    IconEnum[IconEnum["calendar"] = 26] = "calendar";
	    IconEnum[IconEnum["calendarDay"] = 27] = "calendarDay";
	    IconEnum[IconEnum["calendarPublic"] = 28] = "calendarPublic";
	    IconEnum[IconEnum["calendarWeek"] = 29] = "calendarWeek";
	    IconEnum[IconEnum["calendarWorkWeek"] = 30] = "calendarWorkWeek";
	    IconEnum[IconEnum["camera"] = 31] = "camera";
	    IconEnum[IconEnum["car"] = 32] = "car";
	    IconEnum[IconEnum["caretDown"] = 33] = "caretDown";
	    IconEnum[IconEnum["caretDownLeft"] = 34] = "caretDownLeft";
	    IconEnum[IconEnum["caretDownOutline"] = 35] = "caretDownOutline";
	    IconEnum[IconEnum["caretDownRight"] = 36] = "caretDownRight";
	    IconEnum[IconEnum["caretLeft"] = 37] = "caretLeft";
	    IconEnum[IconEnum["caretLeftOutline"] = 38] = "caretLeftOutline";
	    IconEnum[IconEnum["caretRight"] = 39] = "caretRight";
	    IconEnum[IconEnum["caretRightOutline"] = 40] = "caretRightOutline";
	    IconEnum[IconEnum["caretUp"] = 41] = "caretUp";
	    IconEnum[IconEnum["caretUpLeft"] = 42] = "caretUpLeft";
	    IconEnum[IconEnum["caretUpOutline"] = 43] = "caretUpOutline";
	    IconEnum[IconEnum["caretUpRight"] = 44] = "caretUpRight";
	    IconEnum[IconEnum["cart"] = 45] = "cart";
	    IconEnum[IconEnum["cat"] = 46] = "cat";
	    IconEnum[IconEnum["chart"] = 47] = "chart";
	    IconEnum[IconEnum["chat"] = 48] = "chat";
	    IconEnum[IconEnum["chatAdd"] = 49] = "chatAdd";
	    IconEnum[IconEnum["check"] = 50] = "check";
	    IconEnum[IconEnum["checkbox"] = 51] = "checkbox";
	    IconEnum[IconEnum["checkboxCheck"] = 52] = "checkboxCheck";
	    IconEnum[IconEnum["checkboxEmpty"] = 53] = "checkboxEmpty";
	    IconEnum[IconEnum["checkboxMixed"] = 54] = "checkboxMixed";
	    IconEnum[IconEnum["checkPeople"] = 55] = "checkPeople";
	    IconEnum[IconEnum["chevronDown"] = 56] = "chevronDown";
	    IconEnum[IconEnum["chevronLeft"] = 57] = "chevronLeft";
	    IconEnum[IconEnum["chevronRight"] = 58] = "chevronRight";
	    IconEnum[IconEnum["chevronsDown"] = 59] = "chevronsDown";
	    IconEnum[IconEnum["chevronsLeft"] = 60] = "chevronsLeft";
	    IconEnum[IconEnum["chevronsRight"] = 61] = "chevronsRight";
	    IconEnum[IconEnum["chevronsUp"] = 62] = "chevronsUp";
	    IconEnum[IconEnum["chevronThickDown"] = 63] = "chevronThickDown";
	    IconEnum[IconEnum["chevronThickLeft"] = 64] = "chevronThickLeft";
	    IconEnum[IconEnum["chevronThickRight"] = 65] = "chevronThickRight";
	    IconEnum[IconEnum["chevronThickUp"] = 66] = "chevronThickUp";
	    IconEnum[IconEnum["chevronThinDown"] = 67] = "chevronThinDown";
	    IconEnum[IconEnum["chevronThinLeft"] = 68] = "chevronThinLeft";
	    IconEnum[IconEnum["chevronThinRight"] = 69] = "chevronThinRight";
	    IconEnum[IconEnum["chevronThinUp"] = 70] = "chevronThinUp";
	    IconEnum[IconEnum["chevronUp"] = 71] = "chevronUp";
	    IconEnum[IconEnum["circle"] = 72] = "circle";
	    IconEnum[IconEnum["circleBall"] = 73] = "circleBall";
	    IconEnum[IconEnum["circleBalloons"] = 74] = "circleBalloons";
	    IconEnum[IconEnum["circleCar"] = 75] = "circleCar";
	    IconEnum[IconEnum["circleCat"] = 76] = "circleCat";
	    IconEnum[IconEnum["circleCoffee"] = 77] = "circleCoffee";
	    IconEnum[IconEnum["circleDog"] = 78] = "circleDog";
	    IconEnum[IconEnum["circleEmpty"] = 79] = "circleEmpty";
	    IconEnum[IconEnum["circleFill"] = 80] = "circleFill";
	    IconEnum[IconEnum["circleFilled"] = 81] = "circleFilled";
	    IconEnum[IconEnum["circleHalfFilled"] = 82] = "circleHalfFilled";
	    IconEnum[IconEnum["circleInfo"] = 83] = "circleInfo";
	    IconEnum[IconEnum["circleLightning"] = 84] = "circleLightning";
	    IconEnum[IconEnum["circlePill"] = 85] = "circlePill";
	    IconEnum[IconEnum["circlePlane"] = 86] = "circlePlane";
	    IconEnum[IconEnum["circlePlus"] = 87] = "circlePlus";
	    IconEnum[IconEnum["circlePoodle"] = 88] = "circlePoodle";
	    IconEnum[IconEnum["circleUnfilled"] = 89] = "circleUnfilled";
	    IconEnum[IconEnum["classNotebook"] = 90] = "classNotebook";
	    IconEnum[IconEnum["classroom"] = 91] = "classroom";
	    IconEnum[IconEnum["clock"] = 92] = "clock";
	    IconEnum[IconEnum["clutter"] = 93] = "clutter";
	    IconEnum[IconEnum["coffee"] = 94] = "coffee";
	    IconEnum[IconEnum["collapse"] = 95] = "collapse";
	    IconEnum[IconEnum["conflict"] = 96] = "conflict";
	    IconEnum[IconEnum["contact"] = 97] = "contact";
	    IconEnum[IconEnum["contactForm"] = 98] = "contactForm";
	    IconEnum[IconEnum["contactPublic"] = 99] = "contactPublic";
	    IconEnum[IconEnum["copy"] = 100] = "copy";
	    IconEnum[IconEnum["creditCard"] = 101] = "creditCard";
	    IconEnum[IconEnum["creditCardOutline"] = 102] = "creditCardOutline";
	    IconEnum[IconEnum["dashboard"] = 103] = "dashboard";
	    IconEnum[IconEnum["descending"] = 104] = "descending";
	    IconEnum[IconEnum["desktop"] = 105] = "desktop";
	    IconEnum[IconEnum["deviceWipe"] = 106] = "deviceWipe";
	    IconEnum[IconEnum["dialpad"] = 107] = "dialpad";
	    IconEnum[IconEnum["directions"] = 108] = "directions";
	    IconEnum[IconEnum["document"] = 109] = "document";
	    IconEnum[IconEnum["documentAdd"] = 110] = "documentAdd";
	    IconEnum[IconEnum["documentForward"] = 111] = "documentForward";
	    IconEnum[IconEnum["documentLandscape"] = 112] = "documentLandscape";
	    IconEnum[IconEnum["documentPDF"] = 113] = "documentPDF";
	    IconEnum[IconEnum["documentReply"] = 114] = "documentReply";
	    IconEnum[IconEnum["documents"] = 115] = "documents";
	    IconEnum[IconEnum["documentSearch"] = 116] = "documentSearch";
	    IconEnum[IconEnum["dog"] = 117] = "dog";
	    IconEnum[IconEnum["dogAlt"] = 118] = "dogAlt";
	    IconEnum[IconEnum["dot"] = 119] = "dot";
	    IconEnum[IconEnum["download"] = 120] = "download";
	    IconEnum[IconEnum["drm"] = 121] = "drm";
	    IconEnum[IconEnum["drop"] = 122] = "drop";
	    IconEnum[IconEnum["dropdown"] = 123] = "dropdown";
	    IconEnum[IconEnum["editBox"] = 124] = "editBox";
	    IconEnum[IconEnum["ellipsis"] = 125] = "ellipsis";
	    IconEnum[IconEnum["embed"] = 126] = "embed";
	    IconEnum[IconEnum["event"] = 127] = "event";
	    IconEnum[IconEnum["eventCancel"] = 128] = "eventCancel";
	    IconEnum[IconEnum["eventInfo"] = 129] = "eventInfo";
	    IconEnum[IconEnum["eventRecurring"] = 130] = "eventRecurring";
	    IconEnum[IconEnum["eventShare"] = 131] = "eventShare";
	    IconEnum[IconEnum["exclamation"] = 132] = "exclamation";
	    IconEnum[IconEnum["expand"] = 133] = "expand";
	    IconEnum[IconEnum["eye"] = 134] = "eye";
	    IconEnum[IconEnum["favorites"] = 135] = "favorites";
	    IconEnum[IconEnum["fax"] = 136] = "fax";
	    IconEnum[IconEnum["fieldMail"] = 137] = "fieldMail";
	    IconEnum[IconEnum["fieldNumber"] = 138] = "fieldNumber";
	    IconEnum[IconEnum["fieldText"] = 139] = "fieldText";
	    IconEnum[IconEnum["fieldTextBox"] = 140] = "fieldTextBox";
	    IconEnum[IconEnum["fileDocument"] = 141] = "fileDocument";
	    IconEnum[IconEnum["fileImage"] = 142] = "fileImage";
	    IconEnum[IconEnum["filePDF"] = 143] = "filePDF";
	    IconEnum[IconEnum["filter"] = 144] = "filter";
	    IconEnum[IconEnum["filterClear"] = 145] = "filterClear";
	    IconEnum[IconEnum["firstAid"] = 146] = "firstAid";
	    IconEnum[IconEnum["flag"] = 147] = "flag";
	    IconEnum[IconEnum["folder"] = 148] = "folder";
	    IconEnum[IconEnum["folderMove"] = 149] = "folderMove";
	    IconEnum[IconEnum["folderPublic"] = 150] = "folderPublic";
	    IconEnum[IconEnum["folderSearch"] = 151] = "folderSearch";
	    IconEnum[IconEnum["fontColor"] = 152] = "fontColor";
	    IconEnum[IconEnum["fontDecrease"] = 153] = "fontDecrease";
	    IconEnum[IconEnum["fontIncrease"] = 154] = "fontIncrease";
	    IconEnum[IconEnum["frowny"] = 155] = "frowny";
	    IconEnum[IconEnum["fullscreen"] = 156] = "fullscreen";
	    IconEnum[IconEnum["gear"] = 157] = "gear";
	    IconEnum[IconEnum["glasses"] = 158] = "glasses";
	    IconEnum[IconEnum["globe"] = 159] = "globe";
	    IconEnum[IconEnum["graph"] = 160] = "graph";
	    IconEnum[IconEnum["group"] = 161] = "group";
	    IconEnum[IconEnum["header"] = 162] = "header";
	    IconEnum[IconEnum["heart"] = 163] = "heart";
	    IconEnum[IconEnum["heartEmpty"] = 164] = "heartEmpty";
	    IconEnum[IconEnum["hide"] = 165] = "hide";
	    IconEnum[IconEnum["home"] = 166] = "home";
	    IconEnum[IconEnum["inboxCheck"] = 167] = "inboxCheck";
	    IconEnum[IconEnum["info"] = 168] = "info";
	    IconEnum[IconEnum["infoCircle"] = 169] = "infoCircle";
	    IconEnum[IconEnum["italic"] = 170] = "italic";
	    IconEnum[IconEnum["key"] = 171] = "key";
	    IconEnum[IconEnum["late"] = 172] = "late";
	    IconEnum[IconEnum["lifesaver"] = 173] = "lifesaver";
	    IconEnum[IconEnum["lifesaverLock"] = 174] = "lifesaverLock";
	    IconEnum[IconEnum["lightBulb"] = 175] = "lightBulb";
	    IconEnum[IconEnum["lightning"] = 176] = "lightning";
	    IconEnum[IconEnum["link"] = 177] = "link";
	    IconEnum[IconEnum["linkRemove"] = 178] = "linkRemove";
	    IconEnum[IconEnum["listBullets"] = 179] = "listBullets";
	    IconEnum[IconEnum["listCheck"] = 180] = "listCheck";
	    IconEnum[IconEnum["listCheckbox"] = 181] = "listCheckbox";
	    IconEnum[IconEnum["listGroup"] = 182] = "listGroup";
	    IconEnum[IconEnum["listGroup2"] = 183] = "listGroup2";
	    IconEnum[IconEnum["listNumbered"] = 184] = "listNumbered";
	    IconEnum[IconEnum["lock"] = 185] = "lock";
	    IconEnum[IconEnum["mail"] = 186] = "mail";
	    IconEnum[IconEnum["mailCheck"] = 187] = "mailCheck";
	    IconEnum[IconEnum["mailDown"] = 188] = "mailDown";
	    IconEnum[IconEnum["mailEdit"] = 189] = "mailEdit";
	    IconEnum[IconEnum["mailEmpty"] = 190] = "mailEmpty";
	    IconEnum[IconEnum["mailError"] = 191] = "mailError";
	    IconEnum[IconEnum["mailOpen"] = 192] = "mailOpen";
	    IconEnum[IconEnum["mailPause"] = 193] = "mailPause";
	    IconEnum[IconEnum["mailPublic"] = 194] = "mailPublic";
	    IconEnum[IconEnum["mailRead"] = 195] = "mailRead";
	    IconEnum[IconEnum["mailSend"] = 196] = "mailSend";
	    IconEnum[IconEnum["mailSync"] = 197] = "mailSync";
	    IconEnum[IconEnum["mailUnread"] = 198] = "mailUnread";
	    IconEnum[IconEnum["mapMarker"] = 199] = "mapMarker";
	    IconEnum[IconEnum["meal"] = 200] = "meal";
	    IconEnum[IconEnum["menu"] = 201] = "menu";
	    IconEnum[IconEnum["menu2"] = 202] = "menu2";
	    IconEnum[IconEnum["merge"] = 203] = "merge";
	    IconEnum[IconEnum["metadata"] = 204] = "metadata";
	    IconEnum[IconEnum["microphone"] = 205] = "microphone";
	    IconEnum[IconEnum["miniatures"] = 206] = "miniatures";
	    IconEnum[IconEnum["minus"] = 207] = "minus";
	    IconEnum[IconEnum["mobile"] = 208] = "mobile";
	    IconEnum[IconEnum["money"] = 209] = "money";
	    IconEnum[IconEnum["move"] = 210] = "move";
	    IconEnum[IconEnum["multiChoice"] = 211] = "multiChoice";
	    IconEnum[IconEnum["music"] = 212] = "music";
	    IconEnum[IconEnum["navigate"] = 213] = "navigate";
	    IconEnum[IconEnum["new"] = 214] = "new";
	    IconEnum[IconEnum["newsfeed"] = 215] = "newsfeed";
	    IconEnum[IconEnum["note"] = 216] = "note";
	    IconEnum[IconEnum["notebook"] = 217] = "notebook";
	    IconEnum[IconEnum["noteEdit"] = 218] = "noteEdit";
	    IconEnum[IconEnum["noteForward"] = 219] = "noteForward";
	    IconEnum[IconEnum["noteReply"] = 220] = "noteReply";
	    IconEnum[IconEnum["notRecurring"] = 221] = "notRecurring";
	    IconEnum[IconEnum["onedrive"] = 222] = "onedrive";
	    IconEnum[IconEnum["onlineAdd"] = 223] = "onlineAdd";
	    IconEnum[IconEnum["onlineJoin"] = 224] = "onlineJoin";
	    IconEnum[IconEnum["oofReply"] = 225] = "oofReply";
	    IconEnum[IconEnum["org"] = 226] = "org";
	    IconEnum[IconEnum["page"] = 227] = "page";
	    IconEnum[IconEnum["paint"] = 228] = "paint";
	    IconEnum[IconEnum["panel"] = 229] = "panel";
	    IconEnum[IconEnum["partner"] = 230] = "partner";
	    IconEnum[IconEnum["pause"] = 231] = "pause";
	    IconEnum[IconEnum["pencil"] = 232] = "pencil";
	    IconEnum[IconEnum["people"] = 233] = "people";
	    IconEnum[IconEnum["peopleAdd"] = 234] = "peopleAdd";
	    IconEnum[IconEnum["peopleCheck"] = 235] = "peopleCheck";
	    IconEnum[IconEnum["peopleError"] = 236] = "peopleError";
	    IconEnum[IconEnum["peoplePause"] = 237] = "peoplePause";
	    IconEnum[IconEnum["peopleRemove"] = 238] = "peopleRemove";
	    IconEnum[IconEnum["peopleSecurity"] = 239] = "peopleSecurity";
	    IconEnum[IconEnum["peopleSync"] = 240] = "peopleSync";
	    IconEnum[IconEnum["person"] = 241] = "person";
	    IconEnum[IconEnum["personAdd"] = 242] = "personAdd";
	    IconEnum[IconEnum["personRemove"] = 243] = "personRemove";
	    IconEnum[IconEnum["phone"] = 244] = "phone";
	    IconEnum[IconEnum["phoneAdd"] = 245] = "phoneAdd";
	    IconEnum[IconEnum["phoneTransfer"] = 246] = "phoneTransfer";
	    IconEnum[IconEnum["picture"] = 247] = "picture";
	    IconEnum[IconEnum["pictureAdd"] = 248] = "pictureAdd";
	    IconEnum[IconEnum["pictureEdit"] = 249] = "pictureEdit";
	    IconEnum[IconEnum["pictureRemove"] = 250] = "pictureRemove";
	    IconEnum[IconEnum["pill"] = 251] = "pill";
	    IconEnum[IconEnum["pinDown"] = 252] = "pinDown";
	    IconEnum[IconEnum["pinLeft"] = 253] = "pinLeft";
	    IconEnum[IconEnum["placeholder"] = 254] = "placeholder";
	    IconEnum[IconEnum["plane"] = 255] = "plane";
	    IconEnum[IconEnum["play"] = 256] = "play";
	    IconEnum[IconEnum["plus"] = 257] = "plus";
	    IconEnum[IconEnum["plus2"] = 258] = "plus2";
	    IconEnum[IconEnum["pointItem"] = 259] = "pointItem";
	    IconEnum[IconEnum["popout"] = 260] = "popout";
	    IconEnum[IconEnum["post"] = 261] = "post";
	    IconEnum[IconEnum["print"] = 262] = "print";
	    IconEnum[IconEnum["protectionCenter"] = 263] = "protectionCenter";
	    IconEnum[IconEnum["question"] = 264] = "question";
	    IconEnum[IconEnum["questionReverse"] = 265] = "questionReverse";
	    IconEnum[IconEnum["quote"] = 266] = "quote";
	    IconEnum[IconEnum["radioButton"] = 267] = "radioButton";
	    IconEnum[IconEnum["reactivate"] = 268] = "reactivate";
	    IconEnum[IconEnum["receiptCheck"] = 269] = "receiptCheck";
	    IconEnum[IconEnum["receiptForward"] = 270] = "receiptForward";
	    IconEnum[IconEnum["receiptReply"] = 271] = "receiptReply";
	    IconEnum[IconEnum["refresh"] = 272] = "refresh";
	    IconEnum[IconEnum["reload"] = 273] = "reload";
	    IconEnum[IconEnum["reply"] = 274] = "reply";
	    IconEnum[IconEnum["replyAll"] = 275] = "replyAll";
	    IconEnum[IconEnum["replyAllAlt"] = 276] = "replyAllAlt";
	    IconEnum[IconEnum["replyAlt"] = 277] = "replyAlt";
	    IconEnum[IconEnum["ribbon"] = 278] = "ribbon";
	    IconEnum[IconEnum["room"] = 279] = "room";
	    IconEnum[IconEnum["save"] = 280] = "save";
	    IconEnum[IconEnum["scheduling"] = 281] = "scheduling";
	    IconEnum[IconEnum["search"] = 282] = "search";
	    IconEnum[IconEnum["section"] = 283] = "section";
	    IconEnum[IconEnum["sections"] = 284] = "sections";
	    IconEnum[IconEnum["settings"] = 285] = "settings";
	    IconEnum[IconEnum["share"] = 286] = "share";
	    IconEnum[IconEnum["shield"] = 287] = "shield";
	    IconEnum[IconEnum["sites"] = 288] = "sites";
	    IconEnum[IconEnum["smiley"] = 289] = "smiley";
	    IconEnum[IconEnum["soccer"] = 290] = "soccer";
	    IconEnum[IconEnum["socialListening"] = 291] = "socialListening";
	    IconEnum[IconEnum["sort"] = 292] = "sort";
	    IconEnum[IconEnum["sortLines"] = 293] = "sortLines";
	    IconEnum[IconEnum["split"] = 294] = "split";
	    IconEnum[IconEnum["star"] = 295] = "star";
	    IconEnum[IconEnum["starEmpty"] = 296] = "starEmpty";
	    IconEnum[IconEnum["stopwatch"] = 297] = "stopwatch";
	    IconEnum[IconEnum["story"] = 298] = "story";
	    IconEnum[IconEnum["styleRemove"] = 299] = "styleRemove";
	    IconEnum[IconEnum["subscribe"] = 300] = "subscribe";
	    IconEnum[IconEnum["sun"] = 301] = "sun";
	    IconEnum[IconEnum["sunAdd"] = 302] = "sunAdd";
	    IconEnum[IconEnum["sunQuestion"] = 303] = "sunQuestion";
	    IconEnum[IconEnum["support"] = 304] = "support";
	    IconEnum[IconEnum["table"] = 305] = "table";
	    IconEnum[IconEnum["tablet"] = 306] = "tablet";
	    IconEnum[IconEnum["tag"] = 307] = "tag";
	    IconEnum[IconEnum["taskRecurring"] = 308] = "taskRecurring";
	    IconEnum[IconEnum["tasks"] = 309] = "tasks";
	    IconEnum[IconEnum["teamwork"] = 310] = "teamwork";
	    IconEnum[IconEnum["text"] = 311] = "text";
	    IconEnum[IconEnum["textBox"] = 312] = "textBox";
	    IconEnum[IconEnum["tile"] = 313] = "tile";
	    IconEnum[IconEnum["timeline"] = 314] = "timeline";
	    IconEnum[IconEnum["today"] = 315] = "today";
	    IconEnum[IconEnum["toggle"] = 316] = "toggle";
	    IconEnum[IconEnum["toggleMiddle"] = 317] = "toggleMiddle";
	    IconEnum[IconEnum["touch"] = 318] = "touch";
	    IconEnum[IconEnum["trash"] = 319] = "trash";
	    IconEnum[IconEnum["triangleDown"] = 320] = "triangleDown";
	    IconEnum[IconEnum["triangleEmptyDown"] = 321] = "triangleEmptyDown";
	    IconEnum[IconEnum["triangleEmptyLeft"] = 322] = "triangleEmptyLeft";
	    IconEnum[IconEnum["triangleEmptyRight"] = 323] = "triangleEmptyRight";
	    IconEnum[IconEnum["triangleEmptyUp"] = 324] = "triangleEmptyUp";
	    IconEnum[IconEnum["triangleLeft"] = 325] = "triangleLeft";
	    IconEnum[IconEnum["triangleRight"] = 326] = "triangleRight";
	    IconEnum[IconEnum["triangleUp"] = 327] = "triangleUp";
	    IconEnum[IconEnum["trophy"] = 328] = "trophy";
	    IconEnum[IconEnum["underline"] = 329] = "underline";
	    IconEnum[IconEnum["unsubscribe"] = 330] = "unsubscribe";
	    IconEnum[IconEnum["upload"] = 331] = "upload";
	    IconEnum[IconEnum["video"] = 332] = "video";
	    IconEnum[IconEnum["voicemail"] = 333] = "voicemail";
	    IconEnum[IconEnum["voicemailForward"] = 334] = "voicemailForward";
	    IconEnum[IconEnum["voicemailReply"] = 335] = "voicemailReply";
	    IconEnum[IconEnum["waffle"] = 336] = "waffle";
	    IconEnum[IconEnum["work"] = 337] = "work";
	    IconEnum[IconEnum["wrench"] = 338] = "wrench";
	    IconEnum[IconEnum["x"] = 339] = "x";
	    IconEnum[IconEnum["xCircle"] = 340] = "xCircle";
	})(exports.IconEnum || (exports.IconEnum = {}));
	var IconEnum = exports.IconEnum;
	;


/***/ }
/******/ ]);