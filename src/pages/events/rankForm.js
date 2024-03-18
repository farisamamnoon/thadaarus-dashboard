// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import { LinearProgress, MenuItem, Select } from "@mui/material/index";
import Error from "utils/Error";
import { Alert } from "../../../node_modules/@mui/material/index";

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const Ranks = () => {
  const {
    data: students,
    error,
    isPending,
  } = useQuery({
    queryKey: ["studentsData"],
    queryFn: async () => await fetchData("student/categories"),
  });

  return (
    <>
      <Formik
        initialValues={{
          first: "",
          second: "",
          third: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required("First Name is required"),
          lastname: Yup.string().max(255).required("Last Name is required"),
          email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="first">First</InputLabel>
                  <Select
                    labelId="first"
                    id="first"
                    name="first"
                    value={values.first}
                    onChange={handleChange}
                  >
                    {error && (
                      <MenuItem>
                        <Alert severity="error">An error occured</Alert>
                      </MenuItem>
                    )}
                    {isPending ? (
                      <MenuItem>
                        <LinearProgress />
                      </MenuItem>
                    ) : (
                      students.map((s, i) => (
                        <MenuItem key={`categories.${i}`} value={s._id}>
                          {s.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>

                  {touched.first && errors.first && (
                    <FormHelperText error id="helper-text-first-signup">
                      {errors.first}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="second">Second</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.second && errors.second)}
                    id="second"
                    value={values.second}
                    name="second"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.second && errors.second && (
                    <FormHelperText error id="helper-text-second-signup">
                      {errors.second}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="third">Third</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.third && errors.third)}
                    id="third"
                    value={values.third}
                    name="third"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.third && errors.third && (
                    <FormHelperText error id="helper-text-third-signup">
                      {errors.third}
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

export default Ranks;
