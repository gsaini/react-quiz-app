const express = require("express");
const app = express();
const questions = require('./data/questions.json');
const _map = require('lodash/map');
const _omit = require('lodash/omit');
const _differenceBy = require('lodash/differenceBy');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/questions", (req, res) => {
    const data = _map(questions, (question) => _omit(question, 'answer'));

    res.json({
      data 
    });
});

app.post("/api/score", (req, res) => {
    const data = req.body;
    const incorrectAnswers = _differenceBy(questions, data, 'answer');
    
    const incorrect = incorrectAnswers.length;
    const correct = (questions.length - incorrect);
    
    res.json({
        correct,
        incorrect,
        score: correct * 5
    });
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});