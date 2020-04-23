import request from 'supertest';
import { server } from '../../../server';
import { addUser } from '../../../repository/user.repo';
import { v4 as uuid } from 'uuid';
import argon2 from 'argon2';

xdescribe('INT:API @Auth', () => {
  describe('POST /login', async () => {
    const testUser = beforeAll(async () => {
      const passwordHash = await argon2.hash('yoloplainpass');
      await addUser({
        id: uuid(),
        email: 'yolouser@yolo.com',
        passwordHash,
      });
    });

    it('should return a jwt token for valid user creds', async () => {
      const response = await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            email: '',
            password: '',
          })
        )
        .set('Content-Type', 'application/json');
    });
  });
});
