const chai = require('chai')
const expect = chai.expect
chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

describe('Translate API', () => {
    let wordToTest = {
        word: 'country'
    }

    it('should return the correct translation in Indo word', (done) => {
        chai
            .request(app)
            .post('/')
            .send(wordToTest)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('negara')
            })
            done()
    })

    let slightTypoInput = {
        word: 'chicker'
    }

    it("should return a Indo meaning of 'chicken'", (done) => {
        chai
            .request(app)
            .post('/')
            .send(slightTypoInput)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('ayam')
            })
            done()
    })

    let apiDoesntHaveTheWord = {
        word: 'acjascnlnc'
    }

    it("should return the same word like the input word 'acjascnlnc'", (done) => {
        chai
            .request(app)
            .post('/')
            .send(apiDoesntHaveTheWord)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('acjascnlnc')
            })
            done()
    })

    let bigTypoAndApiDoesntHaveTheWord = {
        word: 'jhicken'
    }

    it("should return the same word like the input word 'jhicken'", (done) => {
        chai
            .request(app)
            .post('/')
            .send(bigTypoAndApiDoesntHaveTheWord)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('jhicken')
            })
            done()
    })

    let emptyField = {
        word: ''
    }

    it("should return a message 'Can not translate empty word'", (done) => {
        chai
            .request(app)
            .post('/')
            .send(emptyField)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal('Can not translate empty word')
            })
            done()
    })
})