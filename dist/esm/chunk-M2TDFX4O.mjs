import {
  DailyModule,
  RedeemModule
} from "./chunk-KZPN3JWN.mjs";
import {
  Cookie,
  DEFAULT_REFERER,
  HI_RECORD_ABYSS_API,
  HI_RECORD_ARENA_API,
  HI_RECORD_CHARACTER_API,
  HI_RECORD_ELYSIAN_API,
  HI_RECORD_INDEX_API,
  HTTPRequest,
  HoyoAPIError,
  Hoyolab,
  Language,
  __publicField
} from "./chunk-IJYVZ3TE.mjs";

// src/client/hi/hi.interface.ts
var HonkaiRegion = /* @__PURE__ */ ((HonkaiRegion2) => {
  HonkaiRegion2["USA"] = "usa01";
  HonkaiRegion2["EUROPE"] = "eur01";
  HonkaiRegion2["ASIA"] = "overseas01";
  return HonkaiRegion2;
})(HonkaiRegion || {});

// src/client/hi/hi.helper.ts
function getHi3Region(uid) {
  let key;
  if (uid > 1e7 && uid < 1e8) {
    key = "ASIA";
  } else if (uid > 1e8 && uid < 2e8) {
    key = "USA";
  } else if (uid > 2e8 && uid < 3e8) {
    key = "EURO";
  } else {
    throw new HoyoAPIError("Given UID ".concat(uid, " is invalid !"));
  }
  return HonkaiRegion[key];
}

// src/client/hi/record/record.ts
var HIRecordModule = class {
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
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHIRecord>} A Promise that resolves to the HI record object.
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
      params,
      body,
      headers
    } = await this.request.send(HI_RECORD_INDEX_API);
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
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHICharacter[]>} A Promise that resolves to an array of HI characters.
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
      params,
      body,
      headers
    } = await this.request.send(HI_RECORD_CHARACTER_API);
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
    return res.data.characters;
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
      params,
      body,
      headers
    } = await this.request.send(HI_RECORD_ABYSS_API);
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
      params,
      body,
      headers
    } = await this.request.send(HI_RECORD_ARENA_API);
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
      params,
      body,
      headers
    } = await this.request.send(HI_RECORD_ELYSIAN_API);
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

// src/client/hi/hi.ts
var HonkaiImpact = class _HonkaiImpact {
  /**
   * Create a new instance of HonkaiImpact.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options) {
    /**
     * The Daily module for the Honkai Impact 3rd game.
     *
     */
    __publicField(this, "daily");
    /**
     * The Redeem module for the Honkai Impact 3rd game.
     *
     * @public
     * @readonly
     */
    __publicField(this, "redeem");
    /**
     * The `HIRecordModule` object provides an interface to interact with the user record feature in Honkai Star Rails.
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
     * The UID of the Honkai Impact 3rd account.
     *
     */
    __publicField(this, "uid");
    /**
     * The region of the Honkai Impact 3rd account.
     *
     */
    __publicField(this, "region");
    /**
     * The language of the Honkai Impact 3rd account.
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
    this.region = this.uid !== null ? getHi3Region(this.uid) : null;
    this.lang = options.lang;
    this.daily = new DailyModule(
      this.request,
      this.lang,
      "bh3_global" /* HONKAI_IMPACT */,
      this.region
    );
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      "bh3_global" /* HONKAI_IMPACT */,
      this.region,
      this.uid
    );
    this.record = new HIRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid
    );
  }
  /**
   * Create a new instance of HonkaiImpact using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @param options The options object used to configure the object.
   * @throws {HoyoAPIError} Error Wnen the CookieTokenV2 is not set.
   * @returns {Promise<HonkaiImpact>} - A promise that resolves with a new HonkaiImpact instance.
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
    try {
      let game = null;
      if (typeof options.uid === "undefined") {
        const hoyolab = new Hoyolab({
          cookie: options.cookie
        });
        game = await hoyolab.gameAccount("bh3_global" /* HONKAI_IMPACT */);
        options.uid = parseInt(game.game_uid);
        options.region = getHi3Region(parseInt(game.game_uid));
      }
      const hi = new _HonkaiImpact(options);
      hi.account = game;
      return hi;
    } catch (error) {
      throw new HoyoAPIError(error.message, error.code);
    }
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
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.info() } instead
   */
  dailyInfo() {
    return this.daily.info();
  }
  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.rewards() } instead
   */
  dailyRewards() {
    return this.daily.rewards();
  }
  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.reward() } instead
   */
  dailyReward(day = null) {
    return this.daily.reward(day);
  }
  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.claim() } instead
   */
  dailyClaim() {
    return this.daily.claim();
  }
  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiImpact.redeem | HonkaiImpact.redeem.claim() } instead
   */
  redeemCode(code) {
    return this.redeem.claim(code);
  }
};

export {
  HonkaiRegion,
  getHi3Region,
  HIRecordModule,
  HonkaiImpact
};
