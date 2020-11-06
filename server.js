require('dotenv').config();
const ytdl = require('ytdl-core');

const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '~';

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async message => {

    if (message.content.toLowerCase() ===  PREFIX + 'taci') {
        const voiceChannel = message.member.voice.channel;

        if (voiceChannel === null) {
            message.channel.send("You need to be in a voice channel to use this command.")
        } else {
            const connection = await voiceChannel.join();

        const dispatcher = connection.play('sounds/taci.mp3', {volume: 1});

        dispatcher
        .on('finish', () => {
            voiceChannel.leave();
        })
        .on('error', error => {
            console.log(error);
        });
        }   
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    
    // if (message.content.toLowerCase() === '!per') {
    //     console.log(message.client.voice);.send('Mue Perseus!');
    // }

    let newUserChannel = newState.channelID;
    let oldUserChannel = oldState.channelID;

    var ID = "";

    if (oldUserChannel === null && newUserChannel !== null) {
        var voiceChannel = newState.member.voice.channel;
        ID = ID + voiceChannel;

      //  console.log(newState.member.voice);

        var connection = await voiceChannel.join();


        // ytdl("https://www.youtube.com/watch?v=3Njvr6-OVao", {filter: "audioonly"}
        const dispatcher = connection.play('sounds/taci.mp3', {volume: 0.5});

        dispatcher.on('start', () => {
            console.log('audio.mp3 is now playing!');
        });
        
        dispatcher.on('finish', () => {
            dispatcher.destroy();
        });
        
        // Always remember to handle errors appropriately!
        dispatcher.on('error', console.error);
    }
});



