var express = require('express');

module.exports = function (app) { 
  // GET home page view
  app.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('locations');
    var locations = [];
    return collection.find({}, {}, function (err, locationsDoc) {
      if (err) {
        return res.render('error', {
          error: err,
          styles: ['public']
        });
      } else {
        if(locationsDoc) {
          // for (var i=0; i<locationsDoc.length; i++) {
          //   var slug = locationsDoc[i].slug;
          //   var name = locationsDoc[i].name;
          //   var email = locationsDoc[i].email;
          //   var what = locationsDoc[i].what.replace(/(?:\r\n|\r|\n)/g, '<br />');
          //   var who = locationsDoc[i].who.replace(/(?:\r\n|\r|\n)/g, '<br />');
          //   var how = locationsDoc[i].how.replace(/(?:\r\n|\r|\n)/g, '<br />');
          //   var compostable = locationsDoc[i].compostable.replace(/(?:\r\n|\r|\n)/g, '<br />');
          //   var dropoff = locationsDoc[i].dropoff.replace(/(?:\r\n|\r|\n)/g, '<br />');
          //   var location = {};
          //   location.slug = slug;
          //   location.name = name;
          //   location.email = email;
          //   location.what = what;
          //   location.who = who;
          //   location.how = how;
          //   location.compostable = compostable;
          //   location.dropoff = dropoff;
          //   locations.push(location);
          // }
        }
        return res.render('index', {
          pageType: 'single',
          locations: locations,
          scripts: ['paper','moment','main','graph'],
          styles: ['public'],
          errors: err
        });
      }  
    });
  });

  app.get('/logs/:slug', function(req, res) {
    var slug = req.params.slug;
    var collectionName = slug.replace(/-/g, '_') + '_logs';
    var db = req.db;
    var collection = db.get(collectionName);
    collection.find({}, {sort: {'date': 1}}, function(e, logs) {
      res.json(logs);
    });
  });
}