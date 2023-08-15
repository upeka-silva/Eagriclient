import { Box, Typography, useTheme } from "@mui/material";
import React from "react";



function StatBox({ title, subtitle, icon, progress, increase }) {
 
//   const colors = tokens(theme.palette.mode);

  return (
    <Box  m="0" sx={{ backgroundColor:'#f2f0f0' , paddingX:'30px' , paddingY:'40px' }}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            // fontWeight="bold"
            sx={{ color:'black'}}
          >
            {title}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: 'black' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatBox;
