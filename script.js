"use strict"

const hour = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"]
const stores = ["Seattle", "Tokyo", "Dubai", "Paris", "Lima"]

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
    this.render()
}

Store.prototype.render = function(){
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();
    
    const h3 = document.createElement("h3");
    h3.textContent = this.storeName;
    // container.appendChild(h3);
    const ul = document.createElement("ul");
    // container.appendChild(ul);
    for(let i = 0; i < 14; i++){
        const li = document.createElement("li");
        li.textContent = `${hour[i]} :  ${this.cookiesEachHour[i]} cookies.`
        ul.appendChild(li);
    }
    const li = document.createElement("li");
    li.textContent = `Total : ${this.totalDailyCookies} cookies.`
    ul.appendChild(li)
    while(isTable==0){
        const table = document.createElement("table")
        const headerRow = document.createElement("tr")
        const article = document.createElement("article");
        container.appendChild(article);
        table.appendChild(headerRow)
        article.appendChild(table)
        const storeHeaderCell = document.createElement("th")
        storeHeaderCell.textContent="Store"
        headerRow.appendChild(storeHeaderCell)
        for(let i=0; i < hour.length; i++){
            const hourHeaderCell = document.createElement("th")
            hourHeaderCell.textContent = hour[i]
            headerRow.appendChild(hourHeaderCell)
        }
        const hourHeaderCell = document.createElement("th")
            hourHeaderCell.textContent = "Total"
            headerRow.appendChild(hourHeaderCell)
        isTable=1;
    }
    const storeNameData = document.createElement("tr")
    storeNameData.textContent = this.storeName
    table.appendChild(storeNameData)
    for(let i=0; i < hour.length; i++){
        const salesData = document.createElement("td")
        salesData.textContent=this.cookiesEachHour[i]
        storeNameData.appendChild(salesData)
    }
    const salesData = document.createElement("td")
    salesData.textContent=this.totalDailyCookies
    storeNameData.appendChild(salesData)
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