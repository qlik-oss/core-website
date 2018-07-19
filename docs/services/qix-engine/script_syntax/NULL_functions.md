# NULL functions

## IsNull

The IsNull function tests if the value of an expression is NULL and if
so, returns -1 (True), otherwise 0 (False).

`IsNull( expr )`

!!! Tip
    A string with length zero is not considered as a NULL and will cause
    IsNull to return False.

In this example, an inline table with four rows is loaded, where the
first three lines contain either nothing, - or 'NULL' in the Value
column. We convert these values to true NULL value representations with
the middle preceding **LOAD** using the **Null** function.

The first preceding **LOAD** adds a field checking if the value is NULL,using the
 **IsNull** function.

```qlik
NullsDetectedAndConverted:
LOAD *,
If(IsNull(ValueNullConv), 'T', 'F') as IsItNull;

LOAD *,
If(len(trim(Value))= 0 or Value='NULL' or Value='-', Null(), Value ) as ValueNullConv;

LOAD * Inline
[ID, Value
0,
1,NULL
2,-
3,Value];
```

This is the resulting table. In the ValueNullConv column, the NULL
values are represented by -.

| ID | Value | ValueNullConv | IsItNull |
| -- | ----- | ------------- | -------- |
| 0  |       | \-            | T        |
| 1  | NULL  | \-            | T        |
| 2  | \-    | \-            | T        |
| 3  | Value | Value         | F        |

## NULL

The **Null** function returns a NULL value.

`Null( )`

In this example, an inline table with four rows is loaded, where the
first three lines contain either nothing, - or 'NULL' in the Value
column. We want to convert these values to true NULL value
representations.

The middle preceding **LOAD** performs the conversion using the
 **Null** function.

The first preceding **LOAD** adds a field checking if the value is NULL, just for illustration
purposes in this
example.

```qlik
NullsDetectedAndConverted:
LOAD *,
If(IsNull(ValueNullConv), 'T', 'F') as IsItNull;

LOAD *, If(len(trim(Value))= 0 or Value='NULL' or Value='-', Null(), Value ) as ValueNullConv;

LOAD * Inline
[ID, Value
0,
1,NULL
2,-
3,Value];
```

This is the resulting table. In the ValueNullConv column, the NULL
values are represented by -.

| ID | Value | ValueNullConv | IsItNull |
| -- | ----- | ------------- | -------- |
| 0  |       | \-            | T        |
| 1  | NULL  | \-            | T        |
| 2  | \-    | \-            | T        |
| 3  | Value | Value         | F        |
