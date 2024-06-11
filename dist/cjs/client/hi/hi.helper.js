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
var hi_helper_exports = {}
__export(hi_helper_exports, {
  getHi3Region: () => getHi3Region,
})
module.exports = __toCommonJS(hi_helper_exports)
var import_error = require('../../error')
var import_hi = require('./hi.interface')
function getHi3Region(uid) {
  let key
  if (uid > 1e7 && uid < 1e8) {
    key = 'ASIA'
  } else if (uid > 1e8 && uid < 2e8) {
    key = 'USA'
  } else if (uid > 2e8 && uid < 3e8) {
    key = 'EURO'
  } else {
    throw new import_error.HoyoAPIError(
      'Given UID '.concat(uid, ' is invalid !'),
    )
  }
  return import_hi.HonkaiRegion[key]
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    getHi3Region,
  })
