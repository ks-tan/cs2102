$(document).ready(function() {
  $.get('/categories', function(data) {
    $('#searchCategories').empty();
    elem = $('#searchCategories');
    for(var i=0; i<data.length; i++) {
      elem.append(
        '<div class="col-lg-3">' +
          '<div class="search-category-item">' +
            data[i].name +
          '</div>' +
        '</div>'
      );
    };
  });
});
