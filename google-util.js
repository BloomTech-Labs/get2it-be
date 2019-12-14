import { google } from 'googleapis';


// Configure Google library with our credentials
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'https://get2it.netlify.com/' // this must match your google api settings
};

// This scope tells google what information we want to request
const defaultScope = [
	'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];
	
// Create the google auth object which gives us access to talk to google's apis

 function createConnection() {
	return new google.auth.OAuth2(
		googleConfig.clientId,
		googleConfig.clientSecret,
		googleConfig.redirect
	);
 }

 function getConnectionUrl(auth) {
	return auth.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent',
		scope: defaultScope
	});
 }
function getGoogleOAuth2Api(auth) {
	return google.oauth2({ version: 'v2', auth })
}

