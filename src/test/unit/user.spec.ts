import { toUpdateUser } from '../../util/user';
import { UpdateUserDTO } from '../../models/user/update-user.dto';
import argon2 from 'argon2';

describe('UNIT:fns @User', () => {
  describe('#getUserToSaveFromUpdateUserDTO', () => {
    it('should return a valid user with a hashed password', async () => {
      const updateUserDTO: UpdateUserDTO = {
        id: 'a60a1b74-61f8-40e9-9efa-075e0f84180f',
        firstName: 'firsty',
        lastName: 'mclasterson',
        password: 'bestpass',
      };
      const user = await toUpdateUser(updateUserDTO);

      expect(user.id).toEqual(updateUserDTO.id);
      expect(user.firstName).toEqual(updateUserDTO.firstName);
      expect(user.lastName).toEqual(updateUserDTO.lastName);
      expect(user.passwordHash).not.toEqual(updateUserDTO.id);
      const isHashValid = await argon2.verify(
        user.passwordHash,
        updateUserDTO.password as string
      );
      expect(isHashValid).toBe(true);
    });
  });
});
