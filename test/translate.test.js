const chai = require('chai')
const expect = chai.expect
chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

describe('Translate API', () => {
    let wordToTest = {
        word: 'ayam'
    }

    it('should return the correct translation in english word', (done) => {
        chai
            .request(app)
            .post('/translate/en')
            .send(wordToTest)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('chicken')
                done()
            })
    })

    let wordToTestInDutch = {
        word: 'ayam'
    }

    it('should return the correct translation in dutch word', (done) => {
        chai
            .request(app)
            .post('/translate/nl')
            .send(wordToTestInDutch)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('kip')
                done()
            })
    })

    let slightTypoInput = {
        word: '8900'
    }

    it("should return back the same word like the input", (done) => {
        chai
            .request(app)
            .post('/translate/en')
            .send(slightTypoInput)
            .end(function(err, res) {
                // console.log(res.body.translated, '====')
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('8900')
                done()
            })
    })

    let apiDoesntHaveTheWord = {
        word: 'acjascnlnc'
    }

    it("should return the same word like the input word 'acjascnlnc'", (done) => {
        chai
            .request(app)
            .post('/translate/en')
            .send(apiDoesntHaveTheWord)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('acjascnlnc')
                done()
            })
    })

    let bigTypoAndApiDoesntHaveTheWord = {
        word: 'akam'
    }

    it("should return the same word like the input word 'akam'", (done) => {
        chai
            .request(app)
            .post('/translate/en')
            .send(bigTypoAndApiDoesntHaveTheWord)
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('translated')
                expect(res.body.translated).to.equal('akam')
                done()
            })
    })

    let emptyField = {
        word: ''
    }

    it("should return a message 'Can not translate empty word'", (done) => {
        chai
            .request(app)
            .post('/translate/en')
            .send(emptyField)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res).to.be.json
                expect(res.body).to.have.property('msg')
                expect(res.body.msg).to.equal('Can not translate empty word')
                done()
            })
    })
})