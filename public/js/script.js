function deleteTwitter(id) {
	// Send Delete request to database with proper id
	fetch('/twitters/delete/' + id, {
		method: "DELETE"
	})
	// Refresh browser
	location.reload();
}