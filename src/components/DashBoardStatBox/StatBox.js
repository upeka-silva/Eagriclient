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
        backgroundColor: "#5cb85c",
        paddingX: "20px",
        paddingY: "20px",
        borderRadius: "5px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid #013220",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.black }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={colors.green[500]}>{icon}</Box>
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
