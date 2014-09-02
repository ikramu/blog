
```
$("#words > tbody > tr > td > a[href*='en-cz']:not('.enhanced')").each (i) ->
    word = $(this).text()
    link = $(this).attr('href')
    wrapper = $("<td colspan='99' style='padding: 10px; border: 1px solid #CCC' />").wrap("<tr class='wrapper' />").insertAfter $(@).closest("tr")
    $(this).addClass('enhanced')
    wrapper.load("#{link} #results")

    console.log "• Searching for: " + word
```


Bookmarklet
```
javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="http://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"1.9.0",function($,L){$("#words > tbody > tr > td > a[href*='en-cz']:not('.enhanced')").each(function(i) {  var link, word, wrapper;  word = $(this).text();  link = $(this).attr('href');  wrapper = $("<td colspan='99' style='padding: 10px; border: 1px solid #CCC' />").wrap("<tr class='wrapper' />").insertAfter($(this).closest("tr"));  $(this).addClass('enhanced');  wrapper.load("" + link + " #fastMeanings");  return console.log("%E2%80%A2 Searching for: " + word);});});
```