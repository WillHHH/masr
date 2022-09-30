import type { NextRequest } from "next/server";

const config = {
  regionMappings: {
    eu: [
      "at",
      "be",
      "hr",
      "bg",
      "cy",
      "cz",
      "dk",
      "ee",
      "fi",
      "fr",
      "de",
      "gr",
      "hu",
      "ie",
      "it",
      "lv",
      "lt",
      "lu",
      "mt",
      "nl",
      "pl",
      "pt",
      "ro",
      "sk",
      "si",
      "es",
      "se",
    ],
    us: ["us", "um"],
    uk: ["uk", "gb"],
  },
  gtmMappings: {
    eu: "GTM-WZJHMZR",
    us: "GTM-NV8FF8G",
    uk: "GTM-KV2RFHD",
    global: "GTM-5VT65DQ",
  },
  gtmAuthMappings: {
    eu: "xiIV7RCPmkcHQbl97pKM7Q",
    us: "APMXnuQUmkL2KZTRXHE7tA",
    uk: "BOvPUnUyl0p61HZ7vJ7-FA",
    global: "C_yNzouWntiX0ZaVjjhiXg",
  },
  gtmEnvMappings: {
    eu: "env-39",
    us: "env-32",
    uk: "env-30",
    global: "env-30",
  },
};

export function getRegion(req: NextRequest) {
  let region = "global";
  const headerRegion = req.geo.country?.toLowerCase();

  for (const regionId in config.regionMappings) {
    if (!config.regionMappings.hasOwnProperty(regionId)) continue;
    if (config.regionMappings[regionId].includes(headerRegion)) {
      region = regionId;
      break;
    }
  }

  return region;
}

export function getRegionGTM(region: string) {
  return config.gtmMappings[region] ?? config.gtmMappings.global;
}

export function getAuthRegionGTM(region: string) {
  return config.gtmAuthMappings[region] ?? config.gtmAuthMappings.global;
}

export function getEnvRegionGTM(region: string) {
  return config.gtmEnvMappings[region] ?? config.gtmEnvMappings.global;
}
