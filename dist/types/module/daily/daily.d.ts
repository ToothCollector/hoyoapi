import { GamesEnum } from '../../client/hoyolab'
import { LanguageEnum } from '../../language'
import { HTTPRequest } from '../../request'
import {
  IDailyClaim,
  IDailyInfo,
  IDailyReward,
  IDailyRewards,
} from './daily.interface'
/**
 * DailyModule class provides methods to interact with Genshin Impact's daily module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export declare class DailyModule {
  private request
  private lang
  private game
  private region
  private dailyInfoUrl
  private dailyRewardUrl
  private dailySignUrl
  constructor(
    request: HTTPRequest,
    lang: LanguageEnum,
    game: GamesEnum,
    region: string | null,
  )
  /**
   * Retrieves daily information.
   *
   * @returns {Promise<IDailyInfo>} A promise that resolves to an IDailyInfo object.
   */
  info(): Promise<IDailyInfo>
  /**
   * Retrieve daily rewards information.
   *
   * @returns {Promise<IDailyRewards>} A promise that resolves to an IDailyRewards object.
   */
  rewards(): Promise<IDailyRewards>
  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param {number | null} day - The day to retrieve the reward for. If null, retrieve the reward for the current day.
   * @returns {Promise<IDailyReward>} - A promise that resolves with the daily reward for the specified day or the current day
   * @throws {HoyoAPIError} - If the specified day is not a valid date in the current month or if the reward for the specified day is undefined.
   */
  reward(day?: number | null): Promise<IDailyReward>
  /**
   * Claim the daily rewards.
   *
   * @returns {Promise<IDailyClaim>} The claim information.
   */
  claim(): Promise<IDailyClaim>
}
