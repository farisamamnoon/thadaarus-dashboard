// import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// ============================|| FIREBASE - REGISTER ||============================ //

const Class = () => {
  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          company: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required("First Name is required"),
          lastname: Yup.string().max(255).required("Last Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="class-name">Class Standard</InputLabel>
                  <OutlinedInput
                    id="class-name"
                    type="number"
                    value={values.className}
                    name="className"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.className && errors.className)}
                  />
                  {touched.className && errors.className && (
                    <FormHelperText error id="helper-text-className-signup">
                      {errors.className}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="division">Division</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.division && errors.division)}
                    id="division"
                    value={values.division}
                    name="division"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.division && errors.division && (
                    <FormHelperText error id="helper-text-division-signup">
                      {errors.division}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="subjects">Subjects</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.subjects && errors.subjects)}
                    id="subjects"
                    value={values.subjects}
                    name="subjects"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.subjects && errors.subjects && (
                    <FormHelperText error id="helper-text-subjects-signup">
                      {errors.subjects}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="batch-start">Batch Start</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.batchStart && errors.batchStart)}
                    id="batch-start"
                    value={values.batchStart}
                    name="batchStart"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2019"
                    inputProps={{}}
                  />
                  {touched.batchStart && errors.batchStart && (
                    <FormHelperText error id="helper-text-batchStart-signup">
                      {errors.batchStart}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="batch-end">Batch End</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.batchEnd && errors.batchEnd)}
                    id="batch-end"
                    value={values.batchEnd}
                    name="batchEnd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2020"
                    inputProps={{}}
                  />
                  {touched.batchEnd && errors.batchEnd && (
                    <FormHelperText error id="helper-text-batchEnd-signup">
                      {errors.batchEnd}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="fees">Fees</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fees && errors.fees)}
                    id="fees"
                    value={values.fees}
                    name="fees"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.fees && errors.fees && (
                    <FormHelperText error id="helper-text-fees-signup">
                      {errors.fees}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
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

export default Class;
