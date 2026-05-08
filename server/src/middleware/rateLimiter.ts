// import rateLimit from 'express-rate-limit'

// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: { message: "Too many requests, please try again later" }
// })
// export const globalLimiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   max: 100,
//   message: { message: "Too many requests, please slow down" },
//   standardHeaders: true,
//   legacyHeaders: false,
// })