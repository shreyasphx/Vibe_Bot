//dependencies
const Discord = require('discord.js');
const{
    prefix,
    token,
} = require('./config.json');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
//A queue of songs to be played
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

//interpret commands whenever a user sends a message
client.on("message", async message => {
    if(message.author.bot){
        return;
    }
    if(message.content.charAt(0) == prefix){
        const voiceChannel = message.member.voice.channel;
        if(voiceChannel){
            message.author.channel.join();
            message.reply("Joined the voice channel!");
        }
        else{
            message.reply("User is not in voice channel!");
            return;
        }
        if(message.content.substring(1,1) === "p"){
            const args = message.content.split(" ");
            const songInfo = await ytdl.getInfo(args[1]);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
            queue.push(song);
            play();
        }
        if(message.content.substring(1,1) === "s"){
            
        }
        if(message.content.substring(1,1) === "q"){
        //sends info on all the items in the queue
            var queueLog = "";
            for(let i = 0; i < queue.length; i++){
                queueLog += i + ". "
                queueLog += queue[i].title + "\n*** ";
                queueLog += queue[i].url + " ***" + "\n";
            }
            message.reply("There are " + queue.length + " items in the queue:\n" + queueLog);
        }
        if(message.content.substring(1,2) === "np"){
            //sends info on the currently playing item
            message.reply("Now Playing: " + queue[0].title + "\n" + queue[0].url);
        }
        if(message.content.substring(1,1) === "k"){
            message.guild.me.voice.channel.leave();
        }
    }
})

//play the contents of the queue using youtubedl
async function play(){

}

//stops whatever is being played
async function stop(){

}
