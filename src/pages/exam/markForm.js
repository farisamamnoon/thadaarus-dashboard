//react imports
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Select,
  MenuItem,
  LinearProgress,
  Stack,
  Select,
  MenuItem,
  LinearProgress,
  OutlinedInput,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { fetchData } from "utils/fetchData";
import Error from "../../utils/Error";
import { base_url } from "utils/baseurl";

// ============================|| EXAM MARK - FORM ||============================ //
// ============================|| EXAM MARK - FORM ||============================ //

const ExamMarks = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const studentId = useParams().id;
  
  const classId = useParams().classId;

  const {
    data: examData,
    error: examError,
    isPending: examIsPending,
  } = useQuery({
    queryKey: ["examData"],
    queryFn: async () => await fetchData(`exam/class/${classId}`),
  });

  const toggleExam = (event) => {
    const exam = examData.filter((e) => e._id == event.target.value);
    setExams(exam[0].exams);
  };

  if (examError) return <Error severity="error">An unexpected error occured</Error>;

  return (
    <>
      <Formik
        initialValues={{
          examName: "",
          marks: [
            {
              subject: "",
              mark: "",
            },
          ],
          submit: null,
        }}
        // validationSchema={Yup.object().shape({
        //   examName: Yup.string().max(255).required("Exam name is required"),
        //   marks: Yup.array()
        //     .of(
        //       Yup.object().shape({
        //         subject: Yup.string().max(155).required("Select an exam"),
        //         mark: Yup.number().max(50).required("Enter a mark for the exam"),
        //       })
        //     )
        //     .compact(),
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            values = { ...values, studentId};
            const response = await axios.post(`${base_url}/student/${studentId}/marks`, values);
            if(!response.data.success) setErrors({submit: response.data.message})
            else navigate(`/class/${classId}/student/${studentId}/marks`)
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
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="examName">Exam</InputLabel>
                  <Select
                    id="examName"
                    name="examName"
                    value={values.examName}
                    onChange={(e) => {
                      handleChange(e);
                      toggleExam(e);
                    }}
                    onBlur={handleBlur}
                  >
                    {examIsPending ? (
                      <LinearProgress />
                    ) : (
                      examData.map((e, k) => (
                        <MenuItem key={k} value={e._id}>
                          {e.examName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.examName && errors.examName && (
                    <FormHelperText error id="helper-text-examName-signup">
                      {errors.examName}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <FieldArray
                    name="marks"
                    render={(arrayHelpers) => (
                      <div>
                        {values.marks.map((mark, index) => (
                          <div key={index}>
                            <InputLabel htmlFor={`marks?.${index}.subject`}>Subject</InputLabel>
                            <Select
                              fullWidth
                              id={`marks?.${index}.subject`}
                              value={values.marks[index].subject}
                              name={`marks.${index}.subject`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // error={
                              //   touched.mark.subject &&
                              //   errors.mark.subject &&
                              //   Boolean(touched.mark.subject && errors?.mark?.subject)
                              // }
                            >
                              {examIsPending ? (
                                <LinearProgress />
                              ) : (
                                exams.map((s, k) => (
                                  <MenuItem key={k} value={s.subjectId}>
                                    {s.subjectId}
                                  </MenuItem>
                                ))
                              )}
                            </Select>
                            {/* {touched.marks[index].subject && errors.marks[index].subject && (
                              <FormHelperText error id="helper-text-phone-signup">
                                {errors.marks[index].subject}
                              </FormHelperText>
                            )} */}
                            <InputLabel htmlFor={`marks?.${index}.mark`} sx={{ mt: "10px" }}>
                              Mark
                            </InputLabel>
                            <OutlinedInput
                              fullWidth
                              id={`marks?.${index}.mark`}
                              value={values.marks[index].mark}
                              name={`marks.${index}.mark`}
                              type="number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              // error=?
                            />
                            {/* {touched.marks[index].mark && errors.marks[index].mark && (
                              <FormHelperText error id="helper-text-phone-signup">
                                {errors.marks[index].mark}
                              </FormHelperText>
                            )} */}
                            <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push({ subject: "", mark: "" })}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: "10px" }}>
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

export default ExamMarks;
export default ExamMarks;
