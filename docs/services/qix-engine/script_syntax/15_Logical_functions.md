## LogicalFunctions

# Logical functions

This section describes functions handling logical operations. All
functions can be used in both the data load script and in chart
expressions.

IsNum

Returns -1 (True) if the expression can be interpreted as a number,
otherwise 0 (False).

IsNum( expr )

IsText

Returns -1 (True) if the expression has a text representation, otherwise
0 (False).

IsText( expr
)



Both  and IsText
return 0 if the expression is NULL.



 

The following example loads an inline table with mixed text and
numerical values, and adds two fields to check if the value is a
numerical value, respectively a text
value.



Load \*, IsNum(Value), IsText(Value) Inline [ Value 23 Green Blue 12
33Red];





 



The resulting table looks like this:

| Value | IsNum(Value) | IsText(Value) |
| ----- | ------------ | ------------- |
| 23    | \-1          | 0             |
| Green | 0            | \-1           |
| Blue  | 0            | \-1           |
| 12    | \-1          | 0             |
| 33Red | 0            | \-1           |
