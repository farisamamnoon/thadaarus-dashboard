import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  Box,
  Chip,
  MenuItem,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

// project import
import AnimateButton from "components/@extended/AnimateButton";
import { visitLexicalEnvironment } from "../../../node_modules/typescript/lib/typescript";
import { base_url } from "utils/baseurl";

// ============================|| FIREBASE - REGISTER ||============================ //

const Class = () => {
  const [subjectName, setSubjectName] = useState([]);

  const names = ["hai,", "bai", "go", "nbabi", "adfkj"];

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    formikprops.setFieldValue("subjects", value);

    setSubjectName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const formikprops = useFormik({
    initialValues: {
      className: "",
      division: "",
      teacher: "",
      subjects: [],
      batch: "",
      fees: "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      className: Yup.number()
        .typeError("Class should be a number")
        .min(1, 'Minimum value is 1')
        .required("Class is required"),
      division: Yup.string().max(255),
      teacher: Yup.string().max(255).required("A Teacher is required"),
      subjects: Yup.string().max(255).required("Select the subjects"),
      batch: Yup.number().required("Enter the batch year"),
      fees: Yup.number().required("Enter the total fees of the class"),
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        console.log("values");
        const response = await axios.post(`${base_url}/class/create`, values);

        setStatus({ success: false });
        setSubmitting(false);
      } catch (err) {
        console.error(err);
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <form noValidate onSubmit={formikprops.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="className">Class Standard</InputLabel>
              <OutlinedInput
                id="className"
                type="number"
                value={formikprops.values.className}
                name="className"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                fullWidth
                error={Boolean(
                  formikprops.touched.className && formikprops.errors.className
                )}
              />
              {formikprops.touched.className &&
                formikprops.errors.className && (
                  <FormHelperText error id="helper-text-className-signup">
                    {formikprops.errors.className}
                  </FormHelperText>
                )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="division">Division</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formikprops.touched.division && formikprops.errors.division
                )}
                id="division"
                value={formikprops.values.division}
                name="division"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                inputProps={{}}
              />
              {formikprops.touched.division && formikprops.errors.division && (
                <FormHelperText error id="helper-text-division-signup">
                  {formikprops.errors.division}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="teacher">Class Teacher</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formikprops.touched.teacher && formikprops.errors.teacher
                )}
                id="teacher"
                value={formikprops.values.teacher}
                name="teacher"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                inputProps={{}}
              />
              {formikprops.touched.teacher && formikprops.errors.teacher && (
                <FormHelperText error id="helper-text-teacher-signup">
                  {formikprops.errors.teacher}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel id="subjects">Subjects</InputLabel>
              <Select
                labelId="subjects"
                id="subjects"
                multiple
                value={formikprops.values.subjects}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    // style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="batch">Batch</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formikprops.touched.batch && formikprops.errors.batch
                )}
                id="batch"
                value={formikprops.values.batch}
                name="batch"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                placeholder="2019"
                inputProps={{}}
              />
              {formikprops.touched.batch && formikprops.errors.batch && (
                <FormHelperText error id="helper-text-batch-signup">
                  {formikprops.errors.batch}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="fees">Fees</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formikprops.touched.fees && formikprops.errors.fees
                )}
                id="fees"
                value={formikprops.values.fees}
                name="fees"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                inputProps={{}}
              />
              {formikprops.touched.fees && formikprops.errors.fees && (
                <FormHelperText error id="helper-text-fees-signup">
                  {formikprops.errors.fees}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={formikprops.isSubmitting}
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
    </>
  );
};

export default Class;
