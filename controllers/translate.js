const translate = require('@vitalets/google-translate-api');

class Translator {
    static async Translate(req, res) {
        if (req.body.word.length === 0) {
            res
                .status(400)
                .json({
                    msg: 'Can not translate empty word'
                })
        } else {
            const translated = await translate(req.body.word, {from: 'en', to: 'id'})
            res 
                .status(200)
                .json({
                    translated: translated.text
                })            
        }
    }
}

module.exports = Translator
