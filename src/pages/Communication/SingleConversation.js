import { Avatar, Box, Grid } from "@mui/material";
import styled from "styled-components";

const SingleConversation = ({
  conversation,
  handleConversation,
  isSelected,
  user,
  privateConversation,
}) => {
  return (
    <div className="single-conversation">
      <HoverBox
        sx={{ backgroundColor: isSelected ? "#8b9695" : "#EEF7FF" }}
        borderRadius={"0px"}
        height={"auto"}
        border={"0px"}
        onClick={handleConversation}
        margin={"0px"}
      >
        <Grid
          container
          direction="row"
          alignItems={"center"}
          textAlign={"left"}
        >
          <Grid sm={2} md={2} lg={2} xl={2} p={1}>
            <Avatar
              src={
                conversation?.presignedUrl ||
                privateConversation?.userValueDTO?.profileImage
              }
            />
          </Grid>
          <Grid sm={7} md={6} lg={6} xl={6} pl={1}>
            <p>
              {conversation?.groupId ||
                privateConversation?.userValueDTO?.userName}
            </p>
          </Grid>
        </Grid>
      </HoverBox>
    </div>
  );
};

const HoverBox = styled(Box)`
  border-radius: 10px;
  background-color: #b6c7aa;
  height: 50px;
  border: 0px;
  margin: 0px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8b9695;
    cursor: pointer;
  }
`;

export default SingleConversation;
