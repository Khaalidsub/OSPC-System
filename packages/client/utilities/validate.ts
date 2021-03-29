import { REG_EMAIL, REG_PASSWORD } from '@common/utils';
export const validateLogin = (values) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!REG_EMAIL.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

export const valdiateRegister = (values) => {
  const errors: any = {};
  if (!values.email || !values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!REG_EMAIL.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password || !values.password.trim()) {
    errors.password = 'Password is required';
  } else if (!REG_PASSWORD.test(values.password) || values.password < 6)
    errors.password = 'Password too weak';

  if (
    !values.Cpassword ||
    !values.Cpassword.trim() ||
    values.Cpassword !== values.password
  )
    errors.Cpassword = 'Confirm password is not the same as the password';

  if (!values.university || !values.university.trim())
    errors.university = 'University is required';
  if (!values.name || !values.name.trim()) errors.name = 'Name is required';
  //   else if (!values.name.length > 6)
  return errors;
};

export const validateSubjectSepc = (values) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = 'title is required';
  }

  if (!values.description) {
    errors.description = 'description is required';
  }
  return errors;
};
export const validateSubjectArea = (values) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'name is required';
  }

  if (!values.description) {
    errors.description = 'description is required';
  }
  console.log(errors);

  return errors;
};
export const validateSubject = (values) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = 'name is required';
  }

  if (!values.description) {
    errors.description = 'description is required';
  }
  console.log(errors);

  return errors;
};
