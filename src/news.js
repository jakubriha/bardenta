function processNews(news) {

  var html = news
    .map(newsItemToHtml)
    .join("");



  document.getElementsByClassName("updates")[0].innerHTML = html;
}

function newsItemToHtml(newsItem) {

  var dateAsString = new Date(newsItem.published).toLocaleDateString("cs-CZ", { weekday: 'long', year: 'numeric', month: 'long', day: "numeric" });
  


  var replacedLinks = newsItem.content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>");

  var replacedBoldText = replacedLinks.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

  return "<div>" + dateAsString + "</div><div>" + replacedBoldText + "</div>";
}

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://bardenta-news.s3.us-east-1.amazonaws.com/news.json');
xhr.responseType = 'json';

xhr.onload = function(e) {
  if (this.status == 200) {
    processNews(this.response.news)
  }
};

xhr.send();




