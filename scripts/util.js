class WellDefinedStorage {
  constructor(
/** object with get/set props, i.e.:
 *
 * {
 *   get: (k) => (any | undefined),
 *   set: (k, v) => (void | any)
 * }
 */   store,
 /** array of well-known storage property keys, e.g.:
  *
  * ["well-known storage 🔑", "🗝️2", ...] |
  */...keys
  ) {
    keys.forEach(key => {
      Object.defineProperty(this, key, {
        get: () => store.get(key),
        set: (v) => store.set(key, v)
      });
    });

    Object.freeze(this);
  }
}
