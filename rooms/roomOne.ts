module.exports = {
  async roomOne(msg, client, questions, stats) {
    let numberOfQuestions = 20;
    let time = 0;
    setInterval(() => {
      time++;
    }, 1000);

    const Discord = require("discord.js");
    const roomOneChannel = msg.guild.channels.cache.get("821939376300228628");
    const completedQuestionsChannel = msg.guild.channels.cache.get(
      "824885020081782794"
    );
    const helpChannel = msg.guild.channels.cache.get("824897703262552075");
    const lobbyChannel = msg.guild.channels.cache.get("825033081169510400");

    const filter = (m) => m.channel.id == roomOneChannel.id;

    const askQuestion = async (question, number) => {
      return new Promise((resolve) => {
        const embed = new Discord.MessageEmbed()
          .setTitle(`Question ${number}/${numberOfQuestions}`)
          .setColor(Math.floor(Math.random() * 16777215).toString(16))
          .setDescription(`${question.question}`);
        roomOneChannel.send(embed).then((message) => {
          const questionCollector = roomOneChannel.createMessageCollector(
            filter
          );
          questionCollector.on("collect", (m) => {
            console.log(`Collected "${m.content}"`);

            if (m.content == "!help") {
              const helpEmbed = new Discord.MessageEmbed()
                .setTitle(`Room 1  |  Question ${number}`)
                .setDescription(
                  `\n**Question: **${
                    question.question
                  }\n\n**Answer(s): **\n\`\`\`${question.answers.join(
                    "\n"
                  )}\`\`\`\nfrom ${m.author.tag}`
                )
                .setColor("#55CBCD");
              helpChannel.send(helpEmbed);
            }

            if (
              question.answers.some((v) =>
                m.content.toLowerCase().includes(v.toLowerCase())
              )
            ) {
              questionCollector.stop();
              embed.setTitle(`Congrats 🎉`);
              embed.setDescription(`You solved the question!`);
              message.edit(embed);
              question.answered = true;

              /* #completed-questions */
              const statusEmbed = new Discord.MessageEmbed()
                .setTitle(`Room 1 | Answered Question ${number}`)
                .setDescription(
                  `\n**Question: **${question.question}\n\n**Answer: **\n\`\`\`${m.content}\`\`\`\nAnswered by ${m.author.tag}`
                )
                .setColor("#55CBCD");
              completedQuestionsChannel.send(statusEmbed);

              resolve("done");
            }
          });
        });
      });
    };

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    for (let i = 0; i < numberOfQuestions; ) {
      //   for (let i = 0; i < questions.length; ) {

      if (i == numberOfQuestions - 1) {
        msg.guild.members.cache.forEach((member) => {
          if (member.roles.cache.has("814352076984680478")) {
            member.roles.add("814257316425760808");
          }
        });

        let place = 1;
        let placement;

        roomOneChannel.send(
          `:partying_face::partying_face::partying_face: **You did it!!** :partying_face::partying_face::partying_face:`
        );
        roomOneChannel.send(
          `https://tenor.com/view/yay-yes-yes-yes-cheering-happy-pumped-gif-17307562`
        );
        const doneEmbed = new Discord.MessageEmbed()
          .setTitle(`Room 1 Finished the questions`)
          .setColor("#FF0000");
        for (const room of stats.rooms) {
          if (room.finished == false) continue;
          place++;
        }

        switch (place) {
          case 1:
            placement = "first";
            break;
          case 2:
            placement = "second";
            break;
          case 3:
            placement = "third";
            break;
        }

        doneEmbed.setDescription(`\n**In ${placement} place**`);
        completedQuestionsChannel.send(doneEmbed);

        const congrats = new Discord.MessageEmbed()
          .setTitle(`🥳 **Congratulations Room 1** 🎉`)
          .setDescription(
            `Finished in ${placement} place\nIn ${Math.floor(time / 60)}:${
              time - Math.floor(time / 60) * 60
            } minutes`
          )
          .setColor("#D4AF37");
        lobbyChannel.send(congrats);
        lobbyChannel.send("@everyone");

        setInterval;

        // completedQuestionsChannel.send("<@&814275985893359617>");

        stats.rooms[0].finished = true;

        return;
      }

      let x = getRandomInt(0, questions.length);
      let question = questions[x];
      if (question.answered == true) continue;

      await askQuestion(question, i + 1);
      i++;
    }
  },
};
