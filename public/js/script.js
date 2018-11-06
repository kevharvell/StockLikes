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