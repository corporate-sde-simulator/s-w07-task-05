const CacheWarmer = require("../src/cacheWarmer.js");
const WarmingStrategy = require("../src/warmingStrategy.js");

describe("Cache warming strategy engine", () => {
    test("should process valid input", () => {
        const obj = new CacheWarmer();
        expect(obj.process({ key: "val" })).not.toBeNull();
    });
    test("should handle null", () => {
        const obj = new CacheWarmer();
        expect(obj.process(null)).toBeNull();
    });
    test("should track stats", () => {
        const obj = new CacheWarmer();
        obj.process({ x: 1 });
        expect(obj.getStats().processed).toBe(1);
    });
    test("support should work", () => {
        const obj = new WarmingStrategy();
        expect(obj.process({ data: "test" })).not.toBeNull();
    });
});
