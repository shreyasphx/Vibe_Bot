import youtube_dl
import discord
from discord.ext import commands

intents = discord.Intents().all()
client = discord.Client(intents = intents)
bot = commands.Bot(command_prefix = '!', intents = intents)

@bot.command(name = 'join', help = 'Makes the bot join the voice channel')
async def join(ctx):
    if not ctx.message.author.voice:
        await ctx.send("{} is not connected to a voice channel".format(ctx.message.author.name))
        return
    else:
        channel = ctx.message.author.voice.channel
    await channel.connect()

@bot.command(name = 'leave', help = 'Makes the bot disconnect from the voice channel')
async def leave(ctx):
    voice_client = ctx.message.guild.voice_client
    if voice_client.is_connected():
        await voice_client.disconnect()
    else:
        await ctx.send("The bot is not connected to a voice channel")

@bot.command(name = 'play', help = 'plays a song')
async def play(ctx,url):
    try:
        server = ctx.message.guild
        voice_channel = server.voice_client

        async with ctx.typing():
            filename = await YTDLSource.from_url(url, loop = bot.loop)
            voice_channel.play(discord.FFmpegPCMAudio(executable = "ffmpeg.exe", source = filename))
        await ctx.send('**Now playing:** {}'.format(filename))
    except:
        await ctx.send("Could not play" + url)

@bot.command(name = 'pause', help = 'pauses the song')
async def pause(ctx):
    voice_client = ctx.message.guild.voice_client
    if voice_client.is_playing():
        await voice_client.pause()
    else:
        await ctx.send("The bot is not playing anything.")

@bot.command(name = 'resume', help = 'Resumes the song')
async def resume(ctx):
    voice_client = ctx.message.guild.voice_client
    if voice_client.is_paused():
        await voice_client.resume()
    else:
        await ctx.send("The bot was not playing anything")

@bot.command(name   = 'stop', help = 'Stops playing the song')
async def stop(ctx):
    voice_client = ctx.message.guild.voice_client
    if voice_client.is_playing():
        await voice_client.stop()
    else:
        await ctx.send("The bot is not playing anything.")


bot.run('ODg3NTQ3ODY0ODQ5NDUzMDc2.YUFvXA.sRNMk77JgZG5pP00IExBcYQ9rz8')