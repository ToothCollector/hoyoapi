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
var gi_exports = {}
module.exports = __toCommonJS(gi_exports)
__reExport(gi_exports, require('./gi'), module.exports)
__reExport(gi_exports, require('./gi.helper'), module.exports)
__reExport(gi_exports, require('./gi.interface'), module.exports)
__reExport(gi_exports, require('./diary'), module.exports)
__reExport(gi_exports, require('./record'), module.exports)
__reExport(gi_exports, require('./tcg'), module.exports)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ...require('./gi'),
    ...require('./gi.helper'),
    ...require('./gi.interface'),
    ...require('./diary'),
    ...require('./record'),
    ...require('./tcg'),
  })
