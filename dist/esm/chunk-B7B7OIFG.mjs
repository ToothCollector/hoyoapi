import {
  DailyModule,
  RedeemModule
} from "./chunk-KZPN3JWN.mjs";
import {
  Cookie,
  DEFAULT_REFERER,
  GENSHIN_DIARY_DETAIL_API,
  GENSHIN_DIARY_LIST_API,
  GENSHIN_RECORD_AVATAR_BASIC_INFO_API,
  GENSHIN_RECORD_CHARACTER_API,
  GENSHIN_RECORD_DAILY_NOTE_API,
  GENSHIN_RECORD_INDEX_API,
  GENSHIN_RECORD_SPIRAL_ABYSS_API,
  GENSHIN_TCG_BASICINFO,
  GENSHIN_TCG_CARDLIST,
  GENSHIN_TCG_CHALLANGE_DECK,
  GENSHIN_TCG_CHALLANGE_RECORD,
  GENSHIN_TCG_CHALLANGE_SCHEDULE,
  GENSHIN_TCG_MATCHLIST,
  HTTPRequest,
  HoyoAPIError,
  Hoyolab,
  Language,
  __publicField
} from "./chunk-IJYVZ3TE.mjs";

// src/client/gi/gi.interface.ts
var GenshinRegion = /* @__PURE__ */ ((GenshinRegion2) => {
  GenshinRegion2["USA"] = "os_usa";
  GenshinRegion2["EUROPE"] = "os_euro";
  GenshinRegion2["ASIA"] = "os_asia";
  GenshinRegion2["CHINA_TAIWAN"] = "os_cht";
  return GenshinRegion2;
})(GenshinRegion || {});

// src/client/gi/gi.helper.ts
function getGenshinRegion(uid) {
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
  return GenshinRegion[key];
}

// src/client/gi/record/record.enum.ts
var SpiralAbyssScheduleEnum = /* @__PURE__ */ ((SpiralAbyssScheduleEnum2) => {
  SpiralAbyssScheduleEnum2[SpiralAbyssScheduleEnum2["CURRENT"] = 1] = "CURRENT";
  SpiralAbyssScheduleEnum2[SpiralAbyssScheduleEnum2["PREVIOUS"] = 2] = "PREVIOUS";
  return SpiralAbyssScheduleEnum2;
})(SpiralAbyssScheduleEnum || {});

// src/client/gi/record/record.ts
var GenshinRecordModule = class {
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
    this.request = request;
    this.lang = lang;
    this.region = region;
    this.uid = uid;
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
      headers,
      body,
      params
    } = await this.request.send(GENSHIN_RECORD_INDEX_API);
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
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setBody({
      server: this.region,
      role_id: this.uid
    }).setDs(true);
    const {
      response: res,
      headers,
      body,
      params
    } = await this.request.send(GENSHIN_RECORD_CHARACTER_API, "POST");
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
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setBody({
      character_ids: characterIds,
      role_id: this.uid,
      server: this.region
    }).setDs();
    const {
      response: res,
      headers,
      body,
      params
    } = await this.request.send(GENSHIN_RECORD_AVATAR_BASIC_INFO_API, "POST");
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
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType - The schedule type of the Abyss, either CURRENT or PREVIOUS.
   * @returns A Promise that resolves with an object containing the player's Spiral Abyss data.
   * @throws {HoyoAPIError} if UID parameter is missing or failed to be filled, or if the given scheduleType parameter is invalid.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async spiralAbyss(scheduleType = 1 /* CURRENT */) {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    if (Object.values(SpiralAbyssScheduleEnum).includes(scheduleType) === false) {
      throw new HoyoAPIError("The given scheduleType parameter is invalid !");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      schedule_type: scheduleType
    }).setDs();
    const {
      response: res,
      headers,
      body,
      params
    } = await this.request.send(GENSHIN_RECORD_SPIRAL_ABYSS_API);
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
   * Retrieve the daily note information for a Genshin Impact user.
   * @returns {Promise<IGenshinDailyNote>} The daily note information.
   * @throws {HoyoAPIError} if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  async dailyNote() {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid
    }).setDs();
    const {
      response: res,
      headers,
      body,
      params
    } = await this.request.send(GENSHIN_RECORD_DAILY_NOTE_API);
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

// src/client/gi/diary/diary.interface.ts
var currentMonth = (/* @__PURE__ */ new Date()).getMonth();
var oneMonthAgo = /* @__PURE__ */ new Date();
oneMonthAgo.setMonth(currentMonth - 1);
var twoMonthAgo = /* @__PURE__ */ new Date();
twoMonthAgo.setMonth(currentMonth - 2);
var DiaryMonthEnum = ((DiaryMonthEnum2) => {
  DiaryMonthEnum2[DiaryMonthEnum2["CURRENT"] = currentMonth + 1] = "CURRENT";
  DiaryMonthEnum2[DiaryMonthEnum2["ONE_MONTH_AGO"] = oneMonthAgo.getMonth() + 1] = "ONE_MONTH_AGO";
  DiaryMonthEnum2[DiaryMonthEnum2["TWO_MONTH_AGO"] = twoMonthAgo.getMonth() + 1] = "TWO_MONTH_AGO";
  return DiaryMonthEnum2;
})(DiaryMonthEnum || {});
var DiaryEnum = /* @__PURE__ */ ((DiaryEnum3) => {
  DiaryEnum3[DiaryEnum3["PRIMOGEMS"] = 1] = "PRIMOGEMS";
  DiaryEnum3[DiaryEnum3["MORA"] = 2] = "MORA";
  return DiaryEnum3;
})(DiaryEnum || {});

// src/client/gi/diary/diary.ts
var GenshinDiaryModule = class {
  /**
   * Constructs a DiaryModule instance
   *
   * @param request - An instance of the Request class to make HTTP requests
   * @param lang - A LanguageEnum value for the language of the user
   * @param region - A string value for the region of the user
   * @param uid - A number value for the UID of the user
   */
  constructor(request, lang, region, uid) {
    this.request = request;
    this.lang = lang;
    this.region = region;
    this.uid = uid;
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
  async list(month = DiaryMonthEnum.CURRENT) {
    var _a;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyoAPIError("The given month parameter is invalid !");
    }
    this.request.setQueryParams({
      region: this.region,
      uid: this.uid,
      month,
      lang: this.lang
    }).setDs();
    const {
      response: res,
      params,
      body,
      headers
    } = await this.request.send(GENSHIN_DIARY_LIST_API);
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
  async detail(type, month = DiaryMonthEnum.CURRENT) {
    var _a, _b;
    if (!this.region || !this.uid) {
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    if (Object.values(DiaryMonthEnum).includes(month) === false) {
      throw new HoyoAPIError("The given month parameter is invalid !");
    }
    if (Object.values(DiaryEnum).includes(type) === false) {
      throw new HoyoAPIError("The given type parameter is invalid !");
    }
    const responses = {};
    let page = 1;
    let next = true;
    do {
      this.request.setQueryParams({
        region: this.region,
        uid: this.uid,
        month,
        type,
        current_page: page,
        page_size: 100,
        lang: this.lang
      }).setDs();
      const {
        response: res,
        params,
        body,
        headers
      } = await this.request.send(GENSHIN_DIARY_DETAIL_API);
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
      responses.uid = data.uid;
      responses.region = data.region;
      responses.optional_month = data.optional_month;
      responses.nickname = data.nickname;
      responses.data_month = data.data_month;
      responses.current_page = data.current_page;
      responses.list = [...(_b = responses.list) != null ? _b : [], ...data.list];
      if (data.list.length < 1) {
        next = false;
      }
      page++;
    } while (next);
    responses.list.sort((a, b) => {
      const keyA = new Date(a.time);
      const keyB = new Date(b.time);
      if (keyA < keyB)
        return -1;
      if (keyA > keyB)
        return 1;
      return 0;
    });
    return responses;
  }
};

// src/client/gi/tcg/tcg.ts
var GenshinTCGModule = class {
  /**
   * Creates an instance of the GenshinTCGModule.
   * @param request - The HTTP request object.
   * @param lang - The language enumeration for the module.
   * @param region - The region string or null.
   * @param uid - The UID number or null.
   */
  constructor(request, lang, region, uid) {
    this.request = request;
    this.lang = lang;
    this.region = region;
    this.uid = uid;
  }
  /**
   * Retrieves basic information for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGBasicInfo>} The Genshin Impact TCG basic information.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async basicInfo() {
    var _a;
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(GENSHIN_TCG_BASICINFO);
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
   * Retrieves the cards for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGCards>} The Genshin Impact TCG cards.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async cards() {
    var _a, _b;
    const perPage = 100;
    let next = true;
    let offset = 0;
    const cardLists = {};
    do {
      this.request.setQueryParams({
        server: this.region,
        role_id: this.uid,
        need_avatar: "true",
        need_action: "true",
        need_stats: "true",
        offset,
        limit: perPage
      }).setDs(true);
      const {
        response: res,
        body,
        headers,
        params
      } = await this.request.send(GENSHIN_TCG_CARDLIST);
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
      next = data.is_last === false;
      offset = data.next_offset;
      cardLists.card_list = [...(_b = cardLists.card_list) != null ? _b : [], ...data.card_list];
      cardLists.is_last = data.is_last;
      cardLists.next_offset = data.next_offset;
      cardLists.stats = data.stats;
    } while (next);
    return cardLists;
  }
  /**
   * Retrieves the match data for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGMatchs>} The Genshin Impact TCG match data.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async matchs() {
    var _a;
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(GENSHIN_TCG_MATCHLIST);
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
   * Retrieves the challenge schedule for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGScheduleBasic[]>} The Genshin Impact TCG challenge schedule.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeSchedule() {
    var _a;
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang
    }).setDs(true);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_SCHEDULE);
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
    return res.data.schedule_list;
  }
  /**
   * Retrieves the challenge record for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGRecord>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeRecord(schedule_id) {
    var _a;
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang,
      schedule_id
    }).setDs(true);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_RECORD);
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
   * Retrieves the challenge deck for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGDeck>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @param deck_id Deck ID from {@link GenshinTCGModule.challengeRecord | GenshinTCGModule.challengeRecord()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challangeDeck(schedule_id, deck_id) {
    var _a;
    this.request.setQueryParams({
      server: this.region,
      role_id: this.uid,
      lang: this.lang,
      schedule_id,
      deck_id
    }).setDs(true);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_DECK);
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

// src/client/gi/gi.ts
var GenshinImpact = class _GenshinImpact {
  /**
   * Constructs a new `Genshin` object.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options) {
    /**
     * The `DailyModule` object provides an interface to interact with the daily check-in feature in Genshin Impact.
     *
     */
    __publicField(this, "daily");
    /**
     * The `RedeemModule` object provides an interface to interact with the code redemption feature in Genshin Impact.
     *
     */
    __publicField(this, "redeem");
    /**
     * The `GenshinRecordModule` object provides an interface to interact with the user record feature in Genshin Impact.
     *
     */
    __publicField(this, "record");
    /**
     * The `GenshinDiaryModule` object provides an interface to interact with the user diary feature in Genshin Impact.
     *
     */
    __publicField(this, "diary");
    /**
     * The `GenshinTCGModule` object provides an interface to interact with the user diary feature in Genshin Impact.
     *
     */
    __publicField(this, "tcg");
    /**
     * HoyYolab account object
     *
     */
    __publicField(this, "_account", null);
    /**
     * The cookie object to be used in requests.
     */
    __publicField(this, "cookie");
    /**
     * The `Request` object used to make requests.
     */
    __publicField(this, "request");
    /**
     * The UID of the user, if available.
     */
    __publicField(this, "uid");
    /**
     * The region of the user, if available.
     */
    __publicField(this, "region");
    /**
     * The language to be used in requests.
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
    this.region = this.uid !== null ? getGenshinRegion(this.uid) : null;
    this.lang = options.lang;
    this.daily = new DailyModule(
      this.request,
      this.lang,
      "hk4e_global" /* GENSHIN_IMPACT */,
      this.region
    );
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      "hk4e_global" /* GENSHIN_IMPACT */,
      this.region,
      this.uid
    );
    this.record = new GenshinRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid
    );
    this.diary = new GenshinDiaryModule(
      this.request,
      this.lang,
      this.region,
      this.uid
    );
    this.tcg = new GenshinTCGModule(
      this.request,
      this.lang,
      this.region,
      this.uid
    );
  }
  /**
     * Create a new instance of the GenshinImpact class asynchronously.
     *
     * @param options The options object used to configure the object.
     * @throws {HoyoAPIError} Error Wnen the CookieTokenV2 is not set.
     * @returns {Promise<GenshinImpact>} A promise that resolves with a new Genshin instance.
     *
     * @remarks
     * If an object is instantiated from this method but options.cookie.cookieTokenV2 is not set,
     * it will throw an error. This method will access an Endpoint that contains a list of game accounts,
     * which requires the cookieTokenV2 option.
  
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
        game = await hoyolab.gameAccount("hk4e_global" /* GENSHIN_IMPACT */);
        options.uid = parseInt(game.game_uid);
      }
      const gi = new _GenshinImpact(options);
      gi.account = game;
      return gi;
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
   * Get user's Genshin Impact record
   *
   * @alias {@link GenshinImpact.record | Genshin.record.records()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.records()} instead
   */
  async records() {
    return this.record.records();
  }
  /**
   * Retrieves the Genshin characters of the user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.characters()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.characters()} instead
   */
  async characters() {
    return this.record.characters();
  }
  /**
   * Returns the summary information of Genshin Impact game characters
   *
   * @param characterIds number[] Characters ID
   * @alias {@link GenshinImpact.record | Genshin.record.charactersSummary()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.charactersSummary()} instead
   */
  async charactersSummary(characterIds) {
    return this.record.charactersSummary(characterIds);
  }
  /**
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType SpiralAbyssScheduleEnum
   * @alias {@link GenshinImpact.record | Genshin.record.spiralAbyss()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.spiralAbyss()} instead
   */
  async spiralAbyss(scheduleType = 1 /* CURRENT */) {
    return this.record.spiralAbyss(scheduleType);
  }
  /**
   * Retrieve the daily note information for a Genshin Impact user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.dailyNote()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.dailyNote()} instead
   */
  async dailyNote() {
    return this.record.dailyNote();
  }
  /**
   * Returns the diary information of a given month for a user
   *
   * @param month
   * @alias {@link GenshinImpact.diary | Genshin.diary.list()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.list()} instead
   */
  async diaryList(month = DiaryMonthEnum.CURRENT) {
    return this.diary.list(month);
  }
  /**
   * Returns the diary details of a given type and month for a user
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @alias {@link GenshinImpact.diary | Genshin.diary.detail()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.detail()} instead
   */
  async diaryDetail(type, month = DiaryMonthEnum.CURRENT) {
    return this.diary.detail(type, month);
  }
  /**
   * Retrieves daily information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.info()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.info()} instead
   */
  dailyInfo() {
    return this.daily.info();
  }
  /**
   * Retrieve daily rewards information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.rewards()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.rewards()} instead
   */
  dailyRewards() {
    return this.daily.rewards();
  }
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param day number | null
   * @alias {@link GenshinImpact.daily | Genshin.daily.reward()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.reward()} instead
   */
  dailyReward(day = null) {
    return this.daily.reward(day);
  }
  /**
   * Claim current reward
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.claim()} instead
   */
  dailyClaim() {
    return this.daily.claim();
  }
  /**
   * Redeems a code for a specific account.
   *
   * @param code string
   * @alias {@link GenshinImpact.daily | Genshin.redeem.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.redeem.claim()} instead
   */
  redeemCode(code) {
    return this.redeem.claim(code);
  }
};

export {
  GenshinRegion,
  getGenshinRegion,
  SpiralAbyssScheduleEnum,
  GenshinRecordModule,
  DiaryMonthEnum,
  DiaryEnum,
  GenshinDiaryModule,
  GenshinTCGModule,
  GenshinImpact
};
