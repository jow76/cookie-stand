"use strict"

const hour = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"]
const stores = ["Seattle", "Tokyo", "Dubai", "Paris", "Lima"]

const storeForm = document.getElementById("addStoreForm");
const allStores = [];

const salesDiv = document.getElementById("container");
let isTable=0;

function Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust){
    this.storeName=storeName;
    this.minCustPerHour=minCustPerHour;
    this.maxCustPerHour=maxCustPerHour;
    this.avgCookiesPerCust=avgCookiesPerCust;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;
    // this.pushStore = function(){
    //     console.log(allStores)
    // }
    // this.pushStore;
    this.render();
    allStores.push(this)
}

Store.prototype.render = function(){
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();
    const storeTable = document.getElementById("store-table")
    const tr = document.createElement("tr")
    const th = document.createElement("th")
    th.textContent = this.storeName;
    storeTable.appendChild(tr)
    tr.appendChild(th);
    for(let i =0; i < hour.length; i++){
        const td = document.createElement("td")
        td.textContent = this.cookiesEachHour[i]
        tr.appendChild(td)
    }
    const salesData = document.createElement("td")
    salesData.textContent=this.totalDailyCookies
    tr.appendChild(salesData)
}

Store.prototype.calcCustomersEachHour = function(){
    for(let i = 0; i < hour.length; i++){
        this.customersEachHour[i]=randomNumber(23,65);
    }
},
Store.prototype.calcCookiesEachHour = function(){
    for(let i = 0; i < hour.length; i++){
        const oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCust);
        this.cookiesEachHour.push(oneHour);
        this.totalDailyCookies += oneHour;
    }
}

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min +1) + min);
}

const seattle = new Store("Seattle",23,65,6.3)
const tokyo = new Store("Tokyo",3,24,1.2)
const dubai = new Store("Dubai",11,38,3.7)
const paris = new Store("Paris",20,38,2.3)
const lima = new Store("Lima",2,16,4.6)



function hourlyTotal(){
    const storeTable = document.getElementById("store-table")
    const tr = document.createElement("tr")
    const th = document.createElement("th")
    th.textContent = "Hourly Totals";
    tr.appendChild(th);
    for(let i = 0; i < hour.length; i++){
        const th = document.createElement("th");
        let hoursAdded = 0;
        for(let j = 0; j < allStores.length; j++){
            let hourAmount = allStores[j].cookiesEachHour[i];
            hoursAdded += hourAmount;
        }
        th.textContent = hoursAdded;
        tr.appendChild(th);
    }
    let dailyTotal = 0;
    for(let i = 0; i < allStores.length; i++){
        dailyTotal += allStores[i].totalDailyCookies;
    }
    const dailyTotalCell = document.createElement("th")
    dailyTotalCell.textContent = dailyTotal;
    tr.appendChild(dailyTotalCell);
    storeTable.appendChild(tr)
}

hourlyTotal();

storeForm.addEventListener("submit", function (event){
    event.preventDefault();
    const storeName = event.target.name.value;
    const minCustPerHour = event.target.minCust.value;
    const maxCustPerHour = event.target.maxCust.value;
    const avgCookiesPerCust = event.target.avgCookie.value;
    new Store(storeName, minCustPerHour, maxCustPerHour, avgCookiesPerCust)
    console.log(allStores)
    storeForm.reset();
})