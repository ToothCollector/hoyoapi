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
var gi_interface_exports = {}
__export(gi_interface_exports, {
  GenshinRegion: () => GenshinRegion,
})
module.exports = __toCommonJS(gi_interface_exports)
var GenshinRegion = /* @__PURE__ */ ((GenshinRegion2) => {
  GenshinRegion2['USA'] = 'os_usa'
  GenshinRegion2['EUROPE'] = 'os_euro'
  GenshinRegion2['ASIA'] = 'os_asia'
  GenshinRegion2['CHINA_TAIWAN'] = 'os_cht'
  return GenshinRegion2
})(GenshinRegion || {})
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    GenshinRegion,
  })
