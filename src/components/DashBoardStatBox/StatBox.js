import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../utils/theme/app-theme";

function StatBox({ title, subtitle, icon, progress, increase }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="0"
      sx={{
        backgroundColor: colors.green[600],
        paddingX: "30px",
        paddingY: "40px",
        borderRadius: "5px",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.ivory }}>
            {title}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: colors.cool_grey }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatBox;
