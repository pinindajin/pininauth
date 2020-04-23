import request from 'supertest';
import { server } from '../../../server';
import { addUser } from '../../../repository/user.repo';
import { userSamples } from '../../samples/user.sample';
import { NewUserDTO } from '../../../models/user/new-user.dto';
import { insertUserAndGetJWT } from '../../util';
import { UpdateUserDTO } from '../../../models/user/update-user.dto';

const loadTestData = async () => {
  await userSamples.forEach(user => {
    addUser(user);
  });
};

describe('INT:API @User', () => {
  // afterAll(() => server.close());
  let jwtToken: string;

  beforeAll(async () => {
    await loadTestData();
    jwtToken = await insertUserAndGetJWT();
  });

  describe('GET /', () => {
    it('it should return the all users', async () => {
      const result = await request(server.callback())
        .get('/api/users')
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(result.status).toEqual(200);
      const [xena, pippa, deka] = userSamples;
      result.body.find((user: any) => {
        if (user.firstName === 'xena') {
          expect(user.firstName).toEqual(xena.firstName);
        }
        if (user.firstName === 'pippa') {
          expect(user.firstName).toEqual(pippa.firstName);
        }
        if (user.firstName === 'deka') {
          expect(user.firstName).toEqual(deka.firstName);
        }
      });
    });
  });

  describe('GET /:userId', () => {
    it('it should return the correct user', async () => {
      const user = userSamples[1];
      const result = await request(server.callback())
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(result.status).toEqual(200);
      expect(result.body.email).toEqual(user.email);
    });

    it('it should return 404 if no user is found', async () => {
      const result = await request(server.callback())
        .get(`/api/users/baduserid`)
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(result.status).toEqual(404);
    });
  });

  describe('PATCH /', () => {
    it('it should update the user', async () => {
      const newName = 'new-name';
      const newPassword = 'new-password';
      const userId = userSamples[2].id;

      const updatedUser: UpdateUserDTO = {
        id: userId,
        firstName: newName,
        password: newPassword,
      };

      const updateRes = await request(server.callback())
        .patch(`/api/users`)
        .send(JSON.stringify(updatedUser))
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(updateRes.status).toEqual(200);
      expect(updateRes.body.firstName).toEqual(updatedUser.firstName);

      const getRes = await request(server.callback())
        .get(`/api/users/${updatedUser.id}`)
        .set('Authorization', `Bearer ${jwtToken}`);
      expect(getRes.status).toEqual(200);
      expect(getRes.body.firstName).toEqual(newName);
    });

    it('should return a 400 if an invalid update user object is sent', async () => {
      const userId = userSamples[2].id;

      const user = {
        id: userId,
        blerghaherg: 'lolbets',
      };

      const updateRes = await request(server.callback())
        .patch(`/api/users`)
        .send(JSON.stringify(user))
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(updateRes.status).toEqual(400);
    });

    it('should return a 404 if user is not found', async () => {
      const user = {
        id: 'notfounduserid',
        firstName: 'something',
      };

      const updateRes = await request(server.callback())
        .patch(`/api/users`)
        .send(JSON.stringify(user))
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(updateRes.status).toEqual(404);
    });
  });

  describe('POST /', () => {
    it('it should add a user', async () => {
      const newUser: NewUserDTO = {
        firstName: 'mittens',
        email: 'mittens@gmail.com',
        password: 'plaintextpassword',
      };

      const response = await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            user: newUser,
          })
        )
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toEqual(201);
    });

    it('it should return a 409 when creating a duplicate user', async () => {
      const newUser: NewUserDTO = {
        firstName: 'davis',
        email: 'davis@gmail.com',
        password: 'plaintextpassword',
      };

      await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            user: newUser,
          })
        )
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      const response = await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            user: newUser,
          })
        )
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toEqual(409);
    });

    it('should return a 400 if an invalid new user object is sent', async () => {
      const newUser = {
        bumbleBug: 'wisherwash',
        bull: 'spit',
        uhoh: 'spaghetositos',
      };

      const response = await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            user: newUser,
          })
        )
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`);

      expect(response.status).toEqual(400);
    });
  });
});
