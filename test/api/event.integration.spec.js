import TestUtil from '../TestUtil'
import Authentication from '../../src/api/auth/Authentication'

describe('Events', () => {
  let token
  before(() => {
    token = Authentication.createToken('teste@testando.com').token
  })

  const request = TestUtil.requestApi('event')

  context('Get /', () => {
    it('should return only the event registred', (done) => {
      const returnExpected = {
        'status': true,
        'data': [
          {
            '_id': '200000000000000000000001',
            'title': 'BrazilJS - Fortaleza',
            'link': 'https://braziljs.org/conf/',
            'price': 1.5,
            'image': 'https://braziljs.org/wp-content/themes/braziljs/assets/img/logos/braziljs-00508dcfc4.svg',
            '__v': 0,
            'location': {
              'city': 'Fortaleza',
              'state': 'CE',
              'address': 'Faculdade Sete de Setembro'
            },
            'date': {
              'day': 1,
              'month': 'Setembro',
              'year': 2017
            }
          }
        ]
      }

      request.get('/')
        .expect('Content-Type', /json/)
        .expect(200, returnExpected)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Get /:id', () => {
    it('should return only one', (done) => {
      const returnExpected = {
        'status': true,
        'data':
          {
            '_id': '200000000000000000000001',
            'title': 'BrazilJS - Fortaleza',
            'link': 'https://braziljs.org/conf/',
            'price': 1.5,
            'image': 'https://braziljs.org/wp-content/themes/braziljs/assets/img/logos/braziljs-00508dcfc4.svg',
            '__v': 0,
            'location': {
              'city': 'Fortaleza',
              'state': 'CE',
              'address': 'Faculdade Sete de Setembro'
            },
            'date': {
              'day': 1,
              'month': 'Setembro',
              'year': 2017
            }
          }
      }

      request.get('/200000000000000000000001')
        .expect('Content-Type', /json/)
        .expect(200, returnExpected)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error on retrieve unpersisted event', (done) => {
      const returnExpected = {
        status: false,
        data: {}
      }

      request.get('/200000000000000000000002')
        .expect('Content-Type', /json/)
        .expect(404, returnExpected)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error on use incorrect id', (done) => {
      request.get('/1234')
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Post /', () => {
    it('should persist the new event', (done) => {
      const event = {
        'title': 'BrazilJS - POA',
        'link': 'https://braziljs.org/conf/',
        'price': 1.5,
        'image': 'https://braziljs.org/wp-content/themes/braziljs/assets/img/logos/braziljs-00508dcfc4.svg',
        '__v': 0,
        'location': {
          'city': 'POA',
          'state': 'RS',
          'address': 'Barra Shopping Sul'
        },
        'date': {
          'day': 25,
          'month': 'Agosto',
          'year': 2017
        }
      }

      request.post('/')
        .send(event)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error when not have price', (done) => {
      const event = {
        'title': 'BrazilJS - POA',
        'link': 'https://braziljs.org/conf/',
        'image': 'https://braziljs.org/wp-content/themes/braziljs/assets/img/logos/braziljs-00508dcfc4.svg',
        'location': {
          'city': 'POA',
          'state': 'RS',
          'address': 'Barra Shopping Sul'
        },
        'date': {
          'day': 25,
          'month': 'Agosto',
          'year': 2017
        }
      }

      request.post('/')
        .send(event)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Put /:id', () => {
    it('should update the event', (done) => {
      const event = {
        'title': 'BrazilJS - POA',
        'link': 'https://braziljs.org/conf/',
        'price': 1.5,
        'image': 'https://braziljs.org/wp-content/themes/braziljs/assets/img/logos/braziljs-00508dcfc4.svg',
        '__v': 0,
        'location': {
          'city': 'POA',
          'state': 'RS',
          'address': 'Barra Shopping Sul'
        },
        'date': {
          'day': 25,
          'month': 'Agosto',
          'year': 2017
        }
      }

      request.put('/200000000000000000000001')
        .send(event)
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })
    it('should return error on update event not persisted', (done) => {
      const event = {}

      request
        .put('/200000000000000000000003')
        .set('authorization', `Bearer ${token}`)
        .send(event)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error on update event with invalid id', (done) => {
      const event = {}

      request
        .put('/1234')
        .set('authorization', `Bearer ${token}`)
        .send(event)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })

  context('Delete /:id', () => {
    it('should delete the event', (done) => {
      request
        .del('/200000000000000000000001')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(TestUtil.endTest.bind(null, done))
    })

    it('should return error on delete event with id invalid', (done) => {
      request
        .del('/1234')
        .set('authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(TestUtil.endTest.bind(null, done))
    })
  })
})
