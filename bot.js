var telegram = require('telegram-bot-api');

var api = new telegram({
        token: process.env.TOKEN,
        updates: {
        	enabled: true
        }
});
const runTelega = async (listener) => {
    try{
    const isConnected = await api.getMe();
    console.log('-----------bot connected successful-------------');
    
    return api;

    } catch(error){
        console.error(error);
    }
}

module.exports = runTelega;
