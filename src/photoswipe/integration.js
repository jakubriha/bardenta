
var photos = Array.from(document.querySelectorAll('.gallery a'));

var photoswipeArray = [
  {
    src: "gallery/01.jpg",
    w: 2048,
    h: 1536
  },
  {
    src: "gallery/02.jpg",
    w: 1536,
    h: 2048
  },
  {
    src: "gallery/03.jpg",
    w: 960,
    h: 720
  }
];

var pswpElement = document.querySelectorAll('.pswp')[0];

function showPhoto(element) {
  
  var options = {
    index: parseInt(element.attributes["data-index"].value),
    history: false
  };

  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, photoswipeArray, options);
  gallery.init();
}
