import request from 'supertest';
import { server } from '../server';
import { addUser } from '../repository/user.repo';
import { userSamples } from './samples/user.sample';
import { UserDTO } from '../models/new-user.dto';
import { postgresConnection as conn } from '../db/connections';

const loadTestData = async () => {
  await userSamples.forEach(user => {
    addUser(user);
  });
};

const truncateUsers = async () => {
  await conn.none(`TRUNCATE TABLE public.users`);
};

describe('@User', () => {
  // afterAll(() => server.close());

  beforeAll(async () => {
    await truncateUsers();
    await loadTestData();
  });

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

  it('it should return the correct user', async done => {
    const user = userSamples[1];
    const result = await request(server.callback()).get(
      `/api/users/${user.id}`
    );
    expect(result.status).toEqual(200);
    expect(result.body.email).toEqual(user.email);
    done();
  });

  it('it should update the user', async done => {
    const newName = 'mittens';
    const userId = userSamples[2].id;

    const user = {
      id: userId,
      firstName: newName,
    };

    const updateRes = await request(server.callback())
      .patch(`/api/users`)
      .send(JSON.stringify(user))
      .set('Content-Type', 'application/json');

    expect(updateRes.status).toEqual(200);
    expect(updateRes.body.firstName).toEqual(user.firstName);

    const reloadRes = await request(server.callback()).get(
      `/api/users/${user.id}`
    );
    expect(reloadRes.status).toEqual(200);
    expect(reloadRes.body.firstName).toEqual(newName);

    done();
  });

  it('it should add a user', async done => {
    const newUser: UserDTO = {
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

    expect(response.status).toEqual(200);

    done();
  });
});
