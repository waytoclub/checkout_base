
class Checkout {
    constructor() {
        this.products = [
            {"sku": "ipd", "name": "Super iPad", "price": "$539"},
            {"sku": "mbp", "name": "MacBook Pro", "price": "$1399"},
            {"sku": "atv", "name": "Apple TV", "price": "$109.50"},
            {"sku": "vga", "name": "VGA adapter", "price": "$30"}
        ];
        this.bucket = []
    }

    checkOffer(item) {
        var product_price = this.products.filter(x => x.sku == item.sku)
        if(item.sku == "ipd" && item.qty > 4) {
            item.price = Number(product_price[0].price.replace(/[^0-9.-]+/g,""))
            var offer_price = Number("$499.99".replace(/[^0-9.-]+/g,""))
            var real_price = item.price - offer_price
            var final_price = real_price * item.qty
            final_price = final_price.toFixed(2)
            item.price = "$"+final_price
        }else if(item.sku == "atv" && item.qty == 3) {
            item.price = "$"+Number(product_price[0].price.replace(/[^0-9.-]+/g,"")) * 2
        }
        return item;
    }

    addNewProduct(item) {
        this.products.push(item)
    }

    scan(item) {
        var item = this.checkOffer(item)
        this.bucket.push(item)
    }
    
    total() {
        var price = this.bucket.map((x) => {
            return Number(x.price.replace(/[^0-9.-]+/g,""))
        })
        return "$"+price.reduce((a,b) => a+b)
    }
}

const co = new Checkout();
co.scan({"sku": "ipd", "qty": 5, "price": "$539"})
co.scan({"sku": "atv", "qty": 3, "price": "$109.50"})
co.scan({"sku": "vga", "qty": 1, "price": "$30.00"})
var total = co.total();
console.log(total)
