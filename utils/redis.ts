/**
 * Redis utility functions for Upstash
 */
import { Redis } from "@upstash/redis"
import { ENV } from "../config/env"

// Create Redis client instance
export const redis = new Redis({
  url: ENV.REDIS.URL,
  token: ENV.REDIS.REST_API_TOKEN,
})

/**
 * Set a value in Redis cache with optional expiration
 *
 * @param key Cache key
 * @param value Value to store
 * @param expireSeconds Expiration time in seconds (optional)
 * @returns Success status
 */
export async function setCache<T>(key: string, value: T, expireSeconds?: number): Promise<boolean> {
  try {
    if (expireSeconds) {
      await redis.set(key, JSON.stringify(value), { ex: expireSeconds })
    } else {
      await redis.set(key, JSON.stringify(value))
    }
    return true
  } catch (error) {
    console.error("Redis set error:", error)
    return false
  }
}

/**
 * Get a value from Redis cache
 *
 * @param key Cache key
 * @param defaultValue Default value if key doesn't exist
 * @returns Cached value or default
 */
export async function getCache<T>(key: string, defaultValue: T | null = null): Promise<T | null> {
  try {
    const value = await redis.get(key)
    if (value === null) return defaultValue
    return JSON.parse(value as string) as T
  } catch (error) {
    console.error("Redis get error:", error)
    return defaultValue
  }
}

/**
 * Delete a value from Redis cache
 *
 * @param key Cache key
 * @returns Success status
 */
export async function deleteCache(key: string): Promise<boolean> {
  try {
    await redis.del(key)
    return true
  } catch (error) {
    console.error("Redis delete error:", error)
    return false
  }
}

/**
 * Check if Redis connection is working
 *
 * @returns Boolean indicating if connection is successful
 */
export async function checkRedisConnection(): Promise<boolean> {
  try {
    const pingResult = await redis.ping()
    return pingResult === "PONG"
  } catch (error) {
    console.error("Redis connection error:", error)
    return false
  }
}
