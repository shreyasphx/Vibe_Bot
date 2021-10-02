const Discord = require(discord.js);
const{
    prefix,
    token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
var queue = [];

client.login(token);

client.once('ready', () => {
    console.log('Ready!');
   });
client.once('reconnecting', () => {
    console.log('Reconnecting!');
   });
client.once('disconnect', () => {
    console.log('Disconnect!');
   });

client.on("message", async message => {
    if(message.author.bot){
        return;
    }
    if(message.content.charAt(0) == prefix){
        if(message.content.substring(0,0) === "p"){

        }
        if(message.content.substring(0,0) === "s"){
            
        }
        if(message.content.substring(0,0) === "q"){
            
        }
        if(message.content.substring(0,1) === "np"){
            
        }
        if(message.content.substring(0,0) === "k"){
            
        }
    }
    
}) 