import joi from '@hapi/joi';
import { Failable, failure, success } from '../util/failable';

export type UserDTO = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export const validateUserDTO = (userDTO: UserDTO): Failable => {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required(),
  });

  console.log('🦄 userDTO', userDTO);
  const { value, error } = schema.validate(userDTO);

  console.log('🐥 value, error', value, error);

  if (error) return failure(error);
  return success(value);
};
