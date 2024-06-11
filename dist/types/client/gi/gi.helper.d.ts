import { GenshinRegion } from './gi.interface'
/**
 * Get Genshin Impact region based on UID.
 *
 * @param uid User ID.
 * @returns Region for the UID.
 * @throws `HoyoAPIError` when the UID is invalid.
 */
export declare function getGenshinRegion(uid: number): GenshinRegion
