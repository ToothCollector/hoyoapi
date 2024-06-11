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
var redeem_exports = {}
__export(redeem_exports, {
  RedeemModule: () => RedeemModule,
})
module.exports = __toCommonJS(redeem_exports)
var import_error = require('../../error')
var import_routes = require('../../routes')
class RedeemModule {
  /**
   * Constructs a new RedeemModule object.
   * @param request - The Request object used for making HTTP requests.
   * @param lang - The language to use for the API response.
   * @param game - The game to redeem the code for.
   * @param region - The region of the user's account. If null, the API will use the default region for the game.
   * @param uid - The user ID of the account. If null, the API will use the user ID associated with the provided auth cookies.
   */
  constructor(request, lang, game, region, uid) {
    this.request = request
    this.lang = lang
    this.game = game
    this.region = region
    this.uid = uid
  }
  /**
   * Redeems a code for a specific game and account.
   *
   * @param code - The code to redeem.
   * @returns A promise that resolves to an IRedeemCode object containing information about the redemption status.
   * @throws HoyoAPIError if the API returns an error.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async claim(code) {
    if (!this.region || !this.uid) {
      throw new import_error.HoyoAPIError(
        'UID parameter is missing or failed to be filled',
      )
    }
    this.request.setQueryParams({
      uid: this.uid,
      region: this.region,
      game_biz: this.game,
      cdkey: code.replace(/\uFFFD/g, ''),
      lang: this.lang.toString().split('-')[0],
      sLangKey: this.lang,
    })
    const { response } = await this.request.send(
      import_routes.REDEEM_CLAIM_API,
      'GET',
      0,
    )
    return response
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    RedeemModule,
  })
