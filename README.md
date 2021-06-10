# react-js-stock

Demo: http://demo.octocreation.com/react-js-assignment-stock/

(Live) Stocks App
Write a “single page” (SPA) app to display live stock data.

Data
Your app should subscribe for updates via WebSockets **(server url: ws://stocks.mnet.website)**

Data Format
Updates (websocket messages) will be provided in the following form:
```
[ [ name, price], [ name, price] … ]
```
Each update will contain 0 or more name/price pairs. You may assume that update messages will have no more than 10 name/price pairs.

Example update handler that logs to console:
```
function handleUpdateMessage(data) {
  data.forEach(([name, price]) => console.log(`${name}: ${price}`));
}
```
