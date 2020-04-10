
var photos = Array.from(document.querySelectorAll('.galerry a'));

var photoswipeArray = photos.map(function(photo) {

  var size = photo.attributes["data-size"].value.split('x');

  return {
    src: photo.attributes["href"].value,
    w: parseInt(size[0]),
    h: parseInt(size[1])
  };
});

var pswpElement = document.querySelectorAll('.pswp')[0];

function showPhoto(element) {
  
  var options = {
    index: parseInt(element.attributes["data-index"].value),
    history: false
  };

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photoswipeArray, options);
  gallery.init();
}
