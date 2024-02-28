import { CROP_LOOK_FIELD } from "./constants/cropLookFields";

export const getDbFieldName = (field) => {
  if (field === CROP_LOOK_FIELD.EXTENT_MAJOR) {
    return "targetedExtentMajor";
  } else if (field === CROP_LOOK_FIELD.EXTENT_MINOR) {
    return "targetedExtentMinor";
  } else if (field === CROP_LOOK_FIELD.EXTENT_RAINFED) {
    return "targetedExtentRainfed";
  } else if (field === CROP_LOOK_FIELD.EXTENT_IRRIGATE) {
    return "targetedExtentIrrigate";
  } else if (field === CROP_LOOK_FIELD.EXTENT) {
    return "targetedExtent";
  } else {
    return "na";
  }
};
