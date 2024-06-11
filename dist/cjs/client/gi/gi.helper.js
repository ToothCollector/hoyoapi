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
var gi_helper_exports = {}
__export(gi_helper_exports, {
  getGenshinRegion: () => getGenshinRegion,
})
module.exports = __toCommonJS(gi_helper_exports)
var import_error = require('../../error')
var import_gi = require('./gi.interface')
function getGenshinRegion(uid) {
  const server_region = Number(uid.toString().trim().slice(0, 1))
  let key
  switch (server_region) {
    case 6:
      key = 'USA'
      break
    case 7:
      key = 'EUROPE'
      break
    case 8:
      key = 'ASIA'
      break
    case 9:
      key = 'CHINA_TAIWAN'
      break
    default:
      throw new import_error.HoyoAPIError(
        'Given UID '.concat(uid, ' is invalid !'),
      )
  }
  return import_gi.GenshinRegion[key]
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    getGenshinRegion,
  })
