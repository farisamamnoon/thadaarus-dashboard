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
import { Formik } from "formik";

// project import
import AnimateButton from "components/@extended/AnimateButton";
// import { strengthColor, strengthIndicator } from 'utils/password-strength';
// import { Select, Option } from '@mui/base';

// assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { TextareaAutosize } from "../../../node_modules/@mui/material/index";
import axios from "axios";
import { base_url } from "utils/baseurl";

// ============================|| STUDENT- ADDFORM ||============================ //

const Student = () => {
  // const [level, setLevel] = useState();
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // const changePassword = (value) => {
  //   const temp = strengthIndicator(value);
  //   setLevel(strengthColor(temp));
  // };

  // useEffect(() => {
  //   changePassword('');
  // }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          dob: "",
          age: "",
          address: "",
          group: "",
          phone: "",
          classId: "",
          prevClass: "",
          prevMadrasa: "",
          remarks: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          dob: Yup.date().required("Date Of Birth is required"),
          age: Yup.number().typeError('Age must be a number').required("Age is required"),
          address: Yup.string().max(255).required("Address is required"),
          group: Yup.string().max(255),
          phone: Yup.number().required("Phone Number is required"),
          classId: Yup.number().positive('Please enter a valid class').required("Class is required"),
          prevClass: Yup.number().positive('Please enter a valid class'),
          prevMadrasa: Yup.string(),
          remarks: Yup.string().max(255),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log("values:::", values);
          try {
            const response = await axios.post(
              `${base_url}/student/create`,
              values
            );
            console.log(response.data.message);
            alert(response.message);
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Name*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="John"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="dob">Date Of Birth</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.dob && errors.dob)}
                    id="dob"
                    type="date"
                    value={values.dob}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.dob && errors.dob && (
                    <FormHelperText error id="helper-text-dob-signup">
                      {errors.dob}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.age && errors.age)}
                    id="age"
                    value={values.age}
                    name="age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.age && errors.age && (
                    <FormHelperText error id="helper-text-age-signup">
                      {errors.age}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    id="address"
                    inputComponent={TextareaAutosize}
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-signup">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="group">Event Group</InputLabel>
                  <Select
                    id="group"
                    name="group"
                    value={values.group}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={"white"}>ابيض</MenuItem>
                    <MenuItem value={"black"}>اسود</MenuItem>
                    <MenuItem value={"red"}>احمر</MenuItem>
                    <MenuItem value={"green"}>اخضر</MenuItem>
                  </Select>
                  {touched.group && errors.group && (
                    <FormHelperText error id="helper-text-group-signup">
                      {errors.group}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-signup">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone-signup"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-signup">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="classId">
                    Applying for ClassId:
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.classId && errors.classId)}
                    id="classId"
                    type="number"
                    value={values.classId}
                    name="classId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.classId && errors.classId && (
                    <FormHelperText error id="helper-text-classId-signup">
                      {errors.classId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="prev-madrasa">
                    Previous Madrasa
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.prevMadrasa && errors.prevMadrasa)}
                    id="prev-madrasa"
                    value={values.prevMadrasa}
                    name="prevMadrasa"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.prevMadrasa && errors.prevMadrasa && (
                    <FormHelperText error id="helper-text-prevMadrasa-signup">
                      {errors.prevMadrasa}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="prev-class">
                    Last Studied Class
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.prevClass && errors.prevClass)}
                    id="prev-class"
                    type="number"
                    value={values.prevClass}
                    name="prevClass"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.prevClass && errors.prevClass && (
                    <FormHelperText error id="helper-text-prevClass-signup">
                      {errors.prevClass}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="remarks">Remarks</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.remarks && errors.remarks)}
                    id="remarks"
                    value={values.remarks}
                    name="remarks"
                    inputComponent={TextareaAutosize}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.remarks && errors.remarks && (
                    <FormHelperText error id="helper-text-remarks-signup">
                      {errors.remarks}
                    </FormHelperText>
                  )}
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

export default Student;
