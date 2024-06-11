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
var request_helper_exports = {}
__export(request_helper_exports, {
  delay: () => delay,
  generateDS: () => generateDS,
})
module.exports = __toCommonJS(request_helper_exports)
var import_crypto = require('crypto')
function generateDS() {
  const salt = '6s25p5ox5y14umn1p61aqyyvbvvl3lrt'
  const date = /* @__PURE__ */ new Date()
  const time = Math.floor(date.getTime() / 1e3)
  let random = ''
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    const randomChar = characters.charAt(randomIndex)
    random += randomChar
  }
  const hash = (0, import_crypto.createHash)('md5')
    .update('salt='.concat(salt, '&t=').concat(time, '&r=').concat(random))
    .digest('hex')
  return ''.concat(time, ',').concat(random, ',').concat(hash)
}
function delay(second) {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1e3)
  })
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    delay,
    generateDS,
  })
