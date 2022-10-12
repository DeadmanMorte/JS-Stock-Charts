async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    let response1 = await fetch ('https://api.twelvedata.com/time_series?symbol=GME&interval=1min&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92');
    let response1JSON = await response1.json();
    let response2 = await fetch ("https://api.twelvedata.com/time_series?symbol=MSFT&interval=1min&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92");
    let response2JSON = await response2.json();
    // let response3 = await fetch ("https://api.twelvedata.com/time_series?symbol=DIS&interval=1min&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92", options);
    // let response3Text = await response3.json();
    // let response4 = await fetch ("https://api.twelvedata.com/time_series?symbol=BNTX&interval=1min&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92", options);
    // let response4Text = await response4.json();
 
    console.log(response1JSON,response2JSON)
}

main() 
    

// 898d6fa351c84d449dcf68eff3accf92