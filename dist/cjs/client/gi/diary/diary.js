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
var diary_exports = {}
__export(diary_exports, {
  GenshinDiaryModule: () => GenshinDiaryModule,
})
module.exports = __toCommonJS(diary_exports)
var import_error = require('../../../error')
var import_routes = require('../../../routes')
var import_diary = require('./diary.interface')
class GenshinDiaryModule {
  /**
   * Constructs a DiaryModule instance
   *
   * @param request - An instance of the Request class to make HTTP requests
   * @param lang - A LanguageEnum value for the language of the user
   * @param region - A string value for the region of the user
   * @param uid - A number value for the UID of the user
   */
  constructor(request, lang, region, uid) {
    this.request = request
    this.lang = lang
    this.region = region
    this.uid = uid
  }
  /**
   * Returns the diary information of a given month for a user
   *
   * @param month - A DiaryMonthEnum value for the month of the diary information requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryInfo object
   * @throws {@link HoyoAPIError} when the uid or region parameter is missing or invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async list(month = import_diary.DiaryMonthEnum.CURRENT) {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    if (Object.values(import_diary.DiaryMonthEnum).includes(month) === false) {
      throw new import_error.HoyoAPIError(
        'The given month parameter is invalid !',
      )
    }
    this.request
      .setQueryParams({
        region: this.region,
        uid: this.uid,
        month,
        lang: this.lang,
      })
      .setDs()
    const {
      response: res,
      params,
      body,
      headers,
    } = await this.request.send(import_routes.GENSHIN_DIARY_LIST_API)
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
   * Returns the diary details of a given type and month for a user
   *
   * @param type - A DiaryEnum value for the type of diary details requested
   * @param month - A DiaryMonthEnum value for the month of the diary details requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryDetail object
   * @throws {@link HoyoAPIError} when the uid or region parameter is missing or invalid, or when the type or month parameter is invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async detail(type, month = import_diary.DiaryMonthEnum.CURRENT) {
    var _a, _b
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    if (Object.values(import_diary.DiaryMonthEnum).includes(month) === false) {
      throw new import_error.HoyoAPIError(
        'The given month parameter is invalid !',
      )
    }
    if (Object.values(import_diary.DiaryEnum).includes(type) === false) {
      throw new import_error.HoyoAPIError(
        'The given type parameter is invalid !',
      )
    }
    const responses = {}
    let page = 1
    let next = true
    do {
      this.request
        .setQueryParams({
          region: this.region,
          uid: this.uid,
          month,
          type,
          current_page: page,
          page_size: 100,
          lang: this.lang,
        })
        .setDs()
      const {
        response: res,
        params,
        body,
        headers,
      } = await this.request.send(import_routes.GENSHIN_DIARY_DETAIL_API)
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
      responses.uid = data.uid
      responses.region = data.region
      responses.optional_month = data.optional_month
      responses.nickname = data.nickname
      responses.data_month = data.data_month
      responses.current_page = data.current_page
      responses.list = [
        ...((_b = responses.list) != null ? _b : []),
        ...data.list,
      ]
      if (data.list.length < 1) {
        next = false
      }
      page++
    } while (next)
    responses.list.sort((a, b) => {
      const keyA = new Date(a.time)
      const keyB = new Date(b.time)
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })
    return responses
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    GenshinDiaryModule,
  })
