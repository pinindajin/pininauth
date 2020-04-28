import joi, { ValidationError } from '@hapi/joi';
import { Failable, failure, success } from '../../common/failable';

export type NewUserDTO = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export const validateNewUserDTO = (
  userDTO: NewUserDTO
): Failable<ValidationError | NewUserDTO> => {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(userDTO);

  if (error) return failure(error);
  return success(userDTO);
};
