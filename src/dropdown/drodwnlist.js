const data = {
  national: {
    key: "national",
    displayName: "National",
    type: "NATIONAL",
    child: null,
  },
  province: {
    key: "province",
    displayName: "Province",
    type: "PROVINCE",
    child: {
      key: "province",
      displayName: "Province",
      url: "geo-data/provinces",
      child: null,
    },
  },
  district: {
    key: "district",
    displayName: "District",
    type: "DISTRICT",
    child: {
      key: "district",
      displayName: "District",
      url: "geo-data/districts",
      child: null,
    },
  },
  DSDivision: {
    displayName: "DS Division",
    type: "DSDIVISION",
    child: {
      key: "District",
      displayName: "District",
      url: "geo-data/districts",
      child: {
        key: "DsDivision",
        displayName: "DS Division",
        url: "geo-data/ds-divisions/by-district",
        child: null,
      },
    },
  },
  GNDivision: {
    displayName: "GN Division",
    type: "GNDIVISION",
    child: {
      key: "District",
      displayName: "District",
      url: "geo-data/districts",
      child: {
        key: "DsDivision",
        displayName: "DS Division",
        url: "geo-data/ds-divisions/by-district",
        child: {
          key: "GnDivision",
          displayName: "GN Division",
          url: "geo-data/gn-divisions/ds_division",
          child: null,
        },
      },
    },
  },
  provincialDirectorOfAgri: {
    displayName: "Provincial Director Of Agriculture",
    type: "PROVINCIAL_DOA",
    child: {
      key: "provincialDOA",
      displayName: "Provincial Director Of Agriculture",
      url: "geo-data/provincial-director-levels",
      child: null,
    },
  },
  deputiyDirOfAgriProvincial: {
    displayName: "Deputiy Director Of Agriculture Provincial",
    type: "PROVINCIAL_DDOA",
    child: {
      key: "deputiyDirOfAgriProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/provincial-deputy-director-level",
      child: null,
    },
  },
  ADASegmantProvincial: {
    displayName: "ADA Segmant Provincial",
    type: "PROVINCIAL_ADA",
    child: {
      key: "deputiyDirOfAgriProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/provincial-deputy-director-level",
      child: {
        key: "ADASegmentProvincial",
        displayName: "ADA Segment Provincial",
        url: "geo-data/provincial-ada-segments/pro-dd-id",
        child: null,
      },
    },
  },
  AIRegionProvincial: {
    key: "aIRegionProvincial",
    displayName: "AI Region Provincial",
    type: "PROVINCIAL_AI_REGION",
    child: {
      key: "deputiyDirOfAgriProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/provincial-deputy-director-level",
      child: {
        key: "ADASegmentProvincial",
        displayName: "ADA Segment Provincial",
        url: "geo-data/provincial-ada-segments/pro-dd-id",
        child: {
          key: "AiRegionProvincial",
          displayName: "AI Region",
          url: "geo-data/ai-region/get-by-parent/PROVINCIAL",
          child: null,
        },
      },
    },
  },
  gnDivisionProvincial: {
    key: "gnDivisionProvincial",
    displayName: "GN Division Provincial",
    type: "PROVINCIAL_GN_DIVISION",
    child: {
      key: "deputiyDirOfAgriProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/provincial-deputy-director-level",
      child: {
        key: "ADASegmentProvincial",
        displayName: "ADA Segment Provincial",
        url: "geo-data/provincial-ada-segments/pro-dd-id",
        child: {
          key: "AiRegionProvincial",
          displayName: "AI Region",
          url: "geo-data/ai-region/get-by-parent/PROVINCIAL",
          child: {
            key: "gnDivisionProvincial",
            displayName: "GN Division Provincial",
            url: "geo-data/gn-divisions/ai_region",
            child: null,
          },
        },
      },
    },
  },

  InterProvincialDirectorOfAgri: {
    displayName: "Inter Provincial Director Of Agriculture",
    type: "INTER_PROVINCIAL_DOA",
    child: {
      key: "interProvincialDOA",
      displayName: "Inter Provincial Director Of Agriculture",
      url: "geo-data/director-doa",
      child: null,
    },
  },
  deputiyDirOfAgriInterProvincial: {
    displayName: "Deputiy Director Of Agriculture Inter Provincial",
    type: "INTER_PROVINCIAL_DDOA",
    child: {
      key: "deputiyDirOfAgriInterProvincial",
      displayName: "Deputiy Director Of Agriculture Inter Provincial",
      url: "geo-data/interprovincial-dd-levels",
      child: null,
    },
  },
  ADASegmantInterProvincial: {
    displayName: "ADA Segmant Inter Provincial",
    type: "INTER_PROVINCIAL_ADA",
    child: {
      key: "deputiyDirOfAgriInterProvincial",
      displayName: "Deputiy Director Of Agriculture Inter Provincial",
      url: "geo-data/interprovincial-dd-levels",
      child: {
        key: "ADASegmantInterProvincial",
        displayName: "ADA Segments Inter Provincial",
        url: "geo-data/interprovincial-ada-segments/inter-province-dd",
        child: null,
      },
    },
  },
  AIRegionInterProvincial: {
    key: "AIRegionInterProvincial",
    displayName: "AI Region Inter Provincial",
    type: "INTER_PROVINCIAL_AI_REGION",
    child: {
      key: "deputiyDirOfAgriInterProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/interprovincial-dd-levels",
      child: {
        key: "ADASegmantInterProvincial",
        displayName: "ADA Segments Inter Provincial",
        url: "geo-data/interprovincial-ada-segments/inter-province-dd",
        child: {
          key: "AiRegionInterProvincial",
          displayName: "AI Region",
          url: "geo-data/ai-region/get-by-parent/INTER_PROVINCIAL",
          child: null,
        },
      },
    },
  },
  gnDivisionInterProvincial: {
    key: "gnDivisionInterProvincial",
    displayName: "GN Division Inter Provincial",
    type: "INTER_PROVINCIAL_GN_DIVISION",
    child: {
      key: "deputiyDirOfAgriInterProvincial",
      displayName: "Deputiy Director Of Agriculture Provincial",
      url: "geo-data/interprovincial-dd-levels",
      child: {
        key: "ADASegmantInterProvincial",
        displayName: "ADA Segments Inter Provincial",
        url: "geo-data/interprovincial-ada-segments/inter-province-dd",
        child: {
          key: "AiRegionInterProvincial",
          displayName: "AI Region",
          url: "geo-data/ai-region/get-by-parent/INTER_PROVINCIAL",
          child: {
            key: "gnDivisionInterProvincial",
            displayName: "GN Division Inter Provincial",
            url: "geo-data/gn-divisions/ai_region",
            child: null,
          },
        },
      },
    },
  },

  mahaweliAuthority: {
    key: "mahaweliAuthority",
    displayName: "Mahaweli Authority",
    type: "MAHAWELI_AUTHORITY",
    child: {
      key: "mahaweliAuthority",
      displayName: "Mahaweli Authority",
      url: "geo-data/mahaweli-authorities",
      child: null,
    },
  },
  mahaweliSystems: {
    key: "mahaweliSystems",
    displayName: "Mahaweli Systems",
    type: "MAHAWELI_SYSTEM",
    child: {
      key: "mahaweliSystems",
      displayName: "Mahaweli Systems",
      url: "geo-data/mahaweli-systems",
      child: null,
    },
  },
  block: {
    key: "block",
    displayName: "Mahaweli Block",
    type: "MAHAWELI_BLOCK",
    child: {
      key: "mahaweliSystems",
      displayName: "Mahaweli Systems",
      url: "geo-data/mahaweli-systems",
      child: {
        key: "mahaweliBlock",
        displayName: "Mahaweli Block",
        url: "geo-data/mahaweli-blocks/mahaweli-system",
        child: null,
      },
    },
  },
  mahaweliUnit: {
    key: "mahaweliUnit",
    displayName: "Mahaweli Unit",
    type: "MAHAWELI_UNIT",
    child: {
      key: "mahaweliSystems",
      displayName: "Mahaweli Systems",
      url: "geo-data/mahaweli-systems",
      child: {
        key: "mahaweliBlock",
        displayName: "Mahaweli Block",
        url: "geo-data/mahaweli-blocks/mahaweli-system",
        child: {
          key: "mahaweliUnit",
          displayName: "Mahaweli Unit",
          url: "geo-data/mahaweli-units/by-mahaweli-block",
          child: null,
        },
      },
    },
  },
  mahaweliGnDivision: {
    key: "mahaweliGnDivision",
    displayName: "Mahaweli GN Division",
    type: "MAHAWELI_GN_DIVISION",
    child: {
      key: "mahaweliSystems",
      displayName: "Mahaweli Systems",
      url: "geo-data/mahaweli-systems",
      child: {
        key: "mahaweliBlock",
        displayName: "Mahaweli Block",
        url: "geo-data/mahaweli-blocks/mahaweli-system",
        child: {
          key: "mahaweliUnit",
          displayName: "Mahaweli Unit",
          url: "geo-data/mahaweli-units/by-mahaweli-block",
          child: {
            key: "mahaweliGnDivision",
            displayName: "Mahaweli GN Division",
            url: "geo-data/gn-divisions/mahaweli_unit",
            child: null,
          },
        },
      },
    },
  },

  AgrarianDevDept: {
    key: "agrarianDevDept",
    displayName: "Department of Agrarian Development",
    type: "AGRAR_DEV_DEPT",
    child: {
      key: "agrarianDevDept",
      displayName: "Department of Agrarian Development",
      url: "geo-data/do_agrarian_development",
      child: null,
    },
  },
  districtCommisioner: {
    key: "districtCommisioner",
    displayName: "District Commissioner",
    type: "DISTRICT_COMMISSIONER",
    child: {
      key: "districtCommisioner",
      displayName: "District Commissioner",
      url: "geo-data/district-commissioner-level",
      child: null,
    },
  },
  ASCDivision: {
    key: "aSCDivision",
    displayName: "ASC Division",
    type: "ASC_DIVISION",
    child: {
      key: "districtCommisioner",
      displayName: "District Commissioner",
      url: "geo-data/district-commissioner-level",
      child: {
        key: "aSCDivision",
        displayName: "ASC Division",
        url: "geo-data/asc-divisions/districtCommissionerLevel",
        child: null,
      },
    },
  },
  ARPADivision: {
    key: "aRPADivision",
    displayName: "ARPA Division",
    type: "ARPA_DIVISION",
    child: {
      key: "districtCommisioner",
      displayName: "District Commissioner",
      url: "geo-data/district-commissioner-level",
      child: {
        key: "aSCDivision",
        displayName: "ASC Division",
        url: "geo-data/asc-divisions/districtCommissionerLevel",
        child: {
          key: "aRPADivision",
          displayName: "ARPA Division",
          url: "geo-data/arpa/AscDivision",
          child: null,
        },
      },
    },
  },
  AgrGnDivision: {
    key: "agrGnDivision",
    displayName: "Agrarian GN Division",
    type: "ARPA_DIVISION",
    child: {
      key: "districtCommisioner",
      displayName: "District Commissioner",
      url: "geo-data/district-commissioner-level",
      child: {
        key: "aSCDivision",
        displayName: "ASC Division",
        url: "geo-data/asc-divisions/districtCommissionerLevel",
        child: {
          key: "aRPADivision",
          displayName: "ARPA Division",
          url: "geo-data/arpa/AscDivision",
          child: {
            key: "agrGnDivision",
            displayName: "Agrarian GN Division",
            url: "geo-data/gn-divisions/AGRARIAN",
            child: null,
          },
        },
      },
    },
  },
  agroEcologicalZones: {
    key: "agroEcologicalZones",
    displayName: "Agro Ecological Zones",
    type: "AGRO_ECO_ZONE",
    child: {
      key: "agroEcologicalZones",
      displayName: "Agro Ecological Zones",
      url: "aez",
      child: null,
    },
  },
  scsService: {
    key: "scsService",
    displayName: "SCS Head Office",
    type: "SCS",
    child: {
      key: "SCS",
      displayName: "SCS Head Office",
      url: "geo-data/scs-services",
      child: null,
    },
  },
  scsBranch: {
    key: "scsBranch",
    displayName: "SCS Region",
    type: "SCSBRANCH",
    child: {
      key: "SCSBRANCH",
      displayName: "SCS Region",
      url: "geo-data/scs-regions",
      child: null,
    },
  },
};

module.exports = data;
