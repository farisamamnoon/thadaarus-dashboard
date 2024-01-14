// import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
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
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
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
                  <InputLabel htmlFor="workDate">Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.workDate && errors.workDate)}
                    id="workDate"
                    type="date"
                    value={values.workDate}
                    name="workDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.workDate && errors.workDate && (
                    <FormHelperText error id="helper-text-workDate-signup">
                      {errors.workDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="workClass">Class</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.workDate && errors.workDate)}
                    id="workDate"
                    type="number"
                    value={values.workDate}
                    name="workDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.workDate && errors.workDate && (
                    <FormHelperText error id="helper-text-workDate-signup">
                      {errors.workDate}
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
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
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
