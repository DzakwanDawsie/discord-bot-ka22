const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const route = require('./routes/api');
const discord = require('./utils/discord');
const calendar = require('./utils/calendar');
const text = require('./utils/text');
const { token, port, ics } = require('./configs/config.json');

// calendar.fetch(ics.url);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const sendReminder = (channel) => {
  const events = calendar.get();

  events.forEach(event => {
    const title = text.titleCase(event.summary);
    const start = new Date(event.start)
          .toLocaleString('id-ID', {dateStyle: 'full', timeStyle: 'short', timeZone: 'UTC'});

    const card = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('V-Class Reminder')
          .setDescription(`${title}\n\nStart: ${start}\n\n`)
          .setThumbnail('https://scontent.fcgk30-1.fna.fbcdn.net/v/t39.30808-1/299129578_194468602928029_9053278421528579903_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=G26OPTRpfZsAX_vo6uf&_nc_ht=scontent.fcgk30-1.fna&oh=00_AfCu-1KXROhGMa--4q0fHnd1B0vob1LUwXnoTYqczc8dEQ&oe=654F5540')
          .setFooter({
            text: event.categories
          })
          
    channel.send({ embeds: [card] });
  });
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  calendar.fetch();

  const channel = await client.channels.fetch('1026661540167958588');

  // inside a command, event listener, etc.
  // sendReminder(channel);
});

client.on('guildCreate', (guild) => {
  discord.addGuild(guild);
  discord.fetchGuildChannels(guild);
  discord.fetchGuildMembers(guild);
});

client.on('messageCreate', (message) => {
  const isMessage = message.content.startsWith('k!') &&
                    !message.author.bot

  if (!isMessage) return false;

  if (message.content.startsWith('k!vclass')) {
    sendReminder(message.channel);
  }
});

client.login(token);

// Express
const app = express();

// API routes
route(app);

// Start Express.js server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});