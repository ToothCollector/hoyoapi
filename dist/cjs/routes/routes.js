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
var routes_exports = {}
__export(routes_exports, {
  ACCOUNT_API: () => ACCOUNT_API,
  BBS_API: () => BBS_API,
  DAILY_CLAIM_API: () => DAILY_CLAIM_API,
  DAILY_INFO_API: () => DAILY_INFO_API,
  DAILY_REWARD_API: () => DAILY_REWARD_API,
  DEFAULT_REFERER: () => DEFAULT_REFERER,
  GAME_RECORD_CARD_API: () => GAME_RECORD_CARD_API,
  GENSHIN_DIARY_DETAIL_API: () => GENSHIN_DIARY_DETAIL_API,
  GENSHIN_DIARY_LIST_API: () => GENSHIN_DIARY_LIST_API,
  GENSHIN_RECORD_AVATAR_BASIC_INFO_API: () =>
    GENSHIN_RECORD_AVATAR_BASIC_INFO_API,
  GENSHIN_RECORD_CHARACTER_API: () => GENSHIN_RECORD_CHARACTER_API,
  GENSHIN_RECORD_DAILY_NOTE_API: () => GENSHIN_RECORD_DAILY_NOTE_API,
  GENSHIN_RECORD_INDEX_API: () => GENSHIN_RECORD_INDEX_API,
  GENSHIN_RECORD_SPIRAL_ABYSS_API: () => GENSHIN_RECORD_SPIRAL_ABYSS_API,
  GENSHIN_TCG_BASICINFO: () => GENSHIN_TCG_BASICINFO,
  GENSHIN_TCG_CARDLIST: () => GENSHIN_TCG_CARDLIST,
  GENSHIN_TCG_CHALLANGE_DECK: () => GENSHIN_TCG_CHALLANGE_DECK,
  GENSHIN_TCG_CHALLANGE_RECORD: () => GENSHIN_TCG_CHALLANGE_RECORD,
  GENSHIN_TCG_CHALLANGE_SCHEDULE: () => GENSHIN_TCG_CHALLANGE_SCHEDULE,
  GENSHIN_TCG_MATCHLIST: () => GENSHIN_TCG_MATCHLIST,
  HI_RECORD_ABYSS_API: () => HI_RECORD_ABYSS_API,
  HI_RECORD_ARENA_API: () => HI_RECORD_ARENA_API,
  HI_RECORD_CHARACTER_API: () => HI_RECORD_CHARACTER_API,
  HI_RECORD_ELYSIAN_API: () => HI_RECORD_ELYSIAN_API,
  HI_RECORD_INDEX_API: () => HI_RECORD_INDEX_API,
  HK4E_API: () => HK4E_API,
  HSR_RECORD_CHARACTER_API: () => HSR_RECORD_CHARACTER_API,
  HSR_RECORD_FORGOTTEN_HALL_API: () => HSR_RECORD_FORGOTTEN_HALL_API,
  HSR_RECORD_INDEX_API: () => HSR_RECORD_INDEX_API,
  HSR_RECORD_NOTE_API: () => HSR_RECORD_NOTE_API,
  PUBLIC_API: () => PUBLIC_API,
  REDEEM_CLAIM_API: () => REDEEM_CLAIM_API,
  USER_GAMES_LIST: () => USER_GAMES_LIST,
})
module.exports = __toCommonJS(routes_exports)
var import_hoyolab = require('../client/hoyolab')
const BBS_API = 'https://bbs-api-os.hoyolab.com'
const ACCOUNT_API = 'https://api-account-os.hoyolab.com'
const HK4E_API = 'https://sg-hk4e-api.hoyolab.com'
const PUBLIC_API = 'https://sg-public-api.hoyolab.com'
const DEFAULT_REFERER = 'https://hoyolab.com'
const USER_GAMES_LIST = ''.concat(
  ACCOUNT_API,
  '/account/binding/api/getUserGameRolesByCookieToken',
)
const GAME_RECORD_CARD_API = ''.concat(
  BBS_API,
  '/game_record/card/wapi/getGameRecordCard',
)
const getEventName = (game) => {
  if (game == import_hoyolab.GamesEnum.GENSHIN_IMPACT) {
    return 'sol'
  } else if (game === import_hoyolab.GamesEnum.HONKAI_IMPACT) {
    return 'mani'
  } else if (game === import_hoyolab.GamesEnum.HONKAI_STAR_RAIL) {
    return 'luna/os'
  }
  return ''
}
const getEventBaseUrl = (game) => {
  if (game === import_hoyolab.GamesEnum.GENSHIN_IMPACT) {
    return HK4E_API
  } else if (
    game === import_hoyolab.GamesEnum.HONKAI_IMPACT ||
    game === import_hoyolab.GamesEnum.HONKAI_STAR_RAIL
  ) {
    return PUBLIC_API
  }
  return ''
}
const getActId = (game) => {
  if (game === import_hoyolab.GamesEnum.GENSHIN_IMPACT) {
    return 'e202102251931481'
  } else if (game === import_hoyolab.GamesEnum.HONKAI_IMPACT) {
    return 'e202110291205111'
  } else if (game === import_hoyolab.GamesEnum.HONKAI_STAR_RAIL) {
    return 'e202303301540311'
  }
  return ''
}
const DAILY_INFO_API = (game) => {
  return ''
    .concat(getEventBaseUrl(game), '/event/')
    .concat(getEventName(game), '/info?act_id=')
    .concat(getActId(game))
}
const DAILY_REWARD_API = (game) => {
  return ''
    .concat(getEventBaseUrl(game), '/event/')
    .concat(getEventName(game), '/home?act_id=')
    .concat(getActId(game))
}
const DAILY_CLAIM_API = (game) => {
  return ''
    .concat(getEventBaseUrl(game), '/event/')
    .concat(getEventName(game), '/sign?act_id=')
    .concat(getActId(game))
}
const REDEEM_CLAIM_API = ''.concat(
  HK4E_API,
  '/common/apicdkey/api/webExchangeCdkey',
)
const GENSHIN_RECORD_INDEX_API = ''.concat(
  BBS_API,
  '/game_record/genshin/api/index',
)
const GENSHIN_RECORD_CHARACTER_API = ''.concat(
  BBS_API,
  '/game_record/genshin/api/character',
)
const GENSHIN_RECORD_AVATAR_BASIC_INFO_API = ''.concat(
  BBS_API,
  '/game_record/genshin/api/avatarBasicInfo',
)
const GENSHIN_RECORD_SPIRAL_ABYSS_API = ''.concat(
  BBS_API,
  '/game_record/genshin/api/spiralAbyss',
)
const GENSHIN_RECORD_DAILY_NOTE_API = ''.concat(
  BBS_API,
  '/game_record/genshin/api/dailyNote',
)
const GENSHIN_DIARY_LIST_API = ''.concat(
  HK4E_API,
  '/event/ysledgeros/month_info',
)
const GENSHIN_DIARY_DETAIL_API = ''.concat(
  HK4E_API,
  '/event/ysledgeros/month_detail',
)
const GENSHIN_TCG_BASICINFO = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/basicInfo',
)
const GENSHIN_TCG_CARDLIST = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/cardList',
)
const GENSHIN_TCG_MATCHLIST = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/matchList',
)
const GENSHIN_TCG_CHALLANGE_SCHEDULE = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/challenge/schedule',
)
const GENSHIN_TCG_CHALLANGE_RECORD = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/challenge/record',
)
const GENSHIN_TCG_CHALLANGE_DECK = ''.concat(
  BBS_API,
  '/game_record/genshin/api/gcg/challenge/deck',
)
const HSR_RECORD_CHARACTER_API = ''.concat(
  BBS_API,
  '/game_record/hkrpg/api/avatar/info',
)
const HSR_RECORD_INDEX_API = ''.concat(BBS_API, '/game_record/hkrpg/api/index')
const HSR_RECORD_NOTE_API = ''.concat(BBS_API, '/game_record/hkrpg/api/note')
const HSR_RECORD_FORGOTTEN_HALL_API = ''.concat(
  BBS_API,
  '/game_record/hkrpg/api/challenge',
)
const HI_RECORD_INDEX_API = ''.concat(
  BBS_API,
  '/game_record/honkai3rd/api/index',
)
const HI_RECORD_CHARACTER_API = ''.concat(
  BBS_API,
  '/game_record/honkai3rd/api/characters',
)
const HI_RECORD_ABYSS_API = ''.concat(
  BBS_API,
  '/game_record/honkai3rd/api/latestOldAbyssReport',
)
const HI_RECORD_ELYSIAN_API = ''.concat(
  BBS_API,
  '/game_record/honkai3rd/api/godWar',
)
const HI_RECORD_ARENA_API = ''.concat(
  BBS_API,
  '/game_record/honkai3rd/api/battleFieldReport',
)
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    ACCOUNT_API,
    BBS_API,
    DAILY_CLAIM_API,
    DAILY_INFO_API,
    DAILY_REWARD_API,
    DEFAULT_REFERER,
    GAME_RECORD_CARD_API,
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
    HI_RECORD_ABYSS_API,
    HI_RECORD_ARENA_API,
    HI_RECORD_CHARACTER_API,
    HI_RECORD_ELYSIAN_API,
    HI_RECORD_INDEX_API,
    HK4E_API,
    HSR_RECORD_CHARACTER_API,
    HSR_RECORD_FORGOTTEN_HALL_API,
    HSR_RECORD_INDEX_API,
    HSR_RECORD_NOTE_API,
    PUBLIC_API,
    REDEEM_CLAIM_API,
    USER_GAMES_LIST,
  })
