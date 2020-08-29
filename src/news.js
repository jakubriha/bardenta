function processNews(news) {

  var html;

  if (news.length == 0) {
    html = "<div>" + (isInEnglish() ? "No news at the moment." : "Žádné aktuality nejsou k dispozici.") + "</div>";
  } else {
    html = news
      .map(parseDate)
      .filter(function (newsItem) { return newsItem.published < new Date() })
      .sort(function (a, b) { return b.published - a.published})
      .map(newsItemToHtml)
      .join("");
  }

  document.getElementsByClassName("news")[0].innerHTML = html;
}

function isInEnglish() {
  return window.location.href.indexOf("en.html") > -1;
}

function failNews() {
  var text = "<div>" + (isInEnglish() ? "Error occured. Please, try to refresh the page." : "Došlo k chybě. Prosím, zkuste obnovit stránku.") + "</div>";

  document.getElementsByClassName("news")[0].innerHTML = text;
}

function parseDate(newsItem) {
  if (newsItem.published) {
    newsItem.published = new Date(newsItem.published);
  }

  return newsItem;
}

function newsItemToHtml(newsItem) {

  var dateAsString = newsItem.published.toLocaleDateString(isInEnglish() ? "en-GB" : "cs-CZ", { weekday: 'long', year: 'numeric', month: 'long', day: "numeric" });

  var replacedLinks = newsItem.content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>");

  var replacedBoldText = replacedLinks.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

  return "<div><div>" + dateAsString + "</div><div>" + replacedBoldText + "</div></div>";
}

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://bardenta-news.s3.us-east-1.amazonaws.com/news.json');
xhr.responseType = 'json';

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      processNews(xhr.response.news)
    } else {
      failNews();
    }
  }
}; 

xhr.send();
