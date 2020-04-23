import { UpdateUserDTO, UpdateUser } from '../models/user/update-user.dto';
import { User } from '../models/user/user.model';
import argon2 from 'argon2';

export const toUpdateUser = async (
  updateUserDTO: UpdateUserDTO
): Promise<UpdateUser> => {
  let userToUpdate: any = { id: updateUserDTO.id };
  if (updateUserDTO.firstName) userToUpdate.firstName = updateUserDTO.firstName;
  if (updateUserDTO.lastName) userToUpdate.lastName = updateUserDTO.lastName;
  if (updateUserDTO.password) {
    userToUpdate.passwordHash = await argon2.hash(updateUserDTO.password);
  }
  return userToUpdate;
};
