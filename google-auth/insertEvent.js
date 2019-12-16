const {google} = require('googleapis');
const {googleUtil} = require('./google-util')

let event = {
    'summary': 'Google I/O 2015',
    'start': {
      'dateTime': '2015-05-28T09:00:00-07:00'
    },
    'end': {
      'dateTime': '2015-05-28T17:00:00-07:00'
    },
  };
  
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
  