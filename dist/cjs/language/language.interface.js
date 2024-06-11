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
var language_interface_exports = {}
__export(language_interface_exports, {
  LanguageEnum: () => LanguageEnum,
})
module.exports = __toCommonJS(language_interface_exports)
var LanguageEnum = /* @__PURE__ */ ((LanguageEnum2) => {
  LanguageEnum2['SIMPLIFIED_CHINESE'] = 'zh-cn'
  LanguageEnum2['TRADIIONAL_CHINESE'] = 'zh-tw'
  LanguageEnum2['GERMAN'] = 'de-de'
  LanguageEnum2['ENGLISH'] = 'en-us'
  LanguageEnum2['SPANISH'] = 'es-es'
  LanguageEnum2['FRENCH'] = 'fr-fr'
  LanguageEnum2['INDONESIAN'] = 'id-id'
  LanguageEnum2['ITALIAN'] = 'it-it'
  LanguageEnum2['JAPANESE'] = 'ja-jp'
  LanguageEnum2['KOREAN'] = 'ko-kr'
  LanguageEnum2['PORTUGUESE'] = 'pt-pt'
  LanguageEnum2['RUSSIAN'] = 'ru-ru'
  LanguageEnum2['THAI'] = 'th-th'
  LanguageEnum2['TURKISH'] = 'tr-tr'
  LanguageEnum2['VIETNAMESE'] = 'vi-vn'
  return LanguageEnum2
})(LanguageEnum || {})
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    LanguageEnum,
  })
