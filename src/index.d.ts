/** Configuration object. */
interface Config {
    api: {
        baseUrl: string;
        fetchOptions: object;
    };
    endDateTime: Date;
    filters: {
      minAccuracy: number | null,
    };
    ignorePingLocation: boolean;
    locale: string;
    map: {
        attribution: string;
        circle: {
          color: OptionalColor;
          fillColor: OptionalColor;
          fillOpacity: number;
        };
        circleMarker: {
          color: OptionalColor;
          fillColor: OptionalColor;
          fillOpacity: number;
          radius: number;
        };
        controls: {
          scale: {
            display: boolean;
            imperial: boolean;
            maxWidth: number;
            metric: boolean;
            position: string;
          };
          zoom: {
            display: boolean;
            position: string;
          };
        };
        heatmap: {
          blur: number;
          gradient: { number: Color } | null;
          max: number;
          radius: number;
        };
        layers: {
          heatmap: boolean;
          last: boolean;
          line: boolean;
          points: boolean;
        };
        maxNativeZoom: number;
        maxPointDistance: number | null;
        maxZoom: number;
        polyline: {
          color: OptionalColor;
          fillColor: OptionalColor;
        };
        url: string;
    };
    onLocationChange: {
        fitView: boolean;
        reloadHistory: boolean;
    };
    primaryColor: Color;
    router: {
      basePath: string;
    };
    selectedUser: User | null;
    selectedDevice: Device | null;
    showDistanceTravelled: boolean;
    startDateTime: Date;
    verbose: boolean;
}

/** Vuex state. */
interface State {
    isLoading: boolean;
    frontendVersion: string;
    recorderVersion: string;
    users: User[];
    devices: { User: Device[] };
    lastLocations: OTLocation[];
    locationHistory: LocationHistory;
    selectedUser: User | null;
    selectedDevice: Device | null;
    startDateTime: string;
    endDateTime: string;
    map: {
        center: {
            lat: number;
            lng: number;
        };
        layers: {
            heatmap: boolean;
            last: boolean;
            line: boolean;
            points: boolean;
        };
        zoom: number;
    };
}

/**
 * A location object as returned by the OwnTracks recorder.
 * https://owntracks.org/booklet/tech/json/#_typelocation
 */
interface OTLocation {
    _http: boolean;
    /**
     * In this case always "location"
     * https://owntracks.org/booklet/tech/json/#types
     */
    _type: string;
    /** Accuracy in meters */
    acc?: number;
    /** Altitude above sea level in meters */
    alt?: number;
    /** Device battery level in percent */
    batt?: number;
    /**
     * Battery status (iOS only)
     *
     * - `0` = unknown
     * - `1` = unplugged
     * - `2` = charging
     * - `3` = full
     */
    bs?: number;
    /** Course over ground in degrees (iOS only) */
    cog?: number;
    /**
     * Internet connectivity status (route to host) when the message is created
     *
     * - `"w"` = phone is connected to a WiFi connection
     * - `"o"` = phone is offline
     * - `"m"` = mobile data
     */
    conn?: string;
    /** identifies the time at which the message is constructed (vs. `tst` which is the timestamp of the GPS fix) */
    created_at?: string;
    /** Device name */
    device?: Device;
    /** Timestamp in a readable format */
    disptst: string;
    /** Base64-encoded face image (device icon) */
    face?: string;
    /**
     * Geohash of the location
     * https://en.wikipedia.org/wiki/Geohash
     */
    ghash?: string;
    /** contains a list of regions the device is currently in (e.g. ["Home","Garage"]). Might be empty.  */
    inregions?: string[];
    /** contains a list of region IDs the device is currently in (e.g. ["6da9cf","3defa7"]). Might be empty. */
    inrids?: string[];
    /**
     * No idea; some kind of timestamp as well - figure it out yourself. :)
     * https://github.com/owntracks/recorder/blob/df009f791a845012e9cce24923e6203a079ca1ed/storage.c#L659
     * https://github.com/owntracks/recorder/blob/df009f791a845012e9cce24923e6203a079ca1ed/storage.c#L704
     */
    isorcv?: string;
    /** ISO 8601 timestamp */
    isotst?: string;
    /** Latitude in degrees */
    lat: number;
    /** Longitude in degrees */
    lon: number;
    /** Friendly device name */
    name?: string;
    /**
     * Trigger for the location report
     *
     * - `"p"` = ping issued randomly by background task
     * - `"c"` = circular region enter/leave event
     * - `"b"` = beacon region enter/leave event (iOS only)
     * - `"r"` = response to a reportLocation cmd message
     * - `"u"` = manual publish requested by the user
     * - `"t"` = timer based publish in move move (iOS only)
     * - `"v"` = updated by Settings/Privacy/Locations Services/System Services/Frequent Locations monitoring (iOS only)
     */
    t?: string;
    /** Tracker ID used to display the initials of a user */
    tid?: string;
    /**
     * Original publish topic
     * https://owntracks.org/booklet/tech/json/#topics
     */
    topic?: string;
    /** UNIX epoch timestamp of the location fix in seconds */
    tst: number;
    /** User */
    username?: User;
    /** Vertical accuracy of the alt element in meters */
    vac?: number;
    /** Velocity in km/h */
    vel?: number;
    /** SSID, if available, is the unique name of the WLAN. */
    SSID?: string;
    /** BSSID, if available, identifies the access point. */
    BSSID?: string;
}

/** URL query parameters (prior to any parsing so it's all strings). */
interface QueryParams {
    /** Map center latitude */
    lat?: string;
    /** Map center longitude */
    lng?: string;
    /** Start date and time of selected time range */
    start?: string;
    /** End date and time of selected time range */
    end?: string;
    /** Selected user */
    user?: string;
    /** Selected device */
    device?: string;
    /** Comma-separated list of active layers */
    layers?: string;
}

/** Callback for new WebSocket location messages. */
interface WebSocketLocationCallback { (): void }

/** Function for lazy evaluation of log messages. */
interface LogMessageFunction { (): string }

/** A CSS color. */
type Color = string;

/** A CSS color that will use `primaryColor` as fallback. */
type OptionalColor = Color | null;

/** A user's name. */
type User = string;

/** A device's name. */
type Device = string;

/** Multiple location histories mapped to user and devices. */
type LocationHistory = { User: { Device: OTLocation[] } };
