const concurrently = require('concurrently');
const upath = require('upath');

// Detect if running in Netlify
const isNetlify = process.env.NETLIFY === 'true';

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync');

const commands = [
    { command: 'node scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' }
];

// Only run Browsersync locally (not in Netlify)
if (!isNetlify) {
    commands.push({ 
        command: `"${browserSyncPath}" --reload-delay 2000 --reload-debounce 2000 dist -w --no-online`,
        name: 'SB_BROWSER_SYNC', 
        prefixColor: 'bgGreen.bold',
    });
}

concurrently(commands, {
    prefix: 'name',
    killOthers: ['failure', 'success'],
}).then(success, failure);

function success() {
    console.log('Success');    
}

function failure() {
    console.log('Failure');
}
