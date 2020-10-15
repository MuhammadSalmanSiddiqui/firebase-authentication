import React, { useState, useEffect } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Errors, setErrors] = useState([]);
  const [Loading, setLoading] = useState(false);

  let errors = [];

  //Error display method
  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  //Checking form is Valid or not
  const isformValid = (email, password) => email && password;

  //Action on Submit button click
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isformValid(Email, Password)) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(Email, Password)
        .then((signedInUser) => {
          console.log(signedInUser);
          setLoading(false);
        })
        .catch((err) => {
          setErrors(errors.concat(err));
          setLoading(false);
        });
    }
  };

  const handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  return (
    <Grid className="app" textAlign="center" verticalAlign="middle">
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet"></Icon>
          Login to DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              onChange={(event) => setEmail(event.target.value)}
              value={Email}
              className={handleInputError(Errors, "email")}
              type="email"
            />
            <Form.Input
              fluid
              name="Password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={Password}
              className={handleInputError(Errors, "password")}
              type="password"
            />

            <Button
              disabled={Loading}
              className={Loading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {Errors.length > 0 ? (
          <Message error>
            <h3>Error</h3>
            {displayErrors(Errors)}
          </Message>
        ) : null}
        <Message>
          Don't have an account?<Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export { Login };
