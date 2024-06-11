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
var record_exports = {}
__export(record_exports, {
  GenshinRecordModule: () => GenshinRecordModule,
})
module.exports = __toCommonJS(record_exports)
var import_error = require('../../../error')
var import_routes = require('../../../routes')
var import_record = require('./record.enum')
class GenshinRecordModule {
  /**
   * Creates an instance of GenshinRecordModule.
   *
   * @constructor
   * @param {HTTPRequest} request - An instance of Request class.
   * @param {LanguageEnum} lang - The language code to be used in requests.
   * @param {string | null} region - The server region code in which the user's account resides.
   * @param {number | null} uid - The user ID of the Genshin Impact account.
   */
  constructor(request, lang, region, uid) {
    this.request = request
    this.lang = lang
    this.region = region
    this.uid = uid
  }
  /**
   * Get user's Genshin Impact record
   *
   * @async
   * @function
   * @returns {Promise<IGenshinRecord>} - User's Genshin Impact record
   * @throws {HoyoAPIError} If UID parameter is missing or failed to be filled
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async records() {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)
    const {
      response: res,
      headers,
      body,
      params,
    } = await this.request.send(import_routes.GENSHIN_RECORD_INDEX_API)
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
   *
   * Retrieves the Genshin characters of the user.
   *
   * @async
   * @returns {Promise<IGenshinCharacters>} A Promise that contains the Genshin characters object.
   * @throws {HoyoAPIError} If UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async characters() {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    this.request
      .setBody({
        server: this.region,
        role_id: this.uid,
      })
      .setDs(true)
    const {
      response: res,
      headers,
      body,
      params,
    } = await this.request.send(
      import_routes.GENSHIN_RECORD_CHARACTER_API,
      'POST',
    )
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
   * Returns the summary information of Genshin Impact game characters.
   *
   * @param characterIds - An array of character IDs to retrieve the summary information for.
   * @returns {Promise<IGenshinCharacterSummary>} A Promise that resolves to an object containing the summary information of the characters.
   * @throws Throws an error if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async charactersSummary(characterIds) {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    this.request
      .setBody({
        character_ids: characterIds,
        role_id: this.uid,
        server: this.region,
      })
      .setDs()
    const {
      response: res,
      headers,
      body,
      params,
    } = await this.request.send(
      import_routes.GENSHIN_RECORD_AVATAR_BASIC_INFO_API,
      'POST',
    )
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
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType - The schedule type of the Abyss, either CURRENT or PREVIOUS.
   * @returns A Promise that resolves with an object containing the player's Spiral Abyss data.
   * @throws {HoyoAPIError} if UID parameter is missing or failed to be filled, or if the given scheduleType parameter is invalid.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async spiralAbyss(
    scheduleType = import_record.SpiralAbyssScheduleEnum.CURRENT,
  ) {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    if (
      Object.values(import_record.SpiralAbyssScheduleEnum).includes(
        scheduleType,
      ) === false
    ) {
      throw new import_error.HoyoAPIError(
        'The given scheduleType parameter is invalid !',
      )
    }
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        schedule_type: scheduleType,
      })
      .setDs()
    const {
      response: res,
      headers,
      body,
      params,
    } = await this.request.send(import_routes.GENSHIN_RECORD_SPIRAL_ABYSS_API)
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
   * Retrieve the daily note information for a Genshin Impact user.
   * @returns {Promise<IGenshinDailyNote>} The daily note information.
   * @throws {HoyoAPIError} if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async dailyNote() {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
      })
      .setDs()
    const {
      response: res,
      headers,
      body,
      params,
    } = await this.request.send(import_routes.GENSHIN_RECORD_DAILY_NOTE_API)
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
    GenshinRecordModule,
  })
