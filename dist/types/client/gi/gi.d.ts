import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { IGenshinOptions } from './gi.interface'
import { ICookie } from '../../cookie'
import { IGame } from '../hoyolab'
import { GenshinRecordModule, SpiralAbyssScheduleEnum } from './record'
import { DiaryEnum, GenshinDiaryModule, DiaryMonthEnum } from './diary'
import { GenshinTCGModule } from './tcg'
/**
 * The `Genshin` class provides an interface to interact with Genshin Impact-related features on the Mihoyo website.
 * It contains references to various modules such as `DailyModule`, `RedeemModule`, `GenshinRecordModule`, and `GenshinDiaryModule` which allow you to perform various operations related to these features.
 *
 * @class
 * @category Main
 */
export declare class GenshinImpact {
  /**
   * The `DailyModule` object provides an interface to interact with the daily check-in feature in Genshin Impact.
   *
   */
  readonly daily: DailyModule
  /**
   * The `RedeemModule` object provides an interface to interact with the code redemption feature in Genshin Impact.
   *
   */
  readonly redeem: RedeemModule
  /**
   * The `GenshinRecordModule` object provides an interface to interact with the user record feature in Genshin Impact.
   *
   */
  readonly record: GenshinRecordModule
  /**
   * The `GenshinDiaryModule` object provides an interface to interact with the user diary feature in Genshin Impact.
   *
   */
  readonly diary: GenshinDiaryModule
  /**
   * The `GenshinTCGModule` object provides an interface to interact with the user diary feature in Genshin Impact.
   *
   */
  readonly tcg: GenshinTCGModule
  /**
   * HoyYolab account object
   *
   */
  private _account
  /**
   * The cookie object to be used in requests.
   */
  readonly cookie: ICookie
  /**
   * The `Request` object used to make requests.
   */
  private request
  /**
   * The UID of the user, if available.
   */
  readonly uid: number | null
  /**
   * The region of the user, if available.
   */
  readonly region: string | null
  /**
   * The language to be used in requests.
   */
  private lang
  /**
   * Constructs a new `Genshin` object.
   *
   * @param options The options object used to configure the object.
   */
  constructor(options: IGenshinOptions)
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
  static create(options: IGenshinOptions): Promise<GenshinImpact>
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
   * Get user's Genshin Impact record
   *
   * @alias {@link GenshinImpact.record | Genshin.record.records()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.records()} instead
   */
  records(): Promise<import('./record').IGenshinRecord>
  /**
   * Retrieves the Genshin characters of the user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.characters()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.characters()} instead
   */
  characters(): Promise<import('./record').IGenshinCharacters>
  /**
   * Returns the summary information of Genshin Impact game characters
   *
   * @param characterIds number[] Characters ID
   * @alias {@link GenshinImpact.record | Genshin.record.charactersSummary()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.charactersSummary()} instead
   */
  charactersSummary(
    characterIds: number[],
  ): Promise<import('./record').IGenshinCharacterSummary>
  /**
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType SpiralAbyssScheduleEnum
   * @alias {@link GenshinImpact.record | Genshin.record.spiralAbyss()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.spiralAbyss()} instead
   */
  spiralAbyss(
    scheduleType?: SpiralAbyssScheduleEnum,
  ): Promise<import('./record').IGenshinSpiralAbyss>
  /**
   * Retrieve the daily note information for a Genshin Impact user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.dailyNote()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.dailyNote()} instead
   */
  dailyNote(): Promise<import('./record').IGenshinDailyNote>
  /**
   * Returns the diary information of a given month for a user
   *
   * @param month
   * @alias {@link GenshinImpact.diary | Genshin.diary.list()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.list()} instead
   */
  diaryList(
    month?: DiaryMonthEnum,
  ): Promise<import('./diary').IGenshinDiaryInfo>
  /**
   * Returns the diary details of a given type and month for a user
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @alias {@link GenshinImpact.diary | Genshin.diary.detail()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.detail()} instead
   */
  diaryDetail(
    type: DiaryEnum,
    month?: DiaryMonthEnum,
  ): Promise<import('./diary').IGenshinDiaryDetail>
  /**
   * Retrieves daily information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.info()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.info()} instead
   */
  dailyInfo(): Promise<import('../../module/daily').IDailyInfo>
  /**
   * Retrieve daily rewards information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.rewards()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.rewards()} instead
   */
  dailyRewards(): Promise<import('../../module/daily').IDailyRewards>
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param day number | null
   * @alias {@link GenshinImpact.daily | Genshin.daily.reward()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.reward()} instead
   */
  dailyReward(
    day?: number | null,
  ): Promise<import('../../module/daily').IDailyReward>
  /**
   * Claim current reward
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.claim()} instead
   */
  dailyClaim(): Promise<import('../../module/daily').IDailyClaim>
  /**
   * Redeems a code for a specific account.
   *
   * @param code string
   * @alias {@link GenshinImpact.daily | Genshin.redeem.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.redeem.claim()} instead
   */
  redeemCode(code: string): Promise<import('../../module/redeem').IRedeemCode>
}
