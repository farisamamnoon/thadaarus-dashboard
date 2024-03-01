//react imports
import { useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index";

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
import { fetchData } from "utils/fetchData";
import { base_url } from "utils/baseurl";
import Error from "utils/Error";
import { LinearProgress } from "../../../node_modules/@mui/material/index";
import Progress from "utils/Progress";

// assets

// ============================|| FIREBASE - REGISTER ||============================ //

const HomeWork = () => {
  const navigate = useNavigate();
  const classId = useParams().classId;

  const {
    data: subjectsData,
    error: subjectsError,
    isPending: subjectsIsPending,
  } = useQuery({
    queryKey: ["subjectData"],
    queryFn: async () => await fetchData(`class/${classId}/get-subjects`),
  });

  if (subjectsError) {
    return <Error severity="error">An unexpected error occured</Error>;
  }
  if (subjectsIsPending) {
    return <Progress />;
  }

  return (
    <>
      <Formik
        initialValues={{
          subjectId: "",
          date: "",
          classId: "",
          desc: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          subjectId: Yup.string().max(255).required("Subject is required"),
          date: Yup.date().required("Enter a last submission date"),
          desc: Yup.string().required("Enter a description of the homework"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            values = { ...values, classId };
            const response = await axios.post(`${base_url}/homework/create`, values);
            if(!response.data.success) setErrors({submit: response.data.message})
            else navigate(`/class/${classId}/homework`);
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
                    {subjectsIsPending ? (
                      <LinearProgress />
                    ) : (
                      subjectsData.subjects.map((subject, index) => (
                        <MenuItem key={index} value={subject}>
                          {subject}
                        </MenuItem>
                      ))
                    )}
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

export default HomeWork;
