# Crypto Price Tracker

A Discord Bot that tracks crypto using the CoinGecko API
- Fetches coin price every 60 seconds and sets it as its nickname in each server






## Features

- Automatically changes nickname in each server to match live price (from CoinGecko API)
- Multiple instances can be run through just one app




## Installation

1. Download Zip file from github and unzip (or use the command line)

```bash
  git clone https://github.com/ALEXA8596/CryptoTracker
  cd CryptoTracker
```

2. Install Dependencies
```bash
  npm install
```

3. Rename config.example.json to config.json and input your discord token for each coin
```json
{
    "coinName": {
        "token": "discord token of bot"
    },
    "coinName2": {
        "token": "discord token of bot"
    }
}
```

4.  Run
```bash
  node index.js
```
## Configuration

- You are able to customize the coins that are tracked through this app
- Add or delete specific coins to the config.json file
- Format:
```json
{
    "coinName": {
        "token": "token"
    }
}
```
- replace "coinName" with the coin's name found [here](https://api.coingecko.com/api/v3/coins/list) and "token" with the discord bot token
    - Ex: $USDT is referenced as "tether" in the coin gecko api, so the config would look like this:
    ```json
    {
        "tether": {
            "token": "discord token"
        }
    }
    ```
## Inspiration

 - the r/CryptoCurrency discord

