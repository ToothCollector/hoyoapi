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
var record_exports = {}
module.exports = __toCommonJS(record_exports)
__reExport(record_exports, require('./interfaces'), module.exports)
__reExport(record_exports, require('./record'), module.exports)
__reExport(record_exports, require('./record.enum'), module.exports)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ...require('./interfaces'),
    ...require('./record'),
    ...require('./record.enum'),
  })
