# Error variables

## ErrorMode

The error variable determines what action is to be taken when an error is encountered during script execution.

`ErrorMode`

| Argument    | Description |
| ----------- | ----------- |
| ErrorMode=1 | The default setting. The script execution will halt and the user will be prompted for action (non-batch mode).|
| ErrorMode=0 | The engine will simply ignore the failure and continue script execution at the next script statement. |
| ErrorMode=2 | The engine will trigger an "Execution of script failed..." error, without prompting the user for action beforehand. |

## ScriptError

This error variable returns the error code of the last executed script statement.

`ScriptError`

This variable will be reset to 0 after each successfully executed script statement. If an error occurs it will be set to
an internal error code. Error codes are dual values with a numeric and a text component. The following error codes
exist:

| Error code | Description                    |
| ---------- | ------------------------------ |
| 0          | No error                       |
| 1          | General error                  |
| 2          | Syntax error                   |
| 3          | General ODBC error             |
| 4          | General OLE DB error           |
| 5          | General custom database error  |
| 6          | General XML error              |
| 7          | General HTML error             |
| 8          | File not found                 |
| 9          | Database not found             |
| 10         | Table not found                |
| 11         | Field not found                |
| 12         | File has wrong format          |
| 13         | BIFF error                     |
| 14         | BIFF error encrypted           |
| 15         | BIFF error unsupported version |
| 16         | Semantic error                 |

**Example**:

```qlik
set ErrorMode=0;
LOAD * from abc.qvf;
if ScriptError=8 then
exit script;
//no file;
end if
```

## ScriptErrorCount

This error variable returns the total number of statements that have caused errors during the current script execution.
This variable is always reset to 0 at the start of script execution.

## ScriptErrorList

This error variable will contain a concatenated list of all script errors that have occurred during the last script
execution. Each error is separated by a line feed.
