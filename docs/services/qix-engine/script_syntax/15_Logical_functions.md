# Logical functions

!!! Tip
    Both IsNum and IsText return 0 if the expression is NULL.

Example:
```
Load *, IsNum(Value), IsText(Value)
Inline [
Value
23
Green
Blue
12
33Red];
```

The resulting table looks like this:

| Value | IsNum(Value) | IsText(Value) |
| ----- | ------------ | ------------- |
| 23    | \-1          | 0             |
| Green | 0            | \-1           |
| Blue  | 0            | \-1           |
| 12    | \-1          | 0             |
| 33Red | 0            | \-1           |


## IsNum

Returns -1 (True) if the expression can be interpreted as a number,
otherwise 0 (False). Returns 0 if the expression is NULL.

`IsNum(expr)`

## IsText

Returns -1 (True) if the expression has a text representation, otherwise
0 (False). Returns 0 if the expression is NULL.

`IsText(expr)`
