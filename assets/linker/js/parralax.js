var currentX = '';
var movementConstant = .015;
$(document).mousemove(function(e) {
  if(currentX == '') currentX = e.pageX;
  var xdiff = e.pageX - currentX;
  currentX = e.pageX;
  $('.parallax div').each(function(i, el) {
      var movement = (i + 1) * (xdiff * movementConstant);
      var newX = $(el).position().left + movement;
      $(el).css('left', newX + 'px');
  });
});
