# Run

```bash
npm run start
```

# Use
## Url local

 http://localhost:8080

## Url Param
- filter: a comman separated list of crypto assets symbols

### Example:

```bash
curl http://localhost:8080?filter=BTC,ETH,MATIC

```
- Response:

```json
[
    {
        "id": "bitcoin",
        "rank": 1,
        "link": "/currencies/bitcoin/",
        "symbol": "BTC",
        "name": "Bitcoin",
        "marketCapUSD": 172835607729,
        "marketCapBTC": 17771125,
        "priceUSD": 9725.64245253,
        "priceBTC": 1,
        "circulatingSupply": 17771125,
        "volume24HUSD": 19607667874.4,
        "volume24HBTC": 2018019.06377,
        "percentChange1H_USD": -0.11,
        "percentChange24H_USD": 4.64,
        "percentChange7D_USD": 17.97
    },
    {
        "id": "ethereum",
        "rank": 2,
        "link": "/currencies/ethereum/",
        "symbol": "ETH",
        "name": "Ethereum",
        "marketCapUSD": 30404260590.2,
        "marketCapBTC": 3129203.22212,
        "priceUSD": 285.2786142,
        "priceBTC": 0.0293608442182,
        "circulatingSupply": 106577426.687,
        "volume24HUSD": 7880234392.06,
        "volume24HBTC": 811032.874078,
        "percentChange1H_USD": 1.81,
        "percentChange24H_USD": 5.98,
        "percentChange7D_USD": 11.46
    },
    {
        "id": "matic-network",
        "rank": 123,
        "link": "/currencies/matic-network/",
        "symbol": "MATIC",
        "name": "Matic Network",
        "marketCapUSD": 49588893.4868,
        "marketCapBTC": 5103.68357159,
        "priceUSD": 0.0229566087372,
        "priceBTC": 0.00000236269169633,
        "circulatingSupply": 2160114068,
        "volume24HUSD": 43825366.7646,
        "volume24HBTC": 4510.50202268,
        "percentChange1H_USD": -0.81,
        "percentChange24H_USD": 0.05,
        "percentChange7D_USD": 1.34
    }
]
```

