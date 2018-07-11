
## ErrorVariables

# ErrorMode

Th is error variable determines what action is to be taken by Qlik Sense
when an error is encountered during script
execution.

 

ErrorMode

 

| Argument                                                                                                          | Description                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
|    | The default setting. The script execution will halt and the user will be prompted for action (non-batch mode).                                     | | **ErrorMode =0  | Qlik Sense will simply ignore the failure and continue script execution at the next script statement.                                              |
|  ** ErrorMode =2**  | Qlik Sense will trigger an "Execution of script failed..." error message immediately on failure, without prompting the user for action beforehand. |

 

set ErrorMode=0;

 

*Error
variables*

# Error variables

The values of all error variables will exist after the script execution.
The first variable, ErrorMode, is input from the user, and the last
three are output from Qlik Sense with information on errors in the
script.

## Error variables overview

Each function is described further after the overview. You can also
click the function name in the syntax to immediately access the details
for that specific function.

Use the drop-down on each function to see a brief description and the
syntax of each function. Click the function name in the syntax
description for further details. Please refer to the Qlik Sense online
help for further details about the functions.

ErrorMode

Th is error variable determines what action is to be taken by Qlik Sense
when an error is encountered during script
execution.

**ErrorMode2687285489**

ScriptError

This error variable returns the error code of the last executed script
statement.

**ScriptError3217683864**

ScriptErrorCount

This error variable returns the total number of statements that have
caused errors during the current script execution. This variable is
always reset to 0 at the start of script
execution.

 ****ScriptErrorCount3437776527**** 

ScriptErrorList

This error variable will contain a concatenated list of all script
errors that have occurred during the last script execution. Each error
is separated by a line
feed.

 ****ScriptErrorList3221018562**** 

# ScriptError

This error variable returns the error code of the last executed script
statement.

 

ScriptError

 

This variable will be reset to 0 after each successfully executed script
statement. If an error occurs it will be set to an internal Qlik Sense
error code. Error codes are dual values with a numeric and a text
component. The following error codes exist:

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

 

set ErrorMode=0;

LOAD \* from abc.qvf;

if ScriptError=8 then

exit script;

//no file;

end if

 

*Error
variables*

# ScriptErrorCount

This error variable returns the total number of statements that have
caused errors during the current script execution. This variable is
always reset to 0 at the start of script
execution.

 

 **ScriptErrorCount** 

 

*Error
variables*

# ScriptErrorList

This error variable will contain a concatenated list of all script
errors that have occurred during the last script execution. Each error
is separated by a line
feed.

 **ScriptErrorList** 

 

*Error
variables*