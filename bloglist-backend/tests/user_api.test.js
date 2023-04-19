const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({});
  
      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });
  
      await user.save();
    });
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    });
});

describe('addition of invalid user', () => {
    test('username already in db', async () => {
		const userPayload = {
			username: 'root',
			password: 'password',
			name: 'Test User 1'
		};

		await api.post('/api/users').send(userPayload).expect(400);
	});

    test('username less than 3 chars', async () => {
        const userPayload = {
			username: 'tu',
			password: 'password',
			name: 'Test User 1'
		};

		await api.post('/api/users').send(userPayload).expect(400);
    });

    test('password < 3 chars', async () => {
        const userPayload = {
			username: 'username',
			password: 'pa',
			name: 'Test User 1'
		};

        await api.post('/api/users').send(userPayload).expect(400);
    })
});