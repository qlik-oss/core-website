# Counter functions

Some counter functions do not have any parameters, but the trailing parentheses are however still required.

## autonumber

This script function returns a unique integer value for each distinct evaluated value of expression
encountered during the script execution. This function can be used e.g. for creating a compact memory representation
of a complex key.

!!! Note
    You can only connect **autonumber** keys that have been generated in the same data load, as the integer is
    generated according to the order the table is read. If you need to use keys that are persistent between data loads,
    independent of source data sorting, you should use the **hash128**, **hash160** or **hash256** functions.

`autonumber(expression[ , AutoID])`

| Argument | Description |
| -------- | ----------- |
| AutoID   | In order to create multiple counter instances if the  **autonumber** function is used on different keys within the script, the optional parameter *AutoID*  can be used for naming each counter. |

Example: Creating a composite key

In this example we create a composite key using the **autonumber** function to conserve memory. The example is brief
for demonstration purpose, but would be meaningful with a table containing a large number of rows.

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| North  | 2014 | May   | 245   |
| North  | 2014 | May   | 347   |
| North  | 2014 | June  | 127   |
| South  | 2014 | June  | 645   |
| South  | 2013 | May   | 367   |
| South  | 2013 | May   | 221   |

The source data is loaded using inline data. Then we add a preceding
load which creates a composite key from the Region, Year and Month
fields.

```qlik
RegionSales:
LOAD *,
AutoNumber(Region&Year&Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Sales
North, 2014, May, 245
North, 2014, May, 347
North, 2014, June, 127
South, 2014, June, 645
South, 2013, May, 367
South, 2013, May, 221
];
```

The resulting table looks like this:

| Region | Year | Month | Sales | RYMkey |
| ------ | ---- | ----- | ----- | ------ |
| North  | 2014 | May   | 245   | 1      |
| North  | 2014 | May   | 347   | 1      |
| North  | 2014 | June  | 127   | 2      |
| South  | 2014 | June  | 645   | 3      |
| South  | 2013 | May   | 367   | 4      |
| South  | 2013 | May   | 221   | 4      |

In this example you can refer to the RYMkey, for example 1, instead of
the string 'North2014May' if you need to link to another table.

Now we load a source table of costs in a similar way. The Region, Year and Month fields are excluded in the preceding
load to avoid creating a synthetic key, we are already creating a composite key with the **autonumber** function,
linking the tables.

```qlik
RegionCosts:
LOAD Costs, AutoNumber(Region&Year&Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Costs
South, 2013, May, 167
North, 2014, May, 56
North, 2014, June, 199
South, 2014, June, 64
South, 2013, May, 172
South, 2013, May, 126
];
```

Now we can create a table with Region, Year and Month fields, as well as Sum measures for the sales and the
costs. the table will look like this:

| Region | Year | Month | Sum([Sales]) | Sum([Costs]) |
| ------ | ---- | ----- | -------------- | -------------- |
| Totals |      |       | 1952           | 784            |
| North  | 2014 | June  | 127            | 199            |
| North  | 2014 | May   | 592            | 56             |
| South  | 2014 | June  | 645            | 64             |
| South  | 2013 | May   | 588            | 465            |

## autonumberhash128

This script function calculates a 128-bit hash of the combined input expression values and the returns a unique integer
value for each distinct hash value encountered during the script execution. This function can be used for example for
creating a compact memory representation of a complex key.

!!! Note
    You can only connect **autonumberhash128** keys that have been generated in the same data load, as the integer is
    generated according to the order the table is read. If you need to use keys that are persistent between data loads,
    independent of source data sorting, you should use the **hash1228**, **hash160** or **hash256** functions.

`autonumberhash128(expression {, expression})`

Example: Creating a composite key

In this example we create a composite key using the **autonumberhash128** function to conserve memory. The example is
brief for demonstration purpose, but would be meaningful with a table containing a large number of rows.

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| North  | 2014 | May   | 245   |
| North  | 2014 | May   | 347   |
| North  | 2014 | June  | 127   |
| South  | 2014 | June  | 645   |
| South  | 2013 | May   | 367   |
| South  | 2013 | May   | 221   |

The source data is loaded using inline data. Then we add a preceding
load which creates a composite key from the Region, Year and Month
fields.

```qlik
RegionSales:
LOAD *, AutoNumberHash128(Region, Year, Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Sales
North, 2014, May, 245
North, 2014, May, 347
North, 2014, June, 127
South, 2014, June, 645
South, 2013, May, 367
South, 2013, May, 221
];
```

The resulting table looks like this:

| Region | Year | Month | Sales | RYMkey |
| ------ | ---- | ----- | ----- | ------ |
| North  | 2014 | May   | 245   | 1      |
| North  | 2014 | May   | 347   | 1      |
| North  | 2014 | June  | 127   | 2      |
| South  | 2014 | June  | 645   | 3      |
| South  | 2013 | May   | 367   | 4      |
| South  | 2013 | May   | 221   | 4      |

In this example you can refer to the RYMkey, for example 1, instead of the string 'North2014May' if you need to link to
another table.

Now we load a source table of costs in a similar way. The Region, Year and Month fields are excluded in the preceding
load to avoid creating a synthetic key, we are already creating a composite key with the  **autonumberhash128**
function, linking the tables.

```qlik
RegionCosts:
LOAD Costs, AutoNumberHash128(Region, Year, Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Costs
South, 2013, May, 167
North, 2014, May, 56
North, 2014, June, 199
South, 2014, June, 64
South, 2013, May, 172
South, 2013, May, 126
];
```

Now we can create a table with Region, Year and Month fields, as well as Sum measures for the sales and the costs. The
table will look like this:

| Region | Year | Month | Sum([Sales]) | Sum([Costs]) |
| ------ | ---- | ----- | -------------- | -------------- |
| Totals |      |       | 1952           | 784            |
| North  | 2014 | June  | 127            | 199            |
| North  | 2014 | May   | 592            | 56             |
| South  | 2014 | June  | 645            | 64             |
| South  | 2013 | May   | 588            | 465            |

## autonumberhash256

This script function calculates a 256-bit hash of the combined input expression values and returns a unique integer
value for each distinct hash value encountered during the script execution. This function can be used e.g. for
creating a compact memory representation of a complex key.

!!! Note You can only connect **autonumberhash256** keys that have been generated in the same data load, as the
    integer is generated according to the order the table is read. If you need to use keys that are persistent between
    data loads, independent of source data sorting, you should use the **hash128**, **hash160** or **hash256**
    functions.

`autonumberhash256(expression {, expression})`

Example: Creating a composite key

In this example we create a composite key using the **autonumberhash256** function to conserve memory. The example is
brief for demonstration purpose, but would be meaningful with a table containing a large number of rows.

| Region | Year | Month | Sales |
| ------ | ---- | ----- | ----- |
| North  | 2014 | May   | 245   |
| North  | 2014 | May   | 347   |
| North  | 2014 | June  | 127   |
| South  | 2014 | June  | 645   |
| South  | 2013 | May   | 367   |
| South  | 2013 | May   | 221   |

The source data is loaded using inline data. Then we add a preceding load which creates a composite key from the
Region, Year and Month fields.

```qlik
RegionSales:
LOAD *, AutoNumberHash256(Region, Year, Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Sales
North, 2014, May, 245
North, 2014, May, 347
North, 2014, June, 127
South, 2014, June, 645
South, 2013, May, 367
South, 2013, May, 221
];
```

The resulting table looks like this:

| Region | Year | Month | Sales | RYMkey |
| ------ | ---- | ----- | ----- | ------ |
| North  | 2014 | May   | 245   | 1      |
| North  | 2014 | May   | 347   | 1      |
| North  | 2014 | June  | 127   | 2      |
| South  | 2014 | June  | 645   | 3      |
| South  | 2013 | May   | 367   | 4      |
| South  | 2013 | May   | 221   | 4      |

In this example you can refer to the RYMkey, for example 1, instead of the string 'North2014May' if you need to link to
another table.

Now we load a source table of costs in a similar way. The Region, Year and Month fields are excluded in the preceding
load to avoid creating a synthetic key, we are already creating a composite key with the **autonumberhash256**
function, linking the tables.

```qlik
RegionCosts:
LOAD Costs, AutoNumberHash256(Region, Year, Month) as RYMkey;

LOAD * INLINE
[ Region, Year, Month, Costs
South, 2013, May, 167
North, 2014, May, 56
North, 2014, June, 199
South, 2014, June, 64
South, 2013, May, 172
South, 2013, May, 126
];
```

Now we can create a table with Region, Year and Month fields, as well as Sum measures for the sales and the costs.
The table will look like this:

| Region | Year | Month | Sum([Sales]) | Sum([Costs]) |
| ------ | ---- | ----- | -------------- | -------------- |
| Totals |      |       | 1952           | 784            |
| North  | 2014 | June  | 127            | 199            |
| North  | 2014 | May   | 592            | 56             |
| South  | 2014 | June  | 645            | 64             |
| South  | 2013 | May   | 588            | 465            |

## IterNo

This script function returns an integer indicating for which time one single record is evaluated in a **LOAD**
statement with a **while** clause. The first iteration has number 1. The **IterNo** function is only meaningful if
used together with a **while** clause.

`IterNo( )`

<table>
<thead>
<tr>
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>LOAD<br>
   IterNo() as Day,<br>
   Date( StartDate + IterNo() - 1 ) as Date<br>
   While StartDate + IterNo() - 1 &lt;= EndDate;<br>
   LOAD * INLINE<br>
    [StartDate, EndDate<br>
    2014-01-22, 2014-01-26<br>
    ];
<td>This <b>LOAD</b> statement will generate one record per date within the range defined by <b>StartDate</b>
    and **EndDate** .</p>
<p>In this example, the resulting table will look like this:</p>
<table>
<thead>
<tr>
<th><p>Day</p></th>
<th>Date</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>2014-01-22</td>
</tr>
<tr>
<td>2</td>
<td>2014-01-23</td>
</tr>
<tr>
<td>3</td>
<td>2014-01-24</td>
</tr>
<tr>
<td>4</td>
<td>2014-01-25</td>
</tr>
<tr>
<td>5</td>
<td>2014-01-26</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## RecNo

This script functions returns an integer for the number of the currently read row of the current table. The first
record is number 1.

`RecNo( )`

In contrast to RowNo( ), which counts rows in the resulting Qlik Sense table, RecNo( ), counts the records in the raw
data table and is reset when a raw data table is concatenated to another.

Example: Data load script

Raw data table load:

```qlik
Tab1:
LOAD * INLINE
[A, B
1, aa
2,cc
3,ee
];

Tab2:
LOAD * INLINE
[C, D
5, xx
4, yy
6, zz
];
```

Loading record and row numbers for selected rows:

```qlik
QTab:
LOAD *,
RecNo( ),
RowNo( )
resident Tab1 where A\<\>2;

LOAD
C as A,
D as B,
RecNo( ),
RowNo( )
resident Tab2 where A\<\>5;

// We don't need the source tables anymore, so we drop them
Drop tables Tab1, Tab2;
```

The resulting Qlik internal table:

| A | B  | RecNo( ) | RowNo( ) |
| - | -- | -------- | -------- |
| 1 | aa | 1        | 1        |
| 3 | ee | 3        | 2        |
| 4 | yy | 2        | 3        |
| 6 | zz | 3        | 4        |

## RowNo

This function returns an integer for the position of the current row in the resulting Qlik Sense internal table. The
first row is number 1.

`RowNo([TOTAL])`

In contrast to **RecNo( )**, which counts the records in the raw data table, the **RowNo( )** function does not count
records that are excluded by **where** clauses and is not reset when a raw data table is concatenated to another.

!!! Note If you use preceding load, that is, a number of stacked **LOAD** statements reading from the same table,
    you can only use **RowNo( )** in the top **LOAD** statement. If you use **RowNo( )** in subsequent **LOAD**
    statements, 0 is returned.

Example: Data load script

Raw data table load:

```qlik
Tab1:
LOAD * INLINE
[A, B
1, aa
2,cc
3,ee
];

Tab2:
LOAD * INLINE
[C, D
5, xx
4,yy
6,zz
];
```

Loading record and row numbers for selected rows:

```qlik
QTab:
LOAD *,
RecNo( ),
RowNo( )
resident Tab1 where A<>2;

LOAD
C as A,
D as B,
RecNo( ),
RowNo( )
resident Tab2 where A<>5;

//We don't need the source tables anymore, so we drop them
Drop tables Tab1, Tab2;
```

The resulting Qlik internal table:

| A | B  | RecNo( ) | RowNo( ) |
| - | -- | -------- | -------- |
| 1 | aa | 1        | 1        |
| 3 | ee | 3        | 2        |
| 4 | yy | 2        | 3        |
| 6 | zz | 3        | 4        |
