import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, TextField, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as UserService from "../../services/Users";
import { IUser } from "../../types/users";

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required."),
  lastname: Yup.string().required("Last name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const initialData: IUser = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (values: IUser) => {
    const res = await UserService.add(values);
    if (res.status === 200) {
      localStorage.setItem("password", values.password);
      navigate("/");
    } else {
      setErrorMessage("Error while signing up.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              className="input-field"
              autoComplete="off"
              label="First name"
              name="firstname"
              type="text"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                !values.firstname && touched.firstname && errors.firstname
              )}
              helperText={
                !values.firstname && touched.firstname && errors.firstname
              }
            />
            <TextField
              fullWidth
              className="input-field"
              autoComplete="off"
              label="Last name"
              name="lastname"
              type="text"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                !values.lastname && touched.lastname && errors.lastname
              )}
              helperText={
                !values.lastname && touched.lastname && errors.lastname
              }
            />
            <TextField
              fullWidth
              className="input-field"
              autoComplete="off"
              label="Email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(!values.email && touched.email && errors.email)}
              helperText={!values.email && touched.email && errors.email}
            />
            <TextField
              fullWidth
              className="input-field"
              autoComplete="off"
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(
                !values.password && touched.password && errors.password
              )}
              helperText={
                !values.password && touched.password && errors.password
              }
            />
            <Button
              fullWidth
              disabled={!isValid}
              type="submit"
              sx={{
                margin: "10px !important",
                padding: "10px",
              }}
              color="primary"
              variant="contained"
            >
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
      <p>
        Already have account? <Link to="/">Login</Link>
      </p>
    </Container>
  );
};
export default SignUp;
