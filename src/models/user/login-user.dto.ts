import joi, { ValidationError } from '@hapi/joi';
import { Failable, success, failure } from '../../util/failable';

export type LoginUserDTO = {
  email: string;
  password: string;
};

export const validateLoginUser = (
  loginUser: LoginUserDTO
): Failable<ValidationError | LoginUserDTO> => {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(loginUser);

  if (error) return failure(error);
  return success(loginUser);
};
