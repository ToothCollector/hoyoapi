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
var cookie_exports = {}
__export(cookie_exports, {
  Cookie: () => Cookie,
})
module.exports = __toCommonJS(cookie_exports)
var import_cookie2 = require('./cookie.helper')
var import_language = require('../language')
var import_error = require('../error')
class Cookie {
  /**
   * Parses a cookie string and returns a parsed ICookie object.
   *
   * @param cookieString - The cookie string to be parsed.
   * @returns {string} - A parsed ICookie object.
   * @throws {HoyoAPIError} when ltuid or ltoken keys are not found in the cookie string.
   */
  static parseCookieString(cookieString) {
    const cookies = /* @__PURE__ */ new Map()
    const keys = [
      'ltoken_v2',
      'ltuid_v2',
      'account_id',
      'cookie_token',
      'account_id_v2',
      'account_mid_v2',
      'cookie_token_v2',
      'mi18nLang',
    ]
    cookieString.split('; ').forEach((cookie) => {
      const cookieSplited = cookie.trim().split(/=(?=.+)/)
      if (keys.includes(cookieSplited[0]) === false) {
        return
      }
      const key = (0, import_cookie2.toCamelCase)(cookieSplited[0]).trim()
      const val = decodeURIComponent(cookieSplited[1]).replace(';', '').trim()
      cookies.set(key, val)
      if (
        ['ltuid_v2', 'account_id', 'account_id_v2'].includes(cookieSplited[0])
      ) {
        cookies.set(key, parseInt(cookies.get(key), 10))
      } else if (cookieSplited[0] === 'mi18nLang') {
        cookies.set(key, import_language.Language.parseLang(cookies.get(key)))
      }
    })
    const ltuid = cookies.get('ltuid_v2')
    const accountId = cookies.get('accountId')
    const accountIdV2 = cookies.get('accountIdV2')
    if (ltuid && !accountId) {
      cookies.set('accountId', ltuid)
    } else if (!ltuid && accountId) {
      cookies.set('ltuid_v2', accountId)
    }
    if (!accountIdV2 && (accountId || ltuid) !== null) {
      cookies.set('accountIdV2', accountId || ltuid)
    }
    if (!cookies.get('ltokenV2') || !cookies.get('ltuidV2')) {
      throw new import_error.HoyoAPIError(
        'Cookie key ltuid_v2 or ltoken_v2 doesnt exist !',
      )
    }
    return Object.fromEntries(cookies)
  }
  /**
   * Converts an `ICookie` object into a cookie string.
   * @param {ICookie} cookie - The `ICookie` object to convert.
   * @returns {string} A string representing the cookie.
   * @throws {HoyoAPIError} If the `ltuid` or `ltoken` key is missing in the `ICookie` object.
   */
  static parseCookie(cookie) {
    if (!cookie.accountId) {
      cookie.accountId = cookie.ltuidV2
    }
    const cookies = Object.entries(cookie)
      .map(([key, value]) => {
        if (!value) {
          return void 0
        }
        if (
          [
            'cookieToken',
            'accountId',
            'cookieTokenV2',
            'accountIdV2',
            'accountMidV2',
          ].includes(key)
        ) {
          key = (0, import_cookie2.toSnakeCase)(key)
        }
        return ''.concat(key, '=').concat(value)
      })
      .filter((val) => {
        return val !== void 0
      })
    return cookies.join('; ')
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Cookie,
  })
