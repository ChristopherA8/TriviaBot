const { Client } = require("discord.js");
const client = new Client();
const { token } = require("./config.json");
const { questionsOne } = require("./questions/roomOne.json");
const { questionsTwo } = require("./questions/roomTwo.json");
const { questionsThree } = require("./questions/roomThree.json");
const { questionsOneOld } = require("./questions/roomOneOld.json");
const { questionsTwoOld } = require("./questions/roomTwoOld.json");
const { questionsThreeOld } = require("./questions/roomThreeOld.json");
const { dcQuestions } = require("./questions/dcQuestions.json");
const stats = require("./tracker.json");
const { roomOne } = require("./rooms/roomOne.ts");
const { roomTwo } = require("./rooms/roomTwo.ts");
const { roomThree } = require("./rooms/roomThree.ts");

client.on(`ready`, () => {
  console.log(`Bot Logged in as ${client.user.tag}`);
});

client.on(`message`, (msg) => {
  if (msg.author.bot || msg.channel.type == `dm`) return;

  const escapeRoomManagerRole = msg.guild.roles.cache.get("814275985893359617");

  /* Rooms */
  if (
    msg.member.roles.cache.has(escapeRoomManagerRole.id) &&
    msg.content == `!start nt`
  ) {
    // New Testament Questions
    roomOne(msg, client, questionsOne, stats);
    roomTwo(msg, client, questionsTwo, stats);
    roomThree(msg, client, questionsThree, stats);
  }

  if (
    msg.member.roles.cache.has(escapeRoomManagerRole.id) &&
    msg.content == `!start ot`
  ) {
    // Old Testament Questions
    roomOne(msg, client, questionsOneOld, stats);
    roomTwo(msg, client, questionsTwoOld, stats);
    roomThree(msg, client, questionsThreeOld, stats);
  }

  if (
    msg.member.roles.cache.has(escapeRoomManagerRole.id) &&
    msg.content == `!start dc`
  ) {
    // Old Testament Questions
    roomOne(msg, client, dcQuestions, stats);
    roomTwo(msg, client, dcQuestions, stats);
    roomThree(msg, client, dcQuestions, stats);
  }

  /* Commands */
  const { clear } = require("./commands/moderation.ts");
  const { reset } = require("./commands/reset.ts");
  clear(msg);
  reset(msg);

  if (msg.content == "test" && msg.author.id == "279032930926592000") {
    // testing command
    /*         const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle("Commands:")
        .setDescription(`\n**Game Managers**\n> **!start** - Starts all of the rooms\n> **!reset** - deletes all messages in all rooms, #completed-questions and #help-requests\n> **!clear <message number>** - clears a given number of messages\n\n**Players**\n> **!help** - ask for help\n`)
        .setColor('#220220');
        msg.channel.send(embed); */
    /*         const fs = require('fs');
        let jsonData = fs.readFileSync('./questions/roomOne.json');
        let questionsObject = JSON.parse(jsonData);

        let newQuestion = 
        {
            question: "How many large fish did the apostles catch when the ressurected Jesus told them to throw their nets on right side of the boat? (Answer in integer form Ex. 1,2,3)",
            answers: [
                "153"
            ],
            answered: false
        };

        questionsObject.questionsOne.push(newQuestion);
        fs.writeFileSync('./questions/roomOne.json', JSON.stringify(questionsObject, null, 2)); */
    /*         const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setTitle(`Welcome to Trivia Night!`)
        .setDescription(`\nThis is a discord trivia game by <@689910756711727193> and developed by <@279032930926592000>\nYou will be assigned a room, where you work together with your team to answer all of the questions as quickly as you can. The first room to answer all of the questions wins. Each team has the exact same questions, but in a random order.\n\nAt any point during the game you may use the !help command and a <@&814275985893359617> will come to assist you. Thanks and have fun!`)
        .setColor('#006600');
        msg.channel.send(embed); */
  }
});

client.login(token);
