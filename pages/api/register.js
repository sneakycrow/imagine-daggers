import bcrypt from 'bcrypt';
import { graphQLClient } from '../../utils/apollo-client';
import { NEW_USER_MUTATION } from '../../lib/mutations';

// BCRYPT SETTINGS
const saltRounds = 10;

const registerHandler = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = {
    username,
    email,
    password
  };
  graphQLClient
    .mutate({ mutation: NEW_USER_MUTATION, variables: newUser })
    .then(mutationResponse => res.json(mutationResponse));
};

export default registerHandler;
