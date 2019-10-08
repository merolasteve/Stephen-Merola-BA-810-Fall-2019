
const Product = require('./productModule');
const SalesOrder = require('./salesOrder');

let salesOrder = new SalesOrder();

salesOrder.addThing(new Product('Widget'))
salesOrder[0].addThing(2.50);
salesORder[0].Value(10);

salesOrder.addThing(new Product('Gidget'))
salesOrder[1].addThing(1.00);
salesOrder[1].Value(20);

salesOrder.forEach(item => {
    console.log(item.name)
})
 
console.log(salesOrder.totalValue());