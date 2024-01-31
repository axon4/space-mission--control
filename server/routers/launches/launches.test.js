const request = require('supertest');
const server = require('../../Express');
const { connectMongo, disconnectMongo } = require('../../services/mongoService');

describe('/launches', () => {
	beforeAll(async () => {await connectMongo()});

	afterAll(async () => {await disconnectMongo()});

	describe('GET', () => {
		it('get launches', async () => {
			const response = await request(server)
				.get('/v1/launches')
				.expect(200)
				.expect('Content-Type', /application\/json/);
	
			expect(response.statusCode).toBe(200);
		});
	});

	describe('POST', () => {
		const launch = {
			mission: 'Test Mission',
			rocket: 'Test Rocket',
			destination: 'Kepler-62 F',
			launchDate: 'January 24, 2024'
		};

		const launchWithOutDate = Object.assign({}, launch);
		delete launchWithOutDate.launchDate;

		it('schedule launch', async () => {
			const response = await request(server)
				.post('/v1/launches')
				.send(launch)
				.expect(201)
				.expect('Content-Type', /application\/json/);

			expect(response.body).toMatchObject(launchWithOutDate);

			const requestDate = (new Date(launch.launchDate)).valueOf();
			const responseDate = (new Date(response.body.launchDate)).valueOf();

			expect(responseDate).toBe(requestDate);
		});

		it('fail to schedule launch with missing date', async () => {
			const response = await request(server)
				.post('/v1/launches')
				.send(launchWithOutDate)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			expect(response.body).toStrictEqual({error:  'missing launch-details'});
		});

		it('fail to schedule launch with invalid date', async () => {
			const launchWithInValidDate = Object.assign({}, launch);
			launchWithInValidDate.launchDate = 'iNvAlIdDaTe';

			const response = await request(server)
				.post('/v1/launches')
				.send(launchWithInValidDate)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			expect(response.body).toStrictEqual({error: 'invalid launch-date'});
		});
	});
});