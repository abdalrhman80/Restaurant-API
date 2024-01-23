var rowData = document.querySelector("#rowData");
var links = document.querySelectorAll(".navbar .nav-link");
var modalTitle = document.querySelector(".modal-title");
var modalBody = document.querySelector(".modal-body");
var recipeDesc = "";
var linkActive = "";

for (i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    var anchor = e.target;
    linkActive = document.querySelector(".navbar .nav-link.active");
    getData(anchor.innerText);
    linkActive.classList.remove("active");
    anchor.classList.add("active");
  });
}

getData();

async function getData(q = "pizza") {
  var req = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${q}`);
  var res = await req.json();

  drawData(res.recipes);

  recipeDesc = document.querySelectorAll(".recipeDesc");

  for (i = 0; i < recipeDesc.length; i++) {
    recipeDesc[i].addEventListener("click", function (e) {
      getRecipeInformation(e.target.getAttribute("recipe-info"));
    });
  }
}

function drawData(res) {
  var data = "";
  for (i = 0; i < res.length; i++) {
    data += `<div class="col-md-6 col-lg-3">
    <div class="recipe mt-5">
    <a data-bs-toggle="modal" data-bs-target="#modalId">
      <img recipe-info=${res[i].recipe_id} class="recipeDesc" src="${res[i].image_url}" alt="">
    </a>
        <h2 class="h5 text-center mt-1">${res[i].title}</h2>
    </div>
  </div>`;
  }
  rowData.innerHTML = data;
}

async function getRecipeInformation(q) {
  var res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${q}`);
  var req = await res.json();

  var body = "";
  for (i = 0; i < req.recipe.ingredients.length; i++) {
    body += `- ${req.recipe.ingredients[i]}. <br> `;
  }

  modalTitle.innerHTML = req.recipe.title;
  // modalBody.innerHTML = `- ${req.recipe.ingredients[0]} <br> - ${req.recipe.ingredients[1]}`;
  modalBody.innerHTML = body;
}
