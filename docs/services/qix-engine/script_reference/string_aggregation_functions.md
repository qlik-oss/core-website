# String aggregation functions

## Concat

**Concat()** is used to combine string values. The script function returns the aggregated string concatenation of all
values of the expression iterated over a number of records as defined by a group by clause.

`Concat([ distinct ] string [, delimiter [, sort-weight]])`

**Return data type:** string

The expression or field containing the string to be processed.

| Argument    | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| string      | The expression or field containing the string to be processed.|
| delimiter   | Each value may be separated by the string found in delimiter.|
| sort-weight | The order of concatenation may be determined by the value of the dimension , if present, with the string corresponding to the lowest value appearing first in the concatenation. |
| distinct    | If the word **distinct** occurs before the expression, all duplicates are disregarded.|

<table>
<thead>
<tr><th>Example</th><th colspan='2'>Result</th></tr>
</thead>
<tbody>
<tr>
    <td>
    <code>
        TeamData:<br>
        LOAD \* inline [<br>
        SalesGroup|Team|Date|Amount<br>
        East|Gamma|01/05/2013|20000<br>
        East|Gamma|02/05/2013|20000<br>
        West|Zeta|01/06/2013|19000<br>
        East|Alpha|01/07/2013|25000<br>
        East|Delta|01/08/2013|14000<br>
        West|Epsilon|01/09/2013|17000<br>
        West|Eta|01/10/2013|14000<br>
        East|Beta|01/11/2013|20000<br>
        West|Theta|01/12/2013|23000<br>
        ] (delimiter is '|');<br>
        <br>
        Concat1:
        LOAD SalesGroup,Concat(Team) as TeamConcat1<br>
        Resident TeamData Group By SalesGroup;
    </code>
    </td>
    <td>
        SalesGroup<br>
        East<br>
        West
    </td>
    <td>
        TeamConcat1<br>
        AlphaBetaDeltaGammaGamma<br>
        EpsilonEtaThetaZeta
    </td>
</tr>
    <tr>
    <td>
        Given that the <b>TeamData</b> table is loaded as in the previous example:
        <code>
        LOAD SalesGroup,<br>Concat(distinct Team,'-') as TeamConcat2<br>
        Resident TeamData Group By SalesGroup;
        </code>
    </td>
    <td>
        SalesGroup<br>
        East<br>
        West
    </td>
    <td>
        TeamConcat2<br>
        Alpha-Beta-Delta-Gamma<br>
        Epsilon-Eta-Theta-Zeta
    </td>
<tr>
    <td rowspan='2'>
        Given that the TeamData table is loaded as in the previous example:
        <code>LOAD SalesGroup,Concat(distinct Team,'-',Amount) as TeamConcat2<br>
        Resident TeamData Group By SalesGroup;</code>
    </td>
    <td colspan='2'>
        Because the argument for <b>sort-weight</b> is added, the results are ordered by the value of the dimension
        Amount.
    </td>
</tr>
<tr>
    <td>
        SalesGroup<br>
        East<br>
        West
    </td>
    <td>
        TeamConcat2<br>
        Delta-Beta-Gamma-Alpha<br>
        Eta-Epsilon-Zeta-Theta<br>
    </td>
</tr>
</tbody>
</table>

## FirstValue

 **FirstValue()** returns the value that was loaded first from the records defined by the expression, sorted by a group
 by clause.

`FirstValue(expr)`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>
TeamData:<br>
LOAD * inline [<br>
SalesGroup|Team|Date|Amount<br>
East|Gamma|01/05/2013|20000<br>
East|Gamma|02/05/2013|20000<br>
West|Zeta|01/06/2013|19000<br>
East|Alpha|01/07/2013|25000<br>
East|Delta|01/08/2013|14000<br>
West|Epsilon|01/09/2013|17000<br>
West|Eta|01/10/2013|14000<br>
East|Beta|01/11/2013|20000<br>
West|Theta|01/12/2013|23000<br>
] (delimiter is '|');<br>
 <br>
FirstValue1:<br>
LOAD SalesGroup,FirstValue(Team) as FirstTeamLoaded Resident TeamData Group By SalesGroup;<br></td>
<td>SalesGroup<br>
East<br>
West<br></td>
<td>FirstTeamLoaded<br>
Gamma<br>
Zeta</code>
</td>
</tr>
</tbody>
</table>

## LastValue

 **LastValue()** returns the value that was loaded last from the records defined by the expression, sorted by a group by
 clause.

`LastValue(expr)`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TeamData:<br>
LOAD * inline [<br>
SalesGroup|Team|Date|Amount<br>
East|Gamma|01/05/2013|20000<br>
East|Gamma|02/05/2013|20000<br>
West|Zeta|01/06/2013|19000<br>
East|Alpha|01/07/2013|25000<br>
East|Delta|01/08/2013|14000<br>
West|Epsilon|01/09/2013|17000<br>
West|Eta|01/10/2013|14000<br>
East|Beta|01/11/2013|20000<br>
West|Theta|01/12/2013|23000<br>
] (delimiter is '|');<br>
 <br>
LastValue1:<br>
LOAD SalesGroup,LastValue(Team) as LastTeamLoaded Resident TeamData Group By SalesGroup;<br></td>
<td>SalesGroup<br>
East<br>
West<br></td>
<td>LastTeamLoaded<br>
Beta<br>
Theta</code></td>
</tr>
</tbody>
</table>

## MaxString

**MaxString()** finds string values in the expression and returns the last text value sorted over a number of records,
as defined by a group by clause.

`MaxString(expr)`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>TeamData:<br>
LOAD * inline [<br>
SalesGroup|Team|Date|Amount<br>
East|Gamma|01/05/2013|20000<br>
East|Gamma|02/05/2013|20000<br>
West|Zeta|01/06/2013|19000<br>
East|Alpha|01/07/2013|25000<br>
East|Delta|01/08/2013|14000<br>
West|Epsilon|01/09/2013|17000<br>
West|Eta|01/10/2013|14000<br>
East|Beta|01/11/2013|20000<br>
West|Theta|01/12/2013|23000<br>
] (delimiter is '|');<br>
 <br>
Concat1:<br>
LOAD SalesGroup,MaxString(Team) as MaxString1 Resident TeamData Group By SalesGroup;<br></td>
<td>SalesGroup<br>
East<br>
West<br></td>
<td>MaxString1<br>
Gamma<br>
Zeta
</code>
</td>
</tr>
<tr>
<td>Given that the TeamData table is loaded as in the previous example, and your data load script
has the SET statement:<br>
<code>SET DateFormat='DD/MM/YYYY';<br>
LOAD SalesGroup,MaxString(Date) as MaxString2<br>
Resident TeamData Group By SalesGroup;
</code></td>
<td>
SalesGroup</p>
East<br>
West<br></td>
<td>MaxString2<br>
01/11/2013<br>
01/12/2013</td>
</tr>
</tbody>
</table>

## MinString

**MaxString()** finds string values in the expression and returns the first text value sorted over a number of records,
as defined by a group by clause.

`MinString(expr)`

**Return data type:** dual

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| expr     | The expression or field containing the data to be measured. |

If no text value is found, NULL is returned.

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
<th> </th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TeamData:<br>
LOAD * inline [<br>
SalesGroup|Team|Date|Amount<br>
East|Gamma|01/05/2013|20000<br>
East|Gamma|02/05/2013|20000<br>
West|Zeta|01/06/2013|19000<br>
East|Alpha|01/07/2013|25000<br>
East|Delta|01/08/2013|14000<br>
West|Epsilon|01/09/2013|17000<br>
West|Eta|01/10/2013|14000<br>
East|Beta|01/11/2013|20000<br>
West|Theta|01/12/2013|23000<br>
] (delimiter is '|');<br>
 <br>
Concat1:<br>
LOAD SalesGroup,MinString(Team) as MinString1 Resident TeamData Group By SalesGroup;<br></td>
<td>SalesGroup<br>
East<br>
West<br></td>
<td>MinString1<br>
Alpha<br>
Epsilon</code></td>
</tr>
<tr>
<td>Given that the TeamData table is loaded as in the previous example, and your data load script has
the SET statement:<br />
<code>SET DateFormat='DD/MM/YYYY';<br>
LOAD SalesGroup,MinString(Date) as MinString2<br>
Resident TeamData Group By SalesGroup;
</td>
<td>SalesGroup<br>
East<br>
West<br></td>
<td>MinString2<br>
01/05/2013<br>
01062/2013<br></td>
</tr>
</tbody>
</table>
