/* eslint-disable no-loop-func */
/* eslint-disable no-undef */

var ccxt = require ('ccxt');

const exchange = new ccxt.binance();

var ts = Math.round(new Date().getTime() );
var tsYesterday = ts - (24 * 3600*1000);

//fetch average amplitude (in %) and volume with given set of ohlcv
//also get the max amplitude (just see if their was major bull run which might have caused the average increase in amplitude percentage)
function getAmplitudeAndVolume(ohlcv){
    var amp_percent_sum =0;
    var volSum=0;
    var max_amp_percent=0
    // eslint-disable-next-line no-undef
    for(let i in ohlcv){
        
        let [time , open_val ,high , low, close_val ,vol] = ohlcv[i];


        // time ,open ,high ,low , close ,volume
        
        let amp_percent = (((high-low)/low)*100);
        max_amp_percent = max_amp_percent> amp_percent ? max_amp_percent : amp_percent;
        amp_percent_sum += amp_percent  ;
        volSum += vol ;
    }
    return{
        vol :volSum/ohlcv.length,
        amp_percent : amp_percent_sum/ohlcv.length,
        max_amp_percent : max_amp_percent
    }
}

export async function getCoinVolatility(symbol,interval){
    let res ={};
    await exchange.fetchOHLCV (symbol, interval,tsYesterday).then(ohlcv=>{
        let {vol , amp_percent,max_amp_percent} = getAmplitudeAndVolume(ohlcv);
        res ={vol ,amp_percent , max_amp_percent};
    })
    return res;
}

export async function getTopVolatileCoinsinUSDT(interval){
    let arr=[];
    let max_amp=0;
    let sleep = (ms) => new Promise (resolve => setTimeout (resolve, ms));
    if (exchange.has.fetchOHLCV) {
      const markets = await exchange.fetchMarkets()
       
      for (let index in markets) {
            
            let symbol= markets[index].symbol;
            if(!symbol.endsWith("USDT"))
                continue;

            await sleep (exchange.rateLimit) // milliseconds    
            exchange.fetchOHLCV (markets[index].symbol, interval,tsYesterday).then(ohlcv=>{
                let {vol , amp_percent,max_amp_percent} = getAmplitudeAndVolume(ohlcv);
                arr.push({symbol , vol,amp_percent,max_amp_percent});
                if (max_amp < amp_percent){
                    max_amp=amp_percent;
                }  
            })
        }
        arr.sort(compare)
       
    }
    return arr;
}

//comparator to sort the coins in descending order
function compare(a,b){
    if(a.amp_percent < b.amp_percent)
        return 1;
    if(a.amp_percent > b.amp_percent)
        return -1;    
    return 0;    
}

