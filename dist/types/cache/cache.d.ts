/**
 * Represents an in-memory cache with TTL (Time To Live) support.
 */
export declare class Cache {
  private cache
  private maxCacheCap
  /**
   * Creates an instance of Cache.
   */
  constructor()
  /**
   * Calculates the maximum capacity of the cache based on available system memory.
   * @returns The maximum capacity of the cache.
   */
  private calculateMaxCapacity
  /**
   * Retrieves the value associated with the specified key from the cache.
   * @param key - The key to look up in the cache.
   * @returns The cached value if found and not expired; otherwise, returns null.
   */
  get(key: string): any | null
  /**
   * Stores a key-value pair in the cache with a specified TTL (Time To Live).
   * @param key - The key to store in the cache.
   * @param value - The value to associate with the key.
   * @param ttl - The TTL (Time To Live) in seconds for the cached entry.
   */
  set(key: string, value: any, ttl: number): void
  /**
   * Removes the entry with the specified key from the cache.
   * @param key - The key to delete from the cache.
   */
  delete(key: string): void
  /**
   * Checks if the cache contains an entry with the specified key.
   * @param key - The key to check in the cache.
   * @returns True if the cache contains the key; otherwise, false.
   */
  has(key: string): boolean
}
