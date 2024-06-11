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
var hi_exports = {}
__export(hi_exports, {
  HonkaiImpact: () => HonkaiImpact,
})
module.exports = __toCommonJS(hi_exports)
var import_cookie = require('../../cookie')
var import_language = require('../../language')
var import_daily = require('../../module/daily')
var import_redeem = require('../../module/redeem')
var import_request = require('../../request')
var import_routes = require('../../routes')
var import_hi2 = require('./hi.helper')
var import_hoyolab = require('../hoyolab')
var import_error = require('../../error')
var import_record = require('./record')
class HonkaiImpact {
  /**
   * Create a new instance of HonkaiImpact.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options) {
    /**
     * The Daily module for the Honkai Impact 3rd game.
     *
     */
    __publicField(this, 'daily')
    /**
     * The Redeem module for the Honkai Impact 3rd game.
     *
     * @public
     * @readonly
     */
    __publicField(this, 'redeem')
    /**
     * The `HIRecordModule` object provides an interface to interact with the user record feature in Honkai Star Rails.
     *
     */
    __publicField(this, 'record')
    /**
     * The cookie used for authentication.
     *
     */
    __publicField(this, 'cookie')
    /**
     * The request object used to make HTTP requests.
     *
     */
    __publicField(this, 'request')
    /**
     * HoyYolab account object
     *
     */
    __publicField(this, '_account', null)
    /**
     * The UID of the Honkai Impact 3rd account.
     *
     */
    __publicField(this, 'uid')
    /**
     * The region of the Honkai Impact 3rd account.
     *
     */
    __publicField(this, 'region')
    /**
     * The language of the Honkai Impact 3rd account.
     *
     */
    __publicField(this, 'lang')
    var _a
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
    this.request.setReferer(import_routes.DEFAULT_REFERER)
    this.request.setLang(options.lang)
    this.uid = (_a = options.uid) != null ? _a : null
    this.region =
      this.uid !== null ? (0, import_hi2.getHi3Region)(this.uid) : null
    this.lang = options.lang
    this.daily = new import_daily.DailyModule(
      this.request,
      this.lang,
      import_hoyolab.GamesEnum.HONKAI_IMPACT,
      this.region,
    )
    this.redeem = new import_redeem.RedeemModule(
      this.request,
      this.lang,
      import_hoyolab.GamesEnum.HONKAI_IMPACT,
      this.region,
      this.uid,
    )
    this.record = new import_record.HIRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
  }
  /**
   * Create a new instance of HonkaiImpact using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @param options The options object used to configure the object.
   * @throws {HoyoAPIError} Error Wnen the CookieTokenV2 is not set.
   * @returns {Promise<HonkaiImpact>} - A promise that resolves with a new HonkaiImpact instance.
   *
   * @remarks
   * If an object is instantiated from this method but options.cookie.cookieTokenV2 is not set,
   * it will throw an error. This method will access an Endpoint that contains a list of game accounts,
   * which requires the cookieTokenV2 option.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  static async create(options) {
    try {
      let game = null
      if (typeof options.uid === 'undefined') {
        const hoyolab = new import_hoyolab.Hoyolab({
          cookie: options.cookie,
        })
        game = await hoyolab.gameAccount(import_hoyolab.GamesEnum.HONKAI_IMPACT)
        options.uid = parseInt(game.game_uid)
        options.region = (0, import_hi2.getHi3Region)(parseInt(game.game_uid))
      }
      const hi = new HonkaiImpact(options)
      hi.account = game
      return hi
    } catch (error) {
      throw new import_error.HoyoAPIError(error.message, error.code)
    }
  }
  /**
   * Setter for the account property. Prevents from changing the value once set
   * @param game The game object to set as the account.
   */
  set account(game) {
    if (this.account === null && game !== null) {
      this._account = game
    }
  }
  /**
   * Getter for the account property.
   * @returns {IGame | null} The current value of the account property.
   */
  get account() {
    return this._account
  }
  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.info() } instead
   */
  dailyInfo() {
    return this.daily.info()
  }
  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.rewards() } instead
   */
  dailyRewards() {
    return this.daily.rewards()
  }
  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.reward() } instead
   */
  dailyReward(day = null) {
    return this.daily.reward(day)
  }
  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.claim() } instead
   */
  dailyClaim() {
    return this.daily.claim()
  }
  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiImpact.redeem | HonkaiImpact.redeem.claim() } instead
   */
  redeemCode(code) {
    return this.redeem.claim(code)
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    HonkaiImpact,
  })
