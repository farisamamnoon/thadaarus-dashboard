import { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
  Grid,
  Stack,
  FormHelperText,
} from "../../../node_modules/@mui/material/index";
import modalStyle from "themes/modalStyle";
import { base_url } from "utils/baseurl";
import { useParams } from "../../../node_modules/react-router-dom/dist/index";
import axios from "axios";
import { FieldArray, Formik } from "formik";
import AnimateButton from "components/@extended/AnimateButton";
import * as Yup from "yup";

const AddPrograms = ({ category, refetch }) => {
  const [modal, setModal] = useState(false);
  const eventId = useParams().id;

  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => {
    // refetch();
    setModal(false);
  };

  return (
    <>
      <Button size="medium" variant="contained" onClick={handleModalOpen}>
        Add Event
      </Button>
      <Modal
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add Programs
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={{
                programs: [""],
              }}
              // validationSchema={Yup.object().shape({
              //   programs: Yup.string(),
              // })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  values = { ...values, category };
                  await axios.post(`${base_url}/event/${eventId}/programs`, values);
                  refetch();
                //   handleModalClose();
                  setStatus({ success: false });
                  setSubmitting(false);
                } catch (err) {
                  console.error(err);
                  setStatus({ success: false });
                  setErrors({ submit: err.response.data.message });
                  setSubmitting(false);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Stack spacing={1} sx={{ mt: "8px" }}>
                        <FieldArray
                          name="programs"
                          render={(arrayHelpers) => (
                            <div>
                              {values.programs.map((program, index) => (
                                <div key={index}>
                                  <InputLabel htmlFor={`programs.${index}`}>Program</InputLabel>
                                  <OutlinedInput
                                    fullWidth
                                    id={`programs.${index}`}
                                    value={values.programs[index]}
                                    name={`programs.${index}`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    // error={
                                    //   touched.subjects[index] &&
                                    //   errors.subjects[index] &&
                                    //   Boolean(
                                    //     touched.subjects[index] &&
                                    //       errors.subjects[index]
                                    //   )
                                    // }
                                  />
                                  {/* {touched.subjects[index] &&
                                errors.subjects[index] && (
                                  <FormHelperText error id="helper-text-phone-signup">
                                    {errors.subjects[index]}
                                  </FormHelperText>
                                )} */}
                                  <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <Button type="button" onClick={() => arrayHelpers.push("")}>
                                Add
                              </Button>
                            </div>
                          )}
                        />
                      </Stack>
                    </Grid>
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Add Programs
                        </Button>
                      </AnimateButton>
                      <Button onClick={handleModalClose}>No</Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AddPrograms;
