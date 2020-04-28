import request from 'supertest';
import { server } from '../../../server';
import { addUser } from '../../../repository/user.repo';
import { v4 as uuid } from 'uuid';
import argon2 from 'argon2';
import { USER_ROLE } from '../../../common/permissions/role';
import { BASIC_USER } from '../../../common/permissions/user';

describe('INT:API @Auth', () => {
  describe('POST /login', () => {
    const testUserPass = 'yoloplainpass';
    let testUser: any;

    beforeAll(async () => {
      testUser = {
        id: uuid(),
        email: 'yolouser@yolo.com',
        firstName: 'uno',
        lastName: 'dos',
        passwordHash: await argon2.hash(testUserPass),
        permissions: {
          roleMask: USER_ROLE,
          userMask: BASIC_USER,
        },
      };
      await addUser(testUser);
    });

    it('should return a jwt token for valid user creds', async () => {
      const loginUser = {
        email: testUser.email,
        password: testUserPass,
      };
      const response = await request(server.callback())
        .post('/auth/login')
        .send(JSON.stringify({ user: loginUser }))
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});
