const data = {
    "province": {
        "displayName": "Province",
        "apiCall": true,
        "links": null
    },
    "district": {
        "displayName": "District",
        "apiCall": true,
        "links": null
    },
    "AIRegionProvincial": {
        "displayName": "AI Region",
        "apiCall": true,
        "links": [
            "deputiyDirOfAgriProvincial",
            "ADASegmentProvincial"
        ]
    },
    "AIRegionInterProvincial": {
        "displayName": "AI Region",
        "apiCall": true,
        "links": [
            "deputiyDirOfAgriProvincial",
            "ADASegmantInterProvincial"
        ]
    },
    "GNDivision": {
        "displayName": "GN Division",
        "apiCall": true,
        "links": [
            "districts",
            "DSDivision"
        ]
    },
    "DSDivision": {
        "displayName": "DS Division",
        "apiCall": false,
        "links": [
            "districts"
        ]
    },
    "ADASegmantProvincial": {
        "displayName": "ADA Segmant Provincial",
        "apiCall": false,
        "links": [
            "deputiyDirOfAgriProvincial"
        ]
    },
    "ADASegmantInterProvincial": {
        "displayName": "ADA Segmant Inter Provincial",
        "apiCall": false,
        "links": [
            "deputiyDirOfAgriInterProvincial"
        ]
    },
    "deputiyDirOfAgriProvincial": {
        "displayName": "Deputiy Director Of Agriculture Provincial",
        "apiCall": false,
        "links": null
    },
    "deputiyDirOfAgriInterProvincial": {
        "displayName": "Deputiy Director Of Agriculture Inter Provincial",
        "apiCall": false,
        "links": null
    },
    "mahaweliUnit": {
        "displayName": "Mahaweli Unit",
        "apiCall": false,
        "links": [
            "mahaweliSystems",
            "block"
        ]
    },
    "block": {
        "displayName": "Block",
        "apiCall": false,
        "links": [
            "mahaweliSystems"
        ]
    },
    "mahaweliSystems": {
        "displayName": "Mahaweli Systems",
        "apiCall": false,
        "links": null
    },
    "ARPADivision": {
        "displayName": "ARPA Division",
        "apiCall": false,
        "links": [
            "districtCommisioner",
            "ASCDivision",
        ]
    },
    "ASCDivision": {
        "displayName": "ASC Division",
        "apiCall": false,
        "links": [
            "districtCommisioner"
        ]
    },
    "districtCommisioner": {
        "displayName": "District Commisioner",
        "apiCall": false,
        "links": null
    },
    "deptOfAgrarianDevelopment": {
        "displayName": "Department Of Agrarian Development",
        "apiCall": false,
        "links": null
    },
    "mahaweliAuthority": {
        "displayName": "Mahaweli Authority",
        "apiCall": false,
        "links": null
    },
    "directorDOA": {
        "displayName": "Director DOA",
        "apiCall": false,
        "links": null
    },
    "provincialDirectorOfAgri": {
        "displayName": "Provincial Director Of Agriculture",
        "apiCall": false,
        "links": null
    },
    "agroEcologicalZones": {
        "displayName": "Agro Ecological Zones",
        "apiCall": false,
        "links": null
    }
}
module.exports = data;