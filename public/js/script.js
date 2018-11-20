/* deleteEditBtn
/ removes the edit button when it is clicked */

const deleteEditBtn = (id) => {
	let btnID = "editBtn" + id;
	let ele = document.getElementById(btnID);
	ele.parentNode.removeChild(ele);
}

/* changeGenreForm(id)
/ Takes a genre row id, deletes the contents of that row, 
/ and adds a new form to edit the database */

function changeGenreForm(id) {
	deleteEditBtn(id);
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;
	console.log(tr);
	console.log(tds);
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

/* changeGenreForm(id)
/ Takes a genre row id, deletes the contents of that row, 
/ and adds a new form to edit the database */

function changeGenreForm(id) {
	deleteEditBtn(id);
	let trID = "tr" + id;
	let tr = document.getElementById(trID);
	let tds = tr.children;
	console.log(tr);
	console.log(tds);
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