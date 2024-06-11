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
var tcg_exports = {}
__export(tcg_exports, {
  GenshinTCGModule: () => GenshinTCGModule,
})
module.exports = __toCommonJS(tcg_exports)
var import_error = require('../../../error')
var import_routes = require('../../../routes')
class GenshinTCGModule {
  /**
   * Creates an instance of the GenshinTCGModule.
   * @param request - The HTTP request object.
   * @param lang - The language enumeration for the module.
   * @param region - The region string or null.
   * @param uid - The UID number or null.
   */
  constructor(request, lang, region, uid) {
    this.request = request
    this.lang = lang
    this.region = region
    this.uid = uid
  }
  /**
   * Retrieves basic information for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGBasicInfo>} The Genshin Impact TCG basic information.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async basicInfo() {
    var _a
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(import_routes.GENSHIN_TCG_BASICINFO)
    if (res.retcode !== 0) {
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
    return res.data
  }
  /**
   * Retrieves the cards for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGCards>} The Genshin Impact TCG cards.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async cards() {
    var _a, _b
    const perPage = 100
    let next = true
    let offset = 0
    const cardLists = {}
    do {
      this.request
        .setQueryParams({
          server: this.region,
          role_id: this.uid,
          need_avatar: 'true',
          need_action: 'true',
          need_stats: 'true',
          offset,
          limit: perPage,
        })
        .setDs(true)
      const {
        response: res,
        body,
        headers,
        params,
      } = await this.request.send(import_routes.GENSHIN_TCG_CARDLIST)
      if (res.retcode !== 0) {
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
      next = data.is_last === false
      offset = data.next_offset
      cardLists.card_list = [
        ...((_b = cardLists.card_list) != null ? _b : []),
        ...data.card_list,
      ]
      cardLists.is_last = data.is_last
      cardLists.next_offset = data.next_offset
      cardLists.stats = data.stats
    } while (next)
    return cardLists
  }
  /**
   * Retrieves the match data for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGMatchs>} The Genshin Impact TCG match data.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async matchs() {
    var _a
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(import_routes.GENSHIN_TCG_MATCHLIST)
    if (res.retcode !== 0) {
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
    return res.data
  }
  /**
   * Retrieves the challenge schedule for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGScheduleBasic[]>} The Genshin Impact TCG challenge schedule.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeSchedule() {
    var _a
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(import_routes.GENSHIN_TCG_CHALLANGE_SCHEDULE)
    if (res.retcode !== 0) {
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
    return res.data.schedule_list
  }
  /**
   * Retrieves the challenge record for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGRecord>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeRecord(schedule_id) {
    var _a
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
        schedule_id,
      })
      .setDs(true)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(import_routes.GENSHIN_TCG_CHALLANGE_RECORD)
    if (res.retcode !== 0) {
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
    return res.data
  }
  /**
   * Retrieves the challenge deck for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGDeck>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @param deck_id Deck ID from {@link GenshinTCGModule.challengeRecord | GenshinTCGModule.challengeRecord()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challangeDeck(schedule_id, deck_id) {
    var _a
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
        schedule_id,
        deck_id,
      })
      .setDs(true)
    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(import_routes.GENSHIN_TCG_CHALLANGE_DECK)
    if (res.retcode !== 0) {
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
    return res.data
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    GenshinTCGModule,
  })
