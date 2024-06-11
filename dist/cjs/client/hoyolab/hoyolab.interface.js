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
var hoyolab_interface_exports = {}
__export(hoyolab_interface_exports, {
  GamesEnum: () => GamesEnum,
})
module.exports = __toCommonJS(hoyolab_interface_exports)
var GamesEnum = /* @__PURE__ */ ((GamesEnum2) => {
  GamesEnum2['GENSHIN_IMPACT'] = 'hk4e_global'
  GamesEnum2['HONKAI_IMPACT'] = 'bh3_global'
  GamesEnum2['HONKAI_STAR_RAIL'] = 'hkrpg_global'
  return GamesEnum2
})(GamesEnum || {})
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    GamesEnum,
  })
