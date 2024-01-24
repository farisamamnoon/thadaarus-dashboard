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
import { Formik, FieldArray } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// ============================|| THADAARUS-EXAM TIME TABLE FORM ||============================ //

const Exam = () => {

  return (
    <>
      <Formik
        initialValues={{
          examName: '',
          classId: '',
          exams: [
            {
              date: '',
              subjectId: ''
            }
          ]
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
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="examName-signup">Exam Name</InputLabel>
                  <OutlinedInput
                    id="examName-login"
                    type="examName"
                    value={values.examName}
                    name="examName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.examName && errors.examName)}
                  />
                  {touched.examName && errors.examName && (
                    <FormHelperText error id="helper-text-examName-signup">
                      {errors.examName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6} >
                <Stack spacing={1}>
                  <InputLabel htmlFor="classId">Class</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.classId && errors.classId)}
                    id="classId"
                    value={values.classId}
                    name="classId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.classId && errors.classId && (
                    <FormHelperText error id="helper-text-classId">
                      {errors.classId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
              <Stack spacing={1}>
                <FieldArray
                  name="exams"
                  render={(arrayHelpers) => (
                    <div>
                      {values.exams.map((subject, index) => (
                        <div key={index}>
                          <InputLabel htmlFor="date">Date</InputLabel>
                          <OutlinedInput
                            fullWidth
                            // error={Boolean(
                            //   touched.exams[index].date && errors.exams[index].date
                            // )}
                            id="date"
                            type='date'
                            value={values.exams[index].date}
                            name={`exams.${index}.date`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
                          <InputLabel htmlFor="subjectId">Subject</InputLabel>
                          <OutlinedInput
                            fullWidth
                            // error={Boolean(
                            //   touched.exams[index].subjectId && errors.exams[index].subjectId
                            // )}
                            id="subjectId"
                            value={values.exams[index].subjectId}
                            name={`exams.${index}.subjectId`}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                          />
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
              <Grid item xs={12} sx={{mt: '10px'}}>
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

export default Exam;
