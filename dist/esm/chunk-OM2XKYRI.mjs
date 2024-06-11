import {
  DAILY_CLAIM_API,
  DAILY_INFO_API,
  DAILY_REWARD_API,
  HoyoAPIError,
  REDEEM_CLAIM_API,
  __publicField
} from "./chunk-Z75P442W.mjs";

// src/module/daily/daily.ts
var DailyModule = class {
  constructor(request, lang, game, region) {
    this.request = request;
    this.lang = lang;
    this.game = game;
    this.region = region;
    __publicField(this, "dailyInfoUrl");
    __publicField(this, "dailyRewardUrl");
    __publicField(this, "dailySignUrl");
    this.dailyInfoUrl = DAILY_INFO_API(game);
    this.dailyRewardUrl = DAILY_REWARD_API(game);
    this.dailySignUrl = DAILY_CLAIM_API(game);
  }
  /**
   * Retrieves daily information.
   *
   * @returns {Promise<IDailyInfo>} A promise that resolves to an IDailyInfo object.
   */
  async info() {
    var _a;
    this.request.setQueryParams({
      lang: this.lang
    }).setLang(this.lang);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(this.dailyInfoUrl);
    if (res.retcode !== 0 || !res.data) {
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
    if (typeof (data == null ? void 0 : data.first_bind) === "undefined" || (data == null ? void 0 : data.first_bind) === null) {
      data.first_bind = false;
    }
    if (typeof data.month_last_day === "undefined") {
      const today = /* @__PURE__ */ new Date();
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      data.month_last_day = today.getDate() === lastDayOfMonth;
    }
    if (typeof data.sign_cnt_missed === "undefined") {
      data.sign_cnt_missed = 0;
    }
    if (typeof data.short_sign_day === "undefined") {
      data.short_sign_day = 0;
    }
    if (data.region === "" && this.region) {
      data.region = this.region;
    }
    return data;
  }
  /**
   * Retrieve daily rewards information.
   *
   * @returns {Promise<IDailyRewards>} A promise that resolves to an IDailyRewards object.
   */
  async rewards() {
    var _a;
    this.request.setQueryParams({
      lang: this.lang
    }).setLang(this.lang);
    const {
      response: res,
      body,
      headers,
      params
    } = await this.request.send(this.dailyRewardUrl);
    if (res.retcode !== 0 || !res.data) {
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
    if (typeof data.now === "undefined") {
      data.now = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3).toString();
    }
    if (this.game === "hk4e_global" /* GENSHIN_IMPACT */) {
      data.biz = "hk4e";
    } else if (this.game === "bh3_global" /* HONKAI_IMPACT */) {
      data.biz = "hk4e";
    } else if (this.game === "hkrpg_global" /* HONKAI_STAR_RAIL */) {
      data.biz = "hkrpg";
    } else {
      data.biz = "";
    }
    if (typeof data.resign === "undefined") {
      data.resign = false;
    }
    return data;
  }
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param {number | null} day - The day to retrieve the reward for. If null, retrieve the reward for the current day.
   * @returns {Promise<IDailyReward>} - A promise that resolves with the daily reward for the specified day or the current day
   * @throws {HoyoAPIError} - If the specified day is not a valid date in the current month or if the reward for the specified day is undefined.
   */
  async reward(day = null) {
    const response = await this.rewards();
    if (day === null) {
      const now = (response == null ? void 0 : response.now) ? new Date(parseInt(response.now) * 1e3) : /* @__PURE__ */ new Date();
      day = now.getDate();
    }
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    if (!(day > 0 && day <= daysInMonth) || typeof response.awards[day - 1] === void 0) {
      throw new HoyoAPIError("".concat(day, " is not a valid date in this month."));
    }
    return {
      month: response.month,
      now: response.now,
      biz: response.biz,
      resign: response.resign,
      award: response.awards[day - 1]
    };
  }
  /**
   * Claim the daily rewards.
   *
   * @returns {Promise<IDailyClaim>} The claim information.
   */
  async claim() {
    var _a;
    this.request.setQueryParams({
      lang: this.lang
    }).setLang(this.lang);
    const { response } = await this.request.send(this.dailySignUrl, "POST", 0);
    const info = await this.info();
    const reward = await this.reward();
    if (response.retcode === -5003) {
      return {
        status: response.message,
        code: -5003,
        reward,
        info
      };
    }
    if (((_a = response.data) == null ? void 0 : _a.code.toString().toLowerCase()) === "ok" && response.retcode === 0) {
      return {
        status: response.message,
        code: 0,
        reward,
        info
      };
    }
    return {
      status: response.message,
      code: response.retcode,
      reward: null,
      info
    };
  }
};

// src/module/redeem/redeem.ts
var RedeemModule = class {
  /**
   * Constructs a new RedeemModule object.
   * @param request - The Request object used for making HTTP requests.
   * @param lang - The language to use for the API response.
   * @param game - The game to redeem the code for.
   * @param region - The region of the user's account. If null, the API will use the default region for the game.
   * @param uid - The user ID of the account. If null, the API will use the user ID associated with the provided auth cookies.
   */
  constructor(request, lang, game, region, uid) {
    this.request = request;
    this.lang = lang;
    this.game = game;
    this.region = region;
    this.uid = uid;
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
      throw new HoyoAPIError("UID parameter is missing or failed to be filled");
    }
    this.request.setQueryParams({
      uid: this.uid,
      region: this.region,
      game_biz: this.game,
      cdkey: code.replace(/\uFFFD/g, ""),
      lang: this.lang.toString().split("-")[0],
      sLangKey: this.lang
    });
    const { response } = await this.request.send(REDEEM_CLAIM_API, "GET", 0);
    return response;
  }
};

export {
  DailyModule,
  RedeemModule
};
