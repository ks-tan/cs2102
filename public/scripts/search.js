$(document).ready(function() {
  $.get('/categories', function(data) {
    $('#searchCategories').empty();
    elem = $('#searchCategories');
    console.log(data);
    for(var i=0; i<data.length; i++) {
      elem.append(
        '<div class="col-lg-3">' +
          '<div class="search-category-item" category="'+data[i].name+'" onclick="selectCategory(\''+data[i].name+'\')">' +
            data[i].name +
          '</div>' +
        '</div>'
      );
    };
  });
});

var selectedCategories = [];
function searchProject() {
  var form = {};
  form.title = $("#titleInput").val();
  form.categories = selectedCategories;
  var uri = URI().search(form);
  window.location = uri;
  //
}

function selectCategory(category) {
  var idx = selectedCategories.indexOf(category);
  if(idx>-1) {
    selectedCategories.splice(idx, 1);
    $('.search-category-item[category="'+category+'"]').removeClass('active');
  } else {
    selectedCategories.push(category);
    $('.search-category-item[category="'+category+'"]').addClass('active');
  }

}
