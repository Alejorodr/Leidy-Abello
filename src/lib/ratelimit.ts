import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "leidy-abello:contact",
  analytics: false,
});
