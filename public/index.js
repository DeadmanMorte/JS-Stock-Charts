async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    let response1 = await fetch ('https://api.twelvedata.com/time_series?symbol=GME&interval=1month&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92');
    let response1JSON = await response1.json();
    let response2 = await fetch ("https://api.twelvedata.com/time_series?symbol=MSFT&interval=1month&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92");
    let response2JSON = await response2.json();
    let response3 = await fetch ("https://api.twelvedata.com/time_series?symbol=DIS&interval=1month&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92");
    let response3JSON = await response3.json();
    let response4 = await fetch ("https://api.twelvedata.com/time_series?symbol=BNTX&interval=1month&format=JSON&apikey=898d6fa351c84d449dcf68eff3accf92");
    let response4JSON = await response4.json();
 
    let GME = response1JSON
    let MSFT = response2JSON
    let DIS = response3JSON
    let BTNX = response4JSON

    const stocks = [GME, MSFT, DIS, BTNX]; 


    stocks.forEach( stock => stock.values.reverse())

      // Time Chart
      new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                data: stock.values.map(value => parseFloat(value.high))
            }))
        }
    });

    // High Chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    // Average Chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    calculateAverage(stock.values)
                ))
            }]
        }
    });
}

function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}

function calculateAverage(values) {
    let total = 0;
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total / values.length
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
main()