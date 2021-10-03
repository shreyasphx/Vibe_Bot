global.Discord = require("discord.js");
const{
    prefix,
    token,
} = require("./config.json"); 
const ytdl = require("ytdl-core");
const client = new Discord.Client();
const queue = [];

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
        const args = message.content.split(" ");
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };
        
        if(voiceChannel){
            voiceChannel.join();
            message.reply("Joined the voice channel!");
        }
        else{
            message.reply("User is not in voice channel!");
            return;
        }
        if(message.content.charAt(1) === "p"){
            
            
            play(message, serverQueue);
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
                message.guild.me.voice.channel.leave();
            }

    }

}
)

function play(message, serverQueue) {
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`**${song.title}** has started bussin'!`);
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
