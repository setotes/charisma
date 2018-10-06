var Discord = require('discord.js');

module.exports = function(imports, parameters) {
    var embed = new Discord.RichEmbed();
    embed.setColor(imports.data.guilds[imports.guild.id].colors.accent);
    if (parameters[0] == 'get') {
        if (parameters[1] != undefined) {
            if (imports.Command.methods.mention(parameters[1]).pass) {
                var id = imports.Command.methods.mention(parameters[1]).value;
                var member = imports.guild.members.get(id);
                if (imports.data.guilds[imports.guild.id].blacklist[id].length == 0) {
                    embed.setDescription(member.displayName + ' doesn\'t have any commands blacklisted');
                }

                else {
                    embed.setDescription('```' + JSON.stringify(imports.data.guilds[imports.guild.id].blacklist[id], null, 4) + '```');
                }
            }

            else {
                embed.setDescription('please mention the user that you want to get the blacklist of');
            }
        }

        else {
            embed.setDescription('please mention the user that you want to get the blacklist of');
        }
    }

    else if (parameters[0] == 'add') {
        if (parameters[1] != undefined) {
            if (imports.Command.methods.mention(parameters[1]).pass) {
                var id = imports.Command.methods.mention(parameters[1]).value;
                var member = imports.guild.members.get(id);
                if (member) {
                    if (parameters[2] != undefined) {
                        if (imports.Command.get.command(parameters[2]) != null) {
                            var blacklist = imports.data.guilds[imports.guild.id].blacklist[id];
                            var exists = false;
                            for (b = 0; b < blacklist.length; b++) {
                                if (blacklist[b] == parameters[2]) {
                                    exists = true;
                                }
                            }

                            if (exists) {
                                embed.setDescription(member.displayName + ' is already blacklisted from using ' + parameters[2]);
                            }

                            else {
                                imports.data.guilds[imports.guild.id].blacklist[id].push(parameters[2]);
                                embed.setDescription(member.displayName + ' has been blacklisted from using the ' + parameters[2] + ' command');
                            }
                        }

                        else {
                            embed.setDescription('that command doesn\'t exist');
                        }
                    }

                    else {
                        embed.setDescription('please specify the command that you want to add');
                    }
                }

                else {
                    embed.setDescription('invalid user');
                }
            }

            else {
                embed.setDescription('please mention a user');
            }
        }

        else {
            embed.setDescription('please mention a user');
        }
    }

    else if (parameters[0] == 'remove') {
        if (parameters[1] != undefined) {
            if (imports.Command.methods.mention(parameters[1]).pass) {
                var id = imports.Command.methods.mention(parameters[1]).value
                var member = imports.guild.members.get(id);
                if (member) {
                    if (parameters[2] != undefined) {
                        if (imports.Command.get.command(parameters[2]) != null) {
                            var blacklist = imports.data.guilds[imports.guild.id].blacklist[id];
                            var exists = false;
                            for (b = 0; b < blacklist.length; b++) {
                                if (blacklist[b] == parameters[2]) {
                                    exists = true;
                                }
                            }

                            if (exists) {
                                var newBlacklist = new Array();
                                for (b = 0; b < blacklist.length; b++) {
                                    if (blacklist[b] != parameters[2]) {
                                        newBlacklist.push(blacklist[b]);
                                    }
                                }

                                imports.data.guilds[imports.guild.id].blacklist[id] = newBlacklist;
                                embed.setDescription(member.displayName + ' has been unblacklisted from using ' + parameters[2]);
                            }

                            else {
                                embed.setDescription(member.displayName + ' is not blacklisted from using ' + parameters[2]);
                            }
                        }

                        else {
                            embed.setDescription('that command doesn\'t exist');
                        }
                    }

                    else {
                        embed.setDescription('please specify the command you want to remove');
                    }
                }

                else {
                    embed.setDescription('invalid user');
                }
            }

            else {
                embed.setDescription('please mention a user');
            }
        }

        else {
            embed.setDescription('please mention a user');
        }
    }

    else if (parameters[0] == 'clear') {
        if (parameters[1] != undefined) {
            if (imports.Command.methods.mention(parameters[1]).pass) {
                var id = imports.Command.methods.mention(parameters[1]).value;
                var member = imports.guild.members.get(id);
                if (member) {
                    imports.data.guilds[imports.guild.id].blacklist[id] = [];
                    embed.setDescription(member.displayName + '\'s blacklist has been cleared');
                }

                else {
                    embed.setDescription('invalid user');
                }
            }

            else {
                embed.setDescription('please specify a user');
            }
        }

        else {
            embed.setDescription('please specify a user');
        }
    }

    else {
        embed.setDescription('invalid option\n(get | add | remove | clear )');
    }

    imports.channel.send(embed);
}