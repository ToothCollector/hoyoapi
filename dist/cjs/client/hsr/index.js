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
var hsr_exports = {}
module.exports = __toCommonJS(hsr_exports)
__reExport(hsr_exports, require('./hsr'), module.exports)
__reExport(hsr_exports, require('./hsr.helper'), module.exports)
__reExport(hsr_exports, require('./hsr.interface'), module.exports)
__reExport(hsr_exports, require('./record'), module.exports)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ...require('./hsr'),
    ...require('./hsr.helper'),
    ...require('./hsr.interface'),
    ...require('./record'),
  })
