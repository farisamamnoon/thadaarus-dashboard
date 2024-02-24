//react imports
import { useParams } from "react-router-dom";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  CircularProgress,
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
import Error from "utils/Error";
// ============================|| CLASS - EDIT FORM ||============================ //

const ClassEdit = () => {
  const classId = useParams().id;
  const {
    data: classData,
    error: classIsError,
    isPending: classIsPending,
  } = useQuery({
    queryKey: ["classData"],
    queryFn: async () => await fetchData(`class/${classId}`),
  });

  if (classIsPending) {
    return <CircularProgress />;
  }
  if (classIsError) {
    return <Error severity="error">There was an unexpected error</Error>;
  }

  const { className, division, batch, fees, subjects } = classData;
  return (
    <>
      <Formik
        initialValues={{
          className: className,
          division: division,
          batch: batch,
          fees: fees,
          subjects: subjects,
        }}
        validationSchema={Yup.object().shape({
          className: Yup.number().required("Class is required"),
          division: Yup.string().max(255),
          batch: Yup.number().required("Batch (year) is required"),
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
                    fullWidth
                    id="class-name"
                    ذ
                    value={values.className}
                    name="className"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    Edit
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

export default ClassEdit;