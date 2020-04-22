import request from 'supertest';
import { server } from '../../server';
import { addUser } from '../../repository/user.repo';
import { userSamples } from '../samples/user.sample';
import { NewUserDTO } from '../../models/user/new-user.dto';
import { postgresConnection as conn } from '../../db/connections';
import { UpdateUserDTO } from '../../models/user/update-user.dto';

const loadTestData = async () => {
  await userSamples.forEach(user => {
    addUser(user);
  });
};

const truncateUsers = async () => {
  await conn.none(`TRUNCATE TABLE public.users`);
};

describe('@User INTEGRATION', () => {
  // afterAll(() => server.close());

  beforeAll(async () => {
    await truncateUsers();
    await loadTestData();
  });

  describe('GET /', () => {
    it('it should return the all users', async done => {
      const result = await request(server.callback()).get('/api/users');
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

      done();
    });
  });

  describe('GET /:userId', () => {
    it('it should return the correct user', async done => {
      const user = userSamples[1];
      const result = await request(server.callback()).get(
        `/api/users/${user.id}`
      );
      expect(result.status).toEqual(200);
      expect(result.body.email).toEqual(user.email);
      done();
    });
  });

  describe('PATCH /', () => {
    it('it should update the user', async done => {
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
        .set('Content-Type', 'application/json');

      expect(updateRes.status).toEqual(200);
      expect(updateRes.body.firstName).toEqual(updatedUser.firstName);

      const getRes = await request(server.callback()).get(
        `/api/users/${updatedUser.id}`
      );
      expect(getRes.status).toEqual(200);
      expect(getRes.body.firstName).toEqual(newName);

      done();
    });

    it('should return a 400 if an invalid update user object is sent', async done => {
      const userId = userSamples[2].id;

      const user = {
        id: userId,
        blerghaherg: 'lolbets',
      };

      const updateRes = await request(server.callback())
        .patch(`/api/users`)
        .send(JSON.stringify(user))
        .set('Content-Type', 'application/json');

      expect(updateRes.status).toEqual(400);

      done();
    });

    it('should return a 404 if user is not found', async done => {
      const user = {
        id: 'notfounduserid',
        firstName: 'something',
      };

      const updateRes = await request(server.callback())
        .patch(`/api/users`)
        .send(JSON.stringify(user))
        .set('Content-Type', 'application/json');

      expect(updateRes.status).toEqual(404);

      done();
    });
  });

  describe('POST /', () => {
    it('it should add a user', async done => {
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
        .set('Content-Type', 'application/json');

      expect(response.status).toEqual(201);

      done();
    });

    it('it should return a 409 when creating a duplicate user', async done => {
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
        .set('Content-Type', 'application/json');

      const response = await request(server.callback())
        .post('/api/users')
        .send(
          JSON.stringify({
            user: newUser,
          })
        )
        .set('Content-Type', 'application/json');

      expect(response.status).toEqual(409);

      done();
    });

    it('should return a 400 if an invalid new user object is sent', async done => {
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
        .set('Content-Type', 'application/json');

      expect(response.status).toEqual(400);

      done();
    });
  });
});
