import styled from "styled-components";
import { Colors } from "../../utils/constants/Colors";
import { Fonts } from "../../utils/constants/Fonts";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.white};
  font-family: ${Fonts.fontStyle1};
  margin: 18px 6px;
  padding: 0px 12px;
  border: ${props => props?.border ? '1px solid #D2D2D2' : ''};
  border-radius: ${props => props?.radius ? '10px' : ''};


`;
