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
import md5 from "md5";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [Errors, setErrors] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [usersRef, setusersRef] = useState(firebase.database().ref("users"));

  let errors = [];
  let error;

  useEffect(() => {
    console.log(Errors);
  }, [Errors]);

  const isFormEmpty = (userName, Email, Password, confirmPassword) => {
    return (
      !userName.length ||
      !Email.length ||
      !Password.length ||
      !confirmPassword.length
    );
  };

  const isPasswordValid = (Password, confirmPassword) => {
    if (Password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (Password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const isformValid = () => {
    if (isFormEmpty(userName, Email, Password, confirmPassword)) {
      error = { message: "Fill in all fields" };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid(Password, confirmPassword)) {
      error = { message: "Password is invalid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const saveUser = (createdUser) => {
    console.log("USERS REFERENCE");
    console.log(usersRef);
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isformValid()) {
      setErrors([]);
      setLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then((createdUser) => {
          console.log("USERS CREATED");
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: userName,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?id=identicon`,
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("User Profile Saved");
                setLoading(false);
              });
            })
            .catch((err) => {
              console.error(err);
              setErrors(errors.concat(err));
              setLoading(false);
            });
        })
        .catch((err) => {
          console.error(err);
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
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange"></Icon>
          Register for DevChat
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
              type="text"
            />
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
            <Form.Input
              fluid
              name="Password"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Password"
              onChange={(event) => setconfirmPassword(event.target.value)}
              value={confirmPassword}
              className={handleInputError(Errors, "password")}
              type="password"
            />
            <Button
              disabled={Loading}
              className={Loading ? "loading" : ""}
              color="orange"
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
          Already a user?<Link to="login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export { Register };
