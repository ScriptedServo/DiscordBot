require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is alive!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

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
const REPLY_CHANNEL_ID = '1387956269293375558';
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
  'Sloth bears use their lips like a vacuum to eat insects.',
  'Bears are excellent swimmers.',
  'The largest mammalian carnivore that ever lived on land was the giant short-faced bear.',
  'The sloth bear has the shaggiest fur.',
  'The most accurate way to determine the age of a bear is to count the rings in a cross section of its tooth root under a microscope.',
  'Bears have two layers of fur. A short layer of fur keeps the bear warm. And a long layer keeps water away from the skin and short fur.',
  'Bears are very smart and have been known to roll rocks into bear traps to set off the trap and eat the bait in safety.',
  'Bears live as long as 30 years in the wild. One captive brown bear lived to the age of 47.',
  'Bears are bowlegged. This gives them better grip and balance.',
  'Bears can run up to 40 miles per hour, fast enough to catch a running horse. ',
  'Only the polar bear is a true carnivore. All other bears are omnivores, or animals that eat both plants and meat.',
  'Sun bears have the longest claws of any bear. They also have the longest tongues, which can reach 9.8" long.',
  'A bear’s normal heartbeat is 40 beats per minute. A hibernating bear’s heart rate drops to 8 bpm.',
  'The bear that a person living in North America is most likely to run into is the black bear',
  'Black bears are not always black. They come in a rainbow of colors from black to reddish brown (cinnamon bears) to light brown to white.',
  'Unlike many mammals, bears can see in color.',
  'Bears have a keen sense of smell. They can smell a fish from 1 mile away.',
  'Bears have a good memory. They can remember the location of food sources for up to 3 years.',
  'Bears have a keen sense of hearing. They can hear a mouse moving underground.',
  'Bears have a good sense of touch. They can feel vibrations through the ground.',
  'The world’s most widely distributed bear is the brown bear. However, the American black bear is the worlds most common bear species',
  'When bears mate, the eggs within the female’s body are fertilized but do not implant in her uterus and begin developing for several months.',
  'A swimming polar bear can jump 8 ft. (2.4 m) out of the water to surprise a seal.',
  'A polar bear’s stomach can hold 150 lbs. (68 kg) of meat.',
  'Panda bears have an extra “thumb” (which is actually an extra-large wrist bone) just for holding onto bamboo stalks.',
  'The giant panda has a large head for its body. Scientists believe this is because it needs a strong jaw and neck muscles to eat bamboo, which makes up 99% of its diet.',
  'Sloth bears’ favorite food is termites.',
  'Bears have been known to eat almost anything, including snowmobile seats, engine oil, and rubber boots.',
  'Lumber companies felt they had no choice but to kill the black bears in Washington State that were eating the bark from trees. However, once someone thought to put piles of food in the forest, the bears stopped eating the trees, and were happy to eat the free food.Because feeding the bears cost less than killing them, the lumber companies were happy, too.',
  'About 98% of the grizzly bear population in the U.S. lives in Alaska.',
  'A polar bear can swim up to 100 miles without resting.',
  'Bears can see almost as well as humans, and they can hear a little better.',
  'The shape of a bear’s claw differs according to the type of bear. Bears that climb, such as black bears, have claws that are curved and strong to allow them to claw at tree bark. Bears that dig, such as grizzly bears, have straight and long claws.',
  'In 2004, a black bear was found unconscious in a campground in Seattle, Washington. It had broken into a cooler and used its claws and teeth to open dozens of beer cans. Although it sampled other types of beer, it chose to drink all the cans of only one type of beer. After its drinking binge, the bear passed out.',
  'A male bear is called a boar or a he-bear. A female bear is called a sow or a she-bear. A group of bears is called a sleuth or sloth.',
  'The word “bear” is an Old English word, derived from the Proto-Indo-European *bher-, meaning “bright brown.”',
  'The symbol of the United Russia Party is a bear. In fact, bears have traditionally not only been a symbol of pride and power in Russia, but have also been common images in fairy tales and myth.',
  'The bear ancestor is an offshoot of the ancient Canidae family of dogs, wolves, foxes, and coyotes.',
  'Polar bears are the only bear species that is a marine mammal.',
  'A polar bear’s fur ranges in color from ivory to pale tan. Underneath its fur coat, the polar bear’s skin is black to help absorb heat from the sun.',
  'The name “grizzly bear” refers to the silver-tipped or “grizzled” hair of a brown bear.',
  'One variation of the black bear is a white bear called the Kermode, ghost, or spirit bear. These bears are very rare. Native Americans believed these white bears had supernatural power.',
  'The polar bear (Ursus maritimus) is the largest bear species. A male polar bear can measure up to 10 feet long and weigh 1,500 lbs., which is about the weight of eight human adults. Female polar bears are up to 50% smaller than the males.',
  'In 2008, a Canadian man was attacked by a grizzly bear. He survived the attack by playing dead, even when the bear began to gnaw on his scalp. The bear eventually lost interest and went away.',
  'For many years, scientists thought that the Giant Panda was not a bear at all but a relative of the raccoon. Scientists have shown through DNA evidence that giant pandas are indeed true bears.',
  'The Sun bear (Helarctos malayanus) is the smallest of the bears and is about the size of a large dog. It gets its name from a blond chest patch of fur that looks like a setting sun. Sun bears are also known as honey bears.',
  'Of the eight bear species, four live in the Southern Hemisphere and four in the Northern Hemisphere.',
  'Spectacled bears are the only wild bears that live in South America.',
  'North America is home to three of the world’s eight bear species: brown, American black, and polar bears. Almost two thirds of the bears in the world live in North America.',
  'Because bears can walk short distances on their hind legs, some Native Americans called them “the beast that walks like a man.”',
  'Polar bears live only north of the Equator, in the Arctic. Penguins live only south of the Equator, in Antarctica. Approximately 21,000 to 28,000 polar bears live in the Arctic.',
  'Bears are descended from small, insect-eating mammals called miacids, which lived during the time of the dinosaurs. The first true bears evolved from heavy bear-like dogs around 27 million years ago. The oldest known bear, the Dawn Bear, lived about 20 million years ago and was the size of a small dog.',
  'Bears have never lived in Australia or Antarctica. Although bears do not currently live in Africa, bear fossils have been found there. Scientists are unsure why bears do not live in Africa today.',
  'Sloth bears are the only bears that are more active at night.',
  'Polar bears have a thick coat with 9,677 hairs per square inch.',
  'Most bears are born without fur. Only polar bears and giant pandas are born with thin white fur.',
  'Bears have non-retractable claws like dogs and unlike cats.',
  'While most bears have bare feet, the paws of polar bears have fur on the bottoms and between the toes. Bears lose most of their heat from their paws.',
  'Like people, all bears except pandas walk by putting their feet flat on the ground. This kind of walking is called “plantigrade.” In contrast to bears, other large animals—including dogs, horses, and even elephants—walk on their toes.',
  'The claws on the front feet of bears are longer than the claws on the back feet. Some large bears have claws almost 5" long.',
  'Bears are the only large predators that regularly eat both meat and plants. For this reason, they have different teeth specifically used for meat eating and plant eating.',
  'The Ursa Major or “Great Bear” constellation is the third-largest constellation and contains the Big Dipper.',
  'During hibernation, a bear does not defecate. Its body can somehow recycle body waste into protein—a process scientists still do not understand.',
  'Not all bears hibernate. Asiatic black bears, American black bears, some brown bear species, and pregnant polar bears hibernate. Sloth bears live in warm places with abundant food, so they don’t need to hibernate.',
  'A newly born Kodiak brown bear can weigh less than one pound. As it grows up, its weight may increase as much as 1,000 times. If human babies grew this much, as adults they would weigh over 6,000 lbs.',
  'Polar bears have the largest home ranges of any bear. One polar bear can hunt and live in an area as big as Maine.',
  'Stone-age hunters worshipped and hunted bears at the same time. To show their respect, they sang and danced and prayed that the bear would forgive them for killing it.',
  'In Asia, bear cubs are often taken from their mothers at an early age to be trained as dancing bears. The ability of bears to stand up on their hind feet makes it possible for them to shuffle in a way that looks somewhat like dancing.',
  'People in Asian cultures have traditionally used bear organs and secretions for medicinal purposes. One author notes that there “are fewer than one million bears on Earth and more than one billion potential consumers of bear parts as medicine.”',
  'In Asia in the early 1990s, bear gallbladders would sell from $1 to $210 a gram. A gallbladder of an Asiatic black bear killed in South Korea sold at a public auction for $64,000. On a price-per-gram basis, bear gallbladders often cost more than gold.',
  'Currently, approximately 8,000 bears are kept on “bear farms” in China. They are bred and kept in captivity so that bile from the gallbladders can be extracted for medicinal use. The bile is removed from the live animal through a catheter surgically implanted into the gallbladder.',
  'All bears are good swimmers, but the polar bear is the most efficient swimmer. It can swim up to 4-6 mph (6-10 km/hr) for 100 miles (161 km). One polar bear swam 200 miles without stopping. Polar bears can also swim very well under water.',
  'The only species of bear that does not move its ears to pick up sound is the giant panda.',
  'The Asiatic black bear has the largest ears of any species of bears.',
  'Because a giant panda’s eye is a vertical slit, like many nocturnal animals it can see by day and by night.',
  'Bears are Cool',
  'Once bears breed, they go their separate ways. Male bears do not help the mother bear raise the cubs. Depending on the breed, intercourse may last a few minutes (giant panda) or half an hour (polar bear).',
  'When U.S. President Theodore (Teddy) Roosevelt refused to shoot a black bear cub on a hunting trip, a cartoon featured the event, and soon stuffed toy manufacturers popularized “Teddy’s bear.”',
  'Only about 1,000 giant pandas live in the wild today.',
  'The lips of bears are not attached to their gums, which make their lips look rubbery',
  'Baloo, from The Jungle Book, is a sloth bear.',
  'Most bears have 42 teeth, which is about 10 more than people have. A bear’s canines can reach 1.5" long, while a human’s are less than a half inch long.',
  'The giant panda has been described as a living fossil because it is such an ancient animal.',
  'Polar bears are the largest land carnivores on earth. They can stand more than 11 high and weigh more than 1,700 lbs.',
  'Black bears are typically smaller than grizzly bears, have a smaller shoulder hump, less shaggy fur, longer ears, and a less concave facial profile. Black bear claws are also smaller and more curved to better climb trees.',
  'There are 100 different bear facts that i programmed in',
  'Bears can develop strong attachments to other bears',
  'Bears have distinct personalities',
  'Bears can be very playful',
  'Bears can be very territorial',
  'Bears can be very aggressive',
  'Bears arent reall they are fake constructs made by the canadian goverment to scare people into not going to canada'
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
  if (message.content === 'Hello' && message.channel.id === REPLY_CHANNEL_ID) {
    return message.reply('Hello! 👋');
  }
  if (message.content === 'Bear' && message.channel.id === REPLY_CHANNEL_ID) {
    return message.reply('Bear');
  }
  if (message.content === 'skibidi' && message.channel.id === REPLY_CHANNEL_ID) {
    return message.reply('toilet');
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

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('❌ Discord login failed:', err);
});
