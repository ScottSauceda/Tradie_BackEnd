const Trade = require('../models/Trade')
var NodeGeoCoder = require('node-geocoder');

module.exports = {

  getallTrades: (params) => {

    return new Promise((resolve, reject) => {

      Trade.find(params, (err, trades) => {
        if(err) {
          reject(err);
        } else {
          resolve(trades);
        }
      });
    });
  },

  addBusiness: (params) => {
    return new Promise(( resolve, reject) => {
      Trade
        .findOne({businessEmail: params.businessEmail})
        .then( user => {
          // using the register function to create a new user, if there is an error reject the process and log error message
          if(user) {
            let errors = {}
            errors.message = 'Email taken! Pick another'
            errors.status = 400
            reject(errors)
          } else {
            // if create user a success save the new user to the newUser variable, save their name, password, and email
            

            var options = {
              provider: 'google',
              httpAdapter: 'https',
              apiKey: process.env.GOOGLE_API_KEY,
              formatter: null
            }

            let geocoder = NodeGeoCoder(options);
            geocoder.geocode({address: params.businessAddress.streetAddress, country: 'United States', zipcode: params.businessAddress.zipCode})
              .then(res => {
                console.log('-------')
                console.log(res)

                let geoLocation = {}
                let position = {}

                position.lat = res[0].latitude;
                position.lng = res[0].longitude;

                geoLocation.position = position;

                const newTrade = new Trade({
                  businessName:params.businessName, 
                  job:params.job, 
                  businessDescription:params.businessDescription,
                  businessPhone:params.businessPhone, 
                  businessEmail:params.businessEmail,
                  businessAddress: params.businessAddress,
                  geoPosition: geoLocation
                })
                
                newTrade
                .save()
                .then(trade => {
                  //console.log(trade)
                  resolve(trade)
                })
                .catch(err => reject(err))
            


              })
              .catch(err => {
                console.log(err)
              }) 
            
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
  },
  
  getTradesByJob: (params) => {
    return new Promise((resolve, reject) => {

      Trade.find({job: params})
        .then(jobs => {
          console.log(jobs);
          resolve(jobs);
        })
        .catch(err => {
          reject(err)
        })

    });
  }

}