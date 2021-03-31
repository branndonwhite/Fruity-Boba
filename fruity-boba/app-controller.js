const populateData = () => {
    const drinkData = [
        {
            name: "Strawberry Apple",
            price: 16000,
            series: "fruit",
            qty: 0
        },
        {
            name: "Mango Sunny",
            price: 18000,
            series: "fruit",
            qty: 0
        },
        {
            name: "Lemon and Passion",
            price: 20000,
            series: "fruit",
            qty: 0
        },
        {
            name: "Peachy Tangerine",
            price: 24000,
            series: "fruit",
            qty: 0
        },
        {
            name: "Oolong Machiato",
            price: 18000,
            series: "tea and coffee",
            qty: 0
        },
        {
            name: "Milky Brown Sugar Green Tea",
            price: 24000,
            series: "tea and coffee",
            qty: 0
        },
        {
            name: "Frappy Cappucino",
            price: 16000,
            series: "tea and coffee",
            qty: 0
        },
        {
            name: "Winter Drip",
            price: 22000,
            series: "tea and coffee",
            qty: 0
        }
    ];

    let id = 1;
    for(index in drinkData){
        localStorage.setItem('list_drink', JSON.stringify(drinkData[index]));
        localStorage.setItem('drink_id', id);
        id++;    
    }

}

const loadDrink = () => {
    if(localStorage.list_drink && localStorage.id_drink){
        list_drink = JSON.parse(localStorage.getItem('list_drink'));
        let data = "";
        let fruitList = "";
        let teaCoffeeList = "";
        if(list_drink.length > 0){
            data_row = 
                '<div class="row justify-content-end">' +
                '<div class="col-xs-2 col-sm-6 col-md-8">';

            data_btn = 
                '</div>' +
                '<div class="col-xs-4 col-sm-6 col-md-4 text-right">' +
                '<div class="d-flex justify-content-end">' +
                '<div class="btn-group btn-group-sm" role="group">';

            for(i in data){
                if(data[i].series == "fruit"){
                    fruitList +=
                    data_row +
                    '<div class="food-name">'+ data[i].name +'</div>' +
                    '<div class="price">Rp. ' + data[i].price + '</div>' + data_btn +
                    '<a class="btn btn-secondary" href="javascript:void(0)" onclick="decreaseQty(\'' + data[i].drink_id + '\')">-</a>' +
                    '<button type="button" class="btn btn-default" disabled>'+ data[i].qty +'</button>' +
                    '<a class="btn btn-success" href="javascript:void(0)" onclick="increaseQty(\'' + data[i].drink_id + '\')">+</a>' +
                        '</div></div></div></div>'

                }else{
                    teaCoffeeList +=
                    data_row +
                    '<div class="food-name">'+ data[i].name +'</div>' +
                    '<div class="price">Rp. ' + data[i].price + '</div>' + data_btn +
                    '<a class="btn btn-secondary" href="javascript:void(0)" onclick="decreaseQty(\'' + data[i].drink_id + '\')">-</a>' +
                    '<button type="button" class="btn btn-default" disabled>'+ data[i].qty +'</button>' +
                    '<a class="btn btn-success" href="javascript:void(0)" onclick="increaseQty(\'' + data[i].drink_id + '\')">+</a>' +
                        '</div></div></div></div>'
                }
            }
        }else{
            data = "Currently all stock is sold out, please come back later";
            populateData();
        }

        document.getElementById('fruit-list').appendChild(fruitList);
        document.getElementById('tea-coffee-list').appendChild(teaCoffeeList);
    }
}

const increaseQty = (id) => {
    if(localStorage.list_drink && localStorage.id_drink){
        list_drink = JSON.parse(localStorage.getItem('list_drink'));

        for(i in list_drink){
            if(list_drink[i].drink_id == id){
                list_drink[i].qty += 1;
            }
        }
    }
}

const decreaseQty = (id) => {
    if(localStorage.list_drink && localStorage.id_drink){
        list_drink = JSON.parse(localStorage.getItem('list_drink'));

        for(i in list_drink){
            if(list_drink[i].drink_id == id){
                if(list_drink[i].qty > 0){
                    list_drink[i].qty -= 1;
                }else{
                    list_drink[i].qty = 0;
                }
            }
        }
    }
}

const viewCart = () => {
    document.getElementById('greeting').classList.add('hidden');
    document.getElementById('menu-list').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');

    if(localStorage.list_drink && localStorage.id_drink){
        list_drink = JSON.parse(localStorage.getItem('list_drink'));

        let total_price = 0;
        let order_list;

        for(i in list_drink){
            if(list_drink[i].qty != 0){
                order_list +=
                '<div class="row justify-content-end">' +
                '<div class="col">' +
                '<div class="food-name"><strong>'+ list_drink[i].qty +'x</strong>'+ list_drink[i].name +'</div>' +
                '</div>' +
                '<div class="col">' +
                '<div class="d-flex justify-content-end">' +
                '<div class="price">Rp. '+ list_drink[i].price +'</div>'
                '</div></div></div>';

                total_price += (list_drink[i].qty * list_drink[i].price);
            }
        }

        price_data = '<div>Total price: <strong>'+ total_price +'</strong></div>';

        document.getElementById('all-order').appendChild(order_list);
        document.getElementById('total-price').appendChild(price_data);
    }
}

const orderNow = () => {
    //send message via chatbot
    if(!liff.isInClient()){
        alert("You can't send the message through external browser");
    }else{
        liff.sendMessages([
            {
              type: 'text',
              text: 'The order is processed, please wait for awhile.'
            }])
            .then(() => {
              console.log('message sent');
            })
            .catch((err) => {
              console.log('error', err);
            });
    }
}