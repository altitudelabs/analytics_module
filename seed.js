// 'use strict';

// const fs = require('fs');
// const mongoose = require('mongoose');

// const analyticId1 = mongoose.Types.ObjectId('123123123123123123123123');
// const analyticId2 = mongoose.Types.ObjectId('234234234234234234234234');
// const analyticId3 = mongoose.Types.ObjectId('345345345345345345345345');
// const analyticId4 = mongoose.Types.ObjectId('456456456456456456456456');
// const analyticId5 = mongoose.Types.ObjectId('423423423423423423423423');
// const analyticId6 = mongoose.Types.ObjectId('412412412412412412412412');

// // Models
// const Analytic = require('../extra_module/analytics/model');

// const sampleAnalytic1 = new Analytic({
//   _id: analyticId1,
//   hitType: 'event',
//   eventCategory: 'Video',
//   eventAction: 'Play',
//   eventLabel: 'cats.mp4',
//   eventValue: 1,
//   createdAt: new Date(2016,1,3),
// });

// const sampleAnalytic2 = new Analytic({
//   _id: analyticId2,
//   hitType: 'event',
//   eventCategory: 'Video',
//   eventAction: 'Play',
//   eventLabel: 'dogs.mp4',
//   eventValue: 1,
//   createdAt: new Date(2016,1,5),
// });

// const sampleAnalytic3 = new Analytic({
//   _id: analyticId3,
//   hitType: 'event',
//   eventCategory: 'Image',
//   eventAction: 'View',
//   eventLabel: 'apple.jpg',
//   eventValue: 1,
//   createdAt: new Date(2017,0,25),
// });

// const sampleAnalytic4 = new Analytic({
//   _id: analyticId4,
//   hitType: 'event',
//   eventCategory: 'Image',
//   eventAction: 'Download',
//   eventLabel: 'orange.jpg',
//   eventValue: 1,
//   createdAt: new Date(2017,1,5),
// });

// const sampleAnalytic5 = new Analytic({
//   _id: analyticId5,
//   hitType: 'event',
//   eventCategory: 'pageVisit',
//   eventAction: 'login',
//   eventLabel: 'user1@travelshop.io',
//   eventValue: 1,
//   createdAt: new Date(2016,6,23),
// });

// const sampleAnalytic6 = new Analytic({
//   _id: analyticId6,
//   hitType: 'event',
//   eventCategory: 'pageVisit',
//   eventAction: 'login',
//   eventLabel: 'user2@travelshop.io',
//   eventValue: 1,
//   createdAt: new Date(2016,10,18),
// });

// const clearAnalyticsDB = () => {
//   const path = `${__dirname}/../extra_module/`;
//   let moduleModel;

//   // synchronous to ensure all route registration before returning the router
//   fs.readdirSync(path).forEach((file) => {
//     if (file.indexOf('.') === -1) {
//       moduleModel = require(path + file).model;

//       if (moduleModel !== undefined && typeof moduleModel.remove === 'function') {
//         moduleModel.remove({}).exec();
//       }
//     }
//   });
// };

// module.exports = () => {
//   console.log('called');
//   sampleAnalytic1.save();
// };
