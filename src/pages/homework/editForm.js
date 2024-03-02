//react imports
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";

// assets
import { base_url } from "utils/baseurl";
import { fetchData } from "utils/fetchData";
import { formatStringToDate } from "utils/formatDate";

// ============================|| FIREBASE - REGISTER ||============================ //

const HomeWorkEdit = () => {
  const id = useParams().id;
  const {
    data: formData,
    error: formError,
    isFetching: formIsFetching,
  } = useQuery({
    queryKey: ["formData"],
    queryFn: async () => await fetchData(`homework/${id}/get`),
  });

  const [subjects, setSubjects] = useState({});
  const [selectedClass, setSelectedClass] = useState(formData?.classId._id);

  const {
    data: classes,
    error: classError,
    isPending: classIsPending,
  } = useQuery({ queryKey: ["classData"], queryFn: async () => await fetchData("class/get-all") });

  const {
    data: subjectsData,
    error: subjectsError,
    isFetching: subjectsIsFetching,
  } = useQuery({
    queryKey: ["subjectData", selectedClass],
    queryFn: async () => {
      if (selectedClass) {
        return await fetchData(`class/${selectedClass}/get-subjects`);
      }
      return null;
    },
    enabled: !!selectedClass,
  });

  useEffect(() => {
    setSubjects(subjectsData);
  }, [subjectsData]);

  if (formError || subjectsError) {
    return <p>There was an error</p>;
  }
  if (subjectsIsFetching || formIsFetching) {
    return <CircularProgress />;
  }

  const { subjectId, date, classId, desc } = formData;
  return (
    <>
      <Formik
        initialValues={{
          subjectId: subjectId,
          date: formatStringToDate(date),
          classId: classId._id,
          desc: desc,
          subjectId: subjectId,
          date: formatStringToDate(date),
          classId: classId._id,
          desc: desc,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          subjectId: Yup.string().max(255).required("Subject is required"),
          date: Yup.date().required("Enter a last submission date"),
          classId: Yup.string().required("Select a class"),
          desc: Yup.string().required("Enter a description of the homework"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.put(`${base_url}/homework/${id}/edit`, values);
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="subjectId">Subject</InputLabel>
                  <Select
                    fullWidth
                    id="subjectId"
                    value={values.subjectId}
                    name="subjectId"
                    // error={Boolean(
                    //   touched.exams[index].subjectId && errors.exams[index].subjectId
                    // )}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {subjects &&
                      subjects.subjects.map((subject, index) => (
                        <MenuItem key={index} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                  </Select>
                  {touched.subject && errors.subject && (
                    <FormHelperText error id="helper-text-subject-signup">
                      {errors.subject}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="date">Date</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.date && errors.date)}
                    id="date"
                    type="date"
                    value={values.date}
                    name="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.date && errors.date && (
                    <FormHelperText error id="helper-text-date-signup">
                      {errors.date}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="desc">Description</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.desc && errors.desc)}
                    id="desc"
                    value={values.desc}
                    name="desc"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.desc && errors.desc && (
                    <FormHelperText error id="helper-text-desc-signup">
                      {errors.desc}
                    </FormHelperText>
                  )}
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

export default HomeWorkEdit;
