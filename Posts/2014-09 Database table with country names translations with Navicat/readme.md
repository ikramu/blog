---
tags: quick-tip
---

Download CSV from <https://github.com/umpirsky/country-list>
```
country/cldr/«iso code of language»/country.csv
```

![](1.png)
![](2.png)
![](3.png)
![](4.png)

Omit CSV headers

```csv
iso,name
AF,Afghánistán
AX,Alandy
AL,Albánie
```

![](5.png)
![](6.png)
![](7.png)
![](8.png)
![](9.png)
![](10.png)

Easy to visually check for consistency, missing values, ...

![](final.png)

Then write script to export to JSON in format you app need, eg.:
```json
{
	"af": {
		"value": "Afghanistan",
		"translated": "Afghánistán",
		"phone": "93"
	},
	"ax": {
		"value": "Åland Islands",
		"translated": "Alandy",
		"phone": "358"
	},
	"al": {
		"value": "Albania",
		"translated": "Albánie",
		"phone": "355"
	},
```
