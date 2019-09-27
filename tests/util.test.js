import config from "@/config";
import {
  getApiUrl,
  isIsoDate,
  degreesToRadians,
  distanceBetweenCoordinates,
} from "@/util";

describe("getApiUrl", () => {
  test("without base URL", () => {
    // See testURL in jest.config.js
    expect(getApiUrl("foo")).toBe("http://localhost/foo");
    expect(getApiUrl("/foo")).toBe("http://localhost/foo");
    expect(getApiUrl("/foo/bar")).toBe("http://localhost/foo/bar");
  });

  test("with base URL", () => {
    config.api.baseUrl = "http://example.com/owntracks";
    expect(getApiUrl("foo")).toBe("http://example.com/owntracks/foo");
    expect(getApiUrl("/foo")).toBe("http://example.com/owntracks/foo");
    expect(getApiUrl("/foo/bar")).toBe("http://example.com/owntracks/foo/bar");
  });
});

describe("isIsoDate", () => {
  test("no match", () => {
    expect(isIsoDate("foo")).toBe(false);
    expect(isIsoDate("2019")).toBe(false);
    expect(isIsoDate("2019-09")).toBe(false);
    expect(isIsoDate("2019.09.27")).toBe(false);
    expect(isIsoDate("2019_09_27")).toBe(false);
    expect(isIsoDate("2019/09/27")).toBe(false);
    expect(isIsoDate("27-09-2019")).toBe(false);
    expect(isIsoDate("27.09.2019")).toBe(false);
    expect(isIsoDate("27_09_2019")).toBe(false);
    expect(isIsoDate("27/09/2019")).toBe(false);
    expect(isIsoDate("0000-00-00")).toBe(false);
    expect(isIsoDate("1234-56-78")).toBe(false);
  });

  test("match", () => {
    expect(isIsoDate("0000-01-01")).toBe(true);
    expect(isIsoDate("2019-09-27")).toBe(true);
    expect(isIsoDate("9999-12-31")).toBe(true);
  });
});

describe("degreesToRadians", () => {
  test("expected results", () => {
    expect(degreesToRadians(0)).toBe(0);
    expect(degreesToRadians(45)).toBe(0.7853981633974483);
    expect(degreesToRadians(90)).toBe(1.5707963267948966);
    expect(degreesToRadians(180)).toBe(3.141592653589793);
    expect(degreesToRadians(360)).toBe(6.283185307179586);
    expect(degreesToRadians(-180)).toBe(-3.141592653589793);
  });
});

describe("distanceBetweenCoordinates", () => {
  test("expected results", () => {
    expect(
      distanceBetweenCoordinates({ lat: 0, lng: 0 }, { lat: 0, lng: 0 })
    ).toBe(0);
    // The Shard - Victoria Memorial

    expect(
      distanceBetweenCoordinates(
        { lat: 51.5046678, lng: -0.0870769 },
        { lat: 51.501752, lng: -0.1408258 }
      )
      // 3.74km according to Google Maps
    ).toBe(3734.363267904623);

    // Gatwick Airport - Heathrow Airport
    expect(
      distanceBetweenCoordinates(
        { lat: 51.1526929, lng: -0.1752475 },
        { lat: 51.4720694, lng: -0.4499871 }
      )
      // 40km according to Google Maps
    ).toBe(40321.45758693094);

    // Berlin - San Francisco
    expect(
      distanceBetweenCoordinates(
        { lat: 52.5067614, lng: 13.284651 },
        { lat: 37.7576948, lng: -122.4726193 }
      )
      // 9,102.73km according to Google Maps
    ).toBe(9105627.810109459);
  });
});
