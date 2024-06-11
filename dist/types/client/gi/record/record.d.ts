import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  IGenshinCharacterSummary,
  IGenshinCharacters,
  IGenshinDailyNote,
  IGenshinRecord,
  IGenshinSpiralAbyss,
} from './interfaces'
import { SpiralAbyssScheduleEnum } from './record.enum'
/**
 * GenshinRecordModule class provides methods to interact with Genshin Impact's record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export declare class GenshinRecordModule {
  private request
  private lang
  private region
  private uid
  /**
   * Creates an instance of GenshinRecordModule.
   *
   * @constructor
   * @param {HTTPRequest} request - An instance of Request class.
   * @param {LanguageEnum} lang - The language code to be used in requests.
   * @param {string | null} region - The server region code in which the user's account resides.
   * @param {number | null} uid - The user ID of the Genshin Impact account.
   */
  constructor(
    request: HTTPRequest,
    lang: LanguageEnum,
    region: string | null,
    uid: number | null,
  )
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
  records(): Promise<IGenshinRecord>
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
  characters(): Promise<IGenshinCharacters>
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
  charactersSummary(characterIds: number[]): Promise<IGenshinCharacterSummary>
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
  spiralAbyss(
    scheduleType?: SpiralAbyssScheduleEnum,
  ): Promise<IGenshinSpiralAbyss>
  /**
   * Retrieve the daily note information for a Genshin Impact user.
   * @returns {Promise<IGenshinDailyNote>} The daily note information.
   * @throws {HoyoAPIError} if the UID parameter is missing or failed to be filled.
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  dailyNote(): Promise<IGenshinDailyNote>
}
