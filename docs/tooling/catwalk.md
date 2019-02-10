# catwalk

![catwalk](https://github.com/qlik-oss/catwalk/raw/master/src/assets/catwalk.svg?sanitize=true)

After you have created the initial load script, chances are that you experience data modeling problems. In such cases,
you may need help finding out how the data is associated and how interactions with the data impacts the model.

Catwalk provides you with a view of all your tables, fields, their associations as well as information about the data
within.

![screenshot](https://github.com/qlik-oss/catwalk/raw/master/images/screenshot.png)

## Usage

You can use catwalk in the following ways:

* provide a link to an engine websocket at [catwalk](https://catwalk.core.qlik.com/)
* open an application from corectl by `corectl catwalk --app my-app.qvf`
* clone the [catwalk repo](https://github.com/qlik-oss/catwalk) and run the tool locally

If no websocket configuration is provided, catwalk defaults to localhost:9076.

!!! Note
    The Qlik application's content is transferred directly from the engine to the web browser through a websocket. I.e.
    no data is sent to Qlik or any 3:rd party. Beside this Qlik collects anonymous usage data through Google Analytics
    such as browser version and catwalk exceptions.

## Best practices and techniques

Catwalk provides an alternative view of the Qlik application's data model compared to existing products. However best
practices and data modelling techniques are the same and can be found on the
[Qlik help page](https://help.qlik.com/en-US/sense/Subsystems/Hub/Content/Sense_Hub/DataModeling/best-practices-data-modeling.htm).
