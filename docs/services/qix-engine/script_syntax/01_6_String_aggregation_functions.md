# String aggregation functions

## Concat

 **Concat()** is used to combine string values. The script function returns the
aggregated string concatenation of all values of the expression iterated
over a number of records as defined by a group by clause.

`Concat( [ distinct ] string [, delimiter [, sort-weight]] )`

**Return data type:** string

The expression or field containing the string to be processed.

| Argument    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| string      | The expression or field containing the string to be processed.|
| delimiter   | Each value may be separated by the string found in delimiter.|
| sort-weight | The order of concatenation may be determined by the value of the dimension , if present, with the string corresponding to the lowest value appearing first in the concatenation. |
| distinct    | If the word **distinct occurs before the expression, all duplicates are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

Example

```qlik
TeamData:
LOAD \* inline [

SalesGroup|Team|Date|Amount

East|Gamma|01/05/2013|20000

East|Gamma|02/05/2013|20000

West|Zeta|01/06/2013|19000

East|Alpha|01/07/2013|25000

East|Delta|01/08/2013|14000

West|Epsilon|01/09/2013|17000

West|Eta|01/10/2013|14000

East|Beta|01/11/2013|20000

West|Theta|01/12/2013|23000

] (delimiter is '|');



Concat1:

LOAD SalesGroup,Concat(Team) as TeamConcat1 Resident TeamData Group By
SalesGroup;

SalesGroup

East

West

TeamConcat1

AlphaBetaDeltaGammaGamma

EpsilonEtaThetaZeta

Given that the TeamData table is loaded as in the previous example:

LOAD SalesGroup,Concat(distinct Team,'-') as TeamConcat2 Resident
TeamData Group By SalesGroup;

SalesGroup

East

West

TeamConcat2

Alpha-Beta-Delta-Gamma

Epsilon-Eta-Theta-Zeta

Given that the TeamData table is loaded as in the previous example:

LOAD SalesGroup,Concat(distinct Team,'-',Amount) as TeamConcat2 Resident
TeamData Group By SalesGroup;
```

Because the argument for
 **sort-weight** is added, the results are ordered by the value of the dimension
Amount.

SalesGroup

East

West

TeamConcat2

Delta-Beta-Gamma-Alpha

Eta-Epsilon-Zeta-Theta

## FirstValue

 **FirstValue()** returns the value that was loaded first from the records defined by the
expression, sorted by a group by clause.

This function is only available as a script function.

`FirstValue( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>FirstValue1:</p>
<p>LOAD SalesGroup,FirstValue(Team) as FirstTeamLoaded Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>FirstTeamLoaded</p>
<p>Gamma</p>
<p>Zeta</p></td>
</tr>
</tbody>
</table>

## LastValue

 **LastValue()** returns the value that was loaded last from the records defined by the
expression, sorted by a group by clause.

This function is only available as a script function.

`LastValue( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in our app to see the
result.

To get the same look as in the result column below, in the properties
panel, under Sorting, switch from Auto to Custom, then deselect
numerical and alphabetical sorting.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>LastValue1:</p>
<p>LOAD SalesGroup,LastValue(Team) as LastTeamLoaded Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>LastTeamLoaded</p>
<p>Beta</p>
<p>Theta</p></td>
</tr>
</tbody>
</table>

## MaxString

**MaxString()** finds string values in the expression and returns the last text value
sorted over a number of records, as defined by a group by clause.

`MaxString( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Concat1:</p>
<p>LOAD SalesGroup,MaxString(Team) as MaxString1 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MaxString1</p>
<p>Gamma</p>
<p>Zeta</p></td>
</tr>
<tr class="even">
<td><p>Given that the TeamData table is loaded as in the previous example, and your data load script
has the SET statement:<br />
<code data-conditions="Targets.NotToTranslate" data-autonumposition="none">SET DateFormat='DD/MM/YYYY';</code>':</p>
<p>LOAD SalesGroup,MaxString(Date) as MaxString2 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MaxString2</p>
<p>01/11/2013</p>
<p>01/12/2013</p></td>
</tr>
</tbody>
</table>

## MinString

**MaxString()** finds string values in the expression and returns the first text value
sorted over a number of records, as defined by a group by clause.

`MinString( expr )`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>TeamData:</p>
<p>LOAD * inline [</p>
<p>SalesGroup|Team|Date|Amount</p>
<p>East|Gamma|01/05/2013|20000</p>
<p>East|Gamma|02/05/2013|20000</p>
<p>West|Zeta|01/06/2013|19000</p>
<p>East|Alpha|01/07/2013|25000</p>
<p>East|Delta|01/08/2013|14000</p>
<p>West|Epsilon|01/09/2013|17000</p>
<p>West|Eta|01/10/2013|14000</p>
<p>East|Beta|01/11/2013|20000</p>
<p>West|Theta|01/12/2013|23000</p>
<p>] (delimiter is '|');</p>
<p> </p>
<p>Concat1:</p>
<p>LOAD SalesGroup,MinString(Team) as MinString1 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MinString1</p>
<p>Alpha</p>
<p>Epsilon</p></td>
</tr>
<tr class="even">
<td><p>Given that the TeamData table is loaded as in the previous example, and your data load script has
the SET statement:<br />
<code data-conditions="Targets.NotToTranslate" data-autonumposition="none">SET DateFormat='DD/MM/YYYY';</code>':</p>
<p>LOAD SalesGroup,MinString(Date) as MinString2 Resident TeamData Group By SalesGroup;</p></td>
<td><p>SalesGroup</p>
<p>East</p>
<p>West</p></td>
<td><p>MinString2</p>
<p>01/05/2013</p>
<p>01062/2013</p></td>
</tr>
</tbody>
</table>
