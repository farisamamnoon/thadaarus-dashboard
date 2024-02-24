//react
import { useState } from "react";
import { useParams } from "react-router-dom";

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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import { useEffect } from "react";

// ============================|| THADAARUS-EXAM TIME TABLE FORM ||============================ //

const ExamEdit = () => {
  const examId = useParams().id;

  const {
    data: examData,
    error: examError,
    isPending: examIsPending
  } = useQuery({ queryKey: ["examData"], queryFn: async () => await fetchData(`exam/${examId}`) });

  const [subjects, setSubjects] = useState({});
  const [selectedClass, setSelectedClass] = useState(examData?.classId);

  //fetching class dat
  const {
    data: classes,
    error: classError,
    isPending: classIsPending,
  } = useQuery({ queryKey: ["classData"], queryFn: async () => fetchData("class/get-all") });

  const {
    data: subjectsData,
    error: subjectsError,
    isPending: subjectsIsPending,
  } = useQuery({
    queryKey: ["subjectData", selectedClass],
    queryFn: () => {
      if (selectedClass) {
        return fetchData(`class/${selectedClass}/get-subjects`);
      }
      return null;
    },
    enabled: !!selectedClass,
  });

  useEffect(() => {
    setSubjects(subjectsData);
  }, [subjectsData]);

  if (classError || subjectsError) {
    console.log("error");
  }
  if (classIsPending) {
    return <p>Loading.....</p>;
  }

  //   const { examName,  exams } = examData;
  return (
    <>
      <Formik
        initialValues={{
          examName: "examName",
          classId: "classId",
          exams: [{ data: "", subjectId: "" }],
        }}
        // validationSchema={Yup.object().shape({
        //   examName: Yup.string().max(255).required("Exam name is required"),
        //   classId: Yup.string().max(255).required("Class is required"),
        //   exams: Yup.array().of(
        //     Yup.object().shape({
        //       date: Yup.date().required,
        //       subjectId: Yup.string().required,
        //     })
        //   ),
        // })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(`${base_url}/exam/create`, values);
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
                  <InputLabel htmlFor="examName-signup">Exam Name</InputLabel>
                  <OutlinedInput
                    id="examName-login"
                    type="examName"
                    value={values.examName}
                    name="examName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="First Term Exam"
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
                    {classes.map((classItem, index) => (
                      <MenuItem key={index} value={classItem._id}>
                        {classItem.className}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.classId && errors.classId && (
                    <FormHelperText error id="helper-text-classId-signup">
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
                              id={`exams.${index}.date`}
                              type="date"
                              value={values.exams[index].date}
                              name={`exams.${index}.date`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              inputProps={{}}
                            />
                            <InputLabel htmlFor={`exams.${index}.subjectId`}>Subject</InputLabel>
                            <Select
                              fullWidth
                              id={`exams.${index}.subjectId`}
                              value={values.exams[index].subjectId}
                              name={`exams.${index}.subjectId`}
                              // error={Boolean(
                              //   touched.exams[index].subjectId && errors.exams[index].subjectId
                              // )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {subjects &&
                                subjects.subjects &&
                                subjects.subjects.map((subject, index) => (
                                  <MenuItem key={index} value={subject}>
                                    {subject}
                                  </MenuItem>
                                ))}
                            </Select>
                            {touched.classId && errors.classId && (
                              <FormHelperText error id="helper-text-classId-signup">
                                {errors.classId}
                              </FormHelperText>
                            )}
                            <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push({ date: "", subjectId: "" })}
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

export default ExamEdit;
