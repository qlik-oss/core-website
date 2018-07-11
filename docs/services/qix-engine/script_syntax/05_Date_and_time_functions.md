# Date and Time functions

## addmonths - script and chart function

This function returns the date occurring **n** months after **startdate** 
or, if **n** is negative, the date occurring **n** months before
 **startdate**.

`AddMonths( startdate, n , [ , mode] )`

**Return data type:** dual

| Argument  | Description |
| --------- | ----------- |
| startdate | The start date as a time stamp, for example '2012-10-12'.|
| n         | Number of months as a positive or negative integer.      |
| mode      |  **mode** specifies if the month is added relative to the beginning of the month or relative to the end of the month. If the input date is the 28th or above and **mode**  is set to 1, the function will return a date which is the same distance from the end of the month as the input date. Default mode is 0. |

Examples and results:

| Example                      | Result               |
| ---------------------------- | -------------------- |
| addmonths ('2003-01-29',3)   | returns '2003-04-29' |
| addmonths ('2003-01-29',3,0) | returns '2003-04-29' |
| addmonths ('2003-01-29',3,1) | returns '2003-04-28' |
| addmonths ('2003-01-29',1,0) | returns '2003-02-28' |
| addmonths ('2003-01-29',1,1) | returns '2003-02-26' |
| addmonths ('2003-02-28',1,0) | returns '2003-03-28' |
| addmonths ('2003-02-28',1,1) | returns '2003-03-31' |

## addyears - script and chart function

This function returns the date occurring **n** years after **startdate** 
or, if **n** is negative, the date occurring **n** 
years before **startdate** .

`AddYears( startdate, n )`

**Return data type:** dual

| Argument  | Description                                               |
| --------- | --------------------------------------------------------- |
| startdate | The start date as a time stamp, for example '2012-10-12'. |
| n         | Number of years as a positive or negative integer.        |

Examples and results:

| Example                    | Result               |
| -------------------------- | -------------------- |
| addyears ('2010-01-29',3)  | returns '2013-01-29' |
| addyears ('2010-01-29',-1) | returns '2009-01-29' |

## age - script and chart function

The **age** function returns the age at the time of
 **timestamp** (in completed years) of somebody born on
 **date_of_birth** .

`age( timestamp, date_of_birth )`

Can be an expression.

**Return data type:** numeric

| Argument      | Description                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| timestamp     | The timestamp,or expression resolving to a timestamp, up to which to calculate the completed number of years. |
| date_of_birth | Date of birth of the person whose age is being calculated. Can be an expression.                              |

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>age('25/01/2014', '29/10/2012')</td>
<td>Returns 1.</td>
</tr>
<tr class="even">
<td>age('29/10/2014', '29/10/2012')</td>
<td>Returns 2.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>Employees:</p>
<p>LOAD * INLINE [</p>
<p>Member|DateOfBirth</p>
<p>John|28/03/1989</p>
<p>Linda|10/12/1990</p>
<p>Steve|5/2/1992</p>
<p>Birg|31/3/1993</p>
<p>Raj|19/5/1994</p>
<p>Prita|15/9/1994</p>
<p>Su|11/12/1994</p>
<p>Goran|2/3/1995</p>
<p>Sunny|14/5/1996</p>
<p>Ajoa|13/6/1996</p>
<p>Daphne|7/7/1998</p>
<p>Biffy|4/8/2000</p>
<p>] (delimiter is |);</p>
<p>AgeTable:</p>
<p>Load *,</p>
<p>age('20/08/2015', DateOfBirth) As Age</p>
<p>Resident Employees;</p>
<p>Drop table Employees;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of age for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>Member</td>
<td>DateOfBirth</td>
<td>Age</td>
</tr>
<tr class="even">
<td>John</td>
<td>28/03/1989</td>
<td>26</td>
</tr>
<tr class="odd">
<td>Linda</td>
<td>10/12/1990</td>
<td>24</td>
</tr>
<tr class="even">
<td>Steve</td>
<td>5/2/1992</td>
<td>23</td>
</tr>
<tr class="odd">
<td>Birg</td>
<td>31/3/1993</td>
<td>22</td>
</tr>
<tr class="even">
<td>Raj</td>
<td>19/5/1994</td>
<td>21</td>
</tr>
<tr class="odd">
<td>Prita</td>
<td>15/9/1994</td>
<td>20</td>
</tr>
<tr class="even">
<td>Su</td>
<td>11/12/1994</td>
<td>20</td>
</tr>
<tr class="odd">
<td>Goran</td>
<td>2/3/1995</td>
<td>20</td>
</tr>
<tr class="even">
<td>Sunny</td>
<td>14/5/1996</td>
<td>19</td>
</tr>
<tr class="odd">
<td>Ajoa</td>
<td>13/6/1996</td>
<td>19</td>
</tr>
<tr class="even">
<td>Daphne</td>
<td>7/7/1998</td>
<td>17</td>
</tr>
<tr class="odd">
<td>Biffy</td>
<td>4/8/2000</td>
<td>15</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## converttolocaltime - script and chart function

Converts a UTC or GMT timestamp to local time as a dual value. The place
can be any of a number of cities, places and time zones around the
world.

`ConvertToLocalTime( timestamp [, place [, ignore_dst=false]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> timestamp </td>
<td>The timestamp,or expression resolving to a timestamp, to convert.</td>
</tr>
<tr class="even">
<td> place </td>
<td><p>A place or timezone from the table of valid places and timezones below. Alternatively, you can useGMT or UTC to define the local time. The following values and time offset ranges are valid:</p>
<ul>
<li>GMT</li>
<li>GMT-12:00 - GMT-01:00</li>
<li>GMT+01:00 - GMT+14:00</li>
<li>UTC</li>
<li>UTC-12:00 - UTC-01:00</li>
<li>UTC+01:00 - UTC+14:00</li>
</ul>

You can only use standard time offsets. It's not possible to use an arbitrary time offset, for example, GMT-04:27.
</td>
</tr>
<tr class="odd">
<td> ignore_dst </td>
<td>Set to True if you want to ignore DST (daylight saving time).</td>
</tr>
</tbody>
</table>

The resulting time is adjusted for daylight-saving time, unless **ignore_dst** is set to True.

Valid places and time zones:

- Abu Dhabi
- Adelaide
- Alaska
- Amsterdam
- Arizona
- Astana
- Athens
- Atlantic Time (Canada)
- Auckland
- Azores
- Baghdad
- Baku
- Bangkok
- Beijing
- Belgrade
- Berlin
- Bern
- Bogota
- Brasilia
- Bratislava
- Brisbane
- Brussels
- Bucharest
- Budapest
- Buenos Aires
- Cairo
- Canberra
- Cape Verde Is.
- Caracas
- Casablanca
- Central America
- Central Time (US & Canada)
- Chennai
- Chihuahua
- Chongqing
- Copenhagen
- Darwin
- Dhaka
- Eastern Time (US & Canada)
- Edinburgh
- Ekaterinburg
- Fiji
- Georgetown
- Greenland
- Greenwich Mean Time : Dublin
- Guadalajara
- Guam
- Hanoi
- Harare
- Hawaii
- Helsinki
- Hobart
- Hong Kong
- Indiana (East)
- International Date Line West
- Irkutsk
- Islamabad
- Istanbul
- Jakarta
- Jerusalem
- Kabul
- Kamchatka
- Karachi
- Kathmandu
- Kolkata
- Krasnoyarsk
- Kuala Lumpur
- Kuwait
- Kyiv
- La Paz
- Lima
- Lisbon
- Ljubljana
- London
- Madrid
- Magadan
- Mazatlan
- Melbourne
- Mexico City
- Mid-Atlantic
- Minsk
- Monrovia
- Monterrey
- Moscow
- Mountain Time (US & Canada)
- Mumbai
- Muscat
- Nairobi
- New Caledonia
- New Delhi
- Newfoundland
- Novosibirsk
- Nuku'alofa
- Osaka
- Pacific Time (US & Canada)
- Paris
- Perth
- Port Moresby
- Prague
- Pretoria
- Quito
- Riga
- Riyadh
- Rome
- Samoa
- Santiago
- Sapporo
- Sarajevo
- Saskatchewan
- Seoul
- Singapore
- Skopje
- Sofia
- Solomon Is.
- Sri Jayawardenepura
- St. Petersburg
- Stockholm
- Sydney
- Taipei
- Tallinn
- Tashkent
- Tbilisi
- Tehran
- Tokyo
- Urumqi
- Vienna
- Vilnius
- Vladivostok
- Volgograd
- Warsaw
- Wellington
- West Central Africa
- Yakutsk
- Yerevan
- Zagreb 

Examples and results:

| Example | Result |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| ConvertToLocalTime('2007-11-10 23:59:00','Paris') | Returns ’2007-11-11 00:59:00’ and the corresponding internal timestamp representation.                              |
| ConvertToLocalTime(UTC(), 'GMT-05:00')            | Returns the time for the North American east coast, for example, New York.                                          |
| ConvertToLocalTime(UTC(), 'GMT-05:00', True)      | Returns the time for the North American east coast, for example, New York, without daylight-saving time adjustment. |


## day - script and chart function

This function returns an integer representing the day when the fraction of the **expression** 
is interpreted as a date according to the standard number interpretation.

`day( expression )`

**Return data type:** integer

Examples and results:

| Example             | Result                                |
| ------------------- | ------------------------------------- |
| day( '1971-10-12' ) | returns 12                            |
| day( '35648' )      | returns 6, because 35648 = 1997-08-06 |

## dayend - script and chart function

This function returns a value corresponding to a timestamp of the final millisecond of the day contained in **time** .
The default output format will be the **TimestampFormat** set in the script.

`DayEnd( time[, [period_no[, day_start]] )`

**Return data type:** dual

| Argument| Description|
| -------- | - |
| time       | The timestamp to evaluate.|
|  period_no | period_no is an integer, or expression that resolves to an integer, where the value 0 indicates the day that contains **time** . Negative values in period_no indicate preceding days and positive values indicate succeeding days. |
|  day_start | To specify days not starting at midnight, indicate an offset as a fraction of a day in **day_start** . For example, 0.125 to denote 3 AM.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>dayend('25/01/2013 16:45:00')</td>
<td>Returns 25/01/2013 23:59:59.</td>
</tr>
<tr class="even">
<td>dayend('25/01/2013 16:45:00', -1)</td>
<td>Returns '24/01/2013 23:59:59.</td>
</tr>
<tr class="odd">
<td>dayend('25/01/2013 16:45:00', 0, 0.5)</td>
<td>Returns 26/01/2013 11:59:59.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the timestamp that marks the end of the day after each invoice date in the table.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>DayEnd(InvDate, 1) AS DEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the dayend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>DEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>29/03/2012 23:59:59</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>11/12/2012 23:59:59</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>07/02/2013 23:59:59</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/04/2013 23:59:59</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>20/05/2013 23:59:59</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>16/09/2013 23:59:59</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>12/12/2013 23:59:59</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>03/03/2014 23:59:59</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>15/05/2014 23:59:59</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>14/06/2014 23:59:59</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>08/07/2014 23:59:59</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>05/08/2014 23:59:59</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## daylightsaving - script and chart function

Returns the current adjustment for daylight saving time, as defined in Windows.

`DaylightSaving( )`

**Return data type:** dual

## dayname - script and chart function

This function returns a value showing the date with an underlying
numeric value corresponding to a timestamp of the first millisecond of
the day containing **time** .

`DayName( time[, period_no [, day_start]] )`

**Return data type:** dual

| Argument| Description|
| -------- | --------------- |
| time       | The timestamp to evaluate.|
|  period_no | period_no is an integer, or expression that resolves to an integer, where the value 0 indicates the day that contains **time** . Negative values in period_no indicate preceding days and positive values indicate succeeding days. |
|  day_start | To specify days not starting at midnight, indicate an offset as a fraction of a day in **day_start** . For example, 0.125 to denote 3 AM.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>dayname('25/01/2013 16:45:00')</td>
<td>Returns 25/01/2013.</td>
</tr>
<tr class="even">
<td>dayname('25/01/2013 16:45:00', -1)</td>
<td>Returns 24/01/2013.</td>
</tr>
<tr class="odd">
<td>dayname('25/01/2013 16:45:00', 0, 0.5 )</td>
<td><p>Returns 25/01/2013.</p>
<p>Displaying the full timestamp shows the underlying numeric value corresponds to '25/01/2013 12:00:00.000.</p></td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, the day name is created from the timestamp that marks the beginning of the day after each invoice date in the table.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>DayName(InvDate, 1) AS DName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the dayname() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>DName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>29/03/2012 00:00:00</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>11/12/2012 00:00:00</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>07/02/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/04/2013 00:00:00</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>20/05/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>16/09/2013 00:00:00</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>12/12/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>03/03/2014 00:00:00</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>15/05/2014 00:00:00</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>14/06/2014 00:00:00</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>08/07/2014 00:00:00</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>05/08/2014 00:00:00</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## daynumberofquarter - script and chart function

This function calculates the day number of the quarter in which a timestamp falls.

`DayNumberOfQuarter( timestamp[,start_month] )`

**Return data type:** integer

The function always uses years based on 366 days.

 

| Argument   | Description|
| ---------- | -------------------------------------------------------------------------- |
| timestamp  | The date to evaluate.|
| start_month | By specifying a **start_month**  between 2 and 12 (1, if omitted), the beginning of the year may be moved forward to the first day of any month. For example, if you want to work with a fiscal year starting March 1, specify start_month = 3. |

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>DayNumberOfQuarter('12/09/2014')</td>
<td>Returns 74, the day number of the current quarter.</td>
</tr>
<tr class="even">
<td>DayNumberOfQuarter('12/09/2014',3)</td>
<td>Returns 12, the day number of the current quarter.<br />
In this case, the first quarter starts with March (because start_month is specified as 3). This means that the current quarter is the third quarter, which started on September 1.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>ProjectTable:</p>
<p>LOAD recno() as InvID, * INLINE [</p>
<p>StartDate</p>
<p>28/03/2014</p>
<p>10/12/2014</p>
<p>5/2/2015</p>
<p>31/3/2015</p>
<p>19/5/2015</p>
<p>15/9/2015</p>
<p>] ;</p>
<p>NrDays:</p>
<p>Load *,</p>
<p>DayNumberOfQuarter(StartDate,4) As DayNrQtr</p>
<p>Resident ProjectTable;</p>
<p>Drop table ProjectTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of DayNumberOfQuarter for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvID</td>
<td>StartDate</td>
<td>DayNrQtr</td>
</tr>
<tr class="even">
<td>1</td>
<td>28/03/2014</td>
<td>88</td>
</tr>
<tr class="odd">
<td>2</td>
<td>10/12/2014</td>
<td>71</td>
</tr>
<tr class="even">
<td>3</td>
<td>5/2/2015</td>
<td>36</td>
</tr>
<tr class="odd">
<td>4</td>
<td>31/3/2015</td>
<td>91</td>
</tr>
<tr class="even">
<td>5</td>
<td>19/5/2015</td>
<td>49</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15/9/2015</td>
<td>77</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## daynumberofyear - script and chart function

This function calculates the day number of the year in which a timestamp
falls. The calculation is made from the first millisecond of the first
day of the year, but the first month can be
offset.

`DayNumberOfYear( timestamp[,start_month] )`

Return data type: integer

The function always uses years based on 366 days.

 

| Argument     | Description          |
| ------------ | -------------------- |
|  timestamp   | The date to evaluate.|
|  start_month | By specifying a **start_month**  between 2 and 12 (1, if omitted), the beginning of the year may be moved forward to the first day of any month. For example, if you want to work with a fiscal year starting March 1, specify start_month = 3. |

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>DayNumberOfYear('12/09/2014')</td>
<td>Returns 256, the day number counted from the first of the year.</td>
</tr>
<tr class="even">
<td>DayNumberOfYear('12/09/2014',3)</td>
<td>Returns 196, the number of the day, as counted from 1 March.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>ProjectTable:</p>
<p>LOAD recno() as InvID, * INLINE [</p>
<p>StartDate</p>
<p>28/03/2014</p>
<p>10/12/2014</p>
<p>5/2/2015</p>
<p>31/3/2015</p>
<p>19/5/2015</p>
<p>15/9/2015</p>
<p>] ;</p>
<p>NrDays:</p>
<p>Load *,</p>
<p>DayNumberOfYear(StartDate,4) As DayNrYear</p>
<p>Resident ProjectTable;</p>
<p>Drop table ProjectTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of DayNumberOfYear for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvID</td>
<td>StartDate</td>
<td>DayNrYear</td>
</tr>
<tr class="even">
<td>1</td>
<td>28/03/2014</td>
<td>363</td>
</tr>
<tr class="odd">
<td>2</td>
<td>10/12/2014</td>
<td>254</td>
</tr>
<tr class="even">
<td>3</td>
<td>5/2/2015</td>
<td>311</td>
</tr>
<tr class="odd">
<td>4</td>
<td>31/3/2015</td>
<td>366</td>
</tr>
<tr class="even">
<td>5</td>
<td>19/5/2015</td>
<td>49</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15/9/2015</td>
<td>168</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## daystart - script and chart function

This function returns a value corresponding to a timestamp with the
first millisecond of the day contained in the **time** 
argument. The default output format will be the **TimestampFormat** 
set in the script.

`DayStart( time[, [period_no[, day_start]] )`

**Return data type:** dual

| Argument | Description|
| ----------------------------- | --------------- |
|  time      | The timestamp to evaluate.|
|  period_no | period_no is an integer, or expression that resolves to an integer, where the value 0 indicates the day that contains **time** . Negative values in period_no indicate preceding days and positive values indicate succeeding days. |
|  day_start | To specify days not starting at midnight, indicate an offset as a fraction of a day in **day_start** . For example, 0.125 to denote 3 AM.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>daystart('25/01/2013 16:45:00')</td>
<td>Returns 25/01/2013 00:00:00.</td>
</tr>
<tr class="even">
<td>daystart('25/01/2013 16:45:00', -1)</td>
<td>Returns 24/01/2013 00:00:00.</td>
</tr>
<tr class="odd">
<td>daystart('25/01/2013 16:45:00', 0, 0.5 )</td>
<td>Returns 25/01/2013 12:00:00.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the timestamp that marks the beginning of the day after each invoice date in the table.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>DayStart(InvDate, 1) AS DStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the daystart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>DStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>29/03/2012 00:00:00</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>11/12/2012 00:00:00</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>07/02/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/04/2013 00:00:00</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>20/05/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>16/09/2013 00:00:00</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>12/12/2013 00:00:00</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>03/03/2014 00:00:00</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>15/05/2014 00:00:00</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>14/06/2014 00:00:00</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>08/07/2014 00:00:00</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>05/08/2014 00:00:00</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## firstworkdate - script and chart function

The **firstworkdate** function returns the latest starting date to achieve **no_of_workdays** 
(Monday-Friday) ending no later than **end_date** taking into account any optionally listed holidays.
**end_date** and **holiday** should be valid dates ortimestamps.

`firstworkdate( end_date, no_of_workdays {, holiday} )`

**Return data type:** integer

 

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> end_date </td>
<td>The timestamp of end date to evaluate.</td>
</tr>
<tr class="even">
<td> no_of_workdays </td>
<td>The number of working days to achieve.</td>
</tr>
<tr class="odd">
<td> holiday </td>
<td><p>Holiday periods to exclude from working days. A holiday period is stated as a start date and an end date, separated by commas.</p>
<p> '25/12/2013', '26/12/2013'</p>
<p>You can specify more than one holiday period, separated by commas.</p>
<p> '25/12/2013', '26/12/2013', '31/12/2013', '01/01/2014'</p></td>
</tr>
</tbody>
</table>

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>firstworkdate ('29/12/2014', 9)</td>
<td>Returns '17/12/2014.</td>
</tr>
<tr class="even">
<td>firstworkdate ('29/12/2014', 9, '25/12/2014', '26/12/2014')</td>
<td>Returns 15/12/2014 because a holiday period of two days is taken into account.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>ProjectTable:</p>
<p>LOAD *, recno() as InvID, INLINE [</p>
<p>EndDate</p>
<p>28/03/2015</p>
<p>10/12/2015</p>
<p>5/2/2016</p>
<p>31/3/2016</p>
<p>19/5/2016</p>
<p>15/9/2016</p>
<p>] ;</p>
<p>NrDays:</p>
<p>Load *,</p>
<p>FirstWorkDate(EndDate,120) As StartDate</p>
<p>Resident ProjectTable;</p>
<p>Drop table ProjectTable;</p>
<p><span class="Code" data-autonumposition="none"> </p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of FirstWorkDate for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvID</td>
<td>EndDate</td>
<td>StartDate</td>
</tr>
<tr class="even">
<td>1</td>
<td>28/03/2015</td>
<td>13/10/2014</td>
</tr>
<tr class="odd">
<td>2</td>
<td>10/12/2015</td>
<td>26/06/2015</td>
</tr>
<tr class="even">
<td>3</td>
<td>5/2/2016</td>
<td>24/08/2015</td>
</tr>
<tr class="odd">
<td>4</td>
<td>31/3/2016</td>
<td>16/10/2015</td>
</tr>
<tr class="even">
<td>5</td>
<td>19/5/2016</td>
<td>04/12/2015</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15/9/2016</td>
<td>01/04/2016</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## GMT - script and chart function

This function returns the current Greenwich Mean Time, as derived from
the system clock and Windows time settings.

`GMT( )`

**Return data type:** dual


## hour - script and chart function

This function returns an integer representing the hour when the fraction
of the **expression** 
is interpreted as a time according to the standard number
interpretation.

`hour( expression )`

**Return data type:** integer

Examples and results:

| Example            | Result                                   |
| -------------------| ---------------------------------------- |
| hour( '09:14:36' ) | returns 9                                |
| hour( '0.5555' )   | returns 13 ( Because 0.5555 = 13:19:55 ) |

## inday - script and chart function

This function returns True if **timestamp** lies inside the day containing **base_timestamp**.

`InDay( timestamp, base_timestamp, period_no[, day_start] )`

**Return data type:** Boolean

| Argument       | Description|
| -------------- | --------------------------------------------------------------------------------------------------- |
| timestamp      | The date and time that you want to compare with base_timestamp. |
| base_timestamp | Date and time that is used to evaluate the timestamp.|
| period_no      | The day can be offset by period_no. period_no is an integer, where the value 0 indicates the day which contains base_timestamp. Negative values in period_no indicate preceding days and positive values indicate succeeding days. |
| day_start     | If you want to work with days not starting midnight, indicate an offset as a fraction of a day in **day_start, For example, 0.125 to denote 3 AM.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inday ('12/01/2006 12:23:00', '12/01/2006 00:00:00', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inday ('12/01/2006 12:23:00', '13/01/2006 00:00', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inday ('12/01/2006 12:23:00', '12/01/2006 00:00:00', -1)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inday ('11/01/2006 12:23:00', '12/01/2006 00:00:00', -1)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td>inday ('12/01/2006 12:23:00', '12/01/2006 00:00:00', 0, 0.5)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inday ('12/01/2006 11:23:00', '12/01/2006 00:00:00', 0, 0.5)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls at any time in the day starting with the base_timestamp.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvTime</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InDay(InvTime, '28/03/2012 00:00:00', 0) AS InDayEx</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the inday() function.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvTime</td>
<td>InDayEx</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

### indaytotime - script and chart function

This function returns True if **timestamp** lies inside the part of day containing **base_timestamp** 
up until and including the exact millisecond of **base_timestamp** .

`InDayToTime( timestamp, base_timestamp, period_no[, day_start] )`

**Return data type:** Boolean

 

| Argument       | Description|
| -------------- | --------------------------------------------------------------------------------- |
| timestamp      | The date and time that you want to compare with base_timestamp. |
| base_timestamp | Date and time that is used to evaluate the timestamp.|
| period_no      | The day can be offset by period_no. period_no is an integer, where the value 0 indicates the day which contains base_timestamp. Negative values in period_no indicate preceding days and positive values indicate succeeding days. |
| day_start      | (optional) If you want to work with days not starting midnight, indicate an offset as a fraction of a day in **day_start, For example, 0.125 to denote 3 AM.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>indaytotime ('12/01/2006 12:23:00', '12/01/2006 23:59:00', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>indaytotime ('12/01/2006 12:23:00', '12/01/2006 00:00:00', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>indaytotime ('11/01/2006 12:23:00', '12/01/2006 23:59:00', -1)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice timestamp falls before 17:00:00 on the day starting with the base_timestamp.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvTime</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InDayToTime(InvTime, '28/03/2012 17:00:00', 0) AS InDayExTT</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the indaytotime() function.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvTime</td>
<td>InDayExTT</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

### inlunarweek - script and chart function

This function finds if **timestamp** lies inside the lunar week containing **base_date**.
Lunar weeks in Qlik Sense are defined by counting 1 January as the first day of the week.

`InLunarWeek( timestamp, base_date, period_no[, first_week_day] )`

**Return data type:** Boolean

 

| Argument       | Description |
| -------------- | --------------------------------------------------------------------- |
| timestamp      | The date that you want to compare with base_date. |
| base_date      | Date that is used to evaluate the lunar week. |
| period_no      | The lunar week can be offset by period_no. period_no is an integer, where the value 0 indicates the lunar week which contains base_date. Negative values in period_no indicate preceding lunar weeks and positive values indicate succeeding lunar weeks.|
| first_week_day | An offset that may be greater than or less than zero. This changes the beginning of the year by the specified number of days and/or fractions of a day.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inlunarweek('12/01/2013', '14/01/2013', 0)</td>
<td>Returns True. Because the value of timestamp, 12/01/2013 falls in the week 08/01/2013 to 14/01/2013.</td>
</tr>
<tr class="even">
<td>inlunarweek('12/01/2013', '07/01/2013', 0)</td>
<td>Returns False. Because the base_date 07/01/2013 is in the lunar week defined as 01/01/2013 to 07/01/2013.</td>
</tr>
<tr class="odd">
<td>inlunarweek('12/01/2013', '14/01/2013', -1)</td>
<td>Returns False. Because specifying a value of period_no as -1 shifts the week to the previous week, 01/01/2013 to 07/01/2013.</td>
</tr>
<tr class="even">
<td>inlunarweek('07/01/2013', '14/01/2013', -1)</td>
<td>Returns True. In comparison with the previous example, the timestamp is in the week after taking into account the shift backwards.</td>
</tr>
<tr class="odd">
<td>inlunarweek('11/01/2006', '08/01/2006', 0, 3)</td>
<td>Returns False. Because specifying a value for first_week_day as 3 means the start of the year is calculated from 04/01/2013, and so the value of base_date falls in the first week, and the value of timestamp falls in the week 11/01/2013 to 17/01/2013.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in the week shifted from the value of base_date by four weeks.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InLunarWeek(InvDate, '11/01/2013', 4) AS InLWeekPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the inlunarweek() function.</p>
<p>The function returns True for the value of InvDate5/2/2013 because the value of base_date, 11/01/2013, is shifted by four weeks, and so falls in the week 5/02/2013 to 11/02/2013.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InLWeekPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inlunarweektodate - script and chart function

This function finds if **timestamp** lies inside the part of the lunar week up to and including the last
millisecond of **base_date**.
Lunar weeks in Qlik Sense are defined by counting 1 January as the first day of the week.

`InLunarWeekToDate( timestamp, base_date, period_no [, first_week_day] )`

Return data type: Boolean

 

| Argument       | Description |
| -------------- | ------------------------------------ |
| timestamp      | The date that you want to compare with base_date. |
| base_date      | Date that is used to evaluate the lunar week.|
| period_no      | The lunar week can be offset by period_no. period_no is an integer, where the value 0 indicates the lunar week which contains base_date. Negative values in period_no indicate preceding lunar weeks and positive values indicate succeeding lunar weeks. |
| first_week_day | An offset that may be greater than or less than zero. This changes the beginning of the year by the specified number of days and/or fractions of a day.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inlunarweektodate('12/01/2013', '13/01/2013', 0)</td>
<td>Returns True. Because the value of timestamp, 12/01/2013 falls in the part of the week 08/01/2013 to 13/01/2013.</td>
</tr>
<tr class="even">
<td>inlunarweektodate('12/01/2013', '11/01/2013', 0)</td>
<td>Returns False. Because the value of timestamp is later than the value base_date even though the two dates are in the same lunar week before 12/01/2012.</td>
</tr>
<tr class="odd">
<td>inlunarweektodate('12/01/2006', '05/01/2006', 1)</td>
<td>Returns True. Specifying a value of 1 for period_no shifts the base_date forward one week, so the value of timestamp falls in the part of the lunar week.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in the part of the week shifted from the value of base_date by four weeks.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InLunarWeekToDate(InvDate, '07/01/2013', 4) AS InLWeek2DPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the inlunarweek() function.</p>
<p>The function returns True for the value of InvDate5/2/2013 because the value of base_date, 11/01/2013, is shifted by four weeks, and so falls in the part of the week 5/02/2013 to 07/02/2013.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InLWeek2DPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inmonth - script and chart function

This function returns True if **timestamp** lies inside the month containing **base_date** .

`InMonth( timestamp, base_date, period_no[, first_month_of_year] )`

**Return data type:** Boolean

| Argument            | Description |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| timestamp           | The date that you want to compare with base_date. |
| base_date           | Date that is used to evaluate the month. |
| period_no           | The month can be offset by period_no. period_no is an integer, where the value 0 indicates the month which contains base_date. Negative values in period_no indicate preceding months and positive values indicate succeeding months. |
| first_month_of_year | The first_month_of_year parameter is disabled and reserved for future use. |

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inmonth ('25/01/2013', '01/01/2013', 0 )</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inmonth('25/01/2013', '01/04/2013', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inmonth ('25/01/2013', '01/01/2013', -1)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inmonth ('25/12/2012', '01/01/2013', -1)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls at any time in the fourth month after the month in base_date, by specifying period_no as 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InMonth(InvDate, '31/01/2013', 4) AS InMthPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inmonth() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InMthPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inmonths - script and chart function

This function finds if a timestamp falls within the same month,
bi-month, quarter, tertial, or half-year as a base date.It is also
possible to find if the timestamp falls within a previous or following
time period.

`InMonths( n_months, timestamp, base_date, period_no [, first_month_of_year] )`

**Return data type:** Boolean

| Argument            | Description |
| ------------------- | --------------------------------------- |
| n_months            | The number of months that defines the period. An integer or expression that resolves to an integer that must be one of: 1 (equivalent to the inmonth() function), 2 (bi-month), 3 (equivalent to the inquarter() function), 4 (tertial), or 6 (half year). |
| timestamp           | The date that you want to compare with base_date.|
| base_date           | Date that is used to evaluate the period.|
| period_no           | The period can be offset by period_no, an integer, or expression resolving to an integer, where the value 0 indicates the period that contains*base_date. Negative values in **period_no indicate preceding periods and positive values indicate succeeding periods. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in first_month_of_year.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inmonths(4, '25/01/2013', '25/04/2013', 0)</td>
<td>Returns True. Because the value of timestamp, 25/01/2013, lies within the four-month period 01/01/2013 to 30/04/2013, in which the value of base_date, 25/04/2013 lies.</td>
</tr>
<tr class="even">
<td>inmonths(4, '25/05/2013', '25/04/2013', 0)</td>
<td>Returns False. Because 25/05/2013 is outside the same period as the previous example.</td>
</tr>
<tr class="odd">
<td>inmonths(4, '25/11/2012', '01/02/2013', -1 )</td>
<td>Returns True. Because the value of period_no, -1, shifts the search period back one period of four months (the value of n-months), which makes the search period 01/09/2012 to 31/12/2012.</td>
</tr>
<tr class="even">
<td>inmonths( 4, '25/05/2006', '01/03/2006', 0, 3)</td>
<td>Returns True. Because the value of first_month_of_year is set to 3, which makes the search period 01/03/2006 to 30/07/2006 instead of 01/01/2006 to 30/04/2006.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if the invoice date in the table falls in the bi-month period that includes the base_date shifted forwards by one bi-month period (by specifying period_no as 1).</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InMonths(2, InvDate, '11/02/2013', 1) AS InMthsPlus1</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the InMonths() function.</p>
<p>The search period is 01/03/2013 to 30/04/2013, because the value of base_date is shifted forwards two months from the value in the function (11/02/2013).</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InMthsPlus1</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inmonthstodate - script and chart function

This function finds if a timestamp falls within the part a period of the
month, bi-month, quarter, tertial, or half-year up to and including the
last millisecond of **base_date** .
It is also possible to find if the timestamp falls within a previous or
following time period.

`InMonths( n_months, timestamp, base_date, period_no[, first_month_of_year] )`

**Return data type:** Boolean

 

| Argument            | Description |
| ------------------- | ------------------------------------------- |
| n_months            | The number of months that defines the period. An integer or expression that resolves to an integer that must be one of: 1 (equivalent to the inmonth() function), 2 (bi-month), 3 (equivalent to the inquarter() function), 4 (tertial), or 6 (half year).|
| timestamp           | The date that you want to compare with **base_date.|
| base_date           | Date that is used to evaluate the period.|
| period_no           | The period can be offset by period_no, an integer, or expression resolving to an integer, where the value 0 indicates the period that contains base_date. Negative values in **period_no indicate preceding periods and positive values indicate succeeding periods. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in first_month_of_year.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inmonthstodate(4, '25/01/2013', '25/04/2013', 0)</td>
<td>Returns True. Because the value of timestamp, 25/01/2013, lies within the four-month period 01/01/2013 up to the end of 25/04/2013, in which the value of base_date, 25/04/2013 lies.</td>
</tr>
<tr class="even">
<td>inmonthstodate(4, '26/04/2013', '25/04/2006', 0)</td>
<td>Returns False. Because 26/04/2013 is outside the same period as the previous example.</td>
</tr>
<tr class="odd">
<td>inmonthstodate(4, '25/09/2005', '01/02/2006', -1)</td>
<td>Returns True. Because the value of period_no, -1, shifts the search period back one period of four months (the value of n-months), which makes the search period 01/09/2012 to 01/02/2012.</td>
</tr>
<tr class="even">
<td>inmonthstodate(4, '25/04/2006', '01/06/2006', 0, 3)</td>
<td>Returns True. Because the value of first_month_of_year is set to 3, which makes the search period 01/03/2006 to 01/06/2006 instead of 01/05/2006 to 01/06/2006.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if the invoice date in the table falls in the part of the bi-month period up to and including the base_date shifted forwards by four bi-month periods (by specifying period_no as 4).</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InMonthsToDate(2, InvDate, '15/02/2013', 4) AS InMths2DPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the InMonths() function.</p>
<p>The search period is 01/09/2013 to 15/10/2013, because the value of base_date is shifted forwards eight months from the value in the function (15/02/2013).</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InMths2DPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inmonthtodate - script and chart function

Returns True if **date** lies inside the part of month containing **basedate** 
up until and including the last millisecond of **basedate**.

`InMonthToDate( timestamp, base_date, period_no )`

**Return data type:** Boolean

| Argument  | Description |
| ----------| -------------------------------------------------------------------------------------------------------------- |
| timestamp | The date that you want to compare with base_date.|
| base_date | Date that is used to evaluate the month.|
| period_no | The month can be offset by period_no. period_no is an integer, where the value 0 indicates the month which contains base_date. Negative values in period_no  indicate preceding months and positive values indicate succeeding months. |

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inmonthtodate ('25/01/2013', '25/01/2013', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inmonthtodate ('25/01/2013', '24/01/2013', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inmonthtodate ('25/01/2013', '28/02/2013', -1)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>By specifying period_no as 4, this example checks if an invoice date falls in the fourth month after the month in base_date but before the end of the day specified in base_date.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InMonthToDate(InvDate, '31/01/2013', 0, 4) AS InMthPlus42D</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inmonthtodate() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InMthPlus42D</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inquarter - script and chart function

This function returns True if **timestamp** 
lies inside the quarter containing **base_date** .

`InQuarter( timestamp, base_date, period_no[, first_month_of_year] )`

**Return data type:** Boolean

| Argument            | Description |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| timestamp           | The date that you want to compare with base_date. |
| base_date           | Date that is used to evaluate the quarter.|
| period_no           | The quarter can be offset by period_no. period_no is an integer, where the value 0 indicates the quarter which contains base_date. Negative values in period_no indicate preceding quarters and positive values indicate succeeding quarters. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inquarter ('25/01/2013', '01/01/2013', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inquarter ('25/01/2013', '01/04/2013', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inquarter ('25/01/2013', '01/01/2013', -1)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inquarter ('25/12/2012', '01/01/2013', -1)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td>inquarter ('25/01/2013', '01/03/2013', 0, 3)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inquarter ('25/03/2013', '01/03/2013', 0, 3)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in the fourth quarter of the fiscal year specified by setting the value of first_month_of_year to 4, and having the base_date 31/01/2013.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InQuarter(InvDate, '31/01/2013', 0, 4) AS Qtr4FinYr1213</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inquarter() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>Qtr4Fin1213</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inquartertodate - script and chart function

This function returns True if **timestamp** lies inside the part of the quarter containing
 **base_date** up until and including the last millisecond of **base_date** .

`InQuarterToDate( timestamp, base_date, period_no [, first_month_of_year] )`

**Return data type:** Boolean

| Argument            | Description|
| ------------------- | -------------------------------------------- |
| timestamp           | The date that you want to compare with base_date. |
| base_date           | Date that is used to evaluate the quarter.|
| period_no           | The quarter can be offset by period_no. period_no is an integer, where the value 0 indicates the quarter which contains base_date. Negative values in period_no indicate preceding quarters and positive values indicate succeeding quarters. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inquartertodate ('25/01/2013', '25/01/2013', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inquartertodate ( 25/01/2013', '24/01/2013', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inquartertodate ('25/01/2012', '01/02/2013', -1)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in a fiscal year specified by setting the value of first_month_of_year to 4, and in the fourth quarter, before the end of 28/02/2013.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InQuarterToDate(InvDate, '28/02/2013', 0, 4) AS Qtr42Date</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inquartertodate() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>Qtr42Date</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inweek - script and chart function

This function returns True if **timestamp** 
lies inside the week containing **base_date**.

`InWeek( timestamp, base_date, period_no[, first_week_day] )`

**Return data type:** boolean

| Argument       | Description |
| -------------- | ----------------------------------------- |
| timestamp      | The date that you want to compare with base_date. |
| base_date      | Date that is used to evaluate the week.|
| period_no      | The week can be offset by period_no. period_no is an integer, where the value 0 indicates the week which contains base_date. Negative values in period_no indicate preceding weeks and positive values indicate succeeding weeks. |
| first_week_day | By default, the first day of the week is Monday,starting at midnight between Sunday and Monday. To indicate the week starting on another day, specify an offset in **first_week_day. This may be given as a whole number of days and/or fractions of a day.                                                                                                                                                                                                                                                                                       |

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inweek ('12/01/2006', '14/01/2006', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inweek ('12/01/2006', '20/01/2006', 0 )</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inweek ('12/01/2006', '14/01/2006', -1 )</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inweek ('07/01/2006', '14/01/2006', -1)</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td>inweek ('12/01/2006', '09/01/2006', 0, 3)</td>
<td>Returns False<br />
Because first_week_day is specified as 3 (Thursday), which makes 12/01/2006 the first day of the week following the week containing 09/01/2006.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls at any time in the fourth week after the week in base_date, by specifying period_no as 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InWeek(InvDate, '11/01/2013', 4) AS InWeekPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the inweek() function.</p>
<p>The InvDate5/2/2013 falls within the week that is four weeks after the base_date: 11/1/2013.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InWeekPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inweektodate - script and chart function

This function returns True if **timestamp** 
lies inside the part of week containing **base_date** up until and including the last millisecond of **base_date**.

`InWeekToDate( timestamp, base_date, period_no [, first_week_day] )`

**Return data type:** Boolean

| Argument       | Description |
| ---------------| --------------------------------- |
| timestamp      | The date that you want to compare with base_date.|
| base_date      | Date that is used to evaluate the week.|
| period_no      | The week can be offset by period_no. period_no is an integer, where the value 0 indicates the week which contains base_date. Negative values in period_no indicate preceding weeks and positive values indicate succeeding weeks. |
| first_week_day | By default, the first day of the week is Monday,starting at midnight between Sunday and Monday. To indicate the week starting on another day, specify an offset in first_week_day. This may be given as a whole number of days and/or fractions of a day.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inweektodate ('12/01/2006', '12/01/2006', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inweektodate ('12/01/2006', '11/01/2006', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inweektodate ('12/01/2006', '18/01/2006', -1)</td>
<td>Returns False<br />
Because period_no is specified as -1, the effective data that timestamp is measured against is 11/01/2006.</td>
</tr>
<tr class="even">
<td>inweektodate ( '11/01/2006', '12/01/2006', 0, 3 )</td>
<td>Returns False<br />
Because first_week_day is specified as 3 (Thursday), which makes 12/01/2006 the first day of the week following the week containing 12/01/2006.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls during the fourth week after the week in base_date, by specifying period_no as 4, but before the value of base_date.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InWeekToDate(InvDate, '11/01/2013', 4) AS InWeek2DPlus4</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the inweek() function.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>InWeek2DPlus4</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inyear - script and chart function

This function returns True if **timestamp** lies inside the year containing **base_date** .

`InYear( timestamp, base_date, period_no [, first_month_of_year] )`

**Return data type:** Boolean


| Argument            | Description |
| ------------------- | ------------------------ |
| timestamp           | The date that you want to compare with base_date. |
| base_date           | Date that is used to evaluate the year. |
| period_no           | 	The year can be offset by period_no. period_no is an integer, where the value 0 indicates the year that contains base_date. Negative values in period_no indicate preceding years, and positive values indicate succeeding years. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in first_month_of_year.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inyear ('25/01/2013', '01/01/2013', 0 )</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inyear ('25/01/2012', '01/01/2013', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inyear ('25/01/2013', '01/01/2013', -1)</td>
<td>Returns False</td>
</tr>
<tr class="even">
<td>inyear ('25/01/2012', '01/01/2013', -1 )</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td>inyear ('25/01/2013', '01/01/2013', 0, 3)</td>
<td><p>Returns True</p>
<p>The value of base_date and first_month_of_year specify that timestamp must fall within 01/03/2012 and 28/02/2013</p></td>
</tr>
<tr class="even">
<td>inyear ('25/03/2013', '01/07/2013', 0, 3 )</td>
<td>Returns True</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in the fiscal year specified by setting the value of first_month_of_year to 4, and having the base_date between 1/4/2012 and 31/03/2013.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>Test if InvDate is in the financial year 1/04/2012 to 31/03/2013:</p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InYear(InvDate, '31/01/2013', 0, 4) AS FinYr1213</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inyear() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>FinYr1213</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## inyeartodate - script and chart function

This function returns True if **timestamp** lies inside the part of year containing **base_date** 
up until and including the last millisecond of **base_date**.

`InYearToDate( timestamp, base_date, period_no[, first_month_of_year] )`

**Return data type:** Boolean

| Argument            | Description |
| ------------------- | ------------------------------------------------------------- |
| timestamp           | The date that you want to compare with base_date. |
| base_date           | Date that is used to evaluate the year.|
| period_no           | The year can be offset by period_no. period_no is an integer, where the value 0 indicates the year that contains base_date. Negative values in period_no indicate preceding years, and positive values indicate succeeding years. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>inyeartodate ('2013/01/25', '2013/02/01', 0)</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inyeartodate ('2012/01/25', '2013/01/01', 0)</td>
<td>Returns False</td>
</tr>
<tr class="odd">
<td>inyeartodate ('2012/01/25', '2013/02/01', - )</td>
<td>Returns True</td>
</tr>
<tr class="even">
<td>inyeartodate ('2012/11/25', '2013/01/31', 0, 4)</td>
<td>Returns True<br />
The value of timestamp falls inside the fiscal year beginning in the fourth month and before the value of base_date.</td>
</tr>
<tr class="odd">
<td>inyeartodate ( '2013/3/31', '2013/01/31', 0, 4 )</td>
<td>Returns False<br />
Compared with the previous example, the value of timestamp is still inside the fiscal year, but it is after the value of base_date, so it falls outside the part of the year.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example checks if an invoice date falls in a fiscal year specified by setting the value of first_month_of_year to 4, and in the part of the year before the end of 31/01/2013.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>InYearToDate(InvDate, '31/01/2013', 0, 4) AS FinYr2Date</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the inyeartodate() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>FinYr2Date</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>-1 (True)</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>0 (False)</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>0 (False)</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>0 (False)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## lastworkdate - script and chart function

The **lastworkdate** function returns the earliest ending date to achieve **no_of_workdays** 
(Monday-Friday) if starting at **start_date** taking into account any optionally listed. **start_date**
and **holiday** should be valid dates or timestamps. 

`Lastworkdate( start_date, no_of_workdays {, holiday} )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> start_date </td>
<td>The start date to evaluate.</td>
</tr>
<tr class="even">
<td> no_of_workdays</td>
<td>The number of working days to achieve.</td>
</tr>
<tr class="odd">
<td> holiday</td>
<td><p>Holiday periods to exclude from working days. A holiday period is stated as a start date and an end date, separated by commas.</p>
<p> '25/12/2013', '26/12/2013'</p>
<p>You can specify more than one holiday period, separated by commas.</p>
<p> '25/12/2013', '26/12/2013', '31/12/2013', '01/01/2014'</p></td>
</tr>
</tbody>
</table>

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>lastworkdate ('19/12/2014', 9)</td>
<td>Returns '31/12/2014'  </td>
</tr>
<tr class="even">
<td>lastworkdate ('19/12/2014', 9, '2014-12-25', '2014-12-26')</td>
<td>Returns '02/01/2015 as a holiday period of two days is taken into account.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>ProjectTable:</p>
<p>LOAD *, recno() as InvID, INLINE [</p>
<p>StartDate</p>
<p>28/03/2014</p>
<p>10/12/2014</p>
<p>5/2/2015</p>
<p>31/3/2015</p>
<p>19/5/2015</p>
<p>15/9/2015</p>
<p>] ;</p>
<p>NrDays:</p>
<p>Load *,</p>
<p>LastWorkDate(StartDate,120) As EndDate</p>
<p>Resident ProjectTable;</p>
<p>Drop table ProjectTable;</p>
<p><span class="Code" data-autonumposition="none"> </p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of LastWorkDate for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvID</td>
<td>StartDate</td>
<td>EndDate</td>
</tr>
<tr class="even">
<td>1</td>
<td>28/03/2014</td>
<td>11/09/2014</td>
</tr>
<tr class="odd">
<td>2</td>
<td>10/12/2014</td>
<td>26/05/2015</td>
</tr>
<tr class="even">
<td>3</td>
<td>5/2/2015</td>
<td>27/07/2015</td>
</tr>
<tr class="odd">
<td>4</td>
<td>31/3/2015</td>
<td>14/09/2015</td>
</tr>
<tr class="even">
<td>5</td>
<td>19/5/2015</td>
<td>02/11/2015</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15/9/2015</td>
<td>29/02/2016</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## localtime - script and chart function

This function returns a timestamp of the current time from the system
clock for a specified time zone.

`LocalTime([ timezone [, ignoreDST ]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>timezone</td>
<td><p>The  timezone is specified as a string containing any of the geographical places listed under Time Zone in the Windows Control Panel for Date and Time  or as a string in the form 'GMT+hh:mm'.</p>
<p>If no time zone is specified the local time will be returned.</p></td>
</tr>
<tr class="even">
<td>ignoreDST</td>
<td>If  ignoreDST  is -1 (True) daylight savings time will be ignored.</td>
</tr>
</tbody>
</table>

 

The examples below are based on the function being called on 2014-10-22
12:54:47 local time, with the local time zone being
GMT+01:00.

| Example                  | Result |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| localtime ()             | Returns the local time 2014-10-22 12:54:47.                                              |
| localtime ('London')     | Returns the local time in London, 2014-10-22 11:54:47.                                   |
| localtime ('GMT+02:00')  | Returns the local time in the timezone of GMT+02:00, 2014-10-22 13:54:47.                |
| localtime ('Paris','-1') | Returns the local time in Paris with daylight savings time ignored, 2014-10-22 11:54:47. |

## lunarweekend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the lunar week containing **date**.
Lunar weeks in Qlik Sense are defined by counting 1 January as the first
day of the week.

`LunarweekEnd( date[, period_no[, first_week_day]] )`

**Return data type:** dual

| Argument       | Description|
| -------------- | --------------------------- |
| date           | The date to evaluate.|
| period_no      | period_no is an integer or expression resolving to an integer, where the value 0 indicates the lunar week which contains **date** . Negative values in period_no indicate preceding lunar weeks and positive values indicate succeeding lunar weeks. |
| first_week_day | An offset that may be greater than or less than zero. This changes the beginning of the year by the specified number of days and/or fractions of a day.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>lunarweekend('12/01/2013')</td>
<td>Returns 14/01/2013 23:59:59.</td>
</tr>
<tr class="even">
<td>lunarweekend('12/01/2013', -1)</td>
<td>Returns 7/01/2013 23:59:59.</td>
</tr>
<tr class="odd">
<td>lunarweekend('12/01/2013', 0, 1)</td>
<td>Returns 15/01/2013 23:59:59.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the final day of the lunar week of each invoice date in the table, where the date is shifted by one week by specifying period_no as 1.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>LunarWeekEnd(InvDate, 1) AS LWkEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the lunarweekend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>LWkEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>07/04/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>22/12/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>18/02/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>08/04/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>27/05/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>23/09/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>23/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>11/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>27/05/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>24/06/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>15/07/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>12/08/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## lunarweekname - script and chart function

This function returns a display value showing the year and lunar week
number corresponding to a timestamp of the first millisecond of the
first day of the lunar week containing **date**.
Lunar weeks in Qlik Sense are defined by counting 1 January as the first
day of the week.

`LunarWeekName( date [, period_no[, first_week_day]] )`

**Return data type:** dual

| Argument        | Description|
| --------------- | ---------------------- |
|  date           | The date to evaluate.|
|  period_no      | period_no is an integer or expression resolving to an integer, where the value 0 indicates the lunar week which contains **date** . Negative values in period_no indicate preceding lunar weeks and positive values indicate succeeding lunar weeks. |
|  first_week_day | An offset that may be greater than or less than zero. This changes the beginning of the year by the specified number of days and/or fractions of a day.|

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>lunarweekname('12/01/2013')</td>
<td>Returns 2006/02.</td>
</tr>
<tr class="even">
<td>lunarweekname('12/01/2013', -1)</td>
<td>Returns 2006/01.</td>
</tr>
<tr class="odd">
<td>lunarweekname('12/01/2013', 0, 1)</td>
<td>Returns 2006/02.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, for each invoice date in the table, the lunar week name is created from the year in which the week lies and its associated lunar week number, shifted one week by specifying period_no as 1.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>LunarWeekName(InvDate, 1) AS LWkName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the lunarweekname() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>LWkName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>2012/14</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>2012/51</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>2013/07</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>2013/14</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>2013/21</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>2013/38</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>2013/51</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>2014/10</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>2014/21</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>2014/25</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>2014/28</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>2014/32</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## lunarweekstart - script and chart function

This function returns a value corresponding to a timestamp of the first
millisecond of the lunar week containing **date** .
Lunar weeks in Qlik Sense are defined by counting 1 January as the first
day of the week.

`LunarweekStart( date[, period_no[, first_week_day]] )`

**Return data type:** dual

| Argument| Description|
| -------- | ---------------------- |
| date | The date to evaluate.|
| period_no       | period_no is an integer or expression resolving to an integer, where the value 0 indicates the lunar week which contains **date** . Negative values in period_no indicate preceding lunar weeks and positive values indicate succeeding lunar weeks. |
| first_week_day | An offset that may be greater than or less than zero. This changes the beginning of the year by the specified number of days and/or fractions of a day.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>lunarweekstart('12/01/2013')</td>
<td>Returns 08/01/2013.</td>
</tr>
<tr class="even">
<td>lunarweekstart('12/01/2013', -1)</td>
<td>Returns 01/01/2013.</td>
</tr>
<tr class="odd">
<td>lunarweekstart('12/01/2013', 0, 1 )</td>
<td>Returns 09/01/2013.<br />
Because the offset specified by setting first_week_day to 1 means the beginning of the year is changed to 02/01/2013.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day of the lunar week of each invoice date in the table, where the date is shifted by one week by specifying period_no as 1.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>LunarWeekStart(InvDate, 1) AS LWkStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the lunarweekstart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>LWkStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>01/04/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>16/12/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>12/02/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>02/04/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>21/05/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>17/09/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>17/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>05/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>21/05/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>18/06/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>09/07/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>06/08/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## makedate - script and chart function

This function returns a date calculated from the year **YYYY** ,
the month **MM** and the day **DD** .

`MakeDate( YYYY [ , MM [ , DD ]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>YYYY</td>
<td>The year as an integer.</td>
</tr>
<tr class="even">
<td>MM</td>
<td>The month as an integer. If no month is stated, 1 (January) is assumed.</td>
</tr>
<tr class="odd">
<td>DD</td>
<td>The day as an integer.
<p>If no day is stated, 1 (the 1st) is assumed.</p></td>
</tr>
</tbody>
</table>

Examples and results:

| Example             | Result             |
| ------------------- | ------------------ |
| makedate(2012)      | returns 2012-01-01 |
| makedate(12)        | returns 0012-01-01 |
| makedate(2012,12)   | returns 2012-12-01 |
| makedate(2012,2,14) | returns 2012-02-14 |

## maketime - script and chart function

This function returns a time calculated from the hour **hh**, the minute **mm**,
and the second **ss**.

`MakeTime( hh [ , mm [ , ss ]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>hh</td>
<td>The hour as an integer.</td>
</tr>
<tr class="even">
<td>mm</td>
<td><p>The minute as an integer.</p>
<p>If no minute is stated, 00 is assumed.</p></td>
</tr>
<tr class="odd">
<td>ss</td>
<td><p>The second as an integer.</p>
<p>If no second is stated, 00 is assumed.</p></td>
</tr>
</tbody>
</table>

Examples and
results:

| Example                | Result           |
| ---------------------- | ---------------- |
| maketime( 22 )         | returns 22:00:00 |
| maketime( 22, 17 )     | returns 22:17:00 |
| maketime( 22, 17, 52 ) | returns 22:17:52 |

## makeweekdate - script and chart function

This function returns a date calculated from the year **YYYY** ,the week **WW** 
and the day-of-week **D**.

`MakeWeekDate( YYYY [ , WW [ , D ]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>YYYY</td>
<td>The year as an integer.</td>
</tr>
<tr class="even">
<td>WW</td>
<td>The week as an integer.</td>
</tr>
<tr class="odd">
<td>D</td>
<td><p>The day-of-week as an integer.</p>
<p>If no day-of-week is stated, 0 (Monday) is assumed.</p></td>
</tr>
</tbody>
</table>

Examples and
results:

| Example                | Result                                    |
| ---------------------- | ----------------------------------------- |
| makeweekdate(2014,6,6) | returns 2014-02-09                        |
| makeweekdate(2014,6,1) | returns 2014-02-04                        |
| makeweekdate(2014,6)   | returns 2014-02-03 (weekday 0 is assumed) |

### minute - script and chart function

This function returns an integer representing the minute when the
fraction of the **expression** 
is interpreted as a time according to the standard number interpretation.

`Minute( expression )`

**Return data type:** integer

Examples and results:

| Example               | Result                                   |
| --------------------- | ---------------------------------------- |
| minute ( '09:14:36' ) | returns 14                               |
| minute ( '0.5555' )   | returns 19 ( Because 0.5555 = 13:19:55 ) |

## month - script and chart function

This function returns a dual value: a month name as defined in the
environment variable **MonthNames**  and an integer between 1-12. The month is calculated from the date
interpretation of the expression, according to the standard number
interpretation.

`Month( expression )` 

**Return data type:** dual

Examples and results:

| Example               | Result                                  |
| --------------------- | --------------------------------------- |
| month( '2012-10-12' ) | returns Oct                             |
| month( '35648' )      | returns Aug, because 35648 = 1997-08-06 |

## monthend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the last day of the month containing **date**.
The default output format will be the **DateFormat** set in the script.

`MonthEnd( date[, period_no] )`

**Return data type:** dual

| Argument  | Description|
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| date      | The date to evaluate.|
| period_no | period_no is an integer, which, if 0 or omitted, indicates the month that contains **date** . Negative values in **period_no indicate preceding months and positive values indicate succeeding months. |

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthend('19/02/2012')</td>
<td>Returns 29/02/2012 23:59:59.</td>
</tr>
<tr class="even">
<td>monthend('19/02/2001', -1)</td>
<td>Returns 31/01/2001 23:59:59.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the last day in the month of each invoice date in the table, where the base date is shifted by four months by specifying period_no as 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthEnd(InvDate, 4) AS MthEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the monthend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>MthEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>31/07/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>30/04/2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>30/06/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>31/07/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>30/09/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>31/01//2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>30/04//2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>31/07//2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>30/09/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>31/10/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>30/11/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>31/12/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## monthname - script and chart function

This function returns a display value showing the month (formatted
according to the **MonthNames** script variable) and year with an underlying numeric value corresponding
to a timestamp of the first millisecond of the first day of the month.

`MonthName( date[, period_no] )`

**Return data type:** dual

| Argument  | Description|
| --------- | ------------------------------------------------- |
| date      | The date to evaluate.|
| period_no | period_no is an integer, which, if 0 or omitted, indicates the month that contains **date** . Negative values in **period_no indicate preceding months and positive values indicate succeeding months. |

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthname('19/10/2013')</td>
<td>Returns Oct 2013.<br />
Because in this and the other examples, the ** SET Monthnames**  statement is set to Jan;Feb;Mar, and so on.</td>
</tr>
<tr class="even">
<td>monthname('19/10/2013', -1)</td>
<td>Returns Sep 2013.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, for each invoice date in the table, the month name is created from the month name shifted four months from base_date, and from the year.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthName(InvDate, 4) AS MthName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the monthname() function. In</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>MthName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>Jul 2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>Apr 2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>Jun 2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>Jul 2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>Sep 2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>Jan 2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>Apr 2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>Jul 2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>Sep 2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>Oct 2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>Nov 2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>Dec 2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## monthsend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the month, bi-month, quarter, tertial, or half-year
containing a base date. It is also possible to find the timestamp for a
previous or following time period.

`MonthsEnd( n_months, date[, period_no [, first_month_of_year]] )`

**Return data type:** dual

 

| Argument            | Description |
| ------------------- | ---------------------------------------- |
| n_months            | The number of months that defines the period. An integer or expression that resolves to an integer that must be one of: 1 (equivalent to the inmonth() function), 2 (bi-month), 3 (equivalent to the inquarter() function), 4 (tertial), or 6 (half year). |
| date                | The date to evaluate. |
| period_no           | The period can be offset by period_no, an integer, or expression resolving to an integer, where the value 0 indicates the period that contains base_date. Negative values in period_no indicate preceding periods and positive values indicate succeeding periods. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthsend(4, '19/07/2013')</td>
<td>Returns 31/08/2013.</td>
</tr>
<tr class="even">
<td>monthsend(4, '19/10/2013', -1)</td>
<td>Returns 31/08/2013.</td>
</tr>
<tr class="odd">
<td>monthsend(4, '19/10/2013', 0, 2)</td>
<td>Returns 31/01/2014.<br />
Because the start of the year becomes month 2.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the end of the final day of bi-month period for each invoice date, shifted forwards by one bi-month period.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthsEnd(2, InvDate, 1) AS BiMthsEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the MonthsEnd() function.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>BiMthsEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>30/06/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>28/02/2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>30/04/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>30/04/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>31/08/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>31/12/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>28/02/2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>30/06/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>31/08/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>31/08/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>31/10/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>31/10/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## monthsname - script and chart function

This function returns a display value representing the range of the
months of the period (formatted according to the **MonthNames** 
script variable) as well as the year. The underlying numeric value
corresponds to a timestamp of the first millisecond of the month,
bi-month, quarter, tertial, or half-year containing a base date.

`MonthsName( n_months, date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

 

| Argument            | Description |
| ------------------- | --------------------------------------------- |
| n_months            | The number of months that defines the period. An integer or expression that resolves to an integer that must be one of: 1 (equivalent to the inmonth() function), 2 (bi-month), 3 (equivalent to the inquarter() function), 4 (tertial), or 6 (half year).|
| date                | The date to evaluate. |
| period_no           | The period can be offset by period_no, an integer, or expression resolving to an integer, where the value 0 indicates the period that contains base_date. Negative values in period_no indicate preceding periods and positive values indicate succeeding periods.|
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthsname(4, '19/10/2013')</td>
<td>Returns 'Sep-Dec 2013.<br />
Because in this and the other examples, the ** SET Monthnames**  statement is set to Jan;Feb;Mar, and so on.<br />
</td>
</tr>
<tr class="even">
<td>monthsname(4, '19/10/2013', -1)</td>
<td>Returns 'May-Aug 2013.</td>
</tr>
<tr class="odd">
<td>monthsname(4, '19/10/2013', 0, 2)</td>
<td>Returns Oct-Jan 2014.<br />
Because the year is specified to begin in month 2, therefore the four-month period ends on the first month of the following year.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, for each invoice date in the table, the months name is created from the range of months in the bi-month period, and from the year. The range is offset by 4x2 months by specifying period_no as 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthsName(2, InvDate, 4) AS MthsName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the monthsname() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>MthsName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>Nov-Dec 2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>Jul-Aug 2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>Sep-Oct 2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>Nov-Dec2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>Jan-Feb 2014</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>May-Jun 2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>Jul-Aug 2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>Nov-Dec 2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>Jan-Feb 2015</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>Jan-Feb 2015</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>Mar-Apr 2015</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>Mar-Apr 2015</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## monthsstart - script and chart function

This function returns a value corresponding to the timestamp of the
first millisecond of the month, bi-month, quarter, tertial, or half-year
containing a base date. It is also possible to find the timestamp for a
previous or following time period.

`MonthsStart( n_months, date[, period_no [, first_month_of_year]] )`

**Return data type:** dual
 

| Argument            | Description |
| ------------------- | ------------------------------------------- |
| n_months            | The number of months that defines the period. An integer or expression that resolves to an integer that must be one of: 1 (equivalent to the inmonth() function), 2 (bi-month), 3 (equivalent to the inquarter() function), 4 (tertial), or 6 (half year).|
| date                | The date to evaluate.|
| period_no           | The period can be offset by period_no, an integer, or expression resolving to an integer, where the value 0 indicates the period that contains base_date. Negative values in period_no indicate preceding periods and positive values indicate succeeding periods. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthsstart(4, '19/10/2013')</td>
<td>Returns 1/09/2013.</td>
</tr>
<tr class="even">
<td>monthsstart(4, '19/10/2013, -1)</td>
<td>Returns 01/05/2013.</td>
</tr>
<tr class="odd">
<td>monthsstart(4, '19/10/2013', 0, 2 )</td>
<td>Returns 01/10/2013.<br />
Because the start of the year becomes month 2.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day of the bi-month period for each invoice date, shifted forwards by one bi-month period.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthsStart(2, InvDate, 1) AS BiMthsStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td><p>The resulting table contains the original dates and a column with the return value of the MonthsStart() function.</p></td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>BiMthsStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>01/05/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>01/01/2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>01/03/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/05/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>01/07/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>01/11/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>01/01/2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>01/05/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>01/07/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>01/07/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>01/09/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>01/09/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## monthstart - script and chart function

This function returns a value corresponding to a timestamp of the first
millisecond of the first day of the month containing **date** .
The default output format will be the **DateFormat** set in the script.

`MonthStart( date[, period_no] )`

**Return data type:** dual

| Argument  | Description|
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| date      | The date to evaluate.|
| period_no | period_no is an integer, which, if 0 or omitted, indicates the month that contains **date**. Negative values in **period_no indicate preceding months and positive values indicate succeeding months. |

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>monthstart('19/10/2001')</td>
<td>Returns 01/10/2001.</td>
</tr>
<tr class="even">
<td>monthstart('19/10/2001', -1)</td>
<td>Returns 01/09/2001.</td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day in the month of each invoice date in the table, where the base_date is shifted by four months by specifying period_no as 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>MonthStart(InvDate, 4) AS MthStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the monthstart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>MthStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>01/07/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>01/04/2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>01/06/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/07/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>01/09/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>01/01/2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>01/04/2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>01/07/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>01/09/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>01/10/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>01/11/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>01/12/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## networkdays - script and chart function

The **networkdays** function returns the number of working days (Monday-Friday) between and
including **start_date** and **end_date** taking into account any optionally listed **holiday**.

`Networkdays( start_date, end_date [, holiday] )`

**Return data type:** integer

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> **start_date** </td>
<td>The start date to evaluate.</td>
</tr>
<tr class="even">
<td> **end_date** </td>
<td>The end date to evaluate.</td>
</tr>
<tr class="odd">
<td> **holiday** </td>
<td><p>Holiday periods to exclude from working days. A holiday period is stated as a start date and an end date, separated by commas.</p>
<p> '25/12/2013', '26/12/2013'</p>
<p>You can specify more than one holiday period, separated by commas.</p>
<p> '25/12/2013', '26/12/2013', '31/12/2013', '01/01/2014'</p></td>
</tr>
</tbody>
</table>

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>networkdays ('19/12/2013', '07/01/2014')</td>
<td>Returns 14. This example does not take holidays into account.</td>
</tr>
<tr class="even">
<td>networkdays ('19/12/2013', '07/01/2014', '25/12/2013', '26/12/2013')</td>
<td>Returns 12. This example takes the holiday 25/12/2013 to 26/12/2013 into account.</td>
</tr>
<tr class="odd">
<td>networkdays ('19/12/2013', '07/01/2014', '25/12/2013', '26/12/2013', '31/12/2013', '01/01/2014')</td>
<td>Returns 10. This example takes two holiday periods into account.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>PayTable:</p>
<p>LOAD recno() as InvID, * INLINE [</p>
<p>InvRec|InvPaid</p>
<p>28/03/2012|28/04/2012</p>
<p>10/12/2012|01/01/2013</p>
<p>5/2/2013|5/3/2013</p>
<p>31/3/2013|01/5/2013</p>
<p>19/5/2013|12/6/2013</p>
<p>15/9/2013|6/10/2013</p>
<p>11/12/2013|12/01/2014</p>
<p>2/3/2014|2/4/2014</p>
<p>14/5/2014|14/6/2014</p>
<p>13/6/2014|14/7/2014</p>
<p>7/7/2014|14/8/2014</p>
<p>4/8/2014|4/9/2014</p>
<p>] (delimiter is '|');</p>
<p>NrDays:</p>
<p>Load *,</p>
<p>NetWorkDays(InvRec,InvPaid) As PaidDays</p>
<p>Resident PayTable;</p>
<p>Drop table PayTable;</p>
<p><span class="Code" data-autonumposition="none"> </p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table shows the returned values of NetworkDays for each of the records in the table.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvID</td>
<td>InvRec</td>
<td>InvPaid</td>
<td>PaidDays</td>
</tr>
<tr class="even">
<td>1</td>
<td>28/03/2012</td>
<td>28/04/2012</td>
<td>23</td>
</tr>
<tr class="odd">
<td>2</td>
<td>10/12/2012</td>
<td>01/01/2013</td>
<td>17</td>
</tr>
<tr class="even">
<td>3</td>
<td>5/2/2013</td>
<td>5/3/2013</td>
<td>21</td>
</tr>
<tr class="odd">
<td>4</td>
<td>31/3/2013</td>
<td>01/5/2013</td>
<td>23</td>
</tr>
<tr class="even">
<td>5</td>
<td>19/5/2013</td>
<td>12/6/2013</td>
<td>18</td>
</tr>
<tr class="odd">
<td>6</td>
<td>15/9/2013</td>
<td>6/10/2013</td>
<td>15</td>
</tr>
<tr class="even">
<td>7</td>
<td>11/12/2013</td>
<td>12/01/2014</td>
<td>23</td>
</tr>
<tr class="odd">
<td>8</td>
<td>2/3/2014</td>
<td>2/4/2014</td>
<td>23</td>
</tr>
<tr class="even">
<td>9</td>
<td>14/5/2014</td>
<td>14/6/2014</td>
<td>23</td>
</tr>
<tr class="odd">
<td>10</td>
<td>13/6/2014</td>
<td>14/7/2014</td>
<td>22</td>
</tr>
<tr class="even">
<td>11</td>
<td>7/7/2014</td>
<td>14/8/2014</td>
<td>29</td>
</tr>
<tr class="odd">
<td>12</td>
<td>4/8/2014</td>
<td>4/9/2014</td>
<td>24</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## now - script and chart function

This function returns a timestamp of the current time from the system
clock. The default value is 1.

`Now( [timer_mode] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>timer_mode</td>
<td><p>Can have the following values:</p>
<p>0 (time at last finished data load)<br />
1 (time at function call)<br />
2 (time when the app was opened)</p>

If you use the function in a data load script,  **timer_mode=0 will result in the time of the last finished data load, while **timer_mode=1**  will give the time of the function call in the current data load.
</td>
</tr>
</tbody>
</table>

 

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>now( 0)</p></td>
<td><p>Returns the time when the last data load completed.</p></td>
</tr>
<tr class="even">
<td><p>now( 1)</p></td>
<td><ul>
<li>When used in a visualization expression, this returns the time of the function call.</li>
<li>When used in a data load script, this returns the time of the function call in the current data load.</li>
</ul></td>
</tr>
<tr class="odd">
<td><p>now( 2)</p></td>
<td><p>Returns the time when the app was opened.</p></td>
</tr>
</tbody>
</table>

## quarterend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the quarter containing **date** .
The default output format will be the **DateFormat** set in the script.

`QuarterEnd( date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

| Argument            | Description|
| ------------------- | ---------------------------- |
| date                | The date to evaluate.|
| period_no           | period_no is an integer, where the value 0 indicates the quarter which contains **date** . Negative values in period_no indicate preceding quarters and positive values indicate succeeding quarters. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year**.|

Examples and results:

These examples use the date format DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>quarterend('29/10/2005')</td>
<td>Returns 31/12/2005 23:59:59.</td>
</tr>
<tr class="even">
<td>quarterend('29/10/2005', -1)</td>
<td>Returns 30/09/2005 23:59:59.</td>
</tr>
<tr class="odd">
<td>quarterend('29/10/2005', 0, 3)</td>
<td>Returns 30/11/2005 23:59:59.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the last day in the quarter of each invoice date in the table, where the first month in the year is specified as month 3.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>QuarterEnd(InvDate, 0, 3) AS QtrEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the quarterend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>QtrEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>31/05/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>28/02/2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>28/02/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>31/05/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>31/05/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>30/11/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>28/02/2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>31/05/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>31/05/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>31/08/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>31/08/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>31/08/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## quartername - script and chart function

This function returns a display value showing the months of the quarter
(formatted according to the **MonthNames** script variable) and year with an underlying numeric value corresponding
to a timestamp of the first millisecond of the first day of the quarter.

`QuarterName( date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

| Argument            | Description|
| ------------------- | ------------------------------------ |
| date                | The date to evaluate.|
| period_no           | period_no is an integer, where the value 0 indicates the quarter which contains **date**. Negative values in **period_no indicate preceding quarters and positive values indicate succeeding quarters. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year** .|

Examples and results:

<table style="width:50%;">
<colgroup>
<col style="width: 50%" />
<col style="width: 0%" />
</colgroup>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>quartername('29/10/2013')</td>
<td>Returns Oct-Dec 2013.</td>
</tr>
<tr class="even">
<td>quartername('29/10/2013', -1)</td>
<td>Returns Jul-Sep 2013.</td>
</tr>
<tr class="odd">
<td>quartername('29/10/2013', 0, 3)</td>
<td>Returns Sep-Nov 2013.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, for each invoice date in the table, the quarter name is created based on the quarter containing InvID. The first month of the year is specified as month 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>QuarterName(InvDate, 0, 4) AS QtrName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the quartername() function.</td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 30%" />
<col style="width: 70%" />
</colgroup>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>QtrName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>Jan-Mar 2011</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>Oct-Dec 2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>Jan-Mar 2012</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>Jan-Mar 2012</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>Apr-Jun 2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>Jul-Sep 2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>Oct-Dec 2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>Jan-Mar 2013</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>Apr-Jun 2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>Apr-Jun 2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>Jul-Sep 2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>Jul-Sep 2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## quarterstart - script and chart function

This function returns a value corresponding to a timestamp of the first
millisecond of the quarter containing **date**.
The default output format will be the **DateFormat** set in the script.

`QuarterStart( date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

 

| Argument            | Description |
| ------------------- | -------------------------------------- |
| date                | The date to evaluate.|
| period_no           | period_no is an integer, where the value 0 indicates the quarter which contains **date** . Negative values in period_no indicate preceding quarters and positive values indicate succeeding quarters. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year** .|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>quarterstart('29/10/2005')</td>
<td>Returns 01/10/2005.</td>
</tr>
<tr class="even">
<td>quarterstart('29/10/2005', -1 )</td>
<td>Returns 01/07/2005.</td>
</tr>
<tr class="odd">
<td>quarterstart('29/10/2005', 0, 3)</td>
<td>Returns 01/09/2005.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day in the quarter of each invoice date in the table, where the first month in the year is specified as month 3.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>QuarterStart(InvDate, 0, 3) AS QtrStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the quarterstart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>QtrStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>01/03/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>01/12/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>01/12/2012</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/03/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>01/03/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>01/09/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>01/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>01/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>01/03/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>01/06/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>01/06/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>01/06/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## second - script and chart function

This function returns an integer representing the second when the
fraction of the **expression** is interpreted as a time according to the standard number interpretation.

`second( expression )`

**Return data type:** integer

Examples and results:

| Example              | Result                                   |
| -------------------- | ---------------------------------------- |
| second( '09:14:36' ) | returns 36                               |
| second( '0.5555' )   | returns 55 ( Because 0.5555 = 13:19:55 ) |

## setdateyear - script and chart function

This function takes as input a timestamp and a year and updates the
timestamp with the year specified in input.

`setdateyear( timestamp, year )`

**Return data type:** dual

 

| Argument  | Description                                          |
| --------- | ---------------------------------------------------- |
| timestamp | A standard Qlik timestamp (often just a date).       |
| year      | A four-digit year.                                   |

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>setdateyear ('29/10/2005', 2013)</td>
<td>Returns '29/10/2013</td>
</tr>
<tr class="even">
<td>setdateyear ('29/10/2005 04:26:14', 2013)</td>
<td><p>Returns '29/10/2013 04:26:14'<br />
To see the time part of the timestamp in a visualization, you must set the number formatting to Date and choose a value for Formatting that displays time values.</p></td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>SetYear:</p>
<p>Load *,</p>
<p>SetDateYear(testdates, 2013) as NewYear</p>
<p>Inline [</p>
<p>testdates</p>
<p>1/11/2012</p>
<p>10/12/2012</p>
<p>1/5/2013</p>
<p>2/1/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column in which the year has be set to 2013.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>testdates</td>
<td>NewYear</td>
</tr>
<tr class="even">
<td>1/11/2012</td>
<td>1/11/2013</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>10/12/2013</td>
</tr>
<tr class="even">
<td>2/1/2012</td>
<td>2/1/2013</td>
</tr>
<tr class="odd">
<td>1/5/2013</td>
<td>1/5/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>19/5/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>15/9/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>11/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>2/3/2013</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>14/5/2013</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>13/6/2013</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>7/7/2013</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>4/8/2013</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## setdateyearmonth - script and chart function

This function takes as input a **timestamp**,
a month and a year and updates the timestamp with the **year** 
and the month specified in input.

`SetDateYearMonth( timestamp, year, month )`

**Return data type:** dual

 

| Argument  | Description                                          |
| --------- | ---------------------------------------------------- |
| timestamp | A standard Qlik timestamp (often just a date).       |
| year      | A four-digit year.                                   |
| month     | A one or two-digit month.                            |

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>setdateyearmonth ('29/10/2005', 2013, 3)</td>
<td>Returns '29/03/2013</td>
</tr>
<tr class="even">
<td>setdateyearmonth ('29/10/2005 04:26:14', 2013, 3)</td>
<td>Returns '29/03/2013 04:26:14'<br />

<p>To see the time part of the timestamp in a visualization, you must set the number formatting to Date and choose a value for Formatting that displays time values.</p></td>
</tr>
<tr class="odd">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>SetYearMonth:</p>
<p>Load *,</p>
<p>SetDateYearMonth(testdates, 2013,3) as NewYearMonth</p>
<p>Inline [</p>
<p>testdates</p>
<p>1/11/2012</p>
<p>10/12/2012</p>
<p>2/1/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column in which the year has be set to 2013.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>testdates</td>
<td>NewYearMonth</td>
</tr>
<tr class="even">
<td>1/11/2012</td>
<td>1/3/2013</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>10/3/2013</td>
</tr>
<tr class="even">
<td>2/1/2012</td>
<td>2/3/2013</td>
</tr>
<tr class="odd">
<td>19/5/2013</td>
<td>19/3/2013</td>
</tr>
<tr class="even">
<td>15/9/2013</td>
<td>15/3/2013</td>
</tr>
<tr class="odd">
<td>11/12/2013</td>
<td>11/3/2013</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>14/3/2013</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>13/3/2013</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>7/3/2013</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>4/3/2013</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## timezone - script and chart function

This function returns the name of the current time zone, as defined in Windows.

`TimeZone()`

**Return data type:** string

## today - script and chart function

This function returns the current date from the system clock.

`Today( [timer_mode] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>timer_mode</td>
<td><p>Can have the following values:</p>
<p>0 (day of last finished data load)<br />
1 (day of function call)<br />
2 (day when the app was opened)</p>

If you use the function in a data load script,  **timer_mode=0 will result in the day of the last finished data load, while **timer_mode=1**  will give the day of the current data load.
</td>
</tr>
</tbody>
</table>

 

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Today( 0)</p></td>
<td><p>Returns the day of the last finished data load.</p></td>
</tr>
<tr class="even">
<td><p>Today( 1)</p></td>
<td><p>When used in a visualization expression, this returns the day of the function call.</p>
<p>When used in a data load script, this returns the day when the current data load started.</p></td>
</tr>
<tr class="odd">
<td><p>Today( 2)</p></td>
<td><p>Returns the day when the app was opened.</p></td>
</tr>
</tbody>
</table>

## UTC - script and chart function

Returns the current Coordinated Universal Time.

`UTC()`

**Return data type:** dual

# week - script and chart function

This function returns an integer representing the week number according
to ISO 8601. The week number is calculated from the date interpretation
of the expression, according to the standard number
interpretation.

`week( timestamp [, first_week_day [, broken_weeks [, reference_day]]] )`

**Return data type:** integer

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> **timestamp** </td>
<td>The date to evaluate as a timestamp or expression resolving to a timestamp, to convert, for example '2012-10-12'.</td>
</tr>
<tr class="even">
<td> <td><p>If you don't specify  **first_week_day** , the value of variable **FirstWeekDay will be used as the first day of the week.</p>
<p>If you want to use another day as the first day of the week, set  **first_week_day**  to:</p>
<ul>
<li>0 for Monday</li>
<li>1 for Tuesday</li>
<li>2 for Wednesday</li>
<li>3 for Thursday</li>
<li>4 for Friday</li>
<li>5 for Saturday</li>
<li>6 for Sunday</li>
</ul>
<p>The integer returned by the function will now use the first day of the week that you set with  **first_week_day** .</p>
<p><em>FirstWeekDay</em></p></td>
</tr>
<tr class="odd">
<td> <td><p>If you don't specify broken_weeks, the value of variable **BrokenWeeks will be used to define if weeks are broken or not.</p>
<p>By default Qlik Sense functions use unbroken weeks. This means that:</p>
<ul>
<li>In some years, week 1 starts in December, and in other years, week 52 or 53 continues into January.</li>
<li>Week 1 always has at least 4 days in January.</li>
</ul>
<p>The alternative is to use broken weeks.</p>
<ul>
<li>Week 52 or 53 do not continue into January.</li>
<li>Week 1 starts on January 1 and is, in most cases, not a full week.</li>
</ul>
<p>The following values can be used:</p>
<ul>
<li>0 (=use unbroken weeks)</li>
<li>1 (= use broken weeks)</li>
</ul>
<p><em>BrokenWeeks</em></p></td>
</tr>
<tr class="even">
<td> <td><p>If you don't specify reference_day, the value of variable **ReferenceDay will be used to define which day in January to set as reference day to define week 1. By default, Qlik Sense functions use 4 as the reference day. This means that week 1 must contain January 4, or put differently, that week 1 must always have at least 4 days in January.</p>
<p>The following values can be used to set a different reference day:</p>
<ul>
<li>1 (= January 1)</li>
<li>2 (= January 2)</li>
<li>3 (= January 3)</li>
<li>4 (= January 4)</li>
<li>5 (= January 5)</li>
<li>6 (= January 6)</li>
<li>7 (= January 7)</li>
</ul>
<p><em>ReferenceDay</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

| Example                  | Result                                 |
| ------------------------ | -------------------------------------- |
| week( '2012-10-12' )     | returns 41.                            |
| week( '35648' )          | returns 32, because 35648 = 1997-08-06 |
| week('2012-10-12', 0, 1) | returns 42                             |

## weekday - script and chart function

This function returns a dual value with:

  - A day name as defined in the environment variable **DayNames**.
  - An integer between 0-6 corresponding to the nominal day of the week (0-6).

`weekday( date [,first_week_day=0] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> date </td>
<td>The date to evaluate.</td>
</tr>
<tr class="even">
<td> <td><p>If you don't specify  **first_week_day** , the value of variable **FirstWeekDay will be used as the first day of the week.</p>
<p>If you want to use another day as the first day of the week, set  **first_week_day**  to:</p>
<ul>
<li>0 for Monday</li>
<li>1 for Tuesday</li>
<li>2 for Wednesday</li>
<li>3 for Thursday</li>
<li>4 for Friday</li>
<li>5 for Saturday</li>
<li>6 for Sunday</li>
</ul>
<p>The integer returned by the function will now use the first day of the week that you set with  **first_week_day**  as base (0).</p>
<p><em>FirstWeekDay</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

Unless it is stated specifically, **FirstWeekDay** is set to 0 in these examples.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>weekday( '1971-10-12' )</p></td>
<td><p>returns 'Tue' and 1</p></td>
</tr>
<tr class="even">
<td>weekday( '1971-10-12' , 6)</td>
<td><p>returns 'Tue' and 2.</p>
<p>In this example we use Sunday (6) as the first day of the week.</p></td>
</tr>
<tr class="odd">
<td><p>SET FirstWeekDay = 6;</p>
<p>...</p>
weekday( '1971-10-12')</td>
<td>returns 'Tue' and 2.</td>
</tr>
</tbody>
</table>

## weekend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the last day (Sunday) of the calendar week containing **date** 
The default output format will be the **DateFormat** set in the script.

`WeekEnd( date [, period_no[, first_week_day]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> date </td>
<td>The date to evaluate.</td>
</tr>
<tr class="even">
<td> <td> shift  is an integer, where the value 0 indicates the week which contains **date. Negative values in shift indicate preceding weeks and positive values indicate succeeding weeks.</td>
</tr>
<tr class="odd">
<td> <td><p>Specifies the day on which the week starts. If omitted, the value of variable **FirstWeekDay is used.</p>
<p>The possible values  **first_week_day**  are:</p>
<ul>
<li>0 for Monday</li>
<li>1 for Tuesday</li>
<li>2 for Wednesday</li>
<li>3 for Thursday</li>
<li>4 for Friday</li>
<li>5 for Saturday</li>
<li>6 for Sunday</li>
</ul>
<p><em>FirstWeekDay</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>weekend('10/01/2013')</td>
<td>Returns 12/01/2013 23:59:59.</td>
</tr>
<tr class="even">
<td>weekend('10/01/2013', -1)</td>
<td>Returns 06/01/2013 23:59:59.</td>
</tr>
<tr class="odd">
<td>weekend('10/01/2013', 0, 1)</td>
<td>Returns 14/01/2013 23:59:59.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the final day in the week following the week of each invoice date in the table.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>WeekEnd(InvDate, 1) AS WkEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the weekend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>WkEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>08/04/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>23/12/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>17/02/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>07/04/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>26/05/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>22/09/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>22/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>09/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>25/05/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>22/06/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>20/07/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>17/08/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## weekname - script and chart function

This function returns a value showing the year and week number with an
underlying numeric value corresponding to a timestamp of the first
millisecond of the first day of the week containing **date**.

`WeekName( date[, period_no[,first_week_day]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> date </td>
<td>The date to evaluate.</td>
</tr>
<tr class="even">
<td> <td> shift  is an integer, where the value 0 indicates the week which contains date. Negative values in shift indicate preceding weeks and positive values indicate succeeding weeks.</td>
</tr>
<tr class="odd">
<td> <td><p>Specifies the day on which the week starts. If omitted, the value of variable **FirstWeekDay is used.</p>
<p>The possible values  **first_week_day**  are:</p>
<ul>
<li>0 for Monday</li>
<li>1 for Tuesday</li>
<li>2 for Wednesday</li>
<li>3 for Thursday</li>
<li>4 for Friday</li>
<li>5 for Saturday</li>
<li>6 for Sunday</li>
</ul>
<p><em>FirstWeekDay</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>weekname('12/01/2013')</td>
<td>Returns 2013/02.</td>
</tr>
<tr class="even">
<td>weekname('12/01/2013', -1)</td>
<td>Returns 2013/01.</td>
</tr>
<tr class="odd">
<td>weekname('12/01/2013', 0, 1)</td>
<td>Returns '2013/02.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>In this example, for each invoice date in the table, the week name is created from the year in which the week lies and its associated week number, shifted one week by specifying period_no as 1.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>WeekName(InvDate, 1) AS WkName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the weekname() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>WkName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>2012/14</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>2012/51</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>2013/07</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>2013/14</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>2013/21</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>2013/38</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>2013/51</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>2014/10</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>2014/21</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>2014/25</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>2014/29</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>2014/33</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## weekstart - script and chart function

This function returns a value corresponding to a timestamp of the first
millisecond of the first day (Monday) of the calendar week containing
 **date** .
The default output format is the **DateFormat** set in the script.

`WeekStart( date [, period_no[, first_week_day]] )`

**Return data type:** dual

<table>
<thead>
<tr class="header">
<th>Argument</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> date </td>
<td>The date to evaluate.</td>
</tr>
<tr class="even">
<td> <td> shift  is an integer, where the value 0 indicates the week which contains **date. Negative values in shift indicate preceding weeks and positive values indicate succeeding weeks.</td>
</tr>
<tr class="odd">
<td> <td><p>Specifies the day on which the week starts. If omitted, the value of variable **FirstWeekDay is used.</p>
<p>The possible values  **first_week_day**  are:</p>
<ul>
<li>0 for Monday</li>
<li>1 for Tuesday</li>
<li>2 for Wednesday</li>
<li>3 for Thursday</li>
<li>4 for Friday</li>
<li>5 for Saturday</li>
<li>6 for Sunday</li>
</ul>
<p><em>FirstWeekDay</em></p></td>
</tr>
</tbody>
</table>

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>weekstart('12/01/2013')</td>
<td>Returns 07/01/2013.</td>
</tr>
<tr class="even">
<td>weekstart('12/01/2013', -1 )</td>
<td>Returns 31/11/2012.</td>
</tr>
<tr class="odd">
<td>weekstart('12/01/2013', 0, 1)</td>
<td>Returns 08/01/2013.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day of the week following the week of each invoice date in the table.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>WeekStart(InvDate, 1) AS WkStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the weekstart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>WkStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>02/04/2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>17/12/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>11/02/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/04/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>20/05/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>16/09/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>16/12/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>03/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>19/05/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>16/06/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>14/07/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>11/08/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## weekyear - script and chart function

This function returns the year to which the week number belongs
according to ISO 8601. The week number ranges between 1 and
approximately 52.

`weekyear( expression )`

Return data type: integer

Examples and results:

| Example                  | Result                                                    |
| ------------------------ | --------------------------------------------------------- |
| weekyear( '1996-12-30' ) | returns 1997, because week 1 of 1998 starts on 1996-12-30 |
| weekyear( '1997-01-02' ) | returns 1997                                              |
| weekyear( '1997-12-28' ) | returns 1997                                              |
| weekyear( '1997-12-30' ) | returns 1998, because week 1 of 1998 starts on 1997-12-29 |
| weekyear( '1999-01-02' ) | returns 1998, because week 53 of 1998 ends on 1999-01-03  |

 

Some years, week #1 starts in December, e.g. December 1997. Other years
start with week #53 of previous year, e.g. January 1999. For those few
days when the week number belongs to another year, the functions
 **year** and **weekyear** will return different values.

## year - script and chart function

This function returns an integer representing the year when the
 **expression** is interpreted as a date according to the standard number
interpretation.

`year( expression )`

**Return data type:** integer

Examples and results:

| Example              | Result                                   |
| -------------------- | ---------------------------------------- |
| year( '2012-10-12' ) | returns 2012                             |
| year( '35648' )      | returns 1997, because 35648 = 1997-08-06 |

## yearend - script and chart function

This function returns a value corresponding to a timestamp of the last
millisecond of the last day of the year containing **date**.
The default output format will be the **DateFormat** set in the script.

`YearEnd( date[, period_no[, first_month_of_year = 1]] )`

**Return data type:** dual 

| Argument            | Description          |
| ------------------- | -------------------- |
| date                | The date to evaluate.|
| period_no           | period_no is an integer, where the value 0 indicates the year which contains **date** . Negative values in **period_no indicate preceding years and positive values indicate succeeding years. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year**.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>yearend ( '19/10/2001' )</td>
<td>Returns 31/12/2001 23:59:59.</td>
</tr>
<tr class="even">
<td>yearend ( '19/10/2001', -1 )</td>
<td>Returns 31/12/2000 23:59:59.</td>
</tr>
<tr class="odd">
<td>yearend ( '19/10/2001', 0, 4)</td>
<td>Returns 31/03/2002 23:59:59.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the final day in the year of each invoice date in the table, where the first month in the year is specified as month 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>YearEnd(InvDate, 0, 4) AS YrEnd</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the yearend() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>YrEnd</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>31/03/2011</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>31/03/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>31/03/2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>31/03/2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>31/03/2014</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>31/03/2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>31/03/2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>31/03/2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>31/03/2015</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>31/03/2015</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>31/03/2015</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>31/03/2015</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## yearname - script and chart function

This function returns a four-digit year as display value with an
underlying numeric value corresponding to a timestamp of the first
millisecond of the first day of the year containing **date**.

`YearName( date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

 

| Argument             | Description          |
| -------------------- | -------------------- |
| date                 | The date to evaluate.|
| period_no            | period_no is an integer, where the value 0 indicates the year which contains **date** . Negative values in **period_no indicate preceding years and positive values indicate succeeding years. |
|  first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year** . The display value will then be a string showing two years.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>yearname ( '19/10/2001')</td>
<td>Returns 2001.</td>
</tr>
<tr class="even">
<td>yearname ( '19/10/2001', -1 )</td>
<td>Returns '2000.</td>
</tr>
<tr class="odd">
<td>yearname ( '19/10/2001', 0, 4)</td>
<td>Returns '2001-2002.</td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example creates a four-plus-four digit name for the years in which each invoice date in the table is found. This is because the first month in the year is specified as month 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>YearName(InvDate, 0, 4) AS YrName</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the yearname() function.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>YrName</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>2011-2012</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>2012-2013</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>2012-2013</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>2012-2013</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>2013-2014</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>2013-2014</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>2013-2014</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>2013-2014</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>2014-2015</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>2014-2015</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>2014-2015</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>2014-2015</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## yearstart - script and chart function

This function returns a timestamp corresponding to the start of the
first day of the year containing **date**.
The default output format will be the **DateFormat** set in the script.

`YearStart( date[, period_no[, first_month_of_year]] )`

**Return data type:** dual

| Argument            | Description          |
| ------------------- | -------------------- |
| date                | The date to evaluate.|
| period_no           | period_no is an integer, where the value 0 indicates the year which contains **date** . Negative values in **period_no indicate preceding years and positive values indicate succeeding years. |
| first_month_of_year | If you want to work with (fiscal) years not starting in January, indicate a value between 2 and 12 in **first_month_of_year**.|

Examples and results:

These examples use the date format
DD/MM/YYYY.
The date format is specified in the
SET DateFormat statement at the top of your data load script. Change
the format in the examples to suit your requirements.

<table>
<thead>
<tr class="header">
<th>Example</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>yearstart ('19/10/2001')</td>
<td>Returns 01/01/2001.</td>
</tr>
<tr class="even">
<td>yearstart ('19/10/2001', -1)</td>
<td>Returns 01/01/2000.</td>
</tr>
<tr class="odd">
<td>yearstart ('19/10/2001', 0, 4)</td>
<td><p>Returns 01/04/2001.</p></td>
</tr>
<tr class="even">
<td><p>Add the example script to your app and run it. Then add, at least, the fields listed in the results column to a sheet in your app to see the result.</p>
<p>This example finds the first day in the year of each invoice date in the table, where the first month in the year is specified as month 4.</p>
<p>TempTable:</p>
<p>LOAD RecNo() as InvID, * Inline [</p>
<p>InvDate</p>
<p>28/03/2012</p>
<p>10/12/2012</p>
<p>5/2/2013</p>
<p>31/3/2013</p>
<p>19/5/2013</p>
<p>15/9/2013</p>
<p>11/12/2013</p>
<p>2/3/2014</p>
<p>14/5/2014</p>
<p>13/6/2014</p>
<p>7/7/2014</p>
<p>4/8/2014</p>
<p>];</p>
<p> </p>
<p>InvoiceData:</p>
<p>LOAD *,</p>
<p>YearStart(InvDate, 0, 4) AS YrStart</p>
<p>Resident TempTable;</p>
<p>Drop table TempTable;</p></td>
<td><table>
<tbody>
<tr class="odd">
<td>The resulting table contains the original dates and a column with the return value of the yearstart() function. You can display the full timestamp by specifying the formatting in the properties panel.</td>
</tr>
<tr class="even">
<td><table>
<tbody>
<tr class="odd">
<td>InvDate</td>
<td>YrStart</td>
</tr>
<tr class="even">
<td>28/03/2012</td>
<td>01/04/2011</td>
</tr>
<tr class="odd">
<td>10/12/2012</td>
<td>01/04/2012</td>
</tr>
<tr class="even">
<td>5/2/2013</td>
<td>01/04/2012</td>
</tr>
<tr class="odd">
<td>31/3/2013</td>
<td>01/04/2012</td>
</tr>
<tr class="even">
<td>19/5/2013</td>
<td>01/04/2013</td>
</tr>
<tr class="odd">
<td>15/9/2013</td>
<td>01/04/2013</td>
</tr>
<tr class="even">
<td>11/12/2013</td>
<td>01/04/2013</td>
</tr>
<tr class="odd">
<td>2/3/2014</td>
<td>01/04/2013</td>
</tr>
<tr class="even">
<td>14/5/2014</td>
<td>01/04/2014</td>
</tr>
<tr class="odd">
<td>13/6/2014</td>
<td>01/04/2014</td>
</tr>
<tr class="even">
<td>7/7/2014</td>
<td>01/04/2014</td>
</tr>
<tr class="odd">
<td>4/8/2014</td>
<td>01/04/2014</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

## yeartodate - script and chart function

This function finds if the input timestamp falls within the year of the
date the script was last loaded, and returns True if it does, False if
it does not.

`YearToDate( timestamp[ , yearoffset [ , firstmonth [ , todaydate]]] )`
 
**Return data type:** Boolean

If none of the optional parameters are used, the year to date means any
date within one calendar year from January 1 up to and including the
date of the last script
execution.

 

| Argument   | Description                                          |
| ---------- |----------------------------------------------------- |
| timestamp  | The timestamp to evaluate, for example '2012-10-12'. |
| yearoffset | By specifying a  indicates a previous year, a positive offset a future year. The most recent year-to-date is achieved by specifying yearoffset = -1. If omitted, 0 is assumed. |
| firstmonth | By specifying a  **firstmonth**  between 1 and 12 (1 if omitted) the beginning of the year may be moved forward to the first day of any month. For example, if you want to work with a fiscal year beginning on May 1, specify **firstmonth = 5.|
| todaydate  | By specifying a  **todaydate**  (timestamp of the last script execution if omitted) it is possible to move the day used as the upper boundary of the period. 

Examples and results:

The following examples assume last reload time =
2011-11-18

| Example                                       | Result        |
| --------------------------------------------- | ------------- |
| yeartodate( '2010-11-18')                     | returns False |
| yeartodate( '2011-02-01')                     | returns True  |
| yeartodate( '2011-11-18')                     | returns True  |
| yeartodate( '2011-11-19')                     | returns False |
| yeartodate( '2011-11-19', 0, 1, '2011-12-31') | returns True  |
| yeartodate( '2010-11-18', -1)                 | returns True  |
| yeartodate( '2011-11-18', -1)                 | returns False |
| yeartodate( '2011-04-30', 0, 5)               | returns False |
| yeartodate( '2011-05-01', 0, 5)               | returns True  |
