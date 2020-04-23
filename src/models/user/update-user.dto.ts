import joi, { ValidationError } from '@hapi/joi';
import { Failable, failure, success } from '../../util/failable';

export type UpdateUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  passwordHash: string;
};

export type UpdateUserDTO = {
  id: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

export const validateUpdateUserDTO = (
  updatedUserDTO: UpdateUserDTO
): Failable<ValidationError | UpdateUserDTO> => {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    id: joi.string().required(),
    password: joi.string(),
  });

  const { error } = schema.validate(updatedUserDTO);

  if (error) return failure(error);

  return success(updatedUserDTO);
};
