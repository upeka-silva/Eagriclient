import { Box, Grid } from "@mui/material";
import styled from "styled-components";

const SingleConversation = ({
  conversation,
  handleConversation,
  isSelected,
}) => {
  return (
    <div className="single-conversation">
      <HoverBox
        sx={{ backgroundColor: isSelected ? "green" : "lightgreen" }}
        borderRadius={"10px"}
        backgroundColor={"lightgreen"}
        height={"50px"}
        border={"1px solid green"}
        onClick={handleConversation}
        margin={"5px"}
      >
        <Grid
          container
          direction="row"
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <h4>{conversation?.groupId}</h4>
          {/* <p >{conversation?.description}</p> */}
        </Grid>
      </HoverBox>
    </div>
  );
};

const HoverBox = styled(Box)`
  border-radius: 10px;
  background-color: lightgreen;
  height: 50px;
  border: 1px solid green;
  margin: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: green;
    cursor: pointer;
  }
`;

export default SingleConversation;
