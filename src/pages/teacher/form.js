// import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  // Box,
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
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { TextareaAutosize } from "../../../node_modules/@mui/material/index";
import FormRepeater from "components/FormRepeater";

// ============================|| FIREBASE - REGISTER ||============================ //

const Teacher = () => {
  // const [level, setLevel] = useState();
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // const changePassword = (value) => {
  //   const temp = strengthIndicator(value);
  //   setLevel(strengthColor(temp));
  // };

  // useEffect(() => {
  //   changePassword('');
  // }, []);

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
                  <InputLabel htmlFor="firstname-signup">
                    First Name*
                  </InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.age && errors.age)}
                    id="age"
                    value={values.age}
                    name="age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.age && errors.age && (
                    <FormHelperText error id="helper-text-age-signup">
                      {errors.age}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-signup"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-signup"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <FormRepeater
                    label={["Subject", "Class"]}
                    type={["text", "text"]}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
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
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption">Sign up with</Typography>
                </Divider>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Teacher;
