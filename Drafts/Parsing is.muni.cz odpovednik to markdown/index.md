```
var output = "";
var parsed = 0;
var added = 0;

$('table[width=100%]').find('tbody tr td:last').each(function() {
     var $this = $(this);
     var q;
     var a = [];
     parsed++;

     $this.find('input').remove();

     var html = $this.html();
     q = html.substring( 0, (html.indexOf('<br>')) );

     $this.find('label').each(function() {
         a.push($(this).text());
     });
     a.sort();

     if (!localStorage.getItem(q)) {
          localStorage.setItem(q, JSON.stringify(a));
          output += ("#### " + q.trim() + "  \n" + a.join("  \n")) + "\n\n";
          added++;
     }

});

$('body').before("<pre>" + (output ? output : "No new data") + "</pre>");
console.log("Added: " + added + " Parsed: " + parsed);
``` 