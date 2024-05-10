import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../utils/theme/app-theme";

function StatBoxWithoutImage({ title, subtitle,count }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
      container
      m="0"
      sx={{
        paddingX: "15px",
        paddingY: "15px",
        borderRadius: "5px",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        border: "1.5px solid #c0c9c0",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px'
      }}
    >
      {/* <Grid item xs={3}>
        <Box>
          <Typography
            fontWeight="bold"
            sx={{ color: '#4D5F7C',
            fontSize:'1vw'
            }}
          >
            {count}
          </Typography>
        </Box>
      </Grid> */}
      
      <Grid item xs={12}>
        <Box>
          <Typography fontSize={'0.7vw'} fontWeight="bold" sx={{ color: colors.black }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={'0.6vw'}  sx={{ color: colors.black }}>
            {subtitle}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default StatBoxWithoutImage;
