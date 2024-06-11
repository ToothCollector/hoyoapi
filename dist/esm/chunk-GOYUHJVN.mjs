import {
  DailyModule,
  RedeemModule
} from "./chunk-O7Y6XAYI.mjs";
import {
  Cookie,
  DEFAULT_REFERER,
  HSR_RECORD_CHARACTER_API,
  HSR_RECORD_FORGOTTEN_HALL_API,
  HSR_RECORD_INDEX_API,
  HSR_RECORD_NOTE_API,
  HTTPRequest,
  HoyoAPIError,
  Hoyolab,
  Language,
  __publicField
} from "./chunk-EYDYS746.mjs";

// src/client/hsr/hsr.interface.ts
var HsrRegion = /* @__PURE__ */ ((HsrRegion2) => {
  HsrRegion2["USA"] = "prod_official_usa";
  HsrRegion2["EUROPE"] = "prod_official_eur";
  HsrRegion2["ASIA"] = "prod_official_asia";
  HsrRegion2["CHINA_TAIWAN"] = "prod_official_cht";
  return HsrRegion2;
})(HsrRegion || {});

// src/client/hsr/hsr.helper.ts
function getHsrRegion(uid) {
  const server_region = Number(uid.toString().trim().slice(0, 1));
  let key;
  switch (server_region) {
    case 6:
      key = "USA";
      break;
    case 7:
      key = "EUROPE";
      break;
    case 8:
      key = "ASIA";
      break;
    case 9:
      key = "CHINA_TAIWAN";
      break;
    default:
      throw new HoyoAPIError("Given UID ".concat(uid, " is invalid !"));
  }
  return HsrRegion[key];
}

// src/client/hsr/record/record.enum.ts
var ForgottenHallScheduleEnum = /* @__PURE__ */ ((ForgottenHallScheduleEnum2) => {
  ForgottenHallScheduleEnum2[ForgottenHallScheduleEnum2["CURRENT"] = 1] = "CURRENT";
  ForgottenHallScheduleEnum2[ForgottenHallScheduleEnum2["PREVIOUS"] = 2] = "PREVIOUS";
  return ForgottenHallScheduleEnum2;
})(ForgottenHallScheduleEnum || {});

// src/client/hsr/record/record.ts
var HSRRecordModule = class {
  /**
   * Creates an instance of HSRRecordModule.
   *
   * @param request The HTTPRequest object used for making API requests.
   * @param lang The language enum value.
   * @param region The region string or null if not provided.
   * @param uid The UID number or null if not provided.
   */
  constructor(request, lang, region, uid) {
    this.request = request;
    this.lang = lang;
    this.region = region;
    this.uid = uid;
  }
  /**
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHSRCharacterFull[]>} A Promise that resolves to an array of full HSR characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async characters() {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      params,
      headers
    } = await this.request.send(HSR_RECORD_CHARACTER_API);
    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        (_a = res.message) != null ? _a : "Failed to retrieve data, please double-check the provided UID.",
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params
          }
        }
      );
    }
    const data = res.data;
    return data.avatar_list;
  }
  /**
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHSRRecord>} A Promise that resolves to the HSR record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async records() {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      params,
      headers
    } = await this.request.send(HSR_RECORD_INDEX_API);
    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        (_a = res.message) != null ? _a : "Failed to retrieve data, please double-check the provided UID.",
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params
          }
        }
      );
    }
    return res.data;
  }
  /**
   * Retrieves the note associated with the provided region and UID.
   *
   * @returns {Promise<IHSRNote>} A Promise that resolves to the HSR note object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async note() {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      params,
      headers
    } = await this.request.send(HSR_RECORD_NOTE_API);
    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        (_a = res.message) != null ? _a : "Failed to retrieve data, please double-check the provided UID.",
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params
          }
        }
      );
    }
    return res.data;
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
  async forgottenHall(scheduleType = 1 /* CURRENT */) {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    if (Object.values(ForgottenHallScheduleEnum).includes(scheduleType) === false) {
      throw new HoyoAPIError("The given scheduleType parameter is invalid !");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      schedule_type: scheduleType,
      lang: this.lang,
      need_all: "true"
    }).setDs();
    const {
      response: res,
      body,
      params,
      headers
    } = await this.request.send(HSR_RECORD_FORGOTTEN_HALL_API);
    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        (_a = res.message) != null ? _a : "Failed to retrieve data, please double-check the provided UID.",
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params
          }
        }
      );
    }
    return res.data;
  }
};

// src/client/hsr/hsr.ts
var HonkaiStarRail = class _HonkaiStarRail {
  /**
   * Create a new instance of HonkaiStarRail.
   *
   * @constructor
   * @param {IHsrOptions} options - The options for the HonkaiStarRail instance.
   */
  constructor(options) {
    /**
     * The Daily module for the Honkai Star Rail game.
     *
     */
    __publicField(this, "daily");
    /**
     * The Redeem module for the Honkai Star Rail game.
     *
     */
    __publicField(this, "redeem");
    /**
     * The `HSRRecordModule` object provides an interface to interact with the user record feature in Honkai Star Rails.
     *
     */
    __publicField(this, "record");
    /**
     * The cookie used for authentication.
     *
     */
    __publicField(this, "cookie");
    /**
     * The request object used to make HTTP requests.
     *
     */
    __publicField(this, "request");
    /**
     * HoyYolab account object
     *
     */
    __publicField(this, "_account", null);
    /**
     * The UID of the Honkai Star Rail account.
     *
     */
    __publicField(this, "uid");
    /**
     * The region of the Honkai Star Rail account.
     *
     */
    __publicField(this, "region");
    /**
     * The language of the Honkai Star Rail account.
     *
     */
    __publicField(this, "lang");
    var _a;
    const cookie = typeof options.cookie === "string" ? Cookie.parseCookieString(options.cookie) : options.cookie;
    this.cookie = cookie;
    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang);
    }
    options.lang = Language.parseLang(options.lang);
    this.request = new HTTPRequest(Cookie.parseCookie(this.cookie));
    this.request.setReferer(DEFAULT_REFERER);
    this.request.setLang(options.lang);
    this.uid = (_a = options.uid) != null ? _a : null;
    this.region = this.uid !== null ? getHsrRegion(this.uid) : null;
    this.lang = options.lang;
    this.daily = new DailyModule(
      this.request,
      this.lang,
      "hkrpg_global" /* HONKAI_STAR_RAIL */,
      this.region
    );
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      "hkrpg_global" /* HONKAI_STAR_RAIL */,
      this.region,
      this.uid
    );
    this.record = new HSRRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid
    );
  }
  /**
   * Create a new instance of HonkaiStarRail using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @param {IHsrOptions} options - The options for the HonkaiStarRail instance.
   * @returns {Promise<HonkaiStarRail>} - A promise that resolves with a new HonkaiStarRail instance.
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
    let game = null;
    if (typeof options.uid === "undefined") {
      const hoyolab = new Hoyolab({
        cookie: options.cookie
      });
      game = await hoyolab.gameAccount("hkrpg_global" /* HONKAI_STAR_RAIL */);
      options.uid = parseInt(game.game_uid);
      options.region = getHsrRegion(parseInt(game.game_uid));
    }
    const hsr = new _HonkaiStarRail(options);
    hsr.account = game;
    return hsr;
  }
  /**
   * Setter for the account property. Prevents from changing the value once set
   * @param game The game object to set as the account.
   */
  set account(game) {
    if (this.account === null && game !== null) {
      this._account = game;
    }
  }
  /**
   * Getter for the account property.
   * @returns {IGame | null} The current value of the account property.
   */
  get account() {
    return this._account;
  }
  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.info() } instead
   */
  dailyInfo() {
    return this.daily.info();
  }
  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.rewards() } instead
   */
  dailyRewards() {
    return this.daily.rewards();
  }
  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.reward() } instead
   */
  dailyReward(day = null) {
    return this.daily.reward(day);
  }
  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.claim() } instead
   */
  dailyClaim() {
    return this.daily.claim();
  }
  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiStarRail.redeem | HonkaiStarRail.redeem.claim() } instead
   */
  redeemCode(code) {
    return this.redeem.claim(code);
  }
};

export {
  HsrRegion,
  getHsrRegion,
  ForgottenHallScheduleEnum,
  HSRRecordModule,
  HonkaiStarRail
};
