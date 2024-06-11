import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  IGenshinTCGBasicInfo,
  IGenshinTCGCards,
  IGenshinTCGDeck,
  IGenshinTCGMatchs,
  IGenshinTCGRecord,
  IGenshinTCGScheduleBasic,
} from './tcg.interface'
/**
 * Represents a module for the Genshin Impact TCG.
 *
 * @class
 * @internal
 * @category Module
 */
export declare class GenshinTCGModule {
  private request
  private lang
  private region
  private uid
  /**
   * Creates an instance of the GenshinTCGModule.
   * @param request - The HTTP request object.
   * @param lang - The language enumeration for the module.
   * @param region - The region string or null.
   * @param uid - The UID number or null.
   */
  constructor(
    request: HTTPRequest,
    lang: LanguageEnum,
    region: string | null,
    uid: number | null,
  )
  /**
   * Retrieves basic information for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGBasicInfo>} The Genshin Impact TCG basic information.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  basicInfo(): Promise<IGenshinTCGBasicInfo>
  /**
   * Retrieves the cards for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGCards>} The Genshin Impact TCG cards.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  cards(): Promise<IGenshinTCGCards>
  /**
   * Retrieves the match data for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGMatchs>} The Genshin Impact TCG match data.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  matchs(): Promise<IGenshinTCGMatchs>
  /**
   * Retrieves the challenge schedule for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGScheduleBasic[]>} The Genshin Impact TCG challenge schedule.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  challengeSchedule(): Promise<IGenshinTCGScheduleBasic[]>
  /**
   * Retrieves the challenge record for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGRecord>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  challengeRecord(schedule_id: number): Promise<IGenshinTCGRecord>
  /**
   * Retrieves the challenge deck for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGDeck>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @param deck_id Deck ID from {@link GenshinTCGModule.challengeRecord | GenshinTCGModule.challengeRecord()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  challangeDeck(schedule_id: number, deck_id: number): Promise<IGenshinTCGDeck>
}
