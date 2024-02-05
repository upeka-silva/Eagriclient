import { Colors } from "../constants/Colors";

export const getColorCode = (fieldId, value, requiredFieldIdList) => {
  const field = document.getElementById(fieldId);
  if (field) {
    if (requiredFieldIdList.includes(fieldId) && value === "") {
      field.style.backgroundColor = Colors.requiredColor;
    } else {
      field.style.backgroundColor = Colors.white;
    }
  }
};
