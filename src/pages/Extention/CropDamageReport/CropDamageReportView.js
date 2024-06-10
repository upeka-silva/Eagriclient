import React, { useState } from "react";
import FormButtonGroup from "../../../components/FormButtonGroup/FormButtonGroup";
import { TabContent } from "../../Users/UserForm";
import { FormWrapper } from "../../Temp-Farmer/Farmer";
import { Fonts } from "../../../utils/constants/Fonts";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { PaperWrapper } from "../../Crop/Crop/CropForm";
import { FieldWrapper } from "../../../components/FormLayout/FieldWrapper";
import { FieldName } from "../../../components/FormLayout/FieldName";
import { DEF_ACTIONS } from "../../../utils/constants/permission";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

function CropDamageReportView() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [saving, setSaving] = useState(false);

  const goBack = () => {
    navigate("/extension/crop-damage-report");
  };

  const [formData, setFormData] = useState(state?.target || {});

  return (
    <>
      <PageHeader
        saving={saving}
        goBack={goBack}
        state={state}
        formName="Crop Damage Report View"
      />

      <FormButtonGroup
        {...{
          state,
          DEF_ACTIONS,
          saving,
        }}
      />
      <FormWrapper sx={{marginTop:"10px"}}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item lg={12}>
            <PaperWrapper>
              <Grid container spacing={1}>
                <Grid item sm={3} md={4} lg={4}>
                  <FieldWrapper>
                    <FieldName>{"Area Unit"}</FieldName>
                    <TextField
                      name="areaUnit"
                      id="areaUnit"
                      type="text"
                      value={formData?.areaUnit || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      // onChange={(e) =>
                      //   handleChange(e?.target?.value || "", "cropId")
                      // }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <FieldWrapper>
                    <FieldName>{t("cropPage.description")}</FieldName>
                    <TextField
                      name="description"
                      id="description"
                      value={formData?.description || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      // onChange={(e) =>
                      //   handleChange(e?.target?.value || "", "description")
                      // }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <FieldWrapper>
                    <FieldName>{"Status"}</FieldName>
                    <TextField
                      name="status"
                      id="status"
                      value={formData?.status || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      // onChange={(e) =>
                      //   handleChange(e?.target?.value || "", "description")
                      // }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item sm={4} md={4} lg={4}>
                  <FieldWrapper>
                    <FieldName>{"Damage Extent"}</FieldName>
                    <TextField
                      name="damageExtent"
                      id="damageExtent"
                      value={formData?.damageExtent || ""}
                      fullWidth
                      disabled={state?.action === DEF_ACTIONS.VIEW}
                      // onChange={(e) =>
                      //   handleChange(e?.target?.value || "", "description")
                      // }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "8px",
                        },
                      }}
                      size="small"
                    />
                  </FieldWrapper>
                </Grid>
              </Grid>
            </PaperWrapper>
          </Grid>
          <Grid item lg={12}>
            <Grid container spacing={1}>
              <Grid item sm={3} md={3} lg={9}>
                <FieldWrapper>
                  <FieldName>{"Crop Damage Images"}</FieldName>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      sx={{ position: "relative" }}
                    >
                      <label
                        htmlFor="profile-picture-input"
                        style={{
                          width: "182px",
                          height: "182px",
                          border: "1px solid #7a879d",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgb(46,125,50,0.1)",
                        }}
                      ></label>
                      {formData?.cropDamageImageDTOList?.length > 0 &&
                        formData?.cropDamageImageDTOList?.map((item, index) => (
                          <>
                            <div
                              id={index}
                              style={{
                                position: "absolute",
                                zIndex: "1",
                                backgroundColor: "rgb(46,125,50,0.1)",
                                width: "182px",
                                height: "182px",
                                borderRadius: "8px",
                              }}
                            >
                              <img
                                src={item?.presignedUrl}
                                alt="Crop"
                                style={{
                                  width: "182px",
                                  height: "182px",
                                  borderRadius: "8px",
                                }}
                              />
                            </div>
                          </>
                        ))}
                    </Box>
                  </div>
                </FieldWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormWrapper>
    </>
  );
}

export default CropDamageReportView;
