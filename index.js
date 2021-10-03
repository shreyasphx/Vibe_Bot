global.Discord = require("discord.js");
const{
    prefix,
    token,
} = require("./config.json"); 
const ytdl = require("ytdl-core");
const client = new Discord.Client();
const queue = new Map();

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
    const serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voice.channel;

    if(message.content.charAt(0) == prefix){
        
        if(voiceChannel){
        }
        else{
            message.reply("User is not in voice channel!");
            return;
        }
        if(message.content.charAt(1) === "p"){
            voiceChannel.join();
            message.reply("Joined the voice channel!");
            evaluateQueue(message, serverQueue);
            return;
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
            //disconnects the bot from the voice channel
                quit(message.guild, queue.get(message.guild.id).songs[0]);
            }

    }

}
)

async function evaluateQueue(message, serverQueue) {
    const args = message.content.split(" ");
    const songInfo = await ytdl.getInfo(args[1]);
    const voiceChannel = message.member.voice.channel;
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };
    if (!serverQueue){
        const songQueue = {
            voiceChannel : voiceChannel,
            textChannel : message.channel,
            connection : null,
            songs : [],
            volume : 5,
            playing : true
        };
        queue.set(message.guild.id, songQueue);
        songQueue.songs.push(song);
        try{
            var connection = await voiceChannel.join();
            songQueue.connection = connection;
            play(message.guild, songQueue.songs[0]);

        } catch(err){
            console.log(err);
        }
    }else{
        serverQueue.songs.push(song);
        message.channel.send(`${song.title} added to queue!`);
        return;
    }
}

function play(guild, song){
    const playQueue = queue.get(guild.id);
    const dispatcher = playQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            playQueue.songs.shift();
            play(guild, playQueue.songs[0]);
        })
    dispatcher.setVolumeLogarithmic(playQueue.volume / 5);
    playQueue.textChannel.send(`Started playing: **${song.title}**`);
}
function quit(guild, song) {

    if (!message.member.voice.channel) {

        return message.channel.send("You are not in a voice channel.");
    } else if (!serverQueue) {

            return message.channel.channel.send("There are no songs playing.");
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

client.login(token);
