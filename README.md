# analytics_module
UGLY README will modify later

1) require('analytics')

2) in /server/config add analytics.js
 
 module.exports = (mongoose) => {
  Analytics.init(mongoose);
};

3) use Analytics.send({data}) with {data} following schema format in index.js to save data

4) use Analytics.getLogFilter to get time series array (x axis: timeline, y axis: value). Example:
  Analytics.getLogFilter({category: 'productView', action: 'click'}, 'days', '2016-11-10', '2016-11-20');
  
