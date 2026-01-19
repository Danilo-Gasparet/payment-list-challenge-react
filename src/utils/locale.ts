/**
 * Get the user's locale for internationalization.
 */
export const getLocale = (): string | undefined => {
  if (typeof navigator === "undefined") {
    return undefined;
  }

  return navigator.language;
};
