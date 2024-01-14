// import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  // Box,
  Button,
  Divider,
  // FormControl,
  FormHelperText,
  Grid,
  Link,
  // IconButton,
  // InputAdornment,
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
// import { TextareaAutosize } from '../../../node_modules/@mui/material/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const HomeWork = () => {
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
                  <InputLabel htmlFor="name">Name of Student</InputLabel>
                  <OutlinedInput
                    id="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="stClass">Class</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.stClass && errors.stClass)}
                    id="stClass"
                    type="number"
                    value={values.stClass}
                    name="stClass"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.stClass && errors.stClass && (
                    <FormHelperText error id="helper-text-stClass-signup">
                      {errors.stClass}
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
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.amount && errors.amount)}
                    id="amount"
                    type="number"
                    value={values.amount}
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText error id="helper-text-amount-signup">
                      {errors.amount}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="discount">Discount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.discount && errors.discount)}
                    id="discount"
                    type="number"
                    value={values.discount}
                    name="discount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.discount && errors.discount && (
                    <FormHelperText error id="helper-text-discount-signup">
                      {errors.discount}
                    </FormHelperText>
                  )}
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

export default HomeWork;
