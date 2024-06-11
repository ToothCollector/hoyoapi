var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/cookie/cookie.helper.ts
function toCamelCase(str) {
  const words = str.split("_");
  const camelCaseWords = words.map((word, index) => {
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
  return camelCaseWords.join("");
}
function toSnakeCase(text) {
  return text.replace(/([A-Z])/g, " $1").split(" ").join("_").toLowerCase();
}

// src/language/language.interface.ts
var LanguageEnum = /* @__PURE__ */ ((LanguageEnum3) => {
  LanguageEnum3["SIMPLIFIED_CHINESE"] = "zh-cn";
  LanguageEnum3["TRADIIONAL_CHINESE"] = "zh-tw";
  LanguageEnum3["GERMAN"] = "de-de";
  LanguageEnum3["ENGLISH"] = "en-us";
  LanguageEnum3["SPANISH"] = "es-es";
  LanguageEnum3["FRENCH"] = "fr-fr";
  LanguageEnum3["INDONESIAN"] = "id-id";
  LanguageEnum3["ITALIAN"] = "it-it";
  LanguageEnum3["JAPANESE"] = "ja-jp";
  LanguageEnum3["KOREAN"] = "ko-kr";
  LanguageEnum3["PORTUGUESE"] = "pt-pt";
  LanguageEnum3["RUSSIAN"] = "ru-ru";
  LanguageEnum3["THAI"] = "th-th";
  LanguageEnum3["TURKISH"] = "tr-tr";
  LanguageEnum3["VIETNAMESE"] = "vi-vn";
  return LanguageEnum3;
})(LanguageEnum || {});

// src/language/language.ts
var Language = class {
  /**
   * Parses a language string into its corresponding LanguageEnum value.
   *
   * @param lang The language string to parse, or null/undefined to default to English.
   * @returns The LanguageEnum value corresponding to the provided string, or English if the string is invalid or undefined.
   */
  static parseLang(lang) {
    if (!lang) {
      return "en-us" /* ENGLISH */;
    }
    const langKeys = Object.keys(LanguageEnum);
    const matchingKey = langKeys.find(
      (key) => LanguageEnum[key] === lang
    );
    return matchingKey ? LanguageEnum[matchingKey] : "en-us" /* ENGLISH */;
  }
};

// src/error/error.ts
var HoyoAPIError = class extends Error {
  /**
   * Constructs a new instance of the HoyolabError class with the specified message.
   *
   * @param message The message to associate with this error.
   */
  constructor(message, code, http) {
    super(message);
    /**
     * The name of this error.
     */
    __publicField(this, "name");
    /**
     * The message associated with this error.
     */
    __publicField(this, "message");
    /**
     * The HTTP object
     */
    __publicField(this, "http");
    /**
     * The error code
     */
    __publicField(this, "code");
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    this.http = http;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/cookie/cookie.ts
var Cookie = class {
  /**
   * Parses a cookie string and returns a parsed ICookie object.
   *
   * @param cookieString - The cookie string to be parsed.
   * @returns {string} - A parsed ICookie object.
   * @throws {HoyoAPIError} when ltuid or ltoken keys are not found in the cookie string.
   */
  static parseCookieString(cookieString) {
    const cookies = /* @__PURE__ */ new Map();
    const keys = [
      "ltoken_v2",
      "ltuid_v2",
      "account_id",
      "cookie_token",
      "account_id_v2",
      "account_mid_v2",
      "cookie_token_v2",
      "mi18nLang"
    ];
    cookieString.split("; ").forEach((cookie) => {
      const cookieSplited = cookie.trim().split(/=(?=.+)/);
      if (keys.includes(cookieSplited[0]) === false) {
        return;
      }
      const key = toCamelCase(cookieSplited[0]).trim();
      const val = decodeURIComponent(cookieSplited[1]).replace(";", "").trim();
      cookies.set(key, val);
      if (["ltuid_v2", "account_id", "account_id_v2"].includes(cookieSplited[0])) {
        cookies.set(key, parseInt(cookies.get(key), 10));
      } else if (cookieSplited[0] === "mi18nLang") {
        cookies.set(key, Language.parseLang(cookies.get(key)));
      }
    });
    const ltuid = cookies.get("ltuidV2");
    const accountId = cookies.get("accountId");
    const accountIdV2 = cookies.get("accountIdV2");
    if (ltuid && !accountId) {
      cookies.set("accountId", ltuid);
    } else if (!ltuid && accountId) {
      cookies.set("ltuidV2", accountId);
    }
    if (!accountIdV2 && (accountId || ltuid) !== null) {
      cookies.set("accountIdV2", accountId || ltuid);
    }
    if (!cookies.get("ltokenV2") || !cookies.get("ltuidV2")) {
      throw new HoyoAPIError("Cookie key ltuid_v2 or ltoken_v2 doesnt exist !");
    }
    return Object.fromEntries(cookies);
  }
  /**
   * Converts an `ICookie` object into a cookie string.
   * @param {ICookie} cookie - The `ICookie` object to convert.
   * @returns {string} A string representing the cookie.
   * @throws {HoyoAPIError} If the `ltuid` or `ltoken` key is missing in the `ICookie` object.
   */
  static parseCookie(cookie) {
    if (!cookie.accountId) {
      cookie.accountId = cookie.ltuidV2;
    }
    const cookies = Object.entries(cookie).map(([key, value]) => {
      if (!value) {
        return void 0;
      }
      if ([
        "cookieToken",
        "accountId",
        "cookieTokenV2",
        "accountIdV2",
        "accountMidV2"
      ].includes(key)) {
        key = toSnakeCase(key);
      }
      return "".concat(key, "=").concat(value);
    }).filter((val) => {
      return val !== void 0;
    });
    return cookies.join("; ");
  }
};

// src/request/request.ts
import { request } from "https";
import { brotliDecompressSync, gunzipSync, inflateSync } from "zlib";

// src/request/request.helper.ts
import { createHash } from "crypto";
function generateDS() {
  const salt = "6s25p5ox5y14umn1p61aqyyvbvvl3lrt";
  const date = /* @__PURE__ */ new Date();
  const time = Math.floor(date.getTime() / 1e3);
  let random = "";
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters.charAt(randomIndex);
    random += randomChar;
  }
  const hash = createHash("md5").update("salt=".concat(salt, "&t=").concat(time, "&r=").concat(random)).digest("hex");
  return "".concat(time, ",").concat(random, ",").concat(hash);
}
function delay(second) {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1e3);
  });
}

// src/cache/cache.ts
import { totalmem } from "os";
var Cache = class {
  /**
   * Creates an instance of Cache.
   */
  constructor() {
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    __publicField(this, "maxCacheCap");
    this.maxCacheCap = this.calculateMaxCapacity();
  }
  /**
   * Calculates the maximum capacity of the cache based on available system memory.
   * @returns The maximum capacity of the cache.
   */
  calculateMaxCapacity() {
    const totalMemory = totalmem();
    const maxCapacityPercentage = 0.2;
    const maxCapacityBytes = totalMemory * maxCapacityPercentage;
    return Math.floor(maxCapacityBytes / (1024 * 50));
  }
  /**
   * Retrieves the value associated with the specified key from the cache.
   * @param key - The key to look up in the cache.
   * @returns The cached value if found and not expired; otherwise, returns null.
   */
  get(key) {
    const entry = this.cache.get(key);
    if (entry && Date.now() < entry.ttl) {
      return entry.value;
    }
    return null;
  }
  /**
   * Stores a key-value pair in the cache with a specified TTL (Time To Live).
   * @param key - The key to store in the cache.
   * @param value - The value to associate with the key.
   * @param ttl - The TTL (Time To Live) in seconds for the cached entry.
   */
  set(key, value, ttl) {
    if (ttl < 1) {
      return;
    }
    if (this.cache.size >= this.maxCacheCap) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    const expireTime = Date.now() + ttl * 1e3;
    const entry = { value, ttl: expireTime };
    this.cache.set(key, entry);
  }
  /**
   * Removes the entry with the specified key from the cache.
   * @param key - The key to delete from the cache.
   */
  delete(key) {
    this.cache.delete(key);
  }
  /**
   * Checks if the cache contains an entry with the specified key.
   * @param key - The key to check in the cache.
   * @returns True if the cache contains the key; otherwise, false.
   */
  has(key) {
    return this.get(key) !== null;
  }
};

// src/cache/index.ts
var cache_default = new Cache();

// src/request/request.ts
import { createHash as createHash2 } from "crypto";
var HTTPRequest = class {
  constructor(cookie) {
    /**
     * Query parameters for the request.
     */
    __publicField(this, "params", {});
    /**
     * Body of the request.
     */
    __publicField(this, "body", {});
    /**
     * The cache used for the request
     */
    __publicField(this, "cache");
    /*
     * Headers for the request.
     */
    __publicField(this, "headers", {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "sec-ch-ua": '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.46",
      "x-rpc-app_version": "1.5.0",
      "x-rpc-client_type": "5",
      "x-rpc-language": "en-us"
    });
    /**
     * Flag indicating whether Dynamic Security is used.
     */
    __publicField(this, "ds", false);
    /**
     * The number of request attempts made.
     */
    __publicField(this, "retries", 1);
    __publicField(this, "http");
    if (cookie)
      this.headers.Cookie = cookie;
    this.cache = new Cache();
  }
  /**
   * Sets search parameters or query parameter.
   *
   * @param params - An object of query parameter to be set.
   * @returns Returns this Request object.
   */
  setQueryParams(params) {
    this.params = { ...this.params, ...params };
    return this;
  }
  /**
   * Set Body Parameter
   *
   * @param body - RequestBodyType as object containing the body parameters.
   * @returns This instance of Request object.
   */
  setBody(data) {
    this.body = { ...this.body, ...data };
    return this;
  }
  /**
   * Set Referer Headers
   *
   * @param url - The URL string of referer
   * @returns The updated Request instance.
   */
  setReferer(url) {
    this.headers.Referer = url.toString();
    this.headers.Origin = url.toString();
    return this;
  }
  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  setLang(lang) {
    this.headers["x-rpc-language"] = Language.parseLang(lang);
    return this;
  }
  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag indicating whether to use dynamic security or not (default: true).
   * @returns {this} The current Request instance.
   */
  setDs(flag = true) {
    this.ds = flag;
    return this;
  }
  /**
   * Send the HTTP request.
   *
   * @param url - The URL to send the request to.
   * @param method - The HTTP method to use. Defaults to 'GET'.
   * @param ttl - The TTL value for the cached data in seconds.
   * @returns A Promise that resolves with the response data, or rejects with a HoyoAPIError if an error occurs.
   * @throws {HoyoAPIError} if an error occurs rejects with a HoyoAPIError
   */
  async send(url, method = "GET", ttl = 60) {
    const fetch = (url2, method2) => {
      return new Promise((resolve, reject) => {
        const hostname = new URL(url2);
        const queryParams = new URLSearchParams(hostname.searchParams);
        Object.keys(this.params).forEach((val) => {
          var _a, _b;
          queryParams.append(val, (_b = (_a = this.params[val]) == null ? void 0 : _a.toString()) != null ? _b : "");
        });
        hostname.search = queryParams.toString();
        const options = {
          method: method2,
          headers: this.headers
        };
        const client = request(hostname, options, (res) => {
          if (res.statusCode === 429) {
            return resolve({
              response: {
                data: null,
                message: "Too Many Request",
                retcode: 429
              },
              status: {
                code: 429,
                message: "Too Many Request"
              },
              headers: res.headers,
              body: this.body,
              params: this.params
            });
          } else if (res.statusCode && res.statusCode >= 400 && res.statusCode < 600) {
            reject(
              new HoyoAPIError(
                "HTTP ".concat(res.statusCode, ": ").concat(res.statusMessage),
                res.statusCode,
                {
                  response: res.statusMessage,
                  request: {
                    params: this.params,
                    body: this.body,
                    headers: this.headers
                  }
                }
              )
            );
          }
          const stream = [];
          res.on("data", (chunk) => {
            stream.push(chunk);
          });
          res.on("end", () => {
            var _a, _b, _c, _d;
            let buffer = Buffer.concat(stream);
            const encoding = res.headers["content-encoding"];
            if (encoding === "gzip") {
              buffer = gunzipSync(buffer);
            } else if (encoding === "deflate") {
              buffer = inflateSync(buffer);
            } else if (encoding === "br") {
              buffer = brotliDecompressSync(buffer);
            }
            const responseString = buffer.toString("utf8");
            let response;
            if (res.headers["content-type"] === "application/json") {
              try {
                response = JSON.parse(responseString);
                resolve({
                  response: {
                    data: (_a = response == null ? void 0 : response.data) != null ? _a : null,
                    message: (_b = response == null ? void 0 : response.message) != null ? _b : "",
                    retcode: (_c = response == null ? void 0 : response.retcode) != null ? _c : -1
                  },
                  status: {
                    /* c8 ignore next */
                    code: (_d = res.statusCode) != null ? _d : -1,
                    message: res.statusMessage
                  },
                  headers: res.headers,
                  body: this.body,
                  params: this.params
                });
              } catch (error) {
                reject(
                  new HoyoAPIError("Failed to parse response body as JSON")
                );
              }
            } else {
              reject(
                new HoyoAPIError(
                  "Response Content-Type is not application/json"
                )
              );
            }
          });
          res.on("error", (err) => {
            reject(new HoyoAPIError(err.message));
          });
        });
        if (method2 === "POST") {
          client.write(JSON.stringify(this.body));
        }
        client.end();
      });
    };
    const cacheKey = createHash2("md5").update(
      JSON.stringify({
        url,
        method,
        body: this.body,
        params: this.params
      })
    ).digest("hex");
    const cachedResult = this.cache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    if (this.ds) {
      this.headers.DS = generateDS();
    }
    const req = await fetch(url, method);
    if ([-1004, -2016, -500004, 429].includes(req.response.retcode) && this.retries <= 120) {
      this.retries++;
      await delay(1);
      return this.send(url, method);
    }
    this.retries = 1;
    this.body = {};
    this.params = {};
    this.cache.set(cacheKey, req, ttl);
    return req;
  }
};

// src/routes/routes.ts
var BBS_API = "https://bbs-api-os.hoyolab.com";
var ACCOUNT_API = "https://api-account-os.hoyolab.com";
var HK4E_API = "https://sg-hk4e-api.hoyolab.com";
var PUBLIC_API = "https://sg-public-api.hoyolab.com";
var DEFAULT_REFERER = "https://hoyolab.com";
var USER_GAMES_LIST = "".concat(ACCOUNT_API, "/account/binding/api/getUserGameRolesByCookieToken");
var GAME_RECORD_CARD_API = "".concat(BBS_API, "/game_record/card/wapi/getGameRecordCard");
var getEventName = (game) => {
  if (game == "hk4e_global" /* GENSHIN_IMPACT */) {
    return "sol";
  } else if (game === "bh3_global" /* HONKAI_IMPACT */) {
    return "mani";
  } else if (game === "hkrpg_global" /* HONKAI_STAR_RAIL */) {
    return "luna/os";
  }
  return "";
};
var getEventBaseUrl = (game) => {
  if (game === "hk4e_global" /* GENSHIN_IMPACT */) {
    return HK4E_API;
  } else if (game === "bh3_global" /* HONKAI_IMPACT */ || game === "hkrpg_global" /* HONKAI_STAR_RAIL */) {
    return PUBLIC_API;
  }
  return "";
};
var getActId = (game) => {
  if (game === "hk4e_global" /* GENSHIN_IMPACT */) {
    return "e202102251931481";
  } else if (game === "bh3_global" /* HONKAI_IMPACT */) {
    return "e202110291205111";
  } else if (game === "hkrpg_global" /* HONKAI_STAR_RAIL */) {
    return "e202303301540311";
  }
  return "";
};
var DAILY_INFO_API = (game) => {
  return "".concat(getEventBaseUrl(game), "/event/").concat(getEventName(
    game
  ), "/info?act_id=").concat(getActId(game));
};
var DAILY_REWARD_API = (game) => {
  return "".concat(getEventBaseUrl(game), "/event/").concat(getEventName(
    game
  ), "/home?act_id=").concat(getActId(game));
};
var DAILY_CLAIM_API = (game) => {
  return "".concat(getEventBaseUrl(game), "/event/").concat(getEventName(
    game
  ), "/sign?act_id=").concat(getActId(game));
};
var REDEEM_CLAIM_API = "".concat(HK4E_API, "/common/apicdkey/api/webExchangeCdkey");
var GENSHIN_RECORD_INDEX_API = "".concat(BBS_API, "/game_record/genshin/api/index");
var GENSHIN_RECORD_CHARACTER_API = "".concat(BBS_API, "/game_record/genshin/api/character");
var GENSHIN_RECORD_AVATAR_BASIC_INFO_API = "".concat(BBS_API, "/game_record/genshin/api/avatarBasicInfo");
var GENSHIN_RECORD_SPIRAL_ABYSS_API = "".concat(BBS_API, "/game_record/genshin/api/spiralAbyss");
var GENSHIN_RECORD_DAILY_NOTE_API = "".concat(BBS_API, "/game_record/genshin/api/dailyNote");
var GENSHIN_DIARY_LIST_API = "".concat(HK4E_API, "/event/ysledgeros/month_info");
var GENSHIN_DIARY_DETAIL_API = "".concat(HK4E_API, "/event/ysledgeros/month_detail");
var GENSHIN_TCG_BASICINFO = "".concat(BBS_API, "/game_record/genshin/api/gcg/basicInfo");
var GENSHIN_TCG_CARDLIST = "".concat(BBS_API, "/game_record/genshin/api/gcg/cardList");
var GENSHIN_TCG_MATCHLIST = "".concat(BBS_API, "/game_record/genshin/api/gcg/matchList");
var GENSHIN_TCG_CHALLANGE_SCHEDULE = "".concat(BBS_API, "/game_record/genshin/api/gcg/challenge/schedule");
var GENSHIN_TCG_CHALLANGE_RECORD = "".concat(BBS_API, "/game_record/genshin/api/gcg/challenge/record");
var GENSHIN_TCG_CHALLANGE_DECK = "".concat(BBS_API, "/game_record/genshin/api/gcg/challenge/deck");
var HSR_RECORD_CHARACTER_API = "".concat(BBS_API, "/game_record/hkrpg/api/avatar/info");
var HSR_RECORD_INDEX_API = "".concat(BBS_API, "/game_record/hkrpg/api/index");
var HSR_RECORD_NOTE_API = "".concat(BBS_API, "/game_record/hkrpg/api/note");
var HSR_RECORD_FORGOTTEN_HALL_API = "".concat(BBS_API, "/game_record/hkrpg/api/challenge");
var HI_RECORD_INDEX_API = "".concat(BBS_API, "/game_record/honkai3rd/api/index");
var HI_RECORD_CHARACTER_API = "".concat(BBS_API, "/game_record/honkai3rd/api/characters");
var HI_RECORD_ABYSS_API = "".concat(BBS_API, "/game_record/honkai3rd/api/latestOldAbyssReport");
var HI_RECORD_ELYSIAN_API = "".concat(BBS_API, "/game_record/honkai3rd/api/godWar");
var HI_RECORD_ARENA_API = "".concat(BBS_API, "/game_record/honkai3rd/api/battleFieldReport");

// src/client/hoyolab/hoyolab.ts
var Hoyolab = class {
  /**
   * Creates a new instance of `Hoyolab`.
   *
   * @constructor
   * @param {IHoyolabOptions} options - The options to initialize the `Hoyolab` instance.
   * @throws {HoyoAPIError} If `ltuid` or `ltoken` keys are missing in the `ICookie` object.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  constructor(options) {
    /**
     * The parsed ICookie object used to authenticate requests.
     */
    __publicField(this, "cookie");
    /**
     * The underlying `Request` object used to make HTTP requests.
     */
    __publicField(this, "request");
    /**
     * The language used for API responses.
     */
    __publicField(this, "lang");
    const cookie = typeof options.cookie === "string" ? Cookie.parseCookieString(options.cookie) : options.cookie;
    this.cookie = cookie;
    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang);
    }
    options.lang = Language.parseLang(options.lang);
    this.request = new HTTPRequest(Cookie.parseCookie(this.cookie));
    this.request.setLang(options.lang);
    this.lang = options.lang;
  }
  /**
   * Get the list of games on this Hoyolab account.
   *
   * @async
   * @param {GamesEnum} [game] The optional game for which to retrieve accounts.
   * @throws {HoyoAPIError} Thrown if there are no game accounts on this Hoyolab account.
   * @returns {Promise<IGame[]>} The list of games on this Hoyolab account.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  async gamesList(game) {
    var _a;
    if (!this.cookie.cookieTokenV2) {
      throw new HoyoAPIError(
        "You must set options.cookie.cookieTokenV2 to access this API"
      );
    }
    if (game) {
      this.request.setQueryParams({
        game_biz: game
      });
    }
    this.request.setQueryParams({
      uid: this.cookie.ltuidV2,
      sLangKey: this.cookie.mi18nLang
    });
    const {
      response: res,
      params,
      body,
      headers
    } = await this.request.send(USER_GAMES_LIST);
    const data = res.data;
    if (!res.data || !data.list) {
      throw new HoyoAPIError(
        (_a = res.message) != null ? _a : "There is no game account on this hoyolab account !",
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
    return data.list;
  }
  /**
   * Get the account of a specific game from the games list.
   *
   * @async
   * @param {GamesEnum} game - The game that the account belongs to.
   * @throws {HoyoAPIError} If there is no game account on this hoyolab account.
   * @returns {Promise<IGame>} The game account.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  async gameAccount(game) {
    const games = await this.gamesList(game);
    if (games.length < 1) {
      throw new HoyoAPIError(
        "There is no game account on this hoyolab account !"
      );
    }
    return games.reduce((first, second) => {
      return second.level > first.level ? second : first;
    });
  }
  /**
   * Retrieves the game record card
   *
   * @async
   * @returns {Promise<IGameRecordCard>} The game account.
   */
  async gameRecordCard() {
    this.request.setQueryParams({
      uid: this.cookie.ltuidV2 || this.cookie.accountId || this.cookie.accountIdV2
    });
    const { response: res } = await this.request.send(GAME_RECORD_CARD_API);
    return res.data.list;
  }
  /* c8 ignore stop */
};

// src/client/hoyolab/hoyolab.interface.ts
var GamesEnum = /* @__PURE__ */ ((GamesEnum2) => {
  GamesEnum2["GENSHIN_IMPACT"] = "hk4e_global";
  GamesEnum2["HONKAI_IMPACT"] = "bh3_global";
  GamesEnum2["HONKAI_STAR_RAIL"] = "hkrpg_global";
  return GamesEnum2;
})(GamesEnum || {});

export {
  __publicField,
  HoyoAPIError,
  LanguageEnum,
  Language,
  HTTPRequest,
  Cookie,
  Hoyolab,
  GamesEnum,
  BBS_API,
  ACCOUNT_API,
  HK4E_API,
  PUBLIC_API,
  DEFAULT_REFERER,
  USER_GAMES_LIST,
  GAME_RECORD_CARD_API,
  DAILY_INFO_API,
  DAILY_REWARD_API,
  DAILY_CLAIM_API,
  REDEEM_CLAIM_API,
  GENSHIN_RECORD_INDEX_API,
  GENSHIN_RECORD_CHARACTER_API,
  GENSHIN_RECORD_AVATAR_BASIC_INFO_API,
  GENSHIN_RECORD_SPIRAL_ABYSS_API,
  GENSHIN_RECORD_DAILY_NOTE_API,
  GENSHIN_DIARY_LIST_API,
  GENSHIN_DIARY_DETAIL_API,
  GENSHIN_TCG_BASICINFO,
  GENSHIN_TCG_CARDLIST,
  GENSHIN_TCG_MATCHLIST,
  GENSHIN_TCG_CHALLANGE_SCHEDULE,
  GENSHIN_TCG_CHALLANGE_RECORD,
  GENSHIN_TCG_CHALLANGE_DECK,
  HSR_RECORD_CHARACTER_API,
  HSR_RECORD_INDEX_API,
  HSR_RECORD_NOTE_API,
  HSR_RECORD_FORGOTTEN_HALL_API,
  HI_RECORD_INDEX_API,
  HI_RECORD_CHARACTER_API,
  HI_RECORD_ABYSS_API,
  HI_RECORD_ELYSIAN_API,
  HI_RECORD_ARENA_API
};
