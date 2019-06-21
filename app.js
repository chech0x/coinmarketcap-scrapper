const https = require('https');
const htmlparser = require("htmlparser2");

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let filter=req.query.filter;
    let filters;
    if(filter){
        filters = filter.split('\,');
        console.log(JSON.stringify(filters));
    }

    callCriptoMarket(function(output){
        console.log('salida de criptomarket parseada');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(output));
    },filters,function(err){
        res.status(500)
        res.render('error', { error: err });
    });
    
});



function callCriptoMarket(callback,filters,callbackerr){
    https.get('https://coinmarketcap.com/all/views/all/', (resp) => {
    let skipThisRecord=false;
    let registro = {};
    let output=[];
    function currentFound(previus,current,text){
        return(previus && !current && text.length>0)
    }
    let parser = new htmlparser.Parser({
        
        onopentag: function ( name,  attributes){
            if(name == "tr" && attributes.id){
                registro={};
                skipThisRecord=false;
                let id=attributes.id.replace (/id\-/ , '')
                registro.id=id;
            }else if(!skipThisRecord){
                if(name=="a"){
                    if(attributes.class){
                        if( attributes.href && attributes.class.match(/link-secondary/)){
                            registro.link=attributes.href;
                        }else if(attributes.class.match(/price/) ){
                            let usd = parseFloat(attributes["data-usd"]);
                            let btc = parseFloat(attributes["data-btc"]);
                            registro.priceUSD=usd;
                            registro.priceBTC=btc;
                        }else if(attributes.class.match(/volume/)){
                            let usd = parseFloat(attributes["data-usd"]);
                            let btc = parseFloat(attributes["data-btc"]);
                            registro.volume24HUSD=usd;
                            registro.volume24HBTC=btc;                   
                        }
                    }
    
                }else if(name=="td"){
                    if(attributes.class){
                        if(attributes.class.match(/market-cap/)){
                            let usd = parseFloat(attributes["data-usd"]);
                            let btc = parseFloat(attributes["data-btc"]);
                            registro.marketCapUSD=usd;
                            registro.marketCapBTC=btc;
                        }else if (attributes.class.match(/circulating-supply/)){
                            registro.circulatingSupply=parseFloat(attributes["data-sort"]);
                        }else if (attributes.class.match(/percent-change/)){
                            if(attributes["data-timespan"]){
                                if(attributes["data-timespan"].match(/1h/)){
                                    registro.percentChange1H_USD=parseFloat(attributes["data-percentusd"]);   
                                }else if(attributes["data-timespan"].match(/24h/)){
                                    registro.percentChange24H_USD=parseFloat(attributes["data-percentusd"]);   
                                }else if(attributes["data-timespan"].match(/7d/)){
                                    registro.percentChange7D_USD=parseFloat(attributes["data-percentusd"]);   
                                }
                            }
    
                        }
                    }
    
                }
    
            }

        },
        onclosetag: function(name){
            if( !skipThisRecord && name=='tr' && registro.id && registro.symbol){
                output.push(registro);
                registro={};
            }
        },
        ontext: function (text){
            if(!skipThisRecord){
                text=text.trim()
                if(currentFound(registro.id,registro.rank,text)){
                    let value= parseInt(text);
                    if(value){
                        registro.rank=value;
                    }
                    
                }else if(currentFound(registro.link,registro.symbol,text)){
                    registro.symbol=text;
                    skipThisRecord=filters && !filters.includes(registro.symbol);
                }else if(currentFound(registro.symbol,registro.name,text)){
                    registro.name=text;
                }
            }

        }

    }, {decodeEntities: false, lowerCaseAttributeNames: true, lowerCaseTags: true});
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        parser.write(chunk);
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        parser.end();
        
        callback(output);
    });

    }).on("error", (err) => {
        callbackerr(err);
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});