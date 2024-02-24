const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "ping",
    description: "simple ping command to fix bugs",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}