import { successColor } from "../../config.json"
import Discord from "discord.js"
import { Command } from "../../index"

const command: Command = {
  name: "say",
  description: "Says something in a specific channel.",
  options: [{
    type: "CHANNEL",
    name: "channel",
    description: "The channel to send the message in",
    required: true
  },
  {
    type: "STRING",
    name: "message",
    description: "The message to send",
    required: true
  }],
  cooldown: 600,
  roleWhitelist: ["768435276191891456"], //Discord Staff
  async execute(interaction: Discord.CommandInteraction) {
    const sendTo = interaction.options[0].channel as (Discord.TextChannel | Discord.NewsChannel),
      member = interaction.member as Discord.GuildMember,
      message = interaction.options[1].value!

    if (!sendTo.isText()) throw "noChannel"
    if (!member.permissionsIn(sendTo).has("SEND_MESSAGES")) throw "noPermission"

    if (member.permissions.has("MANAGE_ROLES")) sendTo.send(message)
    else sendTo.send(">>> " + message)
    const embed = new Discord.MessageEmbed()
      .setColor(successColor)
      .setAuthor("Message")
      .setTitle("Success! Message sent.")
      .setDescription(`${sendTo}:\n${message}`)
      .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
    interaction.reply(embed)
  }
}

export default command
