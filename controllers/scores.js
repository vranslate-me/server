const Scoreboard = require('../models/scoreboard')

class ScoreboardController {
    static async fetchSortedScores(req, res) {
        const scores = await Scoreboard.find({}).sort({score: -1})
        res.json(scores)
    }

    static async inputScore(req, res) {
        try {
            const newScore = await Scoreboard.create({
                name: req.body.name,
                score: req.body.score,
                level: req.body.level,
                language: req.body.lang
            })
            res
                .status(201)
                .json(newScore)
        } catch(err) {
            let errorsComp = {}
            for (const key in err.errors) {
                errorsComp[key] = err.errors[key].message
            }
            res
                .status(401)
                .json(errorsComp)
        }
    }
}

module.exports = ScoreboardController