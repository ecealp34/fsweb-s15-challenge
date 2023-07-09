const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
test('[0] sanity check', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('users', () => {
  test('[1] register', async () => {
    const payload = { username: 'name', password: "1234"}
    const res = await request(server).post('/api/auth/register').send(payload)
    expect(res.body).toHaveProperty("id")
    expect(res.status).toBe(201)
  })
  test('[2] not register with same username ', async () => {
    const payload = { username: 'name', password: "1234"}
    const res = await request(server).post('/api/auth/register').send(payload)
    expect(res.body).toHaveProperty("message", "Username alınmış")
  })
  test('[3] login ', async () => {
    const payload = { username: 'name', password: "1234"}
    const res = await request(server).post('/api/auth/login').send(payload)
    expect(res.body).toHaveProperty("token")
  })
  test('[4] not login with this username', async () => {
    const payload = { username: 'name1', password: "1234"}
    const res = await request(server).post('/api/auth/login').send(payload)
    expect(res.body).not.toHaveProperty("token")
  })
})

describe('bilmeceler', () => {
  test('[5] can get all bilmeceler', async () => {
    const payload = { username: 'name', password: "1234"}
    const res = await request(server).post('/api/bilmeceler').send(payload)
    expect(res.body).toHaveProperty("message", "token gereklidir")
  })
  test('[6] can get the correct number of bilmeceler', async () => {
    const payload = { username: 'name', password: "1234"}
    const login = await request(server).post('/api/auth/login').send(payload)
    const res = await request(server).get('/api/bilmeceler').set('Authorization', login.body.token)
    expect(res.body).toHaveLength(3)
  })
})









