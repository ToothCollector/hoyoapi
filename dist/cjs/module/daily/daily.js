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
var daily_exports = {}
__export(daily_exports, {
  DailyModule: () => DailyModule,
})
module.exports = __toCommonJS(daily_exports)
var import_hoyolab = require('../../client/hoyolab')
var import_routes = require('../../routes')
var import_error = require('../../error')
class DailyModule {
  constructor(request, lang, game, region) {
    this.request = request
    this.lang = lang
    this.game = game
    this.region = region
    __publicField(this, 'dailyInfoUrl')
    __publicField(this, 'dailyRewardUrl')
    __publicField(this, 'dailySignUrl')
    this.dailyInfoUrl = (0, import_routes.DAILY_INFO_API)(game)
    this.dailyRewardUrl = (0, import_routes.DAILY_REWARD_API)(game)
    this.dailySignUrl = (0, import_routes.DAILY_CLAIM_API)(game)
  }
  /**
   * Retrieves daily information.
   *
   * @returns {Promise<IDailyInfo>} A promise that resolves to an IDailyInfo object.
   */
  async info() {
    var _a
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(this.dailyInfoUrl)
    if (res.retcode !== 0 || !res.data) {
      throw new import_error.HoyoAPIError(
        (_a = res.message) != null
          ? _a
          : 'Failed to retrieve data, please double-check the provided UID.',
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
    const data = res.data
    if (
      typeof (data == null ? void 0 : data.first_bind) === 'undefined' ||
      (data == null ? void 0 : data.first_bind) === null
    ) {
      data.first_bind = false
    }
    if (typeof data.month_last_day === 'undefined') {
      const today = /* @__PURE__ */ new Date()
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      ).getDate()
      data.month_last_day = today.getDate() === lastDayOfMonth
    }
    if (typeof data.sign_cnt_missed === 'undefined') {
      data.sign_cnt_missed = 0
    }
    if (typeof data.short_sign_day === 'undefined') {
      data.short_sign_day = 0
    }
    if (data.region === '' && this.region) {
      data.region = this.region
    }
    return data
  }
  /**
   * Retrieve daily rewards information.
   *
   * @returns {Promise<IDailyRewards>} A promise that resolves to an IDailyRewards object.
   */
  async rewards() {
    var _a
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(this.dailyRewardUrl)
    if (res.retcode !== 0 || !res.data) {
      throw new import_error.HoyoAPIError(
        (_a = res.message) != null
          ? _a
          : 'Failed to retrieve data, please double-check the provided UID.',
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
    const data = res.data
    if (typeof data.now === 'undefined') {
      data.now = Math.round(
        /* @__PURE__ */ new Date().getTime() / 1e3,
      ).toString()
    }
    if (this.game === import_hoyolab.GamesEnum.GENSHIN_IMPACT) {
      data.biz = 'hk4e'
    } else if (this.game === import_hoyolab.GamesEnum.HONKAI_IMPACT) {
      data.biz = 'hk4e'
    } else if (this.game === import_hoyolab.GamesEnum.HONKAI_STAR_RAIL) {
      data.biz = 'hkrpg'
    } else {
      data.biz = ''
    }
    if (typeof data.resign === 'undefined') {
      data.resign = false
    }
    return data
  }
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param {number | null} day - The day to retrieve the reward for. If null, retrieve the reward for the current day.
   * @returns {Promise<IDailyReward>} - A promise that resolves with the daily reward for the specified day or the current day
   * @throws {HoyoAPIError} - If the specified day is not a valid date in the current month or if the reward for the specified day is undefined.
   */
  async reward(day = null) {
    const response = await this.rewards()
    if (day === null) {
      const now = (response == null ? void 0 : response.now)
        ? new Date(parseInt(response.now) * 1e3)
        : /* @__PURE__ */ new Date()
      day = now.getDate()
    }
    const date = /* @__PURE__ */ new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    if (
      !(day > 0 && day <= daysInMonth) ||
      typeof response.awards[day - 1] === void 0
    ) {
      throw new import_error.HoyoAPIError(
        ''.concat(day, ' is not a valid date in this month.'),
      )
    }
    return {
      month: response.month,
      now: response.now,
      biz: response.biz,
      resign: response.resign,
      award: response.awards[day - 1],
    }
  }
  /**
   * Claim the daily rewards.
   *
   * @returns {Promise<IDailyClaim>} The claim information.
   */
  async claim() {
    var _a
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)
    const { response } = await this.request.send(this.dailySignUrl, 'POST', 0)
    const info = await this.info()
    const reward = await this.reward()
    if (response.retcode === -5003) {
      return {
        status: response.message,
        code: -5003,
        reward,
        info,
      }
    }
    if (
      ((_a = response.data) == null
        ? void 0
        : _a.code.toString().toLowerCase()) === 'ok' &&
      response.retcode === 0
    ) {
      return {
        status: response.message,
        code: 0,
        reward,
        info,
      }
    }
    return {
      status: response.message,
      code: response.retcode,
      reward: null,
      info,
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    DailyModule,
  })
