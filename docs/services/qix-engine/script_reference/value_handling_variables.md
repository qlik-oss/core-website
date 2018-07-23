# Value Handling Variables

This section describes variables that are used for handling NULL and other values.

## NullDisplay

The defined symbol will substitute all NULL values from ODBC, and connectors, on the lowest level of data. This is a
user-defined variable.

`NullDisplay`

**Example:**

`set NullDisplay='<NULL>';`

## NullInterpret

The defined symbol will be interpreted as NULL when it occurs in a text file, Excel file or an inline statement. This is
a user-defined variable.

`NullInterpret`

**Examples:**

```qlik
set NullInterpret=' ';
set NullInterpret =;
```

will not return NULL values for blank values in Excel, but it will for a CSV text file.

`set NullInterpret ='';`

will return NULL values for blank values in Excel.

## NullValue

If the **NullAsValue** statement is used, the defined symbol will substitute all NULL values in the **NullAsValue**
specified fields with the specified string.

`NullValue`

**Example:**

```qlik
NullAsValue Field1, Field2;
set NullValue='<NULL>';
```

## OtherSymbol

Defines a symbol to be treated as 'all other values' before a **LOAD/SELECT** statement. This is a user-defined
variable.

`OtherSymbol`

```qlik
set OtherSymbol='+';
LOAD ` inline
[X, Y
a, a
b, b];
LOAD ` inline
[X, Z
a, a
+, c];
```

The field value Y=’b’ will now link to Z=’c’ through the other symbol.
