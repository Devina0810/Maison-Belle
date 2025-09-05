import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

// Temporarily disable Redis to reduce console spam
const redisDisabled = true;

export const redis = redisDisabled ? {
	// Mock Redis methods for when it's disabled
	set: () => Promise.resolve('OK'),
	get: () => Promise.resolve(null),
	del: () => Promise.resolve(1),
	on: () => {},
} : new Redis(process.env.UPSTASH_REDIS_URL, {
	maxRetriesPerRequest: 3,
	retryDelayOnFailover: 100,
	enableReadyCheck: false,
	lazyConnect: true,
	connectTimeout: 5000,
	commandTimeout: 5000,
});

if (!redisDisabled) {
	// Handle Redis connection errors gracefully
	redis.on('error', (err) => {
		console.log('Redis connection error:', err.message);
	});

	redis.on('connect', () => {
		console.log('Redis connected successfully');
	});
} else {
	console.log('Redis is temporarily disabled for development');
}
