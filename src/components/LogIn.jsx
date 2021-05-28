import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

class LogIn extends Component {
  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values }),
          };
          fetch("http://localhost:3000/auth", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("token", data.token);
              alert("Logged in!");
              this.props.history.push("/");
            })
            .catch((err) => console.log(err));
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().min(3).max(30).required("Required"),
          password: Yup.string().max(30).required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <Row>
              <Col className="m-auto" md="4">
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Label
                    className="mt-2"
                    htmlFor="username"
                    style={{ display: "block" }}
                  >
                    Username
                  </Form.Label>
                  <Form.Control
                    id="username"
                    placeholder="Enter your username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.username && touched.username
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  <Form.Label
                    className="mt-2"
                    htmlFor="password"
                    style={{ display: "block" }}
                  >
                    Password
                  </Form.Label>
                  <Form.Control
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />

                  <Button
                    className="mt-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          );
        }}
      </Formik>
    );
  }
}

export default LogIn;
