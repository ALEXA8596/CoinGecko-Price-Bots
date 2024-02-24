

const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { CoinGeckoClient } = require('coingecko-api-v3');
const coingecko = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const clients = [];

const startingPrices = coingecko.simplePrice({ vs_currencies: 'usd', ids: Object.keys(config).join(',') });

console.log(startingPrices);

for (const key in config) {
    console.log(key)
    if (!config[key].token || config[key].token === "") {
        console.log(`No token for ${key}`);
        continue;
    }

    /**
     * @class Client
     */
    var client = new Client({ intents: [GatewayIntentBits.Guilds] });
    clients[key] = client;
    clients[key].login(config[key].token);
    clients[key].coinId = key
    clients[key].commands = new Collection();

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            clients[key].commands.set(command.data.name, command);
        }
    }

    clients[key].on('ready', async () => {
        console.log(`${clients[key].user.tag} has logged in.`);

        // Set the client's activity and name in servers
        const req = await coingecko.simplePrice({ vs_currencies: 'usd', ids: key });
        console.log(req);
        client.user.setActivity(`$${req[key].usd}`, { type: ActivityType.Watching });

        // Set the client's nickname in every guild

        await client.guilds.fetch()
        for (const guild of client.guilds.cache) {
            const member = guild[1].members.me;
            member.setNickname(`${key.charAt(0).toUpperCase()
                + key.slice(1)} $${req[key].usd}`);
        }
    });


    setInterval(async () => {
        const req = await coingecko.simplePrice({ vs_currencies: 'usd', ids: key });
        console.log(req);
        client.user.setActivity(`$${req[key].usd}`, { type: ActivityType.Watching });

        // Set the client's nickname in every guild

        await client.guilds.fetch()
        for (const guild of client.guilds.cache) {
            const member = guild[1].members.me;
            member.setNickname(`${key.charAt(0).toUpperCase()
                + key.slice(1)} $${req[key].usd}`);
        }
    }, 60000);
}