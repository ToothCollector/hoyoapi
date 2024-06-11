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
var gi_exports = {}
__export(gi_exports, {
  GenshinImpact: () => GenshinImpact,
})
module.exports = __toCommonJS(gi_exports)
var import_language = require('../../language')
var import_daily = require('../../module/daily')
var import_redeem = require('../../module/redeem')
var import_cookie = require('../../cookie')
var import_request = require('../../request')
var import_routes = require('../../routes')
var import_gi2 = require('./gi.helper')
var import_hoyolab = require('../hoyolab')
var import_record = require('./record')
var import_diary = require('./diary')
var import_error = require('../../error')
var import_tcg = require('./tcg')
class GenshinImpact {
  /**
   * Constructs a new `Genshin` object.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options) {
    /**
     * The `DailyModule` object provides an interface to interact with the daily check-in feature in Genshin Impact.
     *
     */
    __publicField(this, 'daily')
    /**
     * The `RedeemModule` object provides an interface to interact with the code redemption feature in Genshin Impact.
     *
     */
    __publicField(this, 'redeem')
    /**
     * The `GenshinRecordModule` object provides an interface to interact with the user record feature in Genshin Impact.
     *
     */
    __publicField(this, 'record')
    /**
     * The `GenshinDiaryModule` object provides an interface to interact with the user diary feature in Genshin Impact.
     *
     */
    __publicField(this, 'diary')
    /**
     * The `GenshinTCGModule` object provides an interface to interact with the user diary feature in Genshin Impact.
     *
     */
    __publicField(this, 'tcg')
    /**
     * HoyYolab account object
     *
     */
    __publicField(this, '_account', null)
    /**
     * The cookie object to be used in requests.
     */
    __publicField(this, 'cookie')
    /**
     * The `Request` object used to make requests.
     */
    __publicField(this, 'request')
    /**
     * The UID of the user, if available.
     */
    __publicField(this, 'uid')
    /**
     * The region of the user, if available.
     */
    __publicField(this, 'region')
    /**
     * The language to be used in requests.
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
      this.uid !== null ? (0, import_gi2.getGenshinRegion)(this.uid) : null
    this.lang = options.lang
    this.daily = new import_daily.DailyModule(
      this.request,
      this.lang,
      import_hoyolab.GamesEnum.GENSHIN_IMPACT,
      this.region,
    )
    this.redeem = new import_redeem.RedeemModule(
      this.request,
      this.lang,
      import_hoyolab.GamesEnum.GENSHIN_IMPACT,
      this.region,
      this.uid,
    )
    this.record = new import_record.GenshinRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
    this.diary = new import_diary.GenshinDiaryModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
    this.tcg = new import_tcg.GenshinTCGModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
  }
  /**
     * Create a new instance of the GenshinImpact class asynchronously.
     *
     * @param options The options object used to configure the object.
     * @throws {HoyoAPIError} Error Wnen the CookieTokenV2 is not set.
     * @returns {Promise<GenshinImpact>} A promise that resolves with a new Genshin instance.
     *
     * @remarks
     * If an object is instantiated from this method but options.cookie.cookieTokenV2 is not set,
     * it will throw an error. This method will access an Endpoint that contains a list of game accounts,
     * which requires the cookieTokenV2 option.
  
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
        game = await hoyolab.gameAccount(
          import_hoyolab.GamesEnum.GENSHIN_IMPACT,
        )
        options.uid = parseInt(game.game_uid)
      }
      const gi = new GenshinImpact(options)
      gi.account = game
      return gi
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
   * Get user's Genshin Impact record
   *
   * @alias {@link GenshinImpact.record | Genshin.record.records()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.records()} instead
   */
  async records() {
    return this.record.records()
  }
  /**
   * Retrieves the Genshin characters of the user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.characters()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.characters()} instead
   */
  async characters() {
    return this.record.characters()
  }
  /**
   * Returns the summary information of Genshin Impact game characters
   *
   * @param characterIds number[] Characters ID
   * @alias {@link GenshinImpact.record | Genshin.record.charactersSummary()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.charactersSummary()} instead
   */
  async charactersSummary(characterIds) {
    return this.record.charactersSummary(characterIds)
  }
  /**
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType SpiralAbyssScheduleEnum
   * @alias {@link GenshinImpact.record | Genshin.record.spiralAbyss()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.spiralAbyss()} instead
   */
  async spiralAbyss(
    scheduleType = import_record.SpiralAbyssScheduleEnum.CURRENT,
  ) {
    return this.record.spiralAbyss(scheduleType)
  }
  /**
   * Retrieve the daily note information for a Genshin Impact user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.dailyNote()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.dailyNote()} instead
   */
  async dailyNote() {
    return this.record.dailyNote()
  }
  /**
   * Returns the diary information of a given month for a user
   *
   * @param month
   * @alias {@link GenshinImpact.diary | Genshin.diary.list()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.list()} instead
   */
  async diaryList(month = import_diary.DiaryMonthEnum.CURRENT) {
    return this.diary.list(month)
  }
  /**
   * Returns the diary details of a given type and month for a user
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @alias {@link GenshinImpact.diary | Genshin.diary.detail()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.detail()} instead
   */
  async diaryDetail(type, month = import_diary.DiaryMonthEnum.CURRENT) {
    return this.diary.detail(type, month)
  }
  /**
   * Retrieves daily information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.info()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.info()} instead
   */
  dailyInfo() {
    return this.daily.info()
  }
  /**
   * Retrieve daily rewards information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.rewards()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.rewards()} instead
   */
  dailyRewards() {
    return this.daily.rewards()
  }
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param day number | null
   * @alias {@link GenshinImpact.daily | Genshin.daily.reward()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.reward()} instead
   */
  dailyReward(day = null) {
    return this.daily.reward(day)
  }
  /**
   * Claim current reward
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.claim()} instead
   */
  dailyClaim() {
    return this.daily.claim()
  }
  /**
   * Redeems a code for a specific account.
   *
   * @param code string
   * @alias {@link GenshinImpact.daily | Genshin.redeem.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.redeem.claim()} instead
   */
  redeemCode(code) {
    return this.redeem.claim(code)
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    GenshinImpact,
  })
