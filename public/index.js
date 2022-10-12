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

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),

        }))
        }
    })
    
    let highestPrices = []

    function makeHighest(){
        let i = 0
        let highestPrice = 0
    stocks.forEach(findHighest(stock)) 
        function findHighest (stock) {
            if(stock[i] > highestPrice){
            highestPrice = stock[i]
            highestPrices.push(highestPrice)
        }
    }
    }
    makeHighest()
    console.log(highestPrices)
    };
    
    const config = {
        type: 'bar',
        data: highestPrices,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
        
   

                                 
main() 
    
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

// 898d6fa351c84d449dcf68eff3accf92