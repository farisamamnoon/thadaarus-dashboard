// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { base_url } from "utils/baseurl";
import { fetchData } from "utils/fetchData";

// ============================|| FIREBASE - REGISTER ||============================ //

const Class = () => {
  const {
    data: teachers,
    error,
    isPending,
  } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => await fetchData("teacher/get-all"),
  });
  if(error){
    return console.log('error')
  }
  if(isPending){
    return <p>Laoding....</p>
  }
  return (
    <>
      <Formik
        initialValues={{
          className: "",
          division: "",
          batch: "",
          fees: "",
          teacherId: "",
          subjects: [""],
        }}
        validationSchema={Yup.object().shape({
          className: Yup.number().required("Class is required"),
          division: Yup.string().max(255),
          batch: Yup.number().required("Batch (year) is required"),
          teacherId: Yup.string().required("Select a teacher"),
          fees: Yup.number().required("Class Fees is required"),
          subjects: Yup.array().required("Atleast one subject required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log(values);
            const response = await axios.post(`${base_url}/class/create`, values);
            console.log(response.data.message);
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
                  <InputLabel htmlFor="teacherId">Class Teacher</InputLabel>
                  <Select
                    fullWidth
                    id="teacherId"
                    value={values.teacherId}
                    name="teacherId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.teacherId &&
                      errors.teacherId &&
                      Boolean(touched.teacherId && errors.teacherId)
                    }
                  >
                    {teachers.map((teacher, index) => (
                      <MenuItem key={index} value={teacher._id}>
                        {teacher.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="batch">Batch Start</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.batch && errors.batch)}
                    id="batch"
                    value={values.batch}
                    name="batch"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="2019"
                    inputProps={{}}
                  />
                  {touched.batch && errors.batch && (
                    <FormHelperText error id="helper-text-batch-signup">
                      {errors.batch}
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
                    type="number"
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
              <Grid item xs={6}>
                <Stack spacing={1} sx={{mt: '8px'}}>
                  <FieldArray
                    name="subjects"
                    render={(arrayHelpers) => (
                      <div>
                        {values.subjects &&
                          values.subjects.map((subject, index) => (
                            <div key={index}>
                              <InputLabel htmlFor={`subjects.${index}`}>Subject</InputLabel>
                              <OutlinedInput
                                fullWidth
                                id={`subjects.${index}`}
                                value={values.subjects[index]}
                                name={`subjects.${index}`}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                // error={
                                //   touched.subjects[index] &&
                                //   errors.subjects[index] &&
                                //   Boolean(
                                //     touched.subjects[index] &&
                                //       errors.subjects[index]
                                //   )
                                // }
                              />
                              {/* {touched.subjects[index] &&
                              errors.subjects[index] && (
                                <FormHelperText error id="helper-text-phone-signup">
                                  {errors.subjects[index]}
                                </FormHelperText>
                              )} */}
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
