require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 💡 Replace with your IDs
const MY_SERVER_ID = '1285753075788677222';
const DAILY_FACT_CHANNEL_ID = '1387936133597368330';
const HELLO_CHANNEL_ID = '1387927746835124264';
const OWNER_ID = '1285737431324164230'; 

const bearFacts = [
  'Bears can run up to 40 km/h',
  'Polar bears have black skin under their white fur.',
  'Bears have an excellent sense of smell — better than dogs',
  'Grizzly bears can weigh up to 600 pounds',
  'Some bears hibernate for up to 7 months',
  'Koalas are not bears they are a marsupial',
  'Pandas eat up to 30 pounds of bamboo a day',
  'Sun bears have the longest tongues of any bear species.',
  'Bears can live over 25 years in the wild.',
  'Sloth bears use their lips like a vacuum to eat insects.'
];

function getRandomBearFact() {
  return bearFacts[Math.floor(Math.random() * bearFacts.length)];
}

// 🐻 Send bear fact once per day
let lastPostedDate = null;
function sendDailyBearFact() {
  const today = new Date().toDateString();
  if (lastPostedDate === today) return;

  const guild = client.guilds.cache.get(MY_SERVER_ID);
  if (!guild) return;

  const channel = guild.channels.cache.get(DAILY_FACT_CHANNEL_ID);
  if (!channel || !channel.isTextBased()) return;

  const embed = new EmbedBuilder()
    .setTitle('🐻 Bear Fact of the Day')
    .setDescription(getRandomBearFact())
    .setColor(0xffcc00)
    .setFooter({ text: 'That may or may not be true' });

  channel.send({ embeds: [embed] });
  lastPostedDate = today;
}

// 🔁 Check every 10 minutes
setInterval(sendDailyBearFact, 10 * 60 * 1000);

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  // 📜 Command: !menu
  if (message.content === '!menu') {
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🐻 Bot Command Menu')
      .setDescription('Here are the available commands:')
      .addFields(
        { name: '`!ping`', value: 'Check if the bot is online' },
        { name: '`!hello`', value: 'Get a greeting from the bot' },
        { name: '`!userinfo`', value: 'See your user ID and username' },
        { name: '`!server`', value: 'Get server info' },
        //{ name: '`!bearfact`', value: 'Send a bear fact (only you!)' },
        { name: '`!menu`', value: 'Show this help menu' }
      )
      

    return message.channel.send({ embeds: [embed] });
  }

  // 👋 Channel-specific reply
  if (message.content === 'Hello' && message.channel.id === HELLO_CHANNEL_ID) {
    return message.reply('World');
  }

  // 💡 !ping
  if (message.content === '!ping') {
    return message.reply('Pong!');
  }

  // 💬 !hello
  if (message.content === '!hello') {
    return message.reply(`Hello, ${message.author.username}! 👋`);
  }

  // 🧑 !userinfo
  if (message.content === '!userinfo') {
    return message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }

  // 🌍 !server
  if (message.content === '!server') {
    return message.reply(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }

  // 🐻 Owner-only manual bear fact
  if (message.content === '!bearfact') {
    if (message.author.id !== OWNER_ID) {
      return message.reply('❌ Only the creator of the bot can use this command.');
    }

    const embed = new EmbedBuilder()
      .setDescription(getRandomBearFact())
      .setColor(0x00ff99)

    return message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
