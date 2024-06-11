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
var error_exports = {}
__export(error_exports, {
  HoyoAPIError: () => HoyoAPIError,
})
module.exports = __toCommonJS(error_exports)
class HoyoAPIError extends Error {
  /**
   * Constructs a new instance of the HoyolabError class with the specified message.
   *
   * @param message The message to associate with this error.
   */
  constructor(message, code, http) {
    super(message)
    /**
     * The name of this error.
     */
    __publicField(this, 'name')
    /**
     * The message associated with this error.
     */
    __publicField(this, 'message')
    /**
     * The HTTP object
     */
    __publicField(this, 'http')
    /**
     * The error code
     */
    __publicField(this, 'code')
    this.name = this.constructor.name
    this.message = message
    this.code = code
    this.http = http
    Error.captureStackTrace(this, this.constructor)
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    HoyoAPIError,
  })
