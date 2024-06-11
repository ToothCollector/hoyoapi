import { ICookie } from '../../cookie'
import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { IHi3Options } from './hi.interface'
import { IGame } from '../hoyolab'
import { HIRecordModule } from './record'
/**
 * Class representing the Honkai Impact 3rd game.
 *
 * @public
 * @class
 * @category Main
 */
export declare class HonkaiImpact {
  /**
   * The Daily module for the Honkai Impact 3rd game.
   *
   */
  readonly daily: DailyModule
  /**
   * The Redeem module for the Honkai Impact 3rd game.
   *
   * @public
   * @readonly
   */
  readonly redeem: RedeemModule
  /**
   * The `HIRecordModule` object provides an interface to interact with the user record feature in Honkai Star Rails.
   *
   */
  readonly record: HIRecordModule
  /**
   * The cookie used for authentication.
   *
   */
  readonly cookie: ICookie
  /**
   * The request object used to make HTTP requests.
   *
   */
  private request
  /**
   * HoyYolab account object
   *
   */
  private _account
  /**
   * The UID of the Honkai Impact 3rd account.
   *
   */
  readonly uid: number | null
  /**
   * The region of the Honkai Impact 3rd account.
   *
   */
  readonly region: string | null
  /**
   * The language of the Honkai Impact 3rd account.
   *
   */
  private lang
  /**
   * Create a new instance of HonkaiImpact.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options: IHi3Options)
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
  static create(options: IHi3Options): Promise<HonkaiImpact>
  /**
   * Setter for the account property. Prevents from changing the value once set
   * @param game The game object to set as the account.
   */
  set account(game: IGame | null)
  /**
   * Getter for the account property.
   * @returns {IGame | null} The current value of the account property.
   */
  get account(): IGame | null
  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.info() } instead
   */
  dailyInfo(): Promise<import('../../module/daily').IDailyInfo>
  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.rewards() } instead
   */
  dailyRewards(): Promise<import('../../module/daily').IDailyRewards>
  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.reward() } instead
   */
  dailyReward(
    day?: number | null,
  ): Promise<import('../../module/daily').IDailyReward>
  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.claim() } instead
   */
  dailyClaim(): Promise<import('../../module/daily').IDailyClaim>
  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiImpact.redeem | HonkaiImpact.redeem.claim() } instead
   */
  redeemCode(code: string): Promise<import('../../module/redeem').IRedeemCode>
}
