let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// variable to know to position element that I would change
let indicator;
// mode variable to switch create to update
let mood = 'create';


// get total
function getTotel(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background='#03943a';
        
    }else{
        total.style.background='#bd1509';
    }
}


// create product
let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

// create new product and save data in localstorage
submit.onclick = function(){
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads   : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    };

    // console.log(newPro); 
   if(title.value != '' &&
       category.value != '' &&
        count.value <100

   ){
            if(mood === 'create'){
                if(newPro.count > 1){
                    for(let i = 0 ; i < newPro.count ; i++){
                        dataPro.push(newPro);
                    }
                }else{
                    dataPro.push(newPro);
                }
            }else{
                dataPro[indicator] = newPro;
                mood = 'create';
                submit.style.display = 'block';
            }
            clearData();
   }
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    //call clearData funcrion
    
    // call shdowdata function to read all record in table
    showData();
}


// clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value='';
}


// read
function showData(){
    getTotel();
    let table=``;
    for(let i=0;i<dataPro.length;i++){
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onClick="updateData(${i})" id="update">update</button></td>
                    <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onClick="DeleteAll()">delete All (${dataPro.length})</button>
        `;
    }else{
        btnDelete.innerHTML = ``;
    }
}
// call fo showdata function
showData();

// delete
function deleteData(i){
    // console.log(i);
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// delete all data
function DeleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData();
    clearData();
}

// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display ='none';
    getTotel();
    submit.innerHTML = 'Update';
    mood = 'update';
    indicator = i ;
    scroll({
        top:0,
        behavior:'smooth'
    });
    
}



// search
let searchMood = 'title';

function getSearchMood(id){
    let search =  document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By Title '+searchMood;
    // focus on search input
    search.focus();
    search.value='';
    showData();
}

// search data on keyup on search input
function searchData(value){
    let table='';
// console.log(value);
for(let i=0 ; i<dataPro.length ;i++){
        if(searchMood == 'title'){
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onClick="updateData(${i})" id="update">update</button></td>
                        <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;
            
        }


        }else{
            
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onClick="updateData(${i})" id="update">update</button></td>
                            <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                    `;
                
            }
            
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clean data