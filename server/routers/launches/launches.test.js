const request = require('supertest');
const server = require('../../Express');

describe('/launches', () => {
	describe('GET', () => {
		it('get launches', async () => {
			const response = await request(server)
				.get('/launches')
				.expect(200)
				.expect('Content-Type', /application\/json/);
	
			expect(response.statusCode).toBe(200);
		});
	});

	describe('POST', () => {
		const launch = {
			mission: 'Test Mission',
			rocket: 'Test Rocket',
			destination: 'Test Destination',
			launchDate: 'January 24, 2024'
		};

		const launchWithOutDate = Object.assign({}, launch);
		delete launchWithOutDate.launchDate;

		it('schedule launch', async () => {
			const response = await request(server)
				.post('/launches')
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
				.post('/launches')
				.send(launchWithOutDate)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			expect(response.body).toStrictEqual({error:  'missing launch-details'});
		});

		it('fail to schedule launch with invalid date', async () => {
			const launchWithInValidDate = Object.assign({}, launch);
			launchWithInValidDate.launchDate = 'iNvAlIdDaTe';

			const response = await request(server)
				.post('/launches')
				.send(launchWithInValidDate)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			expect(response.body).toStrictEqual({error: 'invalid launch-date'});
		});
	});
});