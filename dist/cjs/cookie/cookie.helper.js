'use strict'
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod)
var cookie_helper_exports = {}
__export(cookie_helper_exports, {
  toCamelCase: () => toCamelCase,
  toSnakeCase: () => toSnakeCase,
})
module.exports = __toCommonJS(cookie_helper_exports)
function toCamelCase(str) {
  const words = str.split('_')
  const camelCaseWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  })
  return camelCaseWords.join('')
}
function toSnakeCase(text) {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    toCamelCase,
    toSnakeCase,
  })
