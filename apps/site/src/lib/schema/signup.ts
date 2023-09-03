import {
  object,
  string,
  email,
  minLength,
  parse,
  required,
  type Input,
  type ValiError,
} from "valibot";

export const SignupSchema = required(
  object({
    email: string([email()]),
    username: string(),
    password: string([minLength(8)]),
  })
);

export const checkSignupFields = (fields: Input<typeof SignupSchema>) => {
  try {
    parse(SignupSchema, fields);
  } catch (err) {
    return err as ValiError;
  }
  return null;
};
