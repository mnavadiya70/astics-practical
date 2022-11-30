import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, TextField, Alert } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ILogin } from "../../types/login";
import { IUser } from "../../types/users";
import usersData from "../../mock-data/users.json";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const initialData: ILogin = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (values: ILogin) => {
    const user = usersData.find((user: IUser) => user.email === values.email);
    if (user) {
      if (user.password === values.password) {
        localStorage.setItem("id", user.id);
        localStorage.setItem("password", values.password);
        navigate("/");
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } else {
      setErrorMessage("User not found.");
    }
  };

  return (
    <>
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Don't have account?<Link to="/sign-up"> Sign up</Link>
      </p>
    </>
  );
};
export default Login;
