import { HonkaiRegion } from './hi.interface'
/**
 * Gets the Honkai region from a given UID.
 * @function
 * @param {number} uid - The UID to get the Honkai region for.
 * @returns {HonkaiRegion} - The Honkai region for the given UID.
 * @throws {HoyoAPIError} - If the UID is invalid.
 */
export declare function getHi3Region(uid: number): HonkaiRegion
