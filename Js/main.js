var productNameInput =document.getElementById("name")
var productPriceInput =document.getElementById("price")
var productCatInput =document.getElementById("category")
var productDescInput =document.getElementById("desc")
var products =[];
if(localStorage.getItem('Products') !=null)
{
    products= JSON.parse(localStorage.getItem('Products'));
    display();
}
function addProduct()
{
    if(validations()==true)
    {
        var product={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCatInput.value,
            desc:productDescInput.value,
        }
        products.push(product);
        localStorage.setItem('Products',JSON.stringify(products));
        display();
        clear();
    }
    else{
        alert("Wrong Inputs");
    }
    
}
function clear()
{
    productNameInput.value="";
    productPriceInput.value="";
    productCatInput.value="";
    productDescInput.value="";
}
function display()
{
    var container=``;
    for(var i=0;i<products.length;i++)
    {
        container+=`<tr>
          <td>${i+1}</td>
          <td>${products[i].name}</td>
          <td>${products[i].price}</td>
          <td>${products[i].category}</td>
          <td>${products[i].desc}</td>
          <td><button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal" onclick="updateProduct(${i})">update</button></td>
          <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
        </tr>`
    }
    document.getElementById("tableBody").innerHTML=container;
}

function deleteProduct(index)
{
   products.splice(index,1);
   localStorage.setItem('Products',JSON.stringify(products));
   display();
}
var currentIndex=0;
function updateProduct(index)
{
    productNameInput.value=products[index].name;
    productPriceInput.value=products[index].price;
    productCatInput.value=products[index].category;
    productDescInput.value=products[index].desc;
    document.getElementById("add").style.display="none";
    document.getElementById("save").style.display="block";
    currentIndex=index;
}
function save()
{
    if(validations()==true)
    {
        var product={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCatInput.value,
            desc:productDescInput.value,
           }
           products[currentIndex]=product;
           localStorage.setItem('Products',JSON.stringify(products));
           display();
           clear();
    }
    else{
        alert("Wrong Inputs");
    }
}
function hide()
{
    document.getElementById("save").style.display="none";
    document.getElementById("add").style.display="block";
}

function searchProduct(term)
{
    var container=``;
    for(var i=0;i<products.length;i++)
    {
        if(products[i].name.toLowerCase().includes(term.toLowerCase()) == true)
        {
            container+=`<tr>
            <td>${i+1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal" onclick="updateProduct(${i})">update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">delete</button></td>
          </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=container;
}

function validations()
{
    var nameRegex =/^[A-Z][a-z]{1,50}$/
    var priceRegex =/^[1-9][0-9]/
    var catRegex =/^[A-Z][a-z]{1,50}$/
    var descRegex =/^[A-Z]/
    if(nameRegex.test(productNameInput.value)==true && priceRegex.test(productPriceInput.value)==true && catRegex.test(productCatInput.value)==true && descRegex.test(productDescInput.value)==true)
       {
           return true;
       }
       else
       {
           return false;
       }
} 