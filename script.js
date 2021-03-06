
let modalQt = 1;
let cart = [];
let modalKey = 0;
//Esse let cart é o carrinho
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Função para agilizar nas seleções de elementos

//Listagem das pizza
pizzaJson.map((item, index) =>{
   let pizzaItem = c('.models .pizza-item').cloneNode(true);

   pizzaItem.setAttribute('data-key', index);
   
   pizzaItem.querySelector('.pizza-item--img img').src= item.img;
   pizzaItem.querySelector('.pizza-item--price').innerHTML =  `R$ ${item.price.toFixed(2)}`;
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   //Adicionando evento e conteúdo no modal
   pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1; //Serve para resetar o modal depois que fechar
        modalKey = key;
        //ModalKey serve para identificar qual é a pizza

        c('.pizzaBig img').src  = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--sector').innerHTML = pizzaJson[key].sizes;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //Resetando e verificando se o tamanho grande está selecionado
        c('.pizzaInfo--size.selected').classList.remove('selected');
        //Pegando tamanhos para colocar no modal
        cs('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];
        });

        //Qt padrão que contém no modal

        c('.pizzaInfo--qt').innerHTML = modalQt;
        
      
        //Aqui é o comando para abrir o modal
        c('.pizzaWindowArea').style.display = 'flex';
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
       
   }); 

   c('.pizza-area').append(pizzaItem);


});

//Eventos do modal

function closseModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },200);
}

//Selecionando os botões de fechar

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
        item.addEventListener('click', closseModal);
});


//Adicionando evento de click nos botões de + e - do modal

c('.pizzaInfo--qtmenos').addEventListener('click', () =>{
    if(modalQt>1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
  

});


c('.pizzaInfo--qtmais').addEventListener('click', () =>{
     modalQt++;
     c('.pizzaInfo--qt').innerHTML = modalQt;




});


//Adicionando evento de click no price

cs('.pizzaInfo--size').forEach((size, sizeIndex) =>{
        size.addEventListener('click', () =>{
            c('.pizzaInfo--size.selected').classList.remove('selected');
            size.classList.add('selected');
        })

});


//Adicionando evento do carrinho

c('.pizzaInfo--addButton').addEventListener('click', () =>{
    let size =  parseInt(c('.pizzaInfo--sizes .selected').getAttribute('data-key'));

    //Para o não criar a mesma pizza agente cria um id para aproveitar a mesma pizza que já foi adicionada

    let idetifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item) => item.idetifier == idetifier);
    //Aqui ele me retorna 0 ou -1 se retornar -1 significa que não achou

    if(key > -1){
        cart[key].qt =+ modalQt;

    }else{
         //Aqui agente definiu um objeto no array cart
        cart.push({
        idetifier,
        id:pizzaJson[modalKey].id,
        size: size,
        qt:modalQt
        });
       
    }
    updateCart();
    closseModal();
     
});


//Função atualizar carrinho

/*função abrir menu mobile */
c('.menu-openner').addEventListener('click', () =>{

        if(cart.length >0){
            c('aside').style.left = '0';
        }
       
});

c('aside .menu-closer').addEventListener('click', () =>{
     c('aside').style.left = '100vw';
})
function updateCart() {

    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length >0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        //Este for é usado para pegar cada item do array cart
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            let carItem = c('.models .cart--item').cloneNode(true);

            subTotal += pizzaItem.price *cart[i].qt;

            let pizzaSizeName;

            switch(cart[i].size){
                case 0:
                    pizzaSizeName='P';
                    break;

                case 1:
                    pizzaSizeName='M';
                    break;   
                    
                case 2:
                    pizzaSizeName='G';
                    break;    
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            carItem.querySelector('img').src = pizzaItem.img;
            carItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            carItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            carItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
                    if(cart[i].qt>1){
                        cart[i].qt--;
                       
                    }else{
                        cart.splice(i,1);
                        //Aqui estou dizendo que vou remover um elemento do cart no caso o i somente 1 item
                    }

                    updateCart();
            });

            carItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
                    cart[i].qt++;
                    updateCart();
            });

           c('.cart').append(carItem);
               
        }

        desconto = subTotal*0.1;
        total = subTotal-desconto;

        c('.subtotal span:last-child').innerHTML = `R$: ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$: ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$: ${total.toFixed(2)}`;
    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}






//Mapear todos os itens preencher e mandar para tela

//Para clonar um item, você usa o cloneNode

//append: adiciona mais um intem

//toFixed: Mostrar o número de casas decimais após a vírgula

//addEventListener: Adiciona um evento 

//preventDefault(): Essa função bloquea a ação padrão 

//setAttribute: Serve para setar um atributo

//closest: serve para buscar o elemento mais próximo

//getAtributte: serve para pegar um atributo

//Quando se seleciona via cs, então vira um node list, ou seja, um array

//ParsetInt transforma em número inteiro

//findIndex: pesquisa um elemento que agente deseja procurar, então você pode colocar um item e pesquisar para ver se existe
//find: Retorna o valor dos itens específicos que agente quer, ele acha e retorna todos os itens dele

// append:Pega um item específico e você pode fazer o que quiser com ele

//splice(i,1); remove item do array essa função precisa do index e da quantidade de elementos que vai remover

//last-child Pega o ultimo item



/*

 console.log('pizza selecionada'+modalKey);
        let size =  c('.pizzaInfo--sizes .selected').getAttribute('data-key');
        console.log(size);
        console.log('Qt'+modalQt);
 */