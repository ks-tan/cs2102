function openProject(id) {
  var uri = URI('/projects/'+id);
  window.location = uri;
}

function openCategory(category) {
  var uri = URI('/projects').search({categories: category});
  window.location = uri;
}
