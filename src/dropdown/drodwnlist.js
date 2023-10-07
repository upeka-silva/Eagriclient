const data = {
    "province": {
        "key": "province",
        "displayName": "Province",
        "type": "PROVINCE",
        "child": {
            "key": "province",
            "displayName": "Province",
            "url": "geo-data/provinces",
            "child": null
        }
    },
    "district": {
        "key": "district",
        "displayName": "District",
        "type": "DISTRICT",
        "child": {
            "key": "district",
            "displayName": "District",
            "url": "geo-data/districts",
            "child": null
        }
    },
    "AIRegionProvincial": {
        "key": "aIRegionProvincial",
        "displayName": "AI Region Provincial",
        "type": "AIREGION",
            "child": {
                "key": "deputiyDirOfAgriProvincial",
                "displayName": "Deputiy Director Of Agriculture Provincial",
                "url": "geo-data/provincial-deputy-director-level",
                "child": {
                    "key": "ADASegmentProvincial",
                    "displayName": "ADA Segment Provincial",
                    "url": "geo-data/provincial-ada-segments/pro-dd-id",
                    "child": {
                        "key": "AiRegionProvincial",
                        "displayName": "AI Region",
                        "url": "geo-data/ai-region/get-by-parent/PROVINCIAL",
                        "child": null
                    }
                } 
            }
    },
    "AIRegionInterProvincial": {
        "key": "AIRegionInterProvincial",
        "displayName": "AI Region Inter Provincial",
        "type": "AIREGIONINPRO",
        "child": {
            "key": "deputiyDirOfAgriProvincial",
            "displayName": "Deputiy Director Of Agriculture Provincial",
            "url": "geo-data/provincial-ada-segments",
            "child": {
                "key": "ADASegmantInterProvincial",
                "displayName": "Deputiy Director Of Agriculture Provincial",
                "url": "geo-data/provincial-ada-segments",
                "child": null
            }
        }
    },
}


module.exports = data;