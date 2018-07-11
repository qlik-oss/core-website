

## GeospatialFunctions

# GeoAggrGeometry - script and chart function

 **GeoAggrGeometry()** 
is used to aggregate a number of areas into a larger area, for example
aggregating a number of sub-regions to a
region.

 

GeoAggrGeometry(field_name)

string

 

| Argument    | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

Typically, GeoAggrGeometry() can be used to combine geospatial boundary
data. For example, you might have postcode areas for suburbs in a city
and sales revenues for each area. If a sales person’s territory covers
several postcode areas, it might be useful to present total sales by
sales territory, rather than individual areas, and show the results on a
color-filled map.

GeoAggrGeometry() can calculate the aggregation of the individual suburb
geometries and generate the merged territory geometry in the data model.
If then, the sales territory boundaries are adjusted, when the data is
reloaded the new merged boundaries and revenues are reflected in the
map.

As GeoAggrGeometry() is an aggregating function, if you use it in the
script a LOAD
statement with a
Group by
clause is required.



The boundary lines of maps created using GeoAggrGeometry() are those of
the merged areas. If you want to display the individual boundary lines
of the pre-aggregated areas, use GeoReduceGeometry().



Examples:

This example loads a KML file with area data, and then loads a table
with the aggregated area data.



[MapSource]: LOAD [world.Name], [world.Point], [world.Area] FROM
[lib://Downloads/world.kml] (kml, Table is [World.shp/Features]);
Map: LOAD world.Name, GeoAggrGeometry(world.Area) as [AggrArea]
resident MapSource Group By world.Name;





 





Drop Table MapSource;



*GeoReduceGeometry - script and chart function*

*Loading map
data*

# GeoBoundingBox - script and chart function

GeoBoundingBox()
is used to aggregate a geometry into an area and calculate the smallest
bounding box that contains all coordinates.

A GeoBoundingBox is represented as a list of four values: left, right,
top,
bottom.

 

GeoBoundingBox(field_name)

string

 

| Argument    | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

GeoBoundingBox() aggregates a set of geometries and returns four
coordinates for the smallest rectangle that contains all the coordinates
of that aggregated geometry.

To visualize the result on a map, transfer the resulting string of four
coordinates into a polygon format, tag the transferred field with a
geopolygon format, and drag and drop that field into the map object. The
rectangular boxes .will then be displayed in the map visualization.

Examples:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
<th>Setting 1</th>
<th>Setting 2</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Date( A )<br />
where A=35648</td>
<td>String:</td>
<td>97-08-06</td>
<td>8/6/97</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoCountVertex - script and chart function

GeoCountVertex()
is used to find the number of vertices a polygon geometry
contains.

 

GeoCountVertex(field_name)

integer

 

| Argument    | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

Examples:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
<th>Setting 1</th>
<th>Setting 2</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Date( A )<br />
where A=35648</td>
<td>String:</td>
<td>97-08-06</td>
<td>8/6/97</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoGetBoundingBox - script and chart function

GeoGetBoundingBox()
is used in scripts and chart expressions to calculate the smallest
geospatial bounding box that contains all coordinates of a geometry.

A geospatial bounding box, created by the function GeoBoundingBox() is
represented as a list of four values: left, right, top,
bottom.

 

GeoGetBoundingBox(field_name)

string

 

| Argument    | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |



Do not use the Group by clause in the data load editor with this and other
non-aggregating geospatial functions, because this will cause an error
on load.



Examples:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
<th>Setting 1</th>
<th>Setting 2</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Date( A )<br />
where A=35648</td>
<td>String:</td>
<td>97-08-06</td>
<td>8/6/97</td>
</tr>
</tbody>
</table>

*GeoBoundingBox - script and chart function*

*Loading map
data*

# GeoGetPolygonCenter - script and chart function

GeoGetPolygonCenter()
is used in scripts and chart expressions to calculate and return the
center point of a geometry.

In some cases, the requirement is to plot a dot instead of color fill on
a map. If the existing geospatial data is only available in the form of
area geometry (for example, a boundary), use
GeoGetPolygonCenter()
to retrieve a pair of longitude and latitude for the center of
area.

 

GeoGetPolygonCenter(field_name)

string

 

| Argument    | Description                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |



Do not use the Group by clause in the data load editor with this and other
non-aggregating geospatial functions, because this will cause an error
on load.



Examples:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
<th>Setting 1</th>
<th>Setting 2</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Date( A )<br />
where A=35648</td>
<td>String:</td>
<td>97-08-06</td>
<td>8/6/97</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoInvProjectGeometry - script and chart function

GeoInvProjectGeometry()
is used to aggregate a geometry into an area and apply the inverse of a
projection.

 

type, field_name)

string

 

| Argument    | Description                                                                                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the standard Mercator projection. |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.                                 |

Example:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>In a  GeoInvProjectGeometry('mercator',AreaPolygon) as InvProjectGeometry<br />
</td>
<td>The geometry loaded as AreaPolygon is transformed using the inverse transformation of the Mercator projection and stored as InvProjectGeometry for use in visualizations.</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoMakePoint - script and chart function

GeoMakePoint()
is used in scripts and chart expressions to create and tag a point with
latitude and longitude. GeoMakePoint returns points in the order of
longitude and
latitude.

 

lat_field_name, lon_field_name)

string, formatted [longitude,
latitude]

 

| Argument         | Description                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| lat_field_name | A field or expression referring to a field representing the latitude of the point.  |
| lon_field_name | A field or expression referring to a field representing the longitude of the point. |



Do not use the Group by clause in the data load editor with this and other
non-aggregating geospatial functions, because this will cause an error
on load.



Examples:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Results</th>
<th>Setting 1</th>
<th>Setting 2</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Date( A )<br />
where A=35648</td>
<td>String:</td>
<td>97-08-06</td>
<td>8/6/97</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoProject - script and chart function

GeoProject()
is used in scripts and chart expressions to apply a projection to a
geometry.

 

type, field_name)

string

 

| Argument    | Description                                                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the web Mercator projection. |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.                            |



Do not use the Group by clause in the data load editor with this and other
non-aggregating geospatial functions, because this will cause an error
on load.



Example:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>In a  GeoProject('mercator',Area) as GetProject<br />
</td>
<td>The Mercator projection is applied to the geometry loaded as Area, and the result is stored as GetProject.</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoProjectGeometry - script and chart function

GeoProjectGeometry()
is used to aggregate a geometry into an area and apply a
projection.

 

type, field_name)

string

 

| Argument    | Description                                                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the web Mercator projection. |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.                            |

Example:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>In a  GeoProjectGeometry('mercator',AreaPolygon) as ProjectGeometry<br />
</td>
<td>The geometry loaded as AreaPolygon is transformed using the Mercator projection and stored as ProjectGeometry for use in visualizations.</td>
</tr>
</tbody>
</table>

*Loading map
data*

# GeoReduceGeometry - script and chart function

GeoReduceGeometry()
is used to reduce the number of vertices of a geometry, and to aggregate
a number of areas into one area, but still displaying the boundary lines
from the individual
areas.

 

field_name[, value])

string

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>field_name</td>
<td>A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.</td>
</tr>
<tr class="even">
<td>value</td>
<td><p>The amount of reduction to apply to the geometry. The range is from 0 to 1, with 0 representing no reduction and 1 representing maximal reduction of vertices.</p>

Using a value of 0.9 or higher with a complex data set can reduce the number of vertices to a level where the visual representation is inaccurate.
</td>
</tr>
</tbody>
</table>

GeoReduceGeometry() also performs a similar function to,
GeoAggrGeometry() in that it aggregates a number of areas into one area.
The difference being that individual boundary lines from the
pre-aggregation data are displayed on the map if you use
GeoReduceGeometry().

As GeoReduceGeometry() is an aggregating function, if you use it in the
script a LOAD
statement with a
Group by
clause is required.

Examples:

This example loads a KML file with area data, and then loads a table
with the reduced and aggregated area data.



[MapSource]: LOAD [world.Name], [world.Point], [world.Area] FROM
[lib://Downloads/world.kml] (kml, Table is [World.shp/Features]);
Map: LOAD world.Name, GeoReduceGeometry(world.Area,0.5) as
[ReducedArea] resident MapSource Group By world.Name;





 





Drop Table MapSource;



*GeoAggrGeometry - script and chart function*

*Loading map
data*

# Geospatial functions

These functions are used to handle geospatial data in map
visualizations. Qlik Sense follows GeoJSON specifications for geospatial
data and supports the following:

  - Point
  - Linestring
  - Polygon
  - Multipolygon

For more information on GeoJSON specifications, see:

[GeoJSON.org](http://geojson.org/)

*Map
(Beta)*

## Geospatial functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the
functions.

### Parameters used in geospatial functions

<table>
<tbody>
<tr class="odd">
<td>Geometry</td>
<td><p>This can be any of the following:</p>
<ul>
<li>a point (latitude, longitude)</li>
<li>an area</li>
</ul>
<p>The reference should be to a field containing the geometry representation.</p></td>
</tr>
<tr class="even">
<td>Projection</td>
<td><p>With Mercator projection you can represent maps in square format, correcting for the distortion created by stretching.</p>
<p>This can be any of the following:</p>
<ul>
<li>'unit' (default) - projection is 1:1</li>
<li>'mercator'</li>
</ul></td>
</tr>
</tbody>
</table>

There are two categories of geospatial functions: aggregation and
non-aggregation.

Aggregation functions take a geometry set (points or areas) as input,
and return a single geometry. For example, multiple areas can be merged
together, and a single boundary for the aggregation can be drawn on the
map.

Non-aggregation function take a sinlge geometry and return one geometry.
For example, for the function GeoGetPolygonCenter(), if the boundary
geometry of one area is set as input, the point geometry (longitude and
latitude) for the center of that area is returned.

The following are aggregation
functions:

GeoAggrGeometry

 **GeoAggrGeometry()** 
is used to aggregate a number of areas into a larger area, for example
aggregating a number of sub-regions to a
region.

**GeoAggrGeometry2714650039**(field_name)

GeoBoundingBox

GeoBoundingBox()
is used to aggregate a geometry into an area and calculate the smallest
bounding box that contains all
coordinates.

**GeoBoundingBox3371306162**(field_name)

GeoCountVertex

GeoCountVertex()
is used to find the number of vertices a polygon geometry
contains.

**GeoCountVertex3437560741**(field_name)

GeoInvProjectGeometry

GeoInvProjectGeometry()
is used to aggregate a geometry into an area and apply the inverse of a
projection.

type, field_name)

GeoProjectGeometry

GeoProjectGeometry()
is used to aggregate a geometry into an area and apply a
projection.

type, field_name)

GeoReduceGeometry

GeoReduceGeometry()
is used to reduce the number of vertices of a geometry, and to aggregate
a number of areas into one area, but still displaying the boundary lines
from the individual
areas.

**GeoReduceGeometry241307270**(geometry)

  
The following are non-aggregation
functions:

GeoGetBoundingBox

GeoGetBoundingBox()
is used in scripts and chart expressions to calculate the smallest
geospatial bounding box that contains all coordinates of a geometry.

A GeoBoundingBox is represented as a list of four values, left, right,
top,
bottom.

**GeoGetBoundingBox3259272695**(geometry)

GeoGetPolygonCenter

GeoGetPolygonCenter()
is used in scripts and chart expressions to calculate and return the
center point of a
geometry.

**GeoGetPolygonCenter986526459**(geometry)

GeoMakePoint

GeoMakePoint()
is used in scripts and chart expressions to create and tag a point with
latitude and
longitude.

lat_field_name, lon_field_name)

GeoProject

GeoProject()
is used in scripts and chart expressions to apply a projection to a
geometry.

type, field_name)