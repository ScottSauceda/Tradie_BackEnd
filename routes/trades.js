var express = require('express')
var router = express.Router()

var tradeController = require('../controllers/tradeController')

router.get('/', function(req, res, next) {
  res.render('trades', { title: 'Trades' });
});

router.get('/addtrade', function(req, res) {

  tradeController.getallTrades({})
    .then((trades) => {
      res.json({
        confirmation: 'success',
        data: trades
      });
    })
    .catch((err) => {
      res.json({
        confirmation: 'failure',
        data: err
      });
    });
});

router.get('/findtradies', function(req, res) {

  let tradies = req.query.job;
  
  tradeController.getTradesByJob(tradies)
    .then(jobs => {
      res.json({
        confirmation: 'success',
        payload: jobs
      })
    })
    .catch(err => {
      res.json({
        confirmation: 'failure',
        data: err
      });
    })



});

router.post('/addtrade', function(req, res) {
  const trade = req.body
  console.log(trade)
  tradeController.addBusiness(trade)
    .then((trade) => {
      res.status(200).json({
        data: trade
      })
    })
    .catch(err => {
      const status = err.status
      const message = err.message

      res.status(status).json({
        message: message
      })
    })
})

module.exports = router