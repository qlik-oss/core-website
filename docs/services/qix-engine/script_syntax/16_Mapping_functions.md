


## MappingFunctions

# ApplyMap - script function

The ApplyMap
script function is used for mapping the output of an expression to a
previously loaded mapping table.

 

ApplyMap('map_name', expression [ , default_mapping ] )

dual

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>map_name</td>
<td><p>The name of a mapping table that has previously been created through the  **mapping load or the **mapping select**  statement. Its name must be enclosed by single, straight quotation marks.</p>
<div class="warning" data-autonumposition="none">
If you use this function in a macro expanded variable and refer to a mapping table that does not exist, the function call fails and a field is not created.
</td>
</tr>
<tr class="even">
<td>expression</td>
<td>The expression, the result of which should be mapped.</td>
</tr>
<tr class="odd">
<td>default_mapping</td>
<td><p>If stated, this value will be used as a default value if the mapping table does not contain a matching value for expression. If not stated, the value of expression will be returned as is.</p></td>
</tr>
</tbody>
</table>

 

In this example we load a list of salespersons with a country code
representing their country of residence. We use a table mapping a
country code to a country to replace the country code with the country
name. Only three countries are defined in the mapping table, other
country codes are mapped to 'Rest of the
world'.



// Load mapping table of country codes: map1: mapping LOAD \* Inline [
CCode, Country Sw, Sweden Dk, Denmark No, Norway ] ; // Load list of
salesmen, mapping country code to country // If the country code is not
in the mapping table, put Rest of the world Salespersons: LOAD \*,
ApplyMap('map1', CCode,'Rest of the world') As Country Inline [ CCode,
Salesperson Sw, John Sw,
Mary





Sw, Per Dk, Preben Dk, Olle No, Ole Sf, Risttu] ; // We don't need the
CCode anymore Drop Field 'CCode';



The resulting table looks like this:

| Salesperson | Country           |
| ----------- | ----------------- |
| John        | Sweden            |
| Mary        | Sweden            |
| Per         | Sweden            |
| Preben      | Denmark           |
| Olle        | Denmark           |
| Ole         | Norway            |
| Risttu      | Rest of the world |

 

[*Mapping*](#Mapping)

*Using quotation marks in the
script*

# Mapping functions

This section describes functions for handling mapping tables. A mapping
table can be used to replace field values or field names during script
execution.

Mapping functions can only be used in the data load
script.

## Mapping functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

ApplyMap

The ApplyMap
script function is used for mapping the output of an expression to a
previously loaded mapping table.

**ApplyMap1872797088**('mapname', expr [ , defaultexpr ] )

MapSubstring

The
MapSubstring
script function is used to map parts of any expression to a previously
loaded mapping table. The mapping is case sensitive and non-iterative,
and substrings are mapped from left to right.

**MapSubstring346802087**('mapname',
expr)

# MapSubstring - script function

The
MapSubstring
script function is used to map parts of any expression to a previously
loaded mapping table. The mapping is case sensitive and non-iterative,
and substrings are mapped from left to right.

 

MapSubstring('map_name', expression)

 

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
<td>map_name</td>
<td><p>The name of a mapping table previously read by a  **mapping load or a **mapping select**  statement. The name must be enclosed by single straight quotation marks.</p>
<div class="warning" data-autonumposition="none">
If you use this function in a macro expanded variable and refer to a mapping table that does not exist, the function call fails and a field is not created.
</td>
</tr>
<tr class="even">
<td>expression</td>
<td>The expression whose result is to be mapped by substrings.</td>
</tr>
</tbody>
</table>

 

In this example we load a list of product models. Each model has a set
of attributes that are described by a composite code. Using the mapping
table with MapSubstring, we can expand the attribute codes to a
description.



map2: mapping LOAD \* Inline [ AttCode, Attribute R, Red Y, Yellow B,
Blue C, Cotton P, Polyester S, Small M, Medium L, Large ] ;
Productmodels: LOAD \*, MapSubString('map2', AttCode) as Description
Inline [ Model, AttCode Twixie, R C S Boomer, B P L Raven, Y P M
Seedling, R C L SeedlingPlus, R C L with hood Younger, B C with patch
MultiStripe, R Y B C S/M/L ] ; // We don't need the AttCode anymore
Drop Field 'AttCode';



 

The resulting table looks like this:

| Model        | Description                               |
| ------------ | ----------------------------------------- |
| Twixie       | Red Cotton Small                          |
| Boomer       | Blue Polyester Large                      |
| Raven        | Yellow Polyester Medium                   |
| Seedling     | Red Cotton Large                          |
| SeedlingPlus | Red Cotton Large with hood                |
| Younger      | Blue Cotton with patch                    |
| MultiStripe  | Red Yellow Blue Cotton Small/Medium/Large |

 

[*Mapping*](#Mapping)

*Using quotation marks in the
script*