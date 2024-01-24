// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const HomeWork = () => {
  return (
    <>
      <Formik
        initialValues={{
          subject: "",
          date: "",
          classId: "",
          desc: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          subject: Yup.string().max(255).required("Subject is required"),
          date: Yup.string().max(255).required("Last Name is required"),
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="subject">Subject</InputLabel>
                  <OutlinedInput
                    id="subject"
                    value={values.subject}
                    name="subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.subject && errors.subject)}
                  />
                  {touched.subject && errors.subject && (
                    <FormHelperText error id="helper-text-subject-signup">
                      {errors.subject}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="date">Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.date && errors.date)}
                    id="date"
                    type="date"
                    value={values.date}
                    name="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.date && errors.date && (
                    <FormHelperText error id="helper-text-date-signup">
                      {errors.date}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="classId">Class</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.classId && errors.classId)}
                    id="classId"
                    type="number"
                    value={values.classId}
                    name="classId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.classId && errors.classId && (
                    <FormHelperText error id="helper-text-classId-signup">
                      {errors.classId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="desc">Description</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.desc && errors.desc)}
                    id="desc"
                    value={values.desc}
                    name="desc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.desc && errors.desc && (
                    <FormHelperText error id="helper-text-desc-signup">
                      {errors.desc}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: "10px" }}>
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

export default HomeWork;
