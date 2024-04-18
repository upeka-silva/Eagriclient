import { CROP_LOOK_TARGET_FIELDS, CROP_LOOK_FIELD } from "./constants/cropLookFields";

export const getDbFieldName = (field) => {

  if (field === CROP_LOOK_TARGET_FIELDS.TARGET_MAJOR) {
    return "targetMajor";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_MINOR) {
    return "targetMinor";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_RAINFED) {
    return "targetRainfed";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_HIGHLAND_IRRIGATED) {
    return "targetHighlandIrrigated";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_HIGHLAND_RAINFED) {
    return "targetHighlandRainfed";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_LOWLAND) {
    return "targetLowland";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_HOME_GARDEN) {
    return "targetHomeGarden";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_GREENHOUSE) {
    return "targetGreenHouse";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_EXISTING_EXTENT) {
    return "targetExistingExtent";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_REMOVED_EXTENT) {
    return "targetRemovedExtent";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_NEW_EXTENT) {
    return "targetNewExtent";
  } else if (field === CROP_LOOK_TARGET_FIELDS.TARGET_TOTAL_EXTENT) {
    return "targetTotalExtent";
  } 
  // -----------------
  else if (field === CROP_LOOK_FIELD.EXTENT_MAJOR) {
    return "extentMajor";
  }   else if (field === CROP_LOOK_FIELD.EXTENT_MINOR) {
    return "extentMinor";
  }  else if (field === CROP_LOOK_FIELD.EXTENT_RAINFED) {
    return "extentRainfed";
  }   else if (field === CROP_LOOK_FIELD.EXTENT_HIGHLAND_IRRIGATE) {
    return "extentHighlandIrrigate";
  }   else if (field === CROP_LOOK_FIELD.EXTENT_HIGHLAND_RAINFED) {
    return "extentHighlandRainfed";
  }  else if (field === CROP_LOOK_FIELD.EXTENT_LOWLAND) {
    return "extentLowland";
  } else if (field === CROP_LOOK_FIELD.EXTENT_HOME_GARDEN) {
    return "extentHomeGarden";
  }   else if (field === CROP_LOOK_FIELD.EXTENT_GREENHOUSE) {
    return "extentGreenHouse";
  }   else if (field === CROP_LOOK_FIELD.NORMAL_SEASON_EXTENT) {
    return "normalSeasonExtent";
  }   else if (field === CROP_LOOK_FIELD.INTER_SEASON_EXTENT) {
    return "interSeasonExtent";
  }   else if (field === CROP_LOOK_FIELD.NON_BEARING_HG_REMOVED_EXTENT) {
    return "nonBearingHgRemovedExtent";
  }   else if (field === CROP_LOOK_FIELD.NON_BEARING_COMM_REMOVED_EXTENT) {
    return "nonBearingCommRemovedExtent";
  }   else if (field === CROP_LOOK_FIELD.COMM_REMOVED_EXTENT) {
    return "commRemovedExtent";
  }   else if (field === CROP_LOOK_FIELD.BEARING_HG_REMOVED_EXTENT) {
    return "bearingHgRemovedExtent";
  }   else if (field === CROP_LOOK_FIELD.BEARING_COMM_REMOVED_EXTENT) {
    return "bearingCommRemovedExtent";
  }   else if (field === CROP_LOOK_FIELD.HG_REPLANTED_EXTENT) {
    return "hgReplantedExtent";
  }   else if (field === CROP_LOOK_FIELD.COMM_REPLANTED_EXTENT) {
    return "commReplantedExtent";
  }   else if (field === CROP_LOOK_FIELD.HG_NEWLY_PLANTED_EXTENT) {
    return "hgNewlyPlantedExtent";
  }   else if (field === CROP_LOOK_FIELD.COMM_NEWLY_PLANTED_EXTENT) {
    return "commNewlyPlantedExtent";
  }   else if (field === CROP_LOOK_FIELD.HG_NEWLY_BORNE_EXTENT) {
    return "hgNewlyBorneExtent";
  }   else if (field === CROP_LOOK_FIELD.COMM_NEWLY_BORNE_EXTENT) {
    return "commNewlyBorneExtent";
  }  else {
    return "na";
  }
};


export const convertCropLookFields = (field) => {

  switch(field) {
    case "Target Total Extent":
      return "";
    case "Target Major":
      return "totalTargetedExtentMajor";
      case "Target Minor":
        return "totalTargetedExtentMinor";
      case "Target Existing Extent":
        return "totalTargetedExisting";
      case "Target New Extent":
        return "totalTargetedExtentNew";
      case "Target Removed Extent":
        return "totalTargetedRemoved";
      case "Target Home Garden":
        return "totalTargetedHomeGarden";
      case "Target Greenhouse":
        return "totalTargetedGreenHouse";
      case "Target Highland Rainfed":
        return "totalTargetHighlandRainfed";
      case "Target Rainfed":
        return "totalTargetedExtentRainfed";
      case "Target Highland Irrigated":
        return "totalTargetedExtentIrrigate";
      case "Target Lowland":
        return "totalTargetedLowland";

      case "Extent Highland Irrigate":
        return "totalExtentHighlandIrrigate";
      case "Comm Newly Borne Extent":
        return "totalCommNewlyBorneExtent";
      case "Extent Minor":
        return "totalExtentMinor";
      case "Bearing HG Removed Extent":
        return "totalBearingHgRemovedExtent";
      case "Normal Season Extent":
        return "totalNormalSeasonExtent";
      case "HG Replanted Extent":
        return "totalHgReplantedExtent";
      case "Extent Lowland":
        return "totalExtentLowland";
      case "Extent Greenhouse":
        return "totalExtentGreenHouse";
      case "Non-Bearing HG Removed Extent":
        return "";
      case "Extent Highland Rainfed":
        return "";
      case "HG Newly Planted Extent":
        return "totalHgNewlyPlantedExtent";
      case "Non-Bearing Comm Removed Extent":
        return "totalNonBearingCommRemovedExtent";
      case "Extent Major":
        return "totalExtentMajor";
      case "Inter Season Extent":
        return "totalInterSeasonExtent";
      case "Bearing Comm Removed Extent":
        return "totalBearingCommRemovedExtent";
      case "Extent Rainfed":
        return "totalExtentRainfed";
      case "Comm Removed Extent":
        return "totalCommRemovedExtent";
      case "Comm Newly Planted Extent":
        return "totalCommNewlyPlantedExtent";
      case "Extent Home Garden":
        return "totalExtentHomeGarden";
      case "HG Newly Borne Extent":
        return "totalHgNewlyBorneExtent";
      case "Comm Replanted Extent":
        return "totalCommReplantedExtent";
    default:
        return field;
  }

};
