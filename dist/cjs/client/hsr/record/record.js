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
  HSRRecordModule: () => HSRRecordModule,
})
module.exports = __toCommonJS(record_exports)
var import_error = require('../../../error')
var import_routes = require('../../../routes')
var import_record = require('./record.enum')
class HSRRecordModule {
  /**
   * Creates an instance of HSRRecordModule.
   *
   * @param request The HTTPRequest object used for making API requests.
   * @param lang The language enum value.
   * @param region The region string or null if not provided.
   * @param uid The UID number or null if not provided.
   */
  constructor(request, lang, region, uid) {
    this.request = request
    this.lang = lang
    this.region = region
    this.uid = uid
  }
  /**
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHSRCharacterFull[]>} A Promise that resolves to an array of full HSR characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async characters() {
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
      body,
      params,
      headers,
    } = await this.request.send(import_routes.HSR_RECORD_CHARACTER_API)
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
    return data.avatar_list
  }
  /**
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHSRRecord>} A Promise that resolves to the HSR record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
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
      body,
      params,
      headers,
    } = await this.request.send(import_routes.HSR_RECORD_INDEX_API)
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
   * Retrieves the note associated with the provided region and UID.
   *
   * @returns {Promise<IHSRNote>} A Promise that resolves to the HSR note object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async note() {
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
      body,
      params,
      headers,
    } = await this.request.send(import_routes.HSR_RECORD_NOTE_API)
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
   * Retrieves the forgotten hall information associated with the provided region and UID.
   *
   * @param scheduleType The schedule type for the forgotten hall (optional, defaults to CURRENT).
   * @returns {Promise<IHSRForgottenHall>} A Promise that resolves to the forgotten hall information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if the given scheduleType parameter is invalid.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async forgottenHall(
    scheduleType = import_record.ForgottenHallScheduleEnum.CURRENT,
  ) {
    var _a
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    if (
      Object.values(import_record.ForgottenHallScheduleEnum).includes(
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
        lang: this.lang,
        need_all: 'true',
      })
      .setDs()
    const {
      response: res,
      body,
      params,
      headers,
    } = await this.request.send(import_routes.HSR_RECORD_FORGOTTEN_HALL_API)
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
    HSRRecordModule,
  })
