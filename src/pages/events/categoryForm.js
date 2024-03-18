// import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { base_url } from "utils/baseurl";

// ============================|| FIREBASE - REGISTER ||============================ //

const Events = () => {
  const navigate = useNavigate();
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
          name: "",
          fromDate: "",
          toDate: "",
          submit: null,
        }}
        // validationSchema={Yup.object().shape({
        //   firstname: Yup.string().max(255).required("First Name is required"),
        //   lastname: Yup.string().max(255).required("Last Name is required"),
        //   email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        //   password: Yup.string().max(255).required("Password is required"),
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(`${base_url}/event/category`, values);
            navigate("/events/categories");
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.response.data.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Category Name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                    id="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
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
                  <InputLabel htmlFor="fromDate">Date From</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fromDate && errors.fromDate)}
                    id="fromDate"
                    type="date"
                    value={values.fromDate}
                    name="fromDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.fromDate && errors.fromDate && (
                    <FormHelperText error id="helper-text-fromDate-signup">
                      {errors.fromDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="toDate">Date to</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.toDate && errors.toDate)}
                    id="toDate"
                    type="date"
                    value={values.toDate}
                    name="toDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.toDate && errors.toDate && (
                    <FormHelperText error id="helper-text-toDate-signup">
                      {errors.toDate}
                    </FormHelperText>
                  )}
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

export default Events;
