//react imports
import { useNavigate } from "react-router-dom";

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
  LinearProgress,
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
  const navigate = useNavigate()
  const {
    data: teacherData,
    error: teacherError,
    isPending: teacherIsPending,
  } = useQuery({ queryKey: ["teacherData"], queryFn: async () => fetchData("teacher/get-all") });

  return (
    <>
      <Formik
        initialValues={{
          className: "",
          division: "",
          batch: "",
          fees: "",
          teacher: "",
          subjects: [""],
        }}
        validationSchema={Yup.object().shape({
          className: Yup.number().required("Class is required"),
          teacher: Yup.string().required("Teacher is required"),
          division: Yup.string().max(255),
          batch: Yup.number().required("Batch (year) is required"),
          fees: Yup.number().required("Class Fees is required"),
          subjects: Yup.array().required("Atleast one subject required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(`${base_url}/class/create`, values);
            if (!response.data.success) setErrors({ submit: response.data.message });
            else navigate(`/class`);
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
                  <InputLabel htmlFor="teacher">Teacher</InputLabel>
                  <Select
                    fullWidth
                    id="teacher"
                    value={values.teacher}
                    name="teacher"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.teacher && errors.teacher}
                  >
                    {teacherIsPending ? (
                      <LinearProgress />
                    ) : (
                      teacherData.map((teacher, index) => (
                        <MenuItem key={index} value={teacher._id}>
                          {teacher.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.teacher && errors.teacher && (
                    <FormHelperText error id="helper-text-teacher-signup">
                      {errors.teacher}
                    </FormHelperText>
                  )}
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
                <Stack spacing={1} sx={{ mt: "8px" }}>
                <Stack spacing={1} sx={{ mt: "8px" }}>
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
                                error={touched.subjects && errors.subjects}
                                error={touched.subjects && errors.subjects}
                              />
                              {touched.subjects && errors.subjects && (
                              {touched.subjects && errors.subjects && (
                                <FormHelperText error id="helper-text-phone-signup">
                                  {errors.subjects}
                                  {errors.subjects}
                                </FormHelperText>
                              )}
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

export default Class;
