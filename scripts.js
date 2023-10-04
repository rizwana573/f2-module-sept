import data from '/data.json' assert {type: 'json'};

//populating recipes from the JSON data into the page.
let fillData = (data) => {
    data.forEach(function (object) {
        let result = '';
        if (object.isLiked == true) {
            result = "liked";
        }
        else if (object.isLiked == false) {
            result = "notLiked";
        }
        let card = document.createElement('li');
        card.class = "recipeCard";
        let recipesList = document.getElementById('recipesList');
        card.innerHTML = '<div class="cardWrapper">' +
            '<img src=' + object.imageSrc + '>' +
            '<span class="category">' + object.type + '</span>' +
            '<div class="nameAndRating">' +
            '<span class="recipeName">' + object.name + '</span>' +
            '<span class="rating">' + '<span class="star">&#9733;</span>' + '<span class="ratingStars">' + object.rating + '</span>' +  '</span>' + '</div>' +
            '<div class="cookingTimeAndLikes">' +
            '<span class="cookingTime">' + object.time + '</span>' +
            '<span class=' + result + '>' + '<span class="likeHeart">&#9825;</span>' + '</span>' + '</div>' + '</div>';
        recipesList.appendChild(card);
    });
}
 // function for dynamic search of the recipes
function searchRecipes() {
    let search = document.getElementById("search");
    let recipeName = document.getElementsByClassName("recipeName");
    search.addEventListener('keyup', function () {
        let value = this.value.toLowerCase();
        

        for (let i = 0; i < recipeName.length; i++) {
            if (!recipeName[i].innerHTML.toLowerCase().includes(value)) {
                recipeName[i].closest("li").style.display = "none";
            }
            else {
                recipeName[i].closest("li").style.display = "list-item";
            }
        }
    });
}
// function to filter recipes based on their rating
function ratingFilter(){
    let rating = document.getElementsByClassName("ratingStars");
    let above4 = document.getElementById("above4");
    let below4 = document.getElementById("below4");

    above4.addEventListener('change', function(){
        if(above4.checked == true) {
           for(let i=0;i<rating.length;i++){
            if(parseInt(rating[i].innerHTML) >= 4){
                rating[i].closest("li").style.display="list-item";
            }
            else{
                rating[i].closest("li").style.display="none";  
            }
           }
        }
        else{
            for(let i=0;i<rating.length;i++){
                rating[i].closest("li").style.display="list-item";
            }  
        }
    });
   
    below4.addEventListener('change', function() {
        if(below4.checked == true) {
           for(let i=0;i<rating.length;i++){
            if(parseInt(rating[i].innerHTML) < 4){
                rating[i].closest("li").style.display="list-item";
            }
            else{
                rating[i].closest("li").style.display="none";  
            }
           }
        }
        else{
            for(let i=0;i<rating.length;i++){
                rating[i].closest("li").style.display="list-item";
            }  
        }
    });
}
// function to filter recipes based on their category
function filterCategory(){
    let showAll = document.getElementById("all");
    let vegOnly = document.getElementById("vegOnly");
    let nonVeg = document.getElementById("nonVeg");
    //let recipesList = document.getElementById("recipesList");

    showAll.addEventListener("click", function(){
        let allRecipes = document.getElementsByClassName("cardWrapper");
        //console.log("all ", allRecipes);
        for(let i=0;i<allRecipes.length;i++){
            allRecipes[i].closest("li").style.display="list-item";
        }
    });

    vegOnly.addEventListener("click", function(){
        let category = document.getElementsByClassName("category");
        for (let i = 0; i < category.length; i++) {
            if (!(category[i].innerHTML.toLowerCase() == "veg")) {
                category[i].closest("li").style.display = "none";
            }
            else {
                category[i].closest("li").style.display = "list-item";
            }
        }
    });

    nonVeg.addEventListener("click", function(){
        let category = document.getElementsByClassName("category");
        for (let i = 0; i < category.length; i++) {
            if (!(category[i].innerHTML.toLowerCase() == "non-veg")) {
                category[i].closest("li").style.display = "none";
            }
            else {
                category[i].closest("li").style.display = "list-item";
            }
        }
    });
}
//mobile menu functionality
function mobileMenu(){
    let ham = document.getElementsByClassName("hamburgerMenu");
    let slider = document.getElementsByClassName("menuAndProfile")[0];
    ham[0].addEventListener("click", function(){
        slider.style.display = slider.style.display == "block" ? "none" : "block";
    });
}
//like button functionality
function likeRecipe(){
  let like = document.getElementsByClassName("likeHeart");
  for(let i=0;i<like.length;i++){
    like[i].addEventListener("click", function(){
        like[i].classList.toggle("liked");
        if(like[i].classList.contains("liked")){
            like[i].innerHTML="❤"; 
        }
        else{
            like[i].innerHTML="♡";
        }
      });  
  }
//   let liked = document.getElementsByClassName("liked");
//   for(let i=0;i<liked.length;i++){
//     liked[i].innerHTML="❤";
//   }
  
}
document.addEventListener("DOMContentLoaded", (event) => {
    fillData(data);
    searchRecipes();
    filterCategory();
    ratingFilter();
    mobileMenu();
    likeRecipe();
});