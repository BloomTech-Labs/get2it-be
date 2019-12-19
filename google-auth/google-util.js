// import { google } from 'googleapis';
const {google} = require('googleapis');


// Configure Google library with our credentials
const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
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

function getGooglePeopleApi(auth) {
	return google.people({ version: 'v1', auth })
}

// Create a Google URL and send to the client to log in the user.

function urlGoogle() {
	const auth = createConnection();
	const url = getConnectionUrl(auth);
	return url;
}

// Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.

function getGoogleAccount(code) {
	const data = await auth.getToken(code);
	const tokens = data.tokens;
	const auth = createConnection();
	auth.setCredentials(tokens);
	const api = getGooglePeopleApi(auth);
	const me = await api.people.get({ userId: 'me'});
	const userGoogleId = me.data.id;
	const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

	return {
		id: userGoogleId,
		email: userGoogleEmail,
		tokens: tokens
	};
}


