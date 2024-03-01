//react imports
import { useEffect, useState } from "react";

//ui imports
import {
  Box,
  Button,
  Modal,
  InputLabel,
  Typography,
  OutlinedInput,
  FormHelperText,
  Grid,
  Stack,
} from "@mui/material";

//third party
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";

//project imports
import modalStyle from "../../themes/modalStyle";
import { base_url } from "utils/baseurl";
import { htmlDate } from "utils/formatDate";
import AnimateButton from "components/@extended/AnimateButton";

const AddFeeModal = ({ onClose, open, data }) => {
  const {_id } = data;
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Fee Payment for {data.name}
        </Typography>
        <Box>
          <Formik
            initialValues={{
              date: htmlDate(),
              amount: "",
              discount: "",
            }}
            validationSchema={Yup.object().shape({
              date: Yup.date(),
              amount: Yup.number(),
              discount: Yup.number(),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                values = { ...values, studentId: _id };
                const response = await axios.put(`${base_url}/fees/create`, values);
                if (!response.data.success) setErrors({ submit: response.data.message });
                else onClose();

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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddFeeModal;
