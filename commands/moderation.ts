module.exports = {
	name: 'clear',
	description: '',
	clear(msg) {

        if (!msg.content.startsWith(`!clear`)) return;

        var input = msg.content;
        var usrInput = input.substr(6);
        var amount = usrInput;
        var amountNum = parseInt(amount, 10);


        const member = msg.member;
	    if (member.hasPermission("MANAGE_MESSAGES")) {

            if (amount !== "") {

                if (amountNum !== NaN) {
                    
                    if (amountNum >= 1 && amountNum <= 99) {
                        
                            msg.channel.messages.fetch()
                            .then(function(){
                                    msg.channel.bulkDelete(amountNum + 1).catch((errorMessage) => {msg.channel.send(`> ${errorMessage}`)});
                            }, function(err){msg.channel.send("\**Error:\** error clearing channel.")})                      

                    } else {
                        msg.channel.send(`\**Error:\** Amount must be a whole number from 1-99!`);
                    }

                } else {
                    msg.channel.send(`\**Error:\** Amount must be a whole number from 1-99!`);
                }

            } else {
                msg.channel.send(`\**Error:\** Must include amount!`);
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Manage Messages" perms`);
        }
        
	},
};