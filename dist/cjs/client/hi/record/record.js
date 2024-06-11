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
  HIRecordModule: () => HIRecordModule,
})
module.exports = __toCommonJS(record_exports)
var import_error = require('../../../error')
var import_routes = require('../../../routes')
class HIRecordModule {
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
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHIRecord>} A Promise that resolves to the HI record object.
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
      params,
      body,
      headers,
    } = await this.request.send(import_routes.HI_RECORD_INDEX_API)
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
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHICharacter[]>} A Promise that resolves to an array of HI characters.
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
      params,
      body,
      headers,
    } = await this.request.send(import_routes.HI_RECORD_CHARACTER_API)
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
    return res.data.characters
  }
  /**
   * Retrieves the abyss information associated with the provided region and UID.
   *
   * @returns {Promise<IHIAbyss>} A Promise that resolves to the HI abyss information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async abyss() {
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
      params,
      body,
      headers,
    } = await this.request.send(import_routes.HI_RECORD_ABYSS_API)
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
   * Retrieves the arena information associated with the provided region and UID.
   *
   * @returns {Promise<IHIArena>} A Promise that resolves to the HI arena information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async arena() {
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
      params,
      body,
      headers,
    } = await this.request.send(import_routes.HI_RECORD_ARENA_API)
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
   * Retrieves the elysian information associated with the provided region and UID.
   *
   * @returns {Promise<IHIElysian>} A Promise that resolves to the HI elysian information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async elysian() {
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
      params,
      body,
      headers,
    } = await this.request.send(import_routes.HI_RECORD_ELYSIAN_API)
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
    HIRecordModule,
  })
