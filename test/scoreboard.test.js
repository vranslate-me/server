const chai = require('chai')
const expect = chai.expect
chaiHttp = require('chai-http')
const app = require('../app')
const Scoreboard = require('../models/scoreboard')

chai.use(chaiHttp)

describe('Players scoreboard', () => {
    before(function (done) {
        Scoreboard
          .deleteMany({})
          .then( function() {
            done();
          })
          .catch( function(err) {
            console.log(err);
          });
    })

    after(function (done) {
        Scoreboard
          .deleteMany({})
          .then( function() {
            done();
          })
          .catch( function(err) {
            console.log(err);
          });
    })

    before(function (done) {
        Scoreboard
            .create({
                name: 'A.A Maramis',
                score: 65,
                level: 1
            })
            .then(scoreStored => {
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    before(function (done) {
        Scoreboard
            .create({
                name: 'Achmad Soebardjo Djojoadisoerjo',
                score: 90,
                level: 2
            })
            .then(scoreStored => {
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    })

    describe('GET /scores', () => {
        it('should return all scores in the scoreboard', (done) => {
            chai
                .request(app)
                .get('/scores')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    for (let i = 0; i < res.body.length; i++) {
                        expect(res.body[i]).to.be.an('object')
                    }
                })
                done()
        })

        it("should return 'Achmad Soebardjo Djojoadisoerjo' as the name of the first object", (done) => {
            chai
                .request(app)
                .get('/scores')
                .end(function(err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.equal('Achmad Soebardjo Djojoadisoerjo')
                })
                done()
        })
    })

    describe('POST /scores', () => {
        const newScore = {
            name: 'Abdoel Kahar Moezakir',
            score: 70,
            level: 1
        }

        it('should send back an object contained new score that has been stored', (done) => {
            chai
                .request(app)
                .post('/scores')
                .send(newScore)
                .end(function(err ,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.json
                    expect(res.body.name).to.equal(newScore.name)
                    expect(res.body.score).to.equal(newScore.score)
                    expect(res.body.level).to.equal(newScore.level)
                })
                done()
        })

        //error cases
        const inputScoreWithoutName = {
            name: '',
            score: 70,
            level: 1
        }

        it("should send back an error message 'Path `name` is required.'", (done) => {
            chai
                .request(app)
                .post('/scores')
                .send(inputScoreWithoutName)
                .end(function(err ,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.json
                    expect(res.body).to.have.property('name')
                    expect(res.body.name).to.equal('Path `name` is required.')
                })
                done()
        })

        const inputScoreWithoutScore = {
            name: 'Kiai Haji Abdul Wahid Hasjim',
            score: null,
            level: 1
        }

        it("should send back an error message 'Path `score` is required.'", (done) => {
            chai
                .request(app)
                .post('/scores')
                .send(inputScoreWithoutScore)
                .end(function(err ,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.json
                    expect(res.body).to.have.property('score')
                    expect(res.body.score).to.equal('Path `score` is required.')
                })
                done()
        })

        const inputScoreWithoutLevel = {
            name: 'Prof. Mohammad Yamin, S.H.',
            score: 89,
            level: null
        }

        it("should send back an error message 'Path `level` is required.'", (done) => {
            chai
                .request(app)
                .post('/scores')
                .send(inputScoreWithoutLevel)
                .end(function(err ,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res).to.be.json
                    expect(res.body).to.have.property('level')
                    expect(res.body.level).to.equal('Path `level` is required.')
                })
                done()
        })


    })
})