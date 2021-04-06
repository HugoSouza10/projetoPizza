const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Função para agilizar nas seleções de elementos


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

        c('.pizzaBig img').src  = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--sector').innerHTML = pizzaJson[key].sizes;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        //Pegando tamanhos para colocar no modal
        cs('.pizzaInfo--size').forEach((size, sizeIndex) =>{
            size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];
        });
        
      
     
        c('.pizzaWindowArea').style.display = 'flex';
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
       
   }); 

   c('.pizza-area').append(pizzaItem);


});

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