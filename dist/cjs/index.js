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
var src_exports = {}
module.exports = __toCommonJS(src_exports)
__reExport(src_exports, require('./request/index'), module.exports)
__reExport(src_exports, require('./cookie'), module.exports)
__reExport(src_exports, require('./error'), module.exports)
__reExport(src_exports, require('./language'), module.exports)
__reExport(src_exports, require('./request'), module.exports)
__reExport(src_exports, require('./routes'), module.exports)
__reExport(src_exports, require('./client'), module.exports)
__reExport(src_exports, require('./module'), module.exports)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ...require('./request/index'),
    ...require('./cookie'),
    ...require('./error'),
    ...require('./language'),
    ...require('./request'),
    ...require('./routes'),
    ...require('./client'),
    ...require('./module'),
  })
