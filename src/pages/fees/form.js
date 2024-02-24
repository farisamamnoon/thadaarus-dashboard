//react imports
import { useEffect, useState } from "react";

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
  CircularProgress,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";

// ============================|| FIREBASE - REGISTER ||============================ //

const FeesForm = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState({});

  const {
    data: classes,
    error: classError,
    isPending: classIsPending,
  } = useQuery({ queryKey: ["classData"], queryFn: async () => fetchData("class/get-all") });

  const {
    data: studentData,
    error: studentError,
    isPending: studentIsPending,
  } = useQuery({
    queryKey: ["studentData", selectedClass],
    queryFn: async () => {
      if (selectedClass) {
        return await fetchData(`student/${selectedClass}/get-students`);
      }
      return null;
    },
    enabled: !!selectedClass,
  });

  useEffect(() => {
    setStudents(studentData);
  }, [studentData]);

  if (classError) {
    console.log(classError);
  }
  if (classIsPending) {
    return <CircularProgress />;
  }
  return (
    <>
      <Formik
        initialValues={{
          studentId: "",
          classId: "",
          date: "",
          amount: "",
          discount: "",
        }}
        validationSchema={Yup.object().shape({
          studentId: Yup.string().max(255).required("Student name is required"),
          classId: Yup.string().required("Class is required"),
          date: Yup.date().required("Date is required"),
          amount: Yup.number(),
          discount: Yup.number(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(`${base_url}/fees/create`, values);
            console.log(response.data);
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
                    {students.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.studentId && errors.studentId && (
                    <FormHelperText error id="helper-text-studentId-signup">
                      {errors.studentId}
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.amount && errors.amount)}
                    id="amount"
                    type="number"
                    value={values.amount}
                    name="amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.amount && errors.amount && (
                    <FormHelperText error id="helper-text-amount-signup">
                      {errors.amount}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="discount">Discount</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.discount && errors.discount)}
                    id="discount"
                    type="number"
                    value={values.discount}
                    name="discount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.discount && errors.discount && (
                    <FormHelperText error id="helper-text-discount-signup">
                      {errors.discount}
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
                    Add
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

export default FeesForm;
