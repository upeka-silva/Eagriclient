import { Download } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getGapQRCode } from "../../../redux/actions/gap/action";

export default function GapRequestCertificate({ url, gapId }) {

  const [qrCodeBlob, setQrCodeBlob] = useState(null);

  const generateQRCode = async () => {
    try {
      const response = await getGapQRCode(gapId);
      console.log("Response from backend:", response);
      const blob = b64toBlob(response, 'image/png'); // Convert base64 to Blob
      setQrCodeBlob(blob);
      console.log(`qr code blob type: ${typeof blob}`);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }

  useEffect(() => {
    console.log(`QR code Blob:`, qrCodeBlob);
  }, [qrCodeBlob]);

  const downloadQRCode = () => {
    if (qrCodeBlob) {
      const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('QR code Blob is not set.');
    }
  };

  // Function to convert base64 to Blob
  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  return (
    <div style={{
      width: "85%",
      height: "350px",
      backgroundColor: "#fcfcfc",
      margin: "auto",
      border: "1px solid #2AAF70",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "60px",
      padding: "0 100px"
    }}>
      <Typography variant="body1" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", fontFamily: "sans-serif" }}>
        <h2 style={{ fontSize: "20px" }}>GOOD AGRICULTURAL PRACTICES CERTIFICATE</h2>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "16px", fontFamily: "sans-serif", color: "blue" }}>
            Download Gap Certificate <Download />
          </a>
        ) : (
          <p style={{ fontSize: "16px", fontFamily: "sans-serif", color: "red", fontWeight: "bold" }}>Certificate not available yet</p>
        )}
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {
          !qrCodeBlob ?
            <Typography variant="body1" style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", fontFamily: "sans-serif" }} >
              <h2 style={{ fontSize: "20px" }}>GENERATE QR CODE</h2>
              {
                url ?
                  <Button variant="outlined" color="success" onClick={generateQRCode}>Generate QR Code</Button>
                  :
                  <p style={{ fontSize: "16px", fontFamily: "sans-serif", color: "red", fontWeight: "bold" }}>QR Code not available yet</p>
              }
            </Typography>
            : null
        }
        {qrCodeBlob && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <img src={URL.createObjectURL(qrCodeBlob)} alt="QR Code" />
            <Button variant="outlined" color="success" onClick={downloadQRCode}>Download QR Code</Button>
          </div>
        )}
      </div>
    </div>
  );
}
