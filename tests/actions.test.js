import { describe, it, expect, vi, beforeEach } from "vitest";
import { _getTravelStats } from "@/store/actions";

import { L } from "leaflet";

describe("_getTravelStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calculates total distance and elevation with and without alt", () => {
    const testData = {
      user1: {
        device1: [
          { lat: 52.214908, lon: 8.116938, alt: 100, acc: 5 },
          { lat: 52.214908, lon: 8.116938, alt: 105, acc: 5 },
          { lat: 52.220619, lon: 8.104137, /* no alt */ acc: 5 },
          { lat: 52.220619, lon: 8.104137, alt: 95, acc: 5 },
          { lat: 52.227348, lon: 8.094349, /* no alt */ acc: 5 },
        ],
      },
    };

    const stats = _getTravelStats(testData);

    expect(stats.distanceTravelled).toBeCloseTo(2080.9568);
    expect(stats.elevationGain).toBe(5);
    expect(stats.elevationLoss).toBe(10);
  });

});
