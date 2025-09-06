export const log = {
  info: (...args: unknown[]) => console.log("[INFO]", ...args),
  error: (...args: unknown[]) => console.error("[ERROR]", ...args),
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.debug("[DEBUG]", ...args);
  }
};
