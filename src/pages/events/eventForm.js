//react imports
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { base_url } from "utils/baseurl";
import { fetchData } from "utils/fetchData";

// ============================|| FIREBASE - REGISTER ||============================ //

const EventForm = ({ onClose, data }) => {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ programName: [""] }}
        validationSchema={Yup.object().shape({
          programName: Yup.array().required("Create atleast one program"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values, " ", data._id);
            // const response = await axios.post(`${base_url}/class/create`, values);
            // if (!response.data.success) setErrors({ submit: response.data.message });
            // else navigate(`/class`);
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Stack spacing={1} sx={{ mt: "8px" }}>
                  <FieldArray
                    name="programName"
                    render={(arrayHelpers) => (
                      <div>
                        {values.programName &&
                          values.programName.map((subject, index) => (
                            <div key={index}>
                              <InputLabel htmlFor={`programName.${index}`}>Subject</InputLabel>
                              <OutlinedInput
                                fullWidth
                                id={`programName.${index}`}
                                value={values.programName[index]}
                                name={`programName.${index}`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // error={
                                //   touched.programName[index] &&
                                //   errors.programName[index] &&
                                //   Boolean(
                                //     touched.programName[index] &&
                                //       errors.programName[index]
                                //   )
                                // }
                              />
                              {/* {touched.programName[index] &&
                                errors.programName[index] && (
                                  <FormHelperText error id="helper-text-phone-signup">
                                    {errors.programName[index]}
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
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EventForm;
