//refernce productModule
//const Product = require('./productModule');

function SalesOrder(customer, salesTaxRate, things) {
    let salesOrder = {}; //let sales order = object - data structure to add properties and methods to
    salesOrder.customer = customer;
    salesOrder.salesTaxRate = salesTaxRate;
    salesOrder.things = things ? things : []; // error checking
    
    salesOrder.addThing = function (thing) {
        salesOrder.Things.push (thing);
    }
    
    salesOrder.Value = function() {
        total = 0;
        salesOrder.items.forEach(item => {
            total += item.productValue();
        });
        return total;
    }
 
    salesOrder.TotalValue  = function () {
        subTotal = salesOrder.Value();
        finalTotal = salesOrder.Value() + (subTotal * salesOrder.salesTaxRate);
        return finalTotal;
    }
 
    return salesOrder;
}
 
module.exports = SalesOrder;