#### Problem

We were given about 300 math exercises, divided by weekly lectures into several PDF's documents - each contain from about 10 to 30 exercises, separated with just small whitespace between them. PDFs are produced from LaTeX, but I do not have access to source files.

  


#### Plan

To utilize note taking, separate each exercise to its own A4-sized document.

Use semi-automated tools, which I'm comfortable using.

  


![](Math%20notes%20with%20Photoshop%20('s%20actions).resources/plan.jpg)  


  


#### Solution

1. Open PDF in Photoshop

2. Choose which page of document to open (Set Crop to: Media box)

3. Add white background and flatten layers (Required due to variable width of exercises)

4. Select exercise with marquee tool

5. Copy merged content to clipboard

6. Create new document with size of content in clipboard

7. Make new layer from background image (Required for proper alignment)

8. Enlarge Canvas size to A4

9. Align layer with exercise (top, center, add little top margin)

10. Make new layer for notes

11. Save document with filename corresponding to exercise number

  


Step 2 and steps 5-10 are very convenient for automating with <strong>Photoshop actions</strong>![](Math%20notes%20with%20Photoshop%20('s%20actions).resources/steps.gif)

  


#### Note-taking

Now comes the fun part - solve the exercises :))

I would recommend using normal brush tool, ideally with (Wacom) tablet and pressure-sensitive pen.

Preset some color swatches, [category10 swatches](https://github.com/mbostock/d3/wiki/Ordinal-Scales) from D3 javascript library work great!

  


<div style="font-family: Monaco, sans-serif"><b>

<font color="#1f77b4">#1f77b4</font>

<font color="#ff7f0e">#ff7f0e</font>

<font color="#2ca02c">#2ca02c</font>

<font color="#d62728">#d62728</font>

<font color="#9467bd">#9467bd</font>

<font color="#8c564b">#8c564b</font>

<font color="#e377c2">#e377c2</font>

<font color="#7f7f7f">#7f7f7f</font>

<font color="#bcbd22">#bcbd22</font>

<font color="#17becf">#17becf</font>

</b></div>
