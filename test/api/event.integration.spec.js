import TestUtil from '../TestUtil'

describe('Events', () => {
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
      const request = TestUtil.requestApi('event')

      request.get('/')
        .expect('Content-Type', /json/)
        .expect(200, returnExpected)
        .end(TestUtil.endTest.bind(null, done))
    })
  })
})
