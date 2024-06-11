'use strict'
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value)
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
var hoyolab_exports = {}
__export(hoyolab_exports, {
  Hoyolab: () => Hoyolab,
})
module.exports = __toCommonJS(hoyolab_exports)
var import_cookie = require('../../cookie')
var import_error = require('../../error')
var import_language = require('../../language')
var import_request = require('../../request')
var import_routes = require('../../routes')
class Hoyolab {
  /**
   * Creates a new instance of `Hoyolab`.
   *
   * @constructor
   * @param {IHoyolabOptions} options - The options to initialize the `Hoyolab` instance.
   * @throws {HoyoAPIError} If `ltuid` or `ltoken` keys are missing in the `ICookie` object.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  constructor(options) {
    /**
     * The parsed ICookie object used to authenticate requests.
     */
    __publicField(this, 'cookie')
    /**
     * The underlying `Request` object used to make HTTP requests.
     */
    __publicField(this, 'request')
    /**
     * The language used for API responses.
     */
    __publicField(this, 'lang')
    const cookie =
      typeof options.cookie === 'string'
        ? import_cookie.Cookie.parseCookieString(options.cookie)
        : options.cookie
    this.cookie = cookie
    if (!options.lang) {
      options.lang = import_language.Language.parseLang(cookie.mi18nLang)
    }
    options.lang = import_language.Language.parseLang(options.lang)
    this.request = new import_request.HTTPRequest(
      import_cookie.Cookie.parseCookie(this.cookie),
    )
    this.request.setLang(options.lang)
    this.lang = options.lang
  }
  /**
   * Get the list of games on this Hoyolab account.
   *
   * @async
   * @param {GamesEnum} [game] The optional game for which to retrieve accounts.
   * @throws {HoyoAPIError} Thrown if there are no game accounts on this Hoyolab account.
   * @returns {Promise<IGame[]>} The list of games on this Hoyolab account.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  async gamesList(game) {
    var _a
    if (!this.cookie.cookieTokenV2) {
      throw new import_error.HoyoAPIError(
        'You must set options.cookie.cookieTokenV2 to access this API',
      )
    }
    if (game) {
      this.request.setQueryParams({
        game_biz: game,
      })
    }
    this.request.setQueryParams({
      uid: this.cookie.ltuidV2,
      sLangKey: this.cookie.mi18nLang,
    })
    const {
      response: res,
      params,
      body,
      headers,
    } = await this.request.send(import_routes.USER_GAMES_LIST)
    const data = res.data
    if (!res.data || !data.list) {
      throw new import_error.HoyoAPIError(
        (_a = res.message) != null
          ? _a
          : 'There is no game account on this hoyolab account !',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }
    return data.list
  }
  /**
   * Get the account of a specific game from the games list.
   *
   * @async
   * @param {GamesEnum} game - The game that the account belongs to.
   * @throws {HoyoAPIError} If there is no game account on this hoyolab account.
   * @returns {Promise<IGame>} The game account.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  async gameAccount(game) {
    const games = await this.gamesList(game)
    if (games.length < 1) {
      throw new import_error.HoyoAPIError(
        'There is no game account on this hoyolab account !',
      )
    }
    return games.reduce((first, second) => {
      return second.level > first.level ? second : first
    })
  }
  /**
   * Retrieves the game record card
   *
   * @async
   * @returns {Promise<IGameRecordCard>} The game account.
   */
  async gameRecordCard() {
    this.request.setQueryParams({
      uid:
        this.cookie.ltuidV2 || this.cookie.accountId || this.cookie.accountIdV2,
    })
    const { response: res } = await this.request.send(
      import_routes.GAME_RECORD_CARD_API,
    )
    return res.data.list
  }
  /* c8 ignore stop */
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Hoyolab,
  })
