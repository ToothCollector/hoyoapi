'use strict'
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
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
var __reExport = (target, mod, secondTarget) => (
  __copyProps(target, mod, 'default'),
  secondTarget && __copyProps(secondTarget, mod, 'default')
)
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod)
var interfaces_exports = {}
module.exports = __toCommonJS(interfaces_exports)
__reExport(
  interfaces_exports,
  require('./characters.interface'),
  module.exports,
)
__reExport(interfaces_exports, require('./dailyNote.interface'), module.exports)
__reExport(interfaces_exports, require('./record.interface'), module.exports)
__reExport(
  interfaces_exports,
  require('./spiralAbyss.interface'),
  module.exports,
)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ...require('./characters.interface'),
    ...require('./dailyNote.interface'),
    ...require('./record.interface'),
    ...require('./spiralAbyss.interface'),
  })
