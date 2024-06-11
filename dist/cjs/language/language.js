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
var language_exports = {}
__export(language_exports, {
  Language: () => Language,
})
module.exports = __toCommonJS(language_exports)
var import_language = require('./language.interface')
class Language {
  /**
   * Parses a language string into its corresponding LanguageEnum value.
   *
   * @param lang The language string to parse, or null/undefined to default to English.
   * @returns The LanguageEnum value corresponding to the provided string, or English if the string is invalid or undefined.
   */
  static parseLang(lang) {
    if (!lang) {
      return import_language.LanguageEnum.ENGLISH
    }
    const langKeys = Object.keys(import_language.LanguageEnum)
    const matchingKey = langKeys.find(
      (key) => import_language.LanguageEnum[key] === lang,
    )
    return matchingKey
      ? import_language.LanguageEnum[matchingKey]
      : import_language.LanguageEnum.ENGLISH
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Language,
  })
