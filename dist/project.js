/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_homepage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/homepage */ \"./src/modules/homepage.js\");\n\n\n(0,_modules_homepage__WEBPACK_IMPORTED_MODULE_0__.startApp)();\n\n\n//# sourceURL=webpack://battleship-game/./src/index.js?");

/***/ }),

/***/ "./src/modules/handleComputer.js":
/*!***************************************!*\
  !*** ./src/modules/handleComputer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkNearby: () => (/* reexport safe */ _utils_checkNearby__WEBPACK_IMPORTED_MODULE_4__.checkNearby),\n/* harmony export */   placeComputerBoats: () => (/* binding */ placeComputerBoats)\n/* harmony export */ });\n/* harmony import */ var _utils_getRotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getRotation */ \"./src/modules/utils/getRotation.js\");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ \"./src/modules/players.js\");\n/* harmony import */ var _utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/checkContainsAny */ \"./src/modules/utils/checkContainsAny.js\");\n/* harmony import */ var _utils_findElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/findElement */ \"./src/modules/utils/findElement.js\");\n/* harmony import */ var _utils_checkNearby__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/checkNearby */ \"./src/modules/utils/checkNearby.js\");\n\n\n\n\n\n\nconst box = document.getElementById(\"computer-box\");\n\n//place computer boats in order\nasync function placeComputerBoats() {\n  return new Promise(async (resolve) => {\n    await placeNewBoat(\"Carrier\", 5);\n    await placeNewBoat(\"Batleship\", 4);\n    await placeNewBoat(\"Destroyer\", 3);\n    await placeNewBoat(\"Submarine\", 3);\n    await placeNewBoat(\"Patrol boat\", 2);\n    await placeNewBoat(\"Boat\", 2);\n    resolve();\n  });\n}\n\n//handles the addition of boats\nfunction placeNewBoat(name, size) {\n  return new Promise((resolve) => {\n    checkValidPlace(resolve, name, size);\n  });\n}\n//checks if the place where coomputer want to place the boat is valid\nfunction checkValidPlace(resolve, name, size) {\n  let position = randomPosition(size);\n  let computerBoats = _players__WEBPACK_IMPORTED_MODULE_1__.computerPlayer.boatPositions();\n  console.log(\"position\", position, \"comp\", computerBoats);\n\n  //while the position isn't valid, search for a valid one\n  while (\n    (0,_utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__.checkContainsAny)(position, computerBoats) ||\n    (0,_utils_checkNearby__WEBPACK_IMPORTED_MODULE_4__.checkNearby)(position, computerBoats)\n  ) {\n    position = randomPosition(size);\n    step += 1;\n  }\n\n  const newBoat = new _players__WEBPACK_IMPORTED_MODULE_1__.Boat(name, size, position);\n  _players__WEBPACK_IMPORTED_MODULE_1__.computerPlayer.boats.push(newBoat);\n\n  //temporary !!!!!!!!!!!!!\n  //SHOWS COMPUTER BOATS\n  /*for (let element of position) {\n    const e = findElementByRowCol(box, element[0], element[1]);\n    e.style.backgroundColor = \"var(--good-place-hover)\";\n  }*/\n  resolve();\n}\n\n//returns random position for boat placement\nfunction randomPosition(size) {\n  let arr = [];\n  let subRow, subCol;\n\n  const [rotation, rowStep, colStep] = randomRotation();\n\n  if (rotation === _utils_getRotation__WEBPACK_IMPORTED_MODULE_0__.VERTICAL) {\n    subRow = size + 1;\n    subCol = 10;\n  } else {\n    subRow = 10;\n    subCol = size + 1;\n  }\n\n  const startRow = Math.floor(Math.random() * subRow);\n  const startCol = Math.floor(Math.random() * subCol);\n\n  for (let i = 0; i < size; i++) {\n    const newRow = startRow + i * rowStep;\n    const newCol = startCol + i * colStep;\n    arr.push([newRow, newCol]);\n  }\n  console.log(\"arr\", arr);\n  return arr;\n}\n\n//returns random rotation\nfunction randomRotation() {\n  const randomNumber = Math.random();\n  let rotation, rowStep, colStep;\n  if (randomNumber < 0.5) {\n    rotation = _utils_getRotation__WEBPACK_IMPORTED_MODULE_0__.VERTICAL;\n    rowStep = 1;\n    colStep = 0;\n  } else {\n    rotation = _utils_getRotation__WEBPACK_IMPORTED_MODULE_0__.HORIZONTAL;\n    rowStep = 0;\n    colStep = 1;\n  }\n\n  return [rotation, rowStep, colStep];\n}\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/handleComputer.js?");

/***/ }),

/***/ "./src/modules/handleGame.js":
/*!***********************************!*\
  !*** ./src/modules/handleGame.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startGame: () => (/* binding */ startGame)\n/* harmony export */ });\n/* harmony import */ var _handlePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlePlayer */ \"./src/modules/handlePlayer.js\");\n/* harmony import */ var _handleComputer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handleComputer */ \"./src/modules/handleComputer.js\");\n/* harmony import */ var _utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/checkContainsAny */ \"./src/modules/utils/checkContainsAny.js\");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./players */ \"./src/modules/players.js\");\n/* harmony import */ var _homepageUi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./homepageUi */ \"./src/modules/homepageUi.js\");\n\n\n\n\n\n\nconst computerBox = document.getElementById(\"computer-box\");\nconst playerBox = document.getElementById(\"player-box\");\n\n//handles the game itself\nasync function startGame() {\n  await (0,_handlePlayer__WEBPACK_IMPORTED_MODULE_0__.placePlayerBoats)();\n  await (0,_handleComputer__WEBPACK_IMPORTED_MODULE_1__.placeComputerBoats)();\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_4__.removeRotateBtn)();\n  playerTurn();\n}\n\n//adds eventlistener on computer gameboard childs\nfunction playerTurn() {\n  computerBox.addEventListener(\"click\", clickHandler);\n}\n\n//get the coordonate where player shot\nfunction clickHandler(event) {\n  const row = parseInt(event.target.getAttribute(\"row\"));\n  const col = parseInt(event.target.getAttribute(\"col\"));\n  //console.log(\"selected\", [row, col]);\n  playerClickHandler([row, col]);\n}\n//handles the shooting\nfunction playerClickHandler(hitPosition) {\n  //check if player doesn't shoot on an already shooted position\n  if ((0,_utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__.checkContainsAny)([hitPosition], _players__WEBPACK_IMPORTED_MODULE_3__.computerPlayer.gameBoardHits)) {\n    console.log(\"already hit\");\n    return;\n  }\n\n  checkIfBoatHit(_players__WEBPACK_IMPORTED_MODULE_3__.computerPlayer, hitPosition);\n  _players__WEBPACK_IMPORTED_MODULE_3__.computerPlayer.gameBoardHits.push(hitPosition);\n  computerBox.removeEventListener(\"click\", clickHandler);\n\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_4__.showBullet)(computerBox, hitPosition[0], hitPosition[1]);\n  checkWin(_players__WEBPACK_IMPORTED_MODULE_3__.computerPlayer);\n  setTimeout(() => computerTurn(), 1000);\n}\n\n//handle computer shooting\nfunction computerTurn() {\n  let randRow = Math.floor(Math.random() * 10);\n  let randCol = Math.floor(Math.random() * 10);\n\n  while ((0,_utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__.checkContainsAny)([[randRow, randCol]], _players__WEBPACK_IMPORTED_MODULE_3__.player.gameBoardHits)) {\n    randRow = Math.floor(Math.random() * 10);\n    randCol = Math.floor(Math.random() * 10);\n  }\n  _players__WEBPACK_IMPORTED_MODULE_3__.player.gameBoardHits.push([randRow, randCol]);\n  checkIfBoatHit(_players__WEBPACK_IMPORTED_MODULE_3__.player, [randRow, randCol]);\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_4__.showBullet)(playerBox, randRow, randCol);\n  checkWin(_players__WEBPACK_IMPORTED_MODULE_3__.player);\n  playerTurn();\n}\n\n//check if boat was hit\nfunction checkIfBoatHit(player, hitPosition) {\n  player.boats.forEach((boat) => {\n    if ((0,_utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__.checkContainsAny)([hitPosition], boat.position)) {\n      (0,_homepageUi__WEBPACK_IMPORTED_MODULE_4__.showHittedPos)(hitPosition[0], hitPosition[1], player.gameBoardId);\n      boat.hit();\n    }\n  });\n}\n\n//check if player wins, by checking if every boat of a player are sunk\nfunction checkWin(player) {\n  return player.boats.every((boat) => boat.isSunk());\n}\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/handleGame.js?");

/***/ }),

/***/ "./src/modules/handlePlayer.js":
/*!*************************************!*\
  !*** ./src/modules/handlePlayer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   placePlayerBoats: () => (/* binding */ placePlayerBoats)\n/* harmony export */ });\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ \"./src/modules/players.js\");\n/* harmony import */ var _homepageUi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homepageUi */ \"./src/modules/homepageUi.js\");\n/* harmony import */ var _utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/checkContainsAny */ \"./src/modules/utils/checkContainsAny.js\");\n/* harmony import */ var _utils_findElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/findElement */ \"./src/modules/utils/findElement.js\");\n/* harmony import */ var _utils_getRotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getRotation */ \"./src/modules/utils/getRotation.js\");\n/* harmony import */ var _handleComputer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./handleComputer */ \"./src/modules/handleComputer.js\");\n\n\n\n\n\n\n\nconst box = document.getElementById(\"player-box\");\n\n//place boats in order\nasync function placePlayerBoats() {\n  return new Promise(async (resolve) => {\n    await placeNewBoat(\"Carrier\", 5);\n    await placeNewBoat(\"Batleship\", 4);\n    await placeNewBoat(\"Destroyer\", 3);\n    await placeNewBoat(\"Submarine\", 3);\n    await placeNewBoat(\"Patrol boat\", 2);\n    await placeNewBoat(\"Boat\", 2);\n    resolve();\n  });\n}\n\n//handles the addition of the boats\nfunction placeNewBoat(name, size) {\n  return new Promise((resolve) => {\n    checkValidPlace(resolve, name, size);\n  });\n}\n\n//checks if the place where user want to place the boat is valid\nfunction checkValidPlace(resolve, name, size) {\n  //gets the area where the mouse hovers\n  _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOver = (event) => {\n    const target = event.target;\n    const row = parseInt(target.getAttribute(\"row\"));\n    const col = parseInt(target.getAttribute(\"col\"));\n    let element = null;\n\n    handleHover(target, row, col, name, size, element, resolve);\n  };\n\n  //gets the area of the last hovered element\n  _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOut = (event) => {\n    const target = event.target;\n    const row = parseInt(target.getAttribute(\"row\"));\n    const col = parseInt(target.getAttribute(\"col\"));\n    let element = null;\n\n    handleHoverDeletion(row, col, size, element);\n  };\n\n  //adds the event listeners\n  box.addEventListener(\"mouseover\", _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOver);\n  box.addEventListener(\"mouseout\", _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOut);\n}\n\n//handle hovering of the elements\nfunction handleHover(target, row, col, name, size, element, resolve) {\n  const [, rowStep, colStep] = (0,_utils_getRotation__WEBPACK_IMPORTED_MODULE_4__.getRotation)();\n  let hoveredPosition = getPosition();\n  let boatPosition = _players__WEBPACK_IMPORTED_MODULE_0__.player.boatPositions();\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_1__.drawBoatOnGameBoard)();\n\n  if (\n    size + row * rowStep + col * colStep > 10 ||\n    (0,_utils_checkContainsAny__WEBPACK_IMPORTED_MODULE_2__.checkContainsAny)(hoveredPosition, boatPosition) ||\n    (0,_handleComputer__WEBPACK_IMPORTED_MODULE_5__.checkNearby)(hoveredPosition, boatPosition)\n  ) {\n    target.style.backgroundColor = \"var(--wrong)\";\n    return;\n  }\n  handleHoverStyle();\n\n  function handleClick() {\n    box.removeEventListener(\"mouseover\", _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOver);\n    box.removeEventListener(\"mouseout\", _players__WEBPACK_IMPORTED_MODULE_0__.gameSettings.handleMouseOut);\n    target.removeEventListener(\"click\", handleClick);\n    addBoatToGameBoard();\n    setTimeout(() => resolve(), 300);\n  }\n\n  //place the boat on the gameboard\n  function addBoatToGameBoard() {\n    const newBoat = new _players__WEBPACK_IMPORTED_MODULE_0__.Boat(name, size, hoveredPosition);\n    _players__WEBPACK_IMPORTED_MODULE_0__.player.boats.push(newBoat);\n    (0,_homepageUi__WEBPACK_IMPORTED_MODULE_1__.drawBoatOnGameBoard)();\n  }\n\n  //adds style to the elements, to create a virtual boat\n  function handleHoverStyle() {\n    target.addEventListener(\"click\", handleClick);\n    for (let pos of hoveredPosition) {\n      element = (0,_utils_findElement__WEBPACK_IMPORTED_MODULE_3__.findElementByRowCol)(box, pos[0], pos[1]);\n      element.style.backgroundColor = \"var(--good-place-hover)\";\n    }\n  }\n\n  //while hovering over an element, creates a virtual boat with it's\n  //positions and returns all the spaces it takes\n  function getPosition() {\n    let array = [];\n    for (let i = 0; i < size; i++) {\n      const newRow = row + i * rowStep;\n      const newCol = col + i * colStep;\n      array.push([newRow, newCol]);\n    }\n    return array;\n  }\n}\n\n//delete the style of the last hovered elements\nfunction handleHoverDeletion(row, col, size, element) {\n  const [, rowStep, colStep] = (0,_utils_getRotation__WEBPACK_IMPORTED_MODULE_4__.getRotation)();\n  for (let i = 0; i < size; i++) {\n    element = (0,_utils_findElement__WEBPACK_IMPORTED_MODULE_3__.findElementByRowCol)(box, rowStep * i + row, colStep * i + col);\n    element.style.backgroundColor = \"transparent\";\n  }\n  return;\n}\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/handlePlayer.js?");

/***/ }),

/***/ "./src/modules/homepage.js":
/*!*********************************!*\
  !*** ./src/modules/homepage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startApp: () => (/* binding */ startApp)\n/* harmony export */ });\n/* harmony import */ var _homepageUi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homepageUi */ \"./src/modules/homepageUi.js\");\n\n//starts the app\n//renders player and computer box, and add start game btn\nconst startApp = () => {\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_0__.renderPlayerBox)();\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_0__.renderComputerBox)();\n  (0,_homepageUi__WEBPACK_IMPORTED_MODULE_0__.btnStartGame)();\n};\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/homepage.js?");

/***/ }),

/***/ "./src/modules/homepageUi.js":
/*!***********************************!*\
  !*** ./src/modules/homepageUi.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   btnStartGame: () => (/* binding */ btnStartGame),\n/* harmony export */   drawBoatOnGameBoard: () => (/* binding */ drawBoatOnGameBoard),\n/* harmony export */   removeRotateBtn: () => (/* binding */ removeRotateBtn),\n/* harmony export */   renderComputerBox: () => (/* binding */ renderComputerBox),\n/* harmony export */   renderPlayerBox: () => (/* binding */ renderPlayerBox),\n/* harmony export */   showBullet: () => (/* binding */ showBullet),\n/* harmony export */   showHittedPos: () => (/* binding */ showHittedPos)\n/* harmony export */ });\n/* harmony import */ var _utils_findElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/findElement */ \"./src/modules/utils/findElement.js\");\n/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ \"./src/modules/players.js\");\n/* harmony import */ var _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getRotation */ \"./src/modules/utils/getRotation.js\");\n/* harmony import */ var _handleGame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handleGame */ \"./src/modules/handleGame.js\");\n\n\n\n\n\n//create player box\nconst renderPlayerBox = () => {\n  const box = document.getElementById(\"player-box\");\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      let element = document.createElement(\"div\");\n      element.id = `player-box-row${i}col${j}`;\n      element.classList.add(\"box-div\");\n      element.setAttribute(\"row\", i);\n      element.setAttribute(\"col\", j);\n      box.appendChild(element);\n    }\n  }\n};\n\n//create computer box\nconst renderComputerBox = () => {\n  const box = document.getElementById(\"computer-box\");\n  for (let i = 0; i < 10; i++) {\n    for (let j = 0; j < 10; j++) {\n      let element = document.createElement(\"div\");\n      element.id = `computer-box-row${i}col${j}`;\n      element.classList.add(\"box-div\");\n      element.setAttribute(\"row\", i);\n      element.setAttribute(\"col\", j);\n      box.appendChild(element);\n    }\n  }\n};\n\n//create start game button\nconst btnStartGame = () => {\n  const page = document.querySelector(\"body\");\n  const button = document.getElementById(\"btn-start-game\");\n  const handleBtn = () => {\n    (0,_handleGame__WEBPACK_IMPORTED_MODULE_3__.startGame)();\n    //after starting the game, hides the start button\n    if (page.contains(button)) {\n      page.removeChild(button);\n      button.removeEventListener(\"click\", handleBtn);\n      rotateBoatBtn();\n    }\n  };\n\n  button.addEventListener(\"click\", handleBtn);\n};\n\n//create the rotate boat button\nconst rotateBoatBtn = () => {\n  const page = document.querySelector(\"body\");\n  const btn = document.createElement(\"button\");\n  btn.id = \"btn-rotate-boat\";\n  btn.textContent = _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.ROTATION;\n\n  btn.addEventListener(\"click\", () => {\n    let rotation = _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.ROTATION === _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.HORIZONTAL ? _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.VERTICAL : _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.HORIZONTAL;\n    (0,_utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.getRotation)(rotation);\n    btn.textContent = _utils_getRotation__WEBPACK_IMPORTED_MODULE_2__.ROTATION;\n  });\n\n  page.appendChild(btn);\n};\n\n//removes the rotate button\nfunction removeRotateBtn() {\n  const box = document.querySelector(\"body\");\n  const rotateBtn = document.getElementById(\"btn-rotate-boat\");\n  box.removeChild(rotateBtn);\n}\n\n//draws the boats on the gameboard\nconst drawBoatOnGameBoard = () => {\n  const box = document.getElementById(\"player-box\");\n  const boatsArea = _players__WEBPACK_IMPORTED_MODULE_1__.player.boats;\n  for (const boat of boatsArea) {\n    for (const [row, col] of boat.position) {\n      const element = (0,_utils_findElement__WEBPACK_IMPORTED_MODULE_0__.findElementByRowCol)(box, row, col);\n      element.style.backgroundColor = \"var(--element)\";\n    }\n  }\n  return;\n};\n\n//show with red on shooted boats\nfunction showHittedPos(row, col, id) {\n  const box = document.getElementById(id);\n  const element = (0,_utils_findElement__WEBPACK_IMPORTED_MODULE_0__.findElementByRowCol)(box, row, col);\n  element.style.backgroundColor = \"var(--wrong)\";\n}\n\n//draws the bullet on the gameboard\nfunction showBullet(playerBox, row, col) {\n  const element = (0,_utils_findElement__WEBPACK_IMPORTED_MODULE_0__.findElementByRowCol)(playerBox, row, col);\n  const shoot = document.createElement(\"div\");\n  shoot.classList.add(\"shoot-div\");\n  element.appendChild(shoot);\n}\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/homepageUi.js?");

/***/ }),

/***/ "./src/modules/players.js":
/*!********************************!*\
  !*** ./src/modules/players.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Boat: () => (/* binding */ Boat),\n/* harmony export */   computerPlayer: () => (/* binding */ computerPlayer),\n/* harmony export */   gameSettings: () => (/* binding */ gameSettings),\n/* harmony export */   player: () => (/* binding */ player)\n/* harmony export */ });\nclass Player {\n  constructor() {\n    this.boats = [];\n    this.gameBoardHits = [];\n    this.gameBoardId = \"player-box\";\n  }\n\n  boatPositions() {\n    let arr = [];\n    for (let boats of this.boats) {\n      for (let position of boats.position) {\n        arr.push(position);\n      }\n    }\n    return arr;\n  }\n}\n\nclass Computer {\n  constructor() {\n    this.boats = [];\n    this.gameBoardHits = [];\n    this.gameBoardId = \"computer-box\";\n  }\n\n  boatPositions() {\n    let arr = [];\n    for (let boats of this.boats) {\n      for (let position of boats.position) {\n        arr.push(position);\n      }\n    }\n    return arr;\n  }\n}\n\nclass Boat {\n  constructor(name, size, pos = null) {\n    this.name = name;\n    this.size = size;\n    this.position = pos;\n    this.hits = 0;\n    this.sunk = false;\n  }\n\n  hit() {\n    this.hits += 1;\n  }\n\n  isSunk() {\n    return this.hits === this.size;\n  }\n}\n\nclass settings {\n  constructor() {\n    this.size = 0;\n    this.handleMouseOver = null;\n    this.handleMouseOut = null;\n    this.allHits = [];\n  }\n}\n\nconst gameSettings = new settings();\nconst player = new Player();\nconst computerPlayer = new Computer();\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/players.js?");

/***/ }),

/***/ "./src/modules/utils/checkContainsAny.js":
/*!***********************************************!*\
  !*** ./src/modules/utils/checkContainsAny.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkContainsAny: () => (/* binding */ checkContainsAny)\n/* harmony export */ });\nfunction checkContainsAny(arr1, arr2) {\n  if (arr1.length === 0 && arr2.length === 0) return false;\n  for (const element1 of arr2) {\n    for (const element2 of arr1) {\n      if (element1[0] === element2[0] && element1[1] == element2[1]) {\n        return true;\n      }\n    }\n  }\n  return false;\n}\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/utils/checkContainsAny.js?");

/***/ }),

/***/ "./src/modules/utils/checkNearby.js":
/*!******************************************!*\
  !*** ./src/modules/utils/checkNearby.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkNearby: () => (/* binding */ checkNearby)\n/* harmony export */ });\n/* harmony import */ var _checkContainsAny__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkContainsAny */ \"./src/modules/utils/checkContainsAny.js\");\n\n\nfunction checkNearby(position, computerBoats) {\n  for (let [row, col] of position) {\n    for (let i = -1; i <= 1; i++) {\n      for (let j = -1; j <= 1; j++) {\n        const newRow = row + i;\n        const newCol = col + j;\n        if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {\n          if ((0,_checkContainsAny__WEBPACK_IMPORTED_MODULE_0__.checkContainsAny)([[newRow, newCol]], computerBoats)) {\n            return true;\n          }\n        }\n      }\n    }\n  }\n  return false;\n}\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/utils/checkNearby.js?");

/***/ }),

/***/ "./src/modules/utils/findElement.js":
/*!******************************************!*\
  !*** ./src/modules/utils/findElement.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   findElementByRowCol: () => (/* binding */ findElementByRowCol)\n/* harmony export */ });\n//searches the gameboard elements based on row and col\nfunction findElementByRowCol(parent, row, col) {\n  const selector = `[row=\"${row}\"][col=\"${col}\"]`;\n  return parent.querySelector(selector);\n}\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/utils/findElement.js?");

/***/ }),

/***/ "./src/modules/utils/getRotation.js":
/*!******************************************!*\
  !*** ./src/modules/utils/getRotation.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HORIZONTAL: () => (/* binding */ HORIZONTAL),\n/* harmony export */   ROTATION: () => (/* binding */ ROTATION),\n/* harmony export */   VERTICAL: () => (/* binding */ VERTICAL),\n/* harmony export */   getRotation: () => (/* binding */ getRotation)\n/* harmony export */ });\nconst VERTICAL = \"Vertical\";\nconst HORIZONTAL = \"Horizontal\";\nlet ROTATION = VERTICAL;\nlet rowStep = 0;\nlet colStep = 0;\n\n//returns actual rotation of the boat\nconst getRotation = (data = null) => {\n  if (data !== null || data === VERTICAL || data === HORIZONTAL)\n    ROTATION = data;\n\n  if (ROTATION === VERTICAL) {\n    return [ROTATION, (rowStep = 1), (colStep = 0)];\n  } else if (ROTATION === HORIZONTAL) {\n    return [ROTATION, (rowStep = 0), (colStep = 1)];\n  }\n  return;\n};\n\n\n\n\n//# sourceURL=webpack://battleship-game/./src/modules/utils/getRotation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;