'use strict';

// const model = require('./model')
const moment = require('moment');
const twix = require('twix');
// const Promise = require('bluebird');
let AnalyticsModel;

class Analytics{
 
 init (mongoose){
	const Schema = mongoose.Schema;

	//TODO allow developer extend default schema
	const AnalyticSchema = new Schema({
	  category: { type: String, required: true }, //pageView, videoView, imageView, productView, purchase, likes
		user_id: {type: String, requried: true}, 
	  action: { type: String, required: true },	//login, click
	  target_id: { type: String}, //pageUrl, videoId, imageId, productId, invoiceNumber, postId
	  from_url: { type: String},
	  to_url: { type: String},
	  value: { type: Number}, //pageCount, purchaseAmount, likeCount
	  createdAt: { type: Date, default: Date.now},
	});
	 AnalyticsModel = mongoose.model('Analytic', AnalyticSchema);

	};

//TODO open new collection by category
	send(entry) {
		let defaultEntry = {
	    eventValue: 1,
	    createAt: Date.now(),
	  };
	  const mergedEntry = Object.assign(defaultEntry, entry);
	  console.log('merged entry is :');
	  console.log(mergedEntry);
	  return new AnalyticsModel(mergedEntry).save();
	};

	//return timeline array from, to DATE obj
	getTimeLine(steps, from, to) {
		let arr = moment(from).twix(to).toArray(steps);
		let timeLine = [];
		arr.forEach( (element) => {
			timeLine.push(element.toDate());
		});
		 return timeLine;
	};

// group by steps 
//TODO code conditions, for now group by DAY 
	groupBy (query, steps, from, to) {
		let timeframe = {};
		if (from != null){
			timeframe = {"createdAt": {"$gte": from, "$lt": to}};
		}
		
		let filter = Object.assign(timeframe, query);
		console.log(filter);

		return AnalyticsModel
			// .find()
			.aggregate([
				{
					$match: filter,
				},
				
				// what if user didn't specify granularity till hour min sec? 
				{$project:
	         {
	           year: { $year: "$createdAt" },
	           month: { $month: "$createdAt" },
	           day: { $dayOfMonth: "$createdAt" },
	           hour: { $hour: "$createdAt" },
	           minutes: { $minute: "$createdAt" },
	           seconds: { $second: "$createdAt" },
	           user_id: 1,
	           // milliseconds: { $millisecond: "$date" },
	           // dayOfYear: { $dayOfYear: "$date" },
	           // dayOfWeek: { $dayOfWeek: "$date" },
	           // week: { $week: "$date" }
	         }
	       },
				{
					$group: {
						 _id: {
						 	'year': '$year',
						 	'month': '$month',
						 	'day': '$day',
						 	// 'hour': '$hour',
						 	// 'minutes': '$minutes'
						 } ,
             'user_ids': { $push: "$user_id" },
					}
				}
			])
			.exec()
			.catch((e) => {
	      console.log('Failed to filter');
	      throw e;
	     }); 
	};


	getLogFilter(query, steps, from, to) {
		
		let fromDate = new Date('1970-01-01T00:00:00');
		let toDate = Date.now();
		
		//parse user inpute time range
		if (from !== null) {
			let from_string = from.split('-');
			fromDate = new Date(from_string[0], from_string[1]-1, from_string[2]);
		}
		if (to !== null) {
			let to_string = to.split('-');
			toDate = new Date(to_string[0], to_string[1]-1, to_string[2]);
		}

		return this.groupBy(query, steps, fromDate, toDate)
			.then((data) => {

				var time_series = {
								x_axis: this.getTimeLine(steps, from, to),
								y_axis: data,
							};
				console.log();							
				console.log('printing y-axis')
				console.log(data);
				// console.log(time_series);
				return time_series;
			})
	};
}


module.exports = new Analytics();

// 1. filter by time range and steps (minute, hour, days...)
// 2. group counts (by same step min, hour, day)
// 3. pad specified steps(min hour day) without count with 0
// 4 return array [count, timeline within range]