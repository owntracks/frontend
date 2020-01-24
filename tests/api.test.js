import * as api from "@/api";

describe("API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("getVersion", async () => {
    fetch.mockResponse(JSON.stringify({ version: "1.2.3" }));

    const version = await api.getVersion();
    expect(version).toBe("1.2.3");

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost/api/0/version");
  });

  test("getUsers", async () => {
    fetch.mockResponse(JSON.stringify({ results: ["foo", "bar"] }));

    const users = await api.getUsers();
    expect(users).toEqual(["foo", "bar"]);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost/api/0/list");
  });

  test("getDevices", async () => {
    fetch.mockResponses(
      [JSON.stringify({ results: ["phone", "tablet"] })],
      [JSON.stringify({ results: ["laptop"] })]
    );

    const devices = await api.getDevices(["foo", "bar"]);
    expect(devices).toEqual({ foo: ["phone", "tablet"], bar: ["laptop"] });

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual(
      "http://localhost/api/0/list?user=foo"
    );
    expect(fetch.mock.calls[1][0]).toEqual(
      "http://localhost/api/0/list?user=bar"
    );
  });

  test("getLastLocations", async () => {
    const response = [
      {
        _type: "location",
        tid: "pp",
        lat: 51.47879,
        lon: -0.010677,
        tst: 0,
        _http: true,
        topic: "owntracks/ping/ping",
        username: "ping",
        device: "ping",
        ghash: "gcpuzg2",
        isotst: "1970-01-01T00:00:00Z",
        disptst: "1970-01-01 00:00:00",
      },
    ];
    fetch.mockResponse(JSON.stringify(response));

    const lastLocation = await api.getLastLocations();
    expect(lastLocation).toEqual(response);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost/api/0/last");
  });

  test("getLastLocations with user", async () => {
    const response = [
      // Other properties not relevant for testing
      {
        username: "foo",
        device: "phone",
      },
      {
        username: "foo",
        device: "tablet",
      },
    ];
    fetch.mockResponse(JSON.stringify(response));

    const lastLocation = await api.getLastLocations("foo");
    expect(lastLocation).toEqual(response);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "http://localhost/api/0/last?user=foo"
    );
  });

  test("getLastLocations with user and device", async () => {
    const response = [
      // Other properties not relevant for testing
      {
        username: "foo",
        device: "phone",
      },
    ];
    fetch.mockResponse(JSON.stringify(response));

    const lastLocation = await api.getLastLocations("foo", "phone");
    expect(lastLocation).toEqual(response);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "http://localhost/api/0/last?user=foo&device=phone"
    );
  });

  test("getUserDeviceLocationHistory", async () => {
    const response = {
      count: 1,
      data: [
        {
          batt: 100,
          lon: -0.010677,
          acc: 20,
          bs: 1,
          vac: 10,
          topic: "owntracks/foo/phone",
          lat: 51.47879,
          conn: "w",
          tst: 1568841029,
          alt: 31,
          _type: "location",
          tid: "AD",
          _http: true,
          ghash: "gcpv4k9",
          isorcv: "2019-09-18T21:10:29Z",
          isotst: "2019-09-18T21:10:29Z",
          disptst: "2019-09-18 21:10:29",
        },
      ],
      status: 200,
    };
    fetch.mockResponse(JSON.stringify(response));

    const locationHistory = await api.getUserDeviceLocationHistory(
      "foo",
      "phone",
      "1970-01-01T00:00:00",
      "1970-12-31T23:59:59"
    );
    expect(locationHistory).toEqual(response.data);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "http://localhost/api/0/locations?from=1970-01-01T00%3A00%3A00&to=1970-12-31T23%3A59%3A59&user=foo&device=phone&format=json"
    );
  });

  test("getLocationHistory", async () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          count: 1,
          data: [
            {
              topic: "owntracks/foo/phone",
            },
          ],
          status: 200,
        }),
      ],
      [
        JSON.stringify({
          count: 1,
          data: [
            {
              topic: "owntracks/foo/tablet",
            },
          ],
          status: 200,
        }),
      ],
      [
        JSON.stringify({
          count: 1,
          data: [
            {
              topic: "owntracks/bar/laptop",
            },
          ],
          status: 200,
        }),
      ]
    );

    const locationHistory = await api.getLocationHistory(
      { foo: ["phone", "tablet"], bar: ["laptop"] },
      "1970-01-01T00:00:00",
      "1970-12-31T23:59:59"
    );
    expect(locationHistory).toEqual({
      foo: {
        phone: [{ topic: "owntracks/foo/phone" }],
        tablet: [{ topic: "owntracks/foo/tablet" }],
      },
      bar: { laptop: [{ topic: "owntracks/bar/laptop" }] },
    });

    expect(fetch.mock.calls.length).toEqual(3);
    expect(fetch.mock.calls[0][0]).toEqual(
      "http://localhost/api/0/locations?from=1970-01-01T00%3A00%3A00&to=1970-12-31T23%3A59%3A59&user=foo&device=phone&format=json"
    );
    expect(fetch.mock.calls[1][0]).toEqual(
      "http://localhost/api/0/locations?from=1970-01-01T00%3A00%3A00&to=1970-12-31T23%3A59%3A59&user=foo&device=tablet&format=json"
    );
    expect(fetch.mock.calls[2][0]).toEqual(
      "http://localhost/api/0/locations?from=1970-01-01T00%3A00%3A00&to=1970-12-31T23%3A59%3A59&user=bar&device=laptop&format=json"
    );
  });
});
