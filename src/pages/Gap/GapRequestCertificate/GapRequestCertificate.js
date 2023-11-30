import { Download } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

export default function GapRequestCertificate({ url }) {
  return (
    <div>
      {" "}
      <Typography variant="body1">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Download Gap Certificate <Download />
        </a>
      </Typography>

      {/* <iframe
        title="PDF Viewer"
        width="100%"
        height="500px"
        src={url}
        frameBorder="0"
      >
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe> */}
    </div>
  );
}
