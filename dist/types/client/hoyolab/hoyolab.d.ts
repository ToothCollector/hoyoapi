import { ICookie } from '../../cookie'
import { LanguageEnum } from '../../language'
import { HTTPRequest } from '../../request'
import {
  GamesEnum,
  IGame,
  IGameRecordCard,
  IHoyolabOptions,
} from './hoyolab.interface'
/**
 * Represents the Hoyolab API client.
 *
 * @class
 * @category Main
 */
export declare class Hoyolab {
  /**
   * The parsed ICookie object used to authenticate requests.
   */
  readonly cookie: ICookie
  /**
   * The underlying `Request` object used to make HTTP requests.
   */
  readonly request: HTTPRequest
  /**
   * The language used for API responses.
   */
  lang: LanguageEnum
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
  constructor(options: IHoyolabOptions)
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
  gamesList(game?: GamesEnum): Promise<IGame[]>
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
  gameAccount(game: GamesEnum): Promise<IGame>
  /**
   * Retrieves the game record card
   *
   * @async
   * @returns {Promise<IGameRecordCard>} The game account.
   */
  gameRecordCard(): Promise<IGameRecordCard>
}
