const data = {
    "province": {
        "key": "province",
        "displayName": "Province",
        "type": "PROVINCE",
        "url": "geo-data/provinces",
        "child": null
    },
    "district": {
        "key": "district",
        "displayName": "District",
        "type": "DISTRICT",
        "url": "geo-data/districts",
        "child": null
    },
    "AIRegionProvincial": {
        "key": "aIRegionProvincial",
        "displayName": "AI Region Provincial",
        "type": "AIREGION",
        "url": null,
        "child": {
            "key": "deputiyDirOfAgriProvincial",
            "displayName": "Deputiy Director Of Agriculture Provincial",
            "url": "geo-data/provincial-deputy-director-level",
            "child": {
                "key": "ADASegmentProvincial",
                "displayName": "ADA Segment Provincial",
                "url": "geo-data/provincial-ada-segments",
                "child": null
            } 
        }
    },
    "AIRegionInterProvincial": {
        "displayName": "AI Region Inter Provincial",
        "type": "AIREGIONINPRO",
        "url": null,
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