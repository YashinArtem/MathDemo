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

/***/ "./src/Demo2d.ts":
/*!***********************!*\
  !*** ./src/Demo2d.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Demo2d\": () => (/* binding */ Demo2d)\n/* harmony export */ });\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ \"./src/Shape.ts\");\n/* harmony import */ var _Vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector2 */ \"./src/Vector2.ts\");\n\r\n\r\nclass Demo2d {\r\n    constructor(ctx, width, height, onUpdate) {\r\n        this.ctx = ctx;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.onUpdate = onUpdate;\r\n        this.shapes = [];\r\n        this.mouse = new _Vector2__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0);\r\n        this.mousePressed = false;\r\n        ctx.canvas.addEventListener('mousemove', e => this.mouseMove(e));\r\n        ctx.canvas.addEventListener('mousedown', e => { this.mousePressed = true; });\r\n        ctx.canvas.addEventListener('mouseup', e => { this.mousePressed = false; });\r\n        setTimeout(() => this.update(), 100);\r\n    }\r\n    drawVector(vector, name, isInput) {\r\n        this.shapes.push(new _Shape__WEBPACK_IMPORTED_MODULE_0__.Shape(vector, name, isInput));\r\n    }\r\n    update() {\r\n        this.onUpdate();\r\n        this.ctx.font = '28px sans-serif';\r\n        this.ctx.clearRect(0, 0, this.width, this.height);\r\n        this.shapes.forEach(shape => {\r\n            if (shape.isInput)\r\n                this.ctx.fillStyle = '#3af';\r\n            else\r\n                this.ctx.fillStyle = '#fa3';\r\n            const x = (shape.vector.x * 0.5 + 0.5) * this.width;\r\n            const y = (shape.vector.y * 0.5 + 0.5) * this.height;\r\n            this.ctx.beginPath();\r\n            this.ctx.arc(x, y, 40, 0, 2 * Math.PI);\r\n            this.ctx.fill();\r\n            this.ctx.fillStyle = '#fff';\r\n            this.ctx.fillText(shape.name, x - shape.name.length * 7, y + 10);\r\n        });\r\n    }\r\n    mouseMove(event) {\r\n        if (!this.mousePressed)\r\n            return;\r\n        const rect = this.ctx.canvas.getBoundingClientRect();\r\n        const mx = (event.clientX - rect.left) / rect.width * 2 - 1;\r\n        const my = (event.clientY - rect.top) / rect.height * 2 - 1;\r\n        this.mouse.set(mx, my);\r\n        for (let i = 0; i < this.shapes.length; i++) {\r\n            const shape = this.shapes[i];\r\n            if (shape.isInput && shape.vector.distance(this.mouse) < 0.2) {\r\n                shape.vector.set(mx, my);\r\n                this.update();\r\n                break;\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://demo/./src/Demo2d.ts?");

/***/ }),

/***/ "./src/Demo3d.ts":
/*!***********************!*\
  !*** ./src/Demo3d.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Demo3d\": () => (/* binding */ Demo3d)\n/* harmony export */ });\nclass Demo3d {\r\n    constructor(gl) {\r\n        this.vertexShaderCode = `#version 300 es\r\n    in vec2 a_position;\r\n    in vec2 a_texcoord;\r\n    out vec2 v_texcoord;\r\n    void main() {\r\n        v_texcoord = a_texcoord;\r\n        gl_Position = vec4(a_position, 0.0, 1.0);\r\n    }`;\r\n        this.quad = [\r\n            -1, -1,\r\n            1, -1,\r\n            1, 1,\r\n            1, 1,\r\n            -1, 1,\r\n            -1, -1,\r\n        ];\r\n        this.textCoords = [\r\n            0, 0,\r\n            1, 0,\r\n            1, 1,\r\n            1, 1,\r\n            0, 1,\r\n            0, 0,\r\n        ];\r\n        this.initGL(gl);\r\n    }\r\n    drawVector2d(vector, input) {\r\n        let code = `float d = box(uv + u_param.xy, vec2(0.1, 0.1));\r\n        if(d < 0.0) col = vec4(0.25, 0.5, 1.0, 1.0);`;\r\n    }\r\n    initGL(gl) {\r\n        const fragmentShaderCode = this.generateShader('');\r\n        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\r\n        const vertexShader = gl.createShader(gl.VERTEX_SHADER);\r\n        gl.shaderSource(vertexShader, this.vertexShaderCode);\r\n        gl.compileShader(vertexShader);\r\n        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\r\n        gl.shaderSource(fragmentShader, fragmentShaderCode);\r\n        gl.compileShader(fragmentShader);\r\n        console.log(gl.getShaderInfoLog(fragmentShader));\r\n        const program = gl.createProgram();\r\n        gl.attachShader(program, vertexShader);\r\n        gl.attachShader(program, fragmentShader);\r\n        gl.linkProgram(program);\r\n        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');\r\n        const texcoordAttributeLocation = gl.getAttribLocation(program, \"a_texcoord\");\r\n        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');\r\n        // timeLocation = gl.getUniformLocation(program, 'u_time');\r\n        // mouseLocation = gl.getUniformLocation(program, 'u_mouse');\r\n        gl.useProgram(program);\r\n        const positionBuffer = gl.createBuffer();\r\n        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\r\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.quad), gl.STATIC_DRAW);\r\n        gl.enableVertexAttribArray(positionAttributeLocation);\r\n        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);\r\n        const texcoordBuffer = gl.createBuffer();\r\n        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);\r\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textCoords), gl.STATIC_DRAW);\r\n        gl.enableVertexAttribArray(texcoordAttributeLocation);\r\n        gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);\r\n        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);\r\n        gl.drawArrays(gl.TRIANGLES, 0, 6);\r\n    }\r\n    generateProgram(code) {\r\n    }\r\n    generateShader(code) {\r\n        const shader = `#version 300 es\r\n        precision highp float;\r\n        uniform float u_time;\r\n        uniform vec2 u_resolution;\r\n        uniform vec4 u_param;\r\n        in vec2 v_texcoord;\r\n        out vec4 outColor;\r\n\r\n        float box(vec2 p, vec2 b) {\r\n            vec2 d = abs(p) - b;\r\n            return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);\r\n        }\r\n\r\n        float circle(vec2 p, float r) {\r\n            return length(p) - r;\r\n        }\r\n    \r\n        void main()\r\n        {\r\n            vec2 uv = v_texcoord * 2.0 - 1.0;\r\n            uv.x *= u_resolution.x / u_resolution.y;\r\n            vec4 col = vec4(0.0);\r\n            ` + code + `\r\n            if(box(uv, vec2(0.97, 0.97)) > 0.0) col = vec4(0.153, 0.157, 0.133, 1.0);\r\n            outColor = col;\r\n        }`;\r\n        return shader;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://demo/./src/Demo3d.ts?");

/***/ }),

/***/ "./src/Shape.ts":
/*!**********************!*\
  !*** ./src/Shape.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shape\": () => (/* binding */ Shape)\n/* harmony export */ });\nclass Shape {\r\n    constructor(vector, name, isInput) {\r\n        this.vector = vector;\r\n        this.name = name;\r\n        this.isInput = isInput;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://demo/./src/Shape.ts?");

/***/ }),

/***/ "./src/Vector2.ts":
/*!************************!*\
  !*** ./src/Vector2.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector2\": () => (/* binding */ Vector2)\n/* harmony export */ });\nclass Vector2 {\r\n    constructor(x, y) {\r\n        this.set(x, y);\r\n    }\r\n    copy(other) {\r\n        this.set(other.x, other.y);\r\n        return this;\r\n    }\r\n    add(other) {\r\n        this.x += other.x;\r\n        this.y += other.y;\r\n        return this;\r\n    }\r\n    sub(other) {\r\n        this.x -= other.x;\r\n        this.y -= other.y;\r\n        return this;\r\n    }\r\n    lerp(other, ratio) {\r\n        const x = this.x * (1 - ratio) + other.x * ratio;\r\n        const y = this.y * (1 - ratio) + other.y * ratio;\r\n        const vector = new Vector2(x, y);\r\n        return vector;\r\n    }\r\n    set(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    distance(other) {\r\n        const dx = this.x - other.x;\r\n        const dy = this.y - other.y;\r\n        return Math.sqrt(dx * dx + dy * dy);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://demo/./src/Vector2.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Demo2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Demo2d */ \"./src/Demo2d.ts\");\n/* harmony import */ var _Demo3d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo3d */ \"./src/Demo3d.ts\");\n/* harmony import */ var _Vector2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vector2 */ \"./src/Vector2.ts\");\n\r\n\r\n\r\naddBlock('Vector2.add()', (ctx) => {\r\n    const a = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.2, -0.2);\r\n    const b = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5);\r\n    const c = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.0, 0.0);\r\n    const onUpdate = () => {\r\n        c.copy(a);\r\n        c.add(b);\r\n    };\r\n    const demo = new _Demo2d__WEBPACK_IMPORTED_MODULE_0__.Demo2d(ctx, 512, 512, onUpdate);\r\n    demo.drawVector(a, 'A', true);\r\n    demo.drawVector(b, 'B', true);\r\n    demo.drawVector(c, 'A + B', false);\r\n});\r\naddBlock('Vector2.sub()', (ctx) => {\r\n    const a = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.2, -0.2);\r\n    const b = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5);\r\n    const c = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.0, 0.0);\r\n    const onUpdate = () => {\r\n        c.copy(a);\r\n        c.sub(b);\r\n    };\r\n    const demo = new _Demo2d__WEBPACK_IMPORTED_MODULE_0__.Demo2d(ctx, 512, 512, onUpdate);\r\n    demo.drawVector(a, 'A', true);\r\n    demo.drawVector(b, 'B', true);\r\n    demo.drawVector(c, 'A - B', false);\r\n});\r\naddBlock('Vector2.lerp()', (ctx) => {\r\n    const a = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.2, -0.2);\r\n    const b = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.5, 0.5);\r\n    const c = new _Vector2__WEBPACK_IMPORTED_MODULE_2__.Vector2(0.0, 0.0);\r\n    const onUpdate = () => {\r\n        c.copy(a.lerp(b, 0.5));\r\n    };\r\n    const demo = new _Demo2d__WEBPACK_IMPORTED_MODULE_0__.Demo2d(ctx, 512, 512, onUpdate);\r\n    demo.drawVector(a, 'A', true);\r\n    demo.drawVector(b, 'B', true);\r\n    demo.drawVector(c, 'Mix', false);\r\n});\r\nfunction addBlock(name, code) {\r\n    const div = document.createElement('div');\r\n    div.classList.add('demo-div');\r\n    const h1 = document.createElement('h1');\r\n    h1.classList.add('demo-header');\r\n    h1.textContent = name;\r\n    div.appendChild(h1);\r\n    div.appendChild(makeDemoBlock(code));\r\n    div.appendChild(makeCodeBlock(code));\r\n    document.body.appendChild(div);\r\n}\r\nfunction makeDemoBlock(code) {\r\n    const graphicsDiv = document.createElement('div');\r\n    const cnv = document.createElement('canvas');\r\n    const cnv2d = document.createElement('canvas');\r\n    cnv.width = cnv.height = 512;\r\n    cnv2d.width = cnv2d.height = 512;\r\n    graphicsDiv.classList.add('graphics-div');\r\n    cnv.classList.add('graphics-view');\r\n    cnv2d.classList.add('graphics-view');\r\n    const ctx = cnv2d.getContext('2d');\r\n    const gl = cnv.getContext('webgl2');\r\n    const demo3d = new _Demo3d__WEBPACK_IMPORTED_MODULE_1__.Demo3d(gl);\r\n    graphicsDiv.appendChild(cnv);\r\n    graphicsDiv.appendChild(cnv2d);\r\n    code(ctx);\r\n    return graphicsDiv;\r\n}\r\nfunction makeCodeBlock(code) {\r\n    const codeDiv = document.createElement('div');\r\n    const pre = document.createElement('pre');\r\n    const codeElement = document.createElement('code');\r\n    let text = code.toString().split(\"\\n\").slice(1).join(\"\\n\").replace(/\\n.*$/, '').replace(/\\b_\\w+/ig, '');\r\n    codeElement.innerHTML = text;\r\n    codeDiv.classList.add('code-div');\r\n    codeElement.classList.add('language-typescript');\r\n    pre.appendChild(codeElement);\r\n    codeDiv.appendChild(pre);\r\n    return codeDiv;\r\n}\r\n\n\n//# sourceURL=webpack://demo/./src/index.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;