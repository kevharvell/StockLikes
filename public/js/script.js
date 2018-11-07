function changeGenreForm(id) {
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
	.then(response => {
		if(!response.ok) { 
			alert("Cannot delete because one or more games depend on this genre");
		}
	})
	// Refresh browser
	location.reload();
}