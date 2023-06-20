"use strict"

const hour = ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"]

let salesDiv = document.getElementById("container");

const seattle = {
    storeName: "Seattle",
    minCustPerHour: 23,
    maxCustPerHour: 65,
    avgCookiesPerCust: 6.3,
    customersEachHour: [],
    cookiesEachHour: [],
    totalDailyCookies: 0,
    render: function(){
        this.calcCustomersEachHour();
        this.calcCookiesEachHour();
        const article = document.createElement("article");
        container.appendChild(article);
        const h3 = document.createElement("h3");
        h3.textContent = this.storeName;
        container.appendChild(h3);
        const ul = document.createElement("ul");
        container.appendChild(ul);
        for(let i = 0; i < 14; i++){
            const li = document.createElement("li");
            li.textContent = `${hour[i]} :  ${seattle.cookiesEachHour[i]} cookies.`
            ul.appendChild(li);
        }
        const li = document.createElement("li");
        li.textContent = `Total : ${this.totalDailyCookies} cookies.`
        ul.appendChild(li)
    },
    calcCustomersEachHour: function(){
        for(let i = 0; i < hour.length; i++){
            this.customersEachHour[i]=randomNumber(23,65);
        }
    },
    calcCookiesEachHour: function(){
        for(let i = 0; i < hour.length; i++){
            const oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerCust);
            this.cookiesEachHour.push(oneHour);
            this.totalDailyCookies += oneHour;
        }
    }
}

seattle.render();

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min +1) + min);
}