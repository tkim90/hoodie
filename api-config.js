let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === 'hoodie-app.netlify.com/') {
  backendHost = 'https://hoodie-app.netlify.com/';
} else {
  backendHost = 'http://localhost:4000';
}

console.log(`Running on host ${backendHost}`);

const API_ROOT = `${backendHost}/api`;

module.exports = API_ROOT;