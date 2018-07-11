

## NULLFunctions

# IsNull - script and chart function

The IsNull function tests if the value of an expression is NULL and if
so, returns -1 (True), otherwise 0
(False).

 

 )



A string with length zero is not considered as a NULL and will cause
IsNull to return False.



Data load script

In this example, an inline table with four rows is loaded, where the
first three lines contain either nothing, - or 'NULL' in the Value
column. We convert these values to true NULL value representations with
the middle preceding
 **LOAD** 
using the
 **Null** 
function.

The first preceding
 **LOAD** 
adds a field checking if the value is NULL,using the
 **IsNull** 
function.



NullsDetectedAndConverted: LOAD \*, If(IsNull(ValueNullConv), 'T', 'F')
as IsItNull; LOAD \*, If(len(trim(Value))= 0 or Value='NULL' or
Value='-', Null(), Value ) as ValueNullConv; LOAD \* Inline [ID, Value
0, 1,NULL 2,- 3,Value];



This is the resulting table. In the ValueNullConv column, the NULL
values are represented by -.

| ID | Value | ValueNullConv | IsItNull |
| -- | ----- | ------------- | -------- |
| 0  |       | \-            | T        |
| 1  | NULL  | \-            | T        |
| 2  | \-    | \-            | T        |
| 3  | Value | Value         | F        |

# NULL functions

This section describes functions for returning or detecting NULL values.

All functions can be used in both the data load script and in chart
expressions.

## NULL functions overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

Null

The
 **Null** 
function returns a NULL
value.

**Null3708389063**( )

IsNull

The IsNull function tests if the value of an expression is NULL and if
so, returns -1 (True), otherwise 0
(False).

 )

# NULL - script and chart function

The
 **Null** 
function returns a NULL value.

 

Null( )

Data load script

In this example, an inline table with four rows is loaded, where the
first three lines contain either nothing, - or 'NULL' in the Value
column. We want to convert these values to true NULL value
representations.

The middle preceding
 **LOAD** 
performs the conversion using the
 **Null** 
function.

The first preceding
 **LOAD** 
adds a field checking if the value is NULL, just for illustration
purposes in this
example.



NullsDetectedAndConverted: LOAD \*, If(IsNull(ValueNullConv), 'T', 'F')
as IsItNull; LOAD \*, If(len(trim(Value))= 0 or Value='NULL' or
Value='-', Null(), Value ) as ValueNullConv; LOAD \* Inline [ID, Value
0, 1,NULL 2,- 3,Value];



This is the resulting table. In the ValueNullConv column, the NULL
values are represented by -.

| ID | Value | ValueNullConv | IsItNull |
| -- | ----- | ------------- | -------- |
| 0  |       | \-            | T        |
| 1  | NULL  | \-            | T        |
| 2  | \-    | \-            | T        |
| 3  | Value | Value         | F        |
