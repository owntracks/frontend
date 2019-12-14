import config from "@/config";
import {
  getApiUrl,
  isIsoDateTime,
  degreesToRadians,
  distanceBetweenCoordinates,
} from "@/util";

describe("getApiUrl", () => {
  test("without base URL", () => {
    // See testURL in jest.config.js
    expect(getApiUrl("foo").href).toBe("http://localhost/foo");
    expect(getApiUrl("/foo").href).toBe("http://localhost/foo");
    expect(getApiUrl("/foo/bar").href).toBe("http://localhost/foo/bar");
  });

  test("with base URL", () => {
    config.api.baseUrl = "http://example.com/owntracks";
    expect(getApiUrl("foo").href).toBe("http://example.com/owntracks/foo");
    expect(getApiUrl("/foo").href).toBe("http://example.com/owntracks/foo");
    expect(getApiUrl("/foo/bar").href).toBe(
      "http://example.com/owntracks/foo/bar"
    );
  });
});

describe("isIsoDateTime", () => {
  test("no match", () => {
    expect(isIsoDateTime("foo")).toBe(false);
    expect(isIsoDateTime("2019")).toBe(false);
    expect(isIsoDateTime("2019-09")).toBe(false);
    expect(isIsoDateTime("2019.09.27")).toBe(false);
    expect(isIsoDateTime("2019_09_27")).toBe(false);
    expect(isIsoDateTime("2019/09/27")).toBe(false);
    expect(isIsoDateTime("27-09-2019")).toBe(false);
    expect(isIsoDateTime("27.09.2019")).toBe(false);
    expect(isIsoDateTime("27_09_2019")).toBe(false);
    expect(isIsoDateTime("27/09/2019")).toBe(false);
    expect(isIsoDateTime("0000-00-00")).toBe(false);
    expect(isIsoDateTime("1234-56-78")).toBe(false);
    expect(isIsoDateTime("0000-00-00T00:00:00")).toBe(false);
    expect(isIsoDateTime("0000-01-01T25:60:60")).toBe(false);
    expect(isIsoDateTime("2019-12-14T99:00:00")).toBe(false);
    expect(isIsoDateTime("2019-12-14 25:60:60")).toBe(false);
  });

  test("match", () => {
    expect(isIsoDateTime("0000-01-01T00:00:00")).toBe(true);
    expect(isIsoDateTime("0000-01-01T12:34:56")).toBe(true);
    expect(isIsoDateTime("0000-01-01T23:59:59")).toBe(true);
    expect(isIsoDateTime("2019-09-27T00:00:00")).toBe(true);
    expect(isIsoDateTime("2019-09-27T12:34:56")).toBe(true);
    expect(isIsoDateTime("2019-09-27T23:59:59")).toBe(true);
    expect(isIsoDateTime("9999-12-31T00:00:00")).toBe(true);
    expect(isIsoDateTime("9999-12-31T12:34:56")).toBe(true);
    expect(isIsoDateTime("9999-12-31T23:59:59")).toBe(true);
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
    ).toBe(3734.3632679046705);

    // Gatwick Airport - Heathrow Airport
    expect(
      distanceBetweenCoordinates(
        { lat: 51.1526929, lng: -0.1752475 },
        { lat: 51.4720694, lng: -0.4499871 }
      )
      // 40km according to Google Maps
    ).toBe(40321.457586930104);

    // Berlin - San Francisco
    expect(
      distanceBetweenCoordinates(
        { lat: 52.5067614, lng: 13.284651 },
        { lat: 37.7576948, lng: -122.4726193 }
      )
      // 9,102.73km according to Google Maps
    ).toBe(9105627.810109457);
  });
});
