//react imports
import { useEffect, useState } from "react";

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
  OutlinedInput,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import { useQueries } from "@tanstack/react-query";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { fetchData } from "utils/fetchData";
import Error from "../../utils/Error";

// ============================|| EXAM MARK - FORM ||============================ //

const ExamMarks = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [studentsState, setStudents] = useState({});

  const [classes, students, exams] = useQueries({
    queries: [
      { queryKey: ["classData"], queryFn: async () => fetchData("class/get-all") },
      {
        queryKey: ["studentData", selectedClass],
        queryFn: async () => {
          if (selectedClass) {
            return await fetchData(`student/${selectedClass}/get-students`);
          }
          return null;
        },
        enabled: !!selectedClass,
      },
      {
        queryKey: ["examData", selectedClass],
        queryFn: async () => {
          if (selectedClass) {
            return await fetchData(`exam/class/${selectedClass}`);
          }
          return null;
        },
        enabled: !!selectedClass,
      },
    ],
  });
  const { data: classData, error: classError, isPending: classIsPending } = classes;
  const { data: studentData, error: studentError, isPending: studentIsPending } = students;
  const { data: examData, error: examError, isPending: examIsPending } = exams;

  useEffect(() => {
    setStudents(studentData);
  }, [studentData]);

  if (classError || studentError || examError) {
    return <Error severity="error">There was an error</Error>;
  }

  return (
    <>
      <Formik
        initialValues={{
          class: "",
          name: "",
          marks: [
            {
              examId: "",
              mark: "",
            },
          ],
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          class: Yup.string().required("Class is required"),
          name: Yup.string().max(255).required("Student name is required"),
          marks: Yup.array()
            .of(
              Yup.object().shape({
                examId: Yup.string().max(155).required("Select an exam"),
                mark: Yup.number().required("Enter a mark for the exam"),
              })
            )
            .compact(),
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
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="classId">Class</InputLabel>
                  <Select
                    id="classId"
                    name="classId"
                    value={values.classId}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedClass(e.target.value);
                    }}
                    onBlur={handleBlur}
                  >
                    {classIsPending ? (
                      <LinearProgress />
                    ) : (
                      classes &&
                      classData?.map((classItem, index) => (
                        <MenuItem key={index} value={classItem._id}>
                          {classItem.className}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.classId && errors.classId && (
                    <FormHelperText error id="classId">
                      {errors.classId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="studentId">Student</InputLabel>
                  <Select
                    id="studentId"
                    name="studentId"
                    value={values.studentId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {studentIsPending ? (
                      <LinearProgress />
                    ) : (
                      studentsState?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  {touched.studentId && errors.studentId && (
                    <FormHelperText error id="helper-text-studentId-signup">
                      {errors.studentId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="examName">Exam</InputLabel>
                  <Select
                    id="examName"
                    name="examName"
                    value={values.examName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {examIsPending ? (
                      <LinearProgress />
                    ) : (
                      examData &&
                      examData?.map((item, index) => (
                        <MenuItem key={index} value={item._id}>
                          {item.examName}
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
                            <InputLabel htmlFor={`marks?.${index}.examId`}>Subject</InputLabel>
                            <Select
                              fullWidth
                              id={`marks?.${index}.examId`}
                              value={values.marks[index].examId}
                              name={`marks.${index}.examId`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.marks[index].examId &&
                                errors.marks[index].examId &&
                                Boolean(touched.marks[index].examId && errors?.marks[index]?.examId)
                              }
                            >
                              {classData?.map((classItem, index) => (
                                <MenuItem key={index} value={classItem._id}>
                                  {classItem.className}
                                </MenuItem>
                              ))}
                            </Select>
                            {touched.marks[index].examId && errors.marks[index].examId && (
                              <FormHelperText error id="helper-text-phone-signup">
                                {errors.marks[index].examId}
                              </FormHelperText>
                            )}
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
                            {touched.marks[index].mark && errors.marks[index].mark && (
                              <FormHelperText error id="helper-text-phone-signup">
                                {errors.marks[index].mark}
                              </FormHelperText>
                            )}
                            <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push({ examId: "", mark: "" })}
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
