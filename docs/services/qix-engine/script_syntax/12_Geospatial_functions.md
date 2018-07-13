# Geospatial functions

These functions are used to handle geospatial data in map visualizations. Qlik Sense follows GeoJSON specifications for geospatial data and supports the following:

* Point
* Linestring
* Polygon
* Multipolygon

For more information on GeoJSON specifications, see:

[GeoJSON.org](http://geojson.org/)

Aggregation functions take a geometry set (points or areas) as input, and return a single geometry. For example, multiple areas can be merged, and a single boundary for the aggregation can be drawn on the map.

Non-aggregation function take a sinlge geometry and return one geometry. For example, for the function GeoGetPolygonCenter(), if the boundary geometry of one area is set as input, the point geometry (longitude and latitude) for the center of that area is returned.

## GeoAggrGeometry

GeoAggrGeometry() is used to aggregate a number of areas into a larger area, for example
aggregating a number of sub-regions to a
region.

``GeoAggrGeometry(field_name)``

**Return data type:** string

| Argument    | Description |
| ----------- | ----------- |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

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
script a **LOAD** statement with a **Group By** clause is required.

!!! Note
    The boundary lines of maps created using GeoAggrGeometry() are those of
    the merged areas. If you want to display the individual boundary lines
    of the pre-aggregated areas, use GeoReduceGeometry().

Examples:

This example loads a KML file with area data, and then loads a table
with the aggregated area data.

```
[MapSource]:
LOAD [world.Name],
	[world.Point],
	[world.Area]
 FROM [lib://Downloads/world.kml]
(kml, Table is [World.shp/Features]);

Map:
LOAD world.Name, 
     GeoAggrGeometry(world.Area) as [AggrArea]
resident MapSource Group By world.Name;

Drop Table MapSource;
```

## GeoBoundingBox

GeoBoundingBox() is used to aggregate a geometry into an area and calculate the smallest
bounding box that contains all coordinates.

A GeoBoundingBox is represented as a list of four values: left, right,
top, bottom.

`GeoBoundingBox(field_name)`

**Return data type:** string

| Argument    | Description |
| ----------- | ----------- |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

GeoBoundingBox() aggregates a set of geometries and returns four
coordinates for the smallest rectangle that contains all the coordinates
of that aggregated geometry.

## GeoCountVertex

GeoCountVertex() is used to find the number of vertices a polygon geometry
contains.

`GeoCountVertex(field_name)`

**Return data type:** integer

| Argument    | Description |
| ----------- | ----------- |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

## GeoGetBoundingBox

GeoGetBoundingBox() is used in scripts and chart expressions to calculate the smallest
geospatial bounding box that contains all coordinates of a geometry.

A geospatial bounding box, created by the function GeoBoundingBox() is
represented as a list of four values: left, right, top, bottom.

`GeoGetBoundingBox(field_name)`

**Return data type:** string

| Argument    | Description 
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

## GeoGetPolygonCenter

GeoGetPolygonCenter() is used in scripts and chart expressions to calculate and return the
center point of a geometry.

In some cases, the requirement is to plot a dot instead of color fill on
a map. If the existing geospatial data is only available in the form of
area geometry (for example, a boundary), use
GeoGetPolygonCenter()
to retrieve a pair of longitude and latitude for the center of area.

`GeoGetPolygonCenter(field_name)`

GeoGetPolygonCenter() is used in scripts and chart expressions to calculate and return the center point of a geometry.

In some cases, the requirement is to plot a dot instead of color fill on a map. If the existing geospatial data is only available in the form of area geometry (for example, a boundary), use GeoGetPolygonCenter() to retrieve a pair of longitude and latitude for the center of area.

**Return data type:** string

| Argument    | Description |
| ----------- | ----------- |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area. |

## GeoInvProjectGeometry

GeoInvProjectGeometry() is used to aggregate a geometry into an area and apply the inverse of a
projection.

`GeoInvProjectGeometry( type, field_name )`

**Return data type:** string

| Argument    | Description|
| ----------- | ---------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the standard Mercator projection. |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.|

**Example**

| Example | Result |
| ------- | ------ |
| In a Load statement: `GeoInvProjectGeometry('mercator',AreaPolygon) as InvProjectGeometry ` |
The geometry loaded as AreaPolygon is transformed using the inverse transformation of the Mercator projection and stored as InvProjectGeometry for use in visualizations. |

## GeoMakePoint

GeoMakePoint() is used in scripts and chart expressions to create and tag a point with
latitude and longitude. GeoMakePoint returns points in the order of longitude and
latitude.

`GeoMakePoint(lat_field_name, lon_field_name)`

**Return data type:** string, formatted [longitude, latitude]

| Argument         | Description  |
| ---------------- | ------------ |
| lat_field_name | A field or expression referring to a field representing the latitude of the point.  |
| lon_field_name | A field or expression referring to a field representing the longitude of the point. |

## GeoProject

GeoProject() is used in scripts and chart expressions to apply a projection to a
geometry.

`GeoProject(type, field_name)`

**Return data type:** string

| Argument    | Description |
| ----------- | ----------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the web Mercator projection. |
| field_name  | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.|

| Example | Result |
| ------- | ------ |
| In a Load statement: `GeoProject('mercator',Area) as GetProject` | The Mercator projection is applied to the geometry loaded as Area, and the result is stored as GetProject |

## GeoProjectGeometry

GeoProjectGeometry() is used to aggregate a geometry into an area and apply a
projection.

`GeoProjectGeometry(type, field_name)`

**Return data type:** string

| Argument    | Description|
| ----------- | ---------- |
| type        | Projection type used in transforming the geometry of the map. This can take one of two values: 'unit', (default), which results in a 1:1 projection, or 'mercator', which uses the web Mercator projection. |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.|

| Example | Result |
| In a Load statement: `GeoProjectGeometry('mercator',AreaPolygon) as ProjectGeometry` | The geometry loaded as AreaPolygon is transformed using the Mercator projection and stored as ProjectGeometry for use in visualizations.|

## GeoReduceGeometry

GeoReduceGeometry() is used to reduce the number of vertices of a geometry, and to aggregate
a number of areas into one area, but still displaying the boundary lines
from the individual
areas.

`GeoReduceGeometry( field_name[, value] )`

**Return data type:** string

| Argument   | Description |
| ---------- | ----------- |
| field_name | A field or expression referring to a field containing the geometry to be represented. This could be either a point (or set of points) giving longitude and latitude, or an area.
| value	     | The amount of reduction to apply to the geometry. The range is from 0 to 1, with 0 representing no reduction and 1 representing maximal reduction of vertices.

!!! Note
    Using a value of 0.9 or higher with a complex data set can reduce the number of vertices to a level where the visual representation is inaccurate.

GeoReduceGeometry() also performs a similar function to, GeoAggrGeometry() in that 
it aggregates a number of areas into one area.
The difference being that individual boundary lines from the
pre-aggregation data are displayed on the map if you use
GeoReduceGeometry().

As GeoReduceGeometry() is an aggregating function, if you use it in the
script a **LOAD** statement with a **Group By** clause is required.

This example loads a KML file with area data, and then loads a table
with the reduced and aggregated area data.

```
[MapSource]:
LOAD [world.Name],
	[world.Point],
	[world.Area]
 FROM [lib://Downloads/world.kml]
(kml, Table is [World.shp/Features]);

Map:
LOAD world.Name, 
     GeoReduceGeometry(world.Area,0.5) as [ReducedArea]
resident MapSource Group By world.Name;

Drop Table MapSource;
```
