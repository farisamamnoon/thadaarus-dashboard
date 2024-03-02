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
          date: "",
          programs: [""],
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
            const response = await axios.post(`${base_url}/event`, values);
            navigate("/events");
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
                  <InputLabel htmlFor="name">Event Name</InputLabel>
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
              <Grid item xs={6}>
                <Stack spacing={1} sx={{ mt: "8px" }}>
                  <FieldArray
                    name="programs"
                    render={(arrayHelpers) => (
                      <div>
                        {values.programs &&
                          values.programs.map((program, index) => (
                            <div key={`programs.${index}`}>
                              <InputLabel htmlFor={`programs.${index}`}>Program Name</InputLabel>
                              <OutlinedInput
                                fullWidth
                                id={`programs.${index}`}
                                value={values.programs[index]}
                                name={`programs.${index}`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched.programs && errors.programs}
                              />
                              {touched.programs && errors.programs && (
                                <FormHelperText error id="helper-text-phone-signup">
                                  {errors.programs}
                                </FormHelperText>
                              )}
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

export default Events;
