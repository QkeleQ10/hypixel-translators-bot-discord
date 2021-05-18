import { blurple } from "../../config.json"
import Discord from "discord.js"
import { client, Command } from "../../index"

const command: Command = {
    name: "members",
    description: "Lists all the members in a role",
    options: [{
        type: "ROLE",
        name: "role",
        description: "The role to get members for",
        required: true
    }],
    allowDM: true,
    roleWhitelist: ["764442984119795732"], //Discord Administrator
    channelWhitelist: ["624881429834366986", "730042612647723058", "551693960913879071"], //staff-bots bot-development admin-bots
    execute(interaction: Discord.CommandInteraction) {
        const role = interaction.options[0].role as Discord.Role
        let tags: Discord.GuildMember[] = []
        role.members.forEach(member => tags.push(member))

        const arr = []
        let p = 0
        while (p < tags.length) {
            arr.push(tags.slice(p, p += 85)) //89 is max for now
        }

        let color = role.hexColor
        if (color === "#000000") color = blurple
        const embeds: Discord.MessageEmbed[] = [],
            embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor("Members list")
                .setTitle(`Here are all the ${tags.length} members with the ${role.name} role on the server at the moment.`)
        if (arr.length > 1) {
            arr.forEach(arg => {
                embed.setDescription(arg.join(", "))
                embeds.push(embed)
                embed
                    .setAuthor("")
                    .setTitle("")
                    .setFooter("")
            })
        } else embed.setDescription(arr[0].join(", "))
        embed.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        embeds.push(embed)
        interaction.reply({ embeds: embeds })
    }
}

export default command
