//react imports
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Stack,
  LinearProgress,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { base_url } from "utils/baseurl";
// ============================|| TEACHER-ADDFORM ||============================ //

const Teacher = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        email: "",
        phone: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        age: Yup.number().typeError("Enter a Valid age").required("Age is required"),
        email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        phone: Yup.number()
          .typeError("Enter a valid phone number")
          .required("Phone Number is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting, setFieldValue }) => {
        try {
          const response = await axios.post(`${base_url}/teacher/create`, values);
          if (!response.data.success) setErrors({ submit: response.data.message });
          else navigate(`/teacher`);
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
      {({ errors, handleBlur, handleChange, touched, handleSubmit, isSubmitting, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">Name</InputLabel>
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
                  <FormHelperText error id="helper-text-name">
                    {errors.name}
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
                  placeholder="demo@google.com"
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
            {values.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{values.submit}</FormHelperText>
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
  );
};

export default Teacher;
