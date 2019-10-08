
function Product(product, quantity, price) {
    let salesItem = {}; //let sales item = object - data structure to add properties and methods to
    salesItem.product = product;
    salesItem.quantity = quantity;
    salesItem.price = price;

    /*return the value of the item (price * quantity, e.g 10 * $2.50).*/
    salesItem.productValue = function () {
        return salesItem.price * salesItem.quantity;
    }
    return salesItem;
}
module.exports = Product;
        