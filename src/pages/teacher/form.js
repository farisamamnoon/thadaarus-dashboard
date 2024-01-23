// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets
import FormRepeater from "components/FormRepeater";

// ============================|| TEACHER-ADDFORM ||============================ //

const Teacher = () => {

  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        email: "",
        phone: "",
        subjects: [
          {
            classId: "",
            subjectId: "",
          },
        ],
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required("Name is required"),
        age: Yup.number()
          .typeError("Enter a Valid age")
          .required("Age is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        phone: Yup.number()
          .typeError("Enter a valid phone number")
          .required("Phone Number is required"),
        // subjects: Yup.array(),
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
      {({
        errors,
        handleBlur,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
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
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="class">Name</InputLabel>
                <OutlinedInput
                  id="class"
                  value={values.name}
                  name="class"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                />
                {touched.class && errors.class && (
                  <FormHelperText error id="helper-text-name">
                    {errors.class}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="subject">Name</InputLabel>
                <OutlinedInput
                  id="subject"
                  value={values.name}
                  name="subject"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                />
                {touched.subject && errors.subject && (
                  <FormHelperText error id="helper-text-name">
                    {errors.subject}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <FormRepeater
                  fields={[
                    {
                      type: "text",
                      label: "Class",
                      name: "classId",
                      id: "classId",
                      value: values.subjects.classId,
                      handleChange: handleChange,
                      handleBlur: handleBlur,
                    },
                    {
                      type: "text",
                      label: "Subject",
                      name: "subjects",
                      id: "subjects",
                      value: values.subjects.subjectId,
                      handleChange: handleChange,
                      handleBlur: handleBlur,
                    },
                  ]}
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
  );
};

export default Teacher;
