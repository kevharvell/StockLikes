
/* Change navbar links to active when clicked */
$(document).ready(function() {
  $('li.active').removeClass('active');
  $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
});

/* deleteEditBtn
/ removes the edit button when it is clicked */
const deleteEditBtn = (id) => {
	let btnID = "editBtn" + id;
	let ele = document.getElementById(btnID);
	ele.parentNode.removeChild(ele);
}

const hideUpdate = () => {
	$("#update").addClass("hidden");
}

const convertDate = (str) => {
	var date = new Date(str),
      month = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
  return [ date.getFullYear(), month, day ].join("-");
}

/* updateGenreForm(id)
/ Takes a genre row id, deletes the contents of that row, 
/ and adds a new form to edit the database */
function updateGenreForm(id) {
	deleteEditBtn(id);
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;
	let value1 = tds[0].innerHTML;

	// create a form
	let f = document.createElement("form");
	f.setAttribute('action', '/genres/' + id);
	f.setAttribute('method', 'post');

	// create text input for genre category
	let textCat = document.createElement("input");
	textCat.type = "text";
	textCat.name = "category";
	textCat.value = value1;
	textCat.classList.add("mr-2");

	// create a submit button
	let submitBtn = document.createElement("input");
	submitBtn.type = "submit";
	submitBtn.classList.add("btn", "btn-info");
	submitBtn.value = "Submit Edits";

	// add all elements to the form
	f.appendChild(textCat);
	f.appendChild(submitBtn);

	// add form to table row
	tds[0].innerHTML = "";
	tds[0].appendChild(f);
}

/* updateGameForm(id)
/ Takes desired game row, and populates data to an update form
/ that appears at the beginning of this function */
function updateGameForm(id) {
	// show update form
	$("#update").removeClass("hidden");

	// variables for grabbing data from table
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;

	// grab data from table to populate into update form
	let comp = tds[0].innerHTML;
	let game = tds[1].innerHTML;
	let genre = tds[2].innerHTML;
	let date = convertDate(tds[3].innerHTML);
	let rating = tds[4].innerHTML;

	// populate update form with data from data row
	$("#companyUpdate option:contains(" + comp + ")").prop("selected", "selected");
	$("#gameUpdate").prop("value", game);
	$("#genreUpdate option:contains(" + genre + ")").prop("selected", "selected");
	$("#dateUpdate").prop("value", date);
	$("#ratingUpdate").prop("value", rating);

	let oldGenre = $("#genreUpdate").val();
	$("#oldGenre").val(oldGenre);

	// make form action route to the right data row
	$("#updateGame").prop("action", "/games/" + id);
}


/* updateTwitterForm(id)
/ Takes desired twitter row, and populates data to an update form
/ that appears at the beginning of this function */
function updateTwitterForm(id) {
	// show update form
	$("#update").removeClass("hidden");

	// variables for grabbing data from table
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;

	// grab data from table to populate into update form
	let comp = tds[0].innerHTML;
	let url = tds[1].innerText;
	let date = convertDate(tds[2].innerHTML);

	// populate update form with data from data row
	$("#companyUpdate option:contains(" + comp + ")").prop("selected", "selected");
	$("#urlUpdate").prop("value", url);
	$("#dateUpdate").prop("value", date);

	// make form action route to the right data row
	$("#updateTwitter").prop("action", "/twitters/" + id);
}


/* updateStockForm(id)
/ Takes desired stock row, and populates data to an update form
/ that appears at the beginning of this function */
function updateStockForm(id) {
	// show update form
	$("#update").removeClass("hidden");

	// variables for grabbing data from table
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;

	// grab data from table to populate into update form
	let comp = tds[0].innerHTML;
	let ticker = tds[1].innerHTML;
	let date = convertDate(tds[2].innerHTML);
	let price = tds[3].innerHTML.slice(1);

	// populate update form with data from data row
	$("#companyUpdate option:contains(" + comp + ")").prop("selected", "selected");
	$("#tickerUpdate").prop("value", ticker);
	$("#dateUpdate").prop("value", date);
	$("#priceUpdate").prop("value", price);

	// make form action route to the right data row
	$("#updateStock").prop("action", "/stocks/" + id);
}


/* updateCompanyForm(id)
/ Takes desired twitter row, and populates data to an update form
/ that appears at the beginning of this function */
function updateCompanyForm(id) {
	// show update form
	$("#update").removeClass("hidden");

	// variables for grabbing data from table
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;

	// grab data from table to populate into update form
	let comp = tds[0].innerHTML;

	// populate update form with data from data row
	$("#companyUpdate").prop("value", comp);

	// make form action route to the right data row
	$("#updateCompany").prop("action", "/gaming-companies/" + id);
}


/* The following delete functions send a request to the server
/ to delete the entry from the database */
function deleteCompany(id) {
	// Send Delete request to database with proper id
	fetch('/gaming-companies/delete/' + id, {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}

function deleteStock(id) {
	// Send Delete request to database with proper id
	fetch('/stocks/delete/' + id, {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}

function deleteTwitter(id) {
	// Send Delete request to database with proper id
	fetch('/twitters/delete/' + id, {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}

function deleteGame(id) {
	// Send Delete request to database with proper id
	fetch('/games/delete/' + id,  {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}

function deleteGenre(id) {
	// Send Delete request to database with proper id
	fetch('/genres/delete/' + id, {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}