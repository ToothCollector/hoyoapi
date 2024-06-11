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
var hsr_interface_exports = {}
__export(hsr_interface_exports, {
  HsrRegion: () => HsrRegion,
})
module.exports = __toCommonJS(hsr_interface_exports)
var HsrRegion = /* @__PURE__ */ ((HsrRegion2) => {
  HsrRegion2['USA'] = 'prod_official_usa'
  HsrRegion2['EUROPE'] = 'prod_official_eur'
  HsrRegion2['ASIA'] = 'prod_official_asia'
  HsrRegion2['CHINA_TAIWAN'] = 'prod_official_cht'
  return HsrRegion2
})(HsrRegion || {})
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    HsrRegion,
  })
