module.exports = {
  name:"reset",
  reset(msg) {

    if (msg.content !== `!reset`) return;
    if (!msg.member.roles.cache.has("814275985893359617")) return;

    msg.guild.members.cache.forEach(member => {
      if (member.roles.cache.has("814257316425760808")) {
          member.roles.remove("814257316425760808");
      }
  });

    const roomOneChannel = msg.guild.channels.cache.get("821939376300228628");
    const roomTwoChannel = msg.guild.channels.cache.get("821939396986142720");
    const roomThreeChannel = msg.guild.channels.cache.get("821939428955521034");

    const completedQuestionsChannel = msg.guild.channels.cache.get("824885020081782794");
    const helpChannel = msg.guild.channels.cache.get("824897703262552075");

    roomOneChannel.messages.fetch()
    .then(messages => {
      roomOneChannel.bulkDelete(parseInt(messages.size, 10)).catch(err => {});
    });
    roomTwoChannel.messages.fetch()
    .then(messages => {
      roomTwoChannel.bulkDelete(parseInt(messages.size, 10)).catch(err => {});
    });
    roomThreeChannel.messages.fetch()
    .then(messages => {
      roomThreeChannel.bulkDelete(parseInt(messages.size, 10)).catch(err => {});
    });
    completedQuestionsChannel.messages.fetch()
    .then(messages => {
      completedQuestionsChannel.bulkDelete(parseInt(messages.size, 10)).catch(err => {});
    });
    helpChannel.messages.fetch()
    .then(messages => {
      helpChannel.bulkDelete(parseInt(messages.size, 10)).catch(err => {});
    });

  },
}