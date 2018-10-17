# Updates

## October 2018

A little bit more than a month has passed since Qlik Core went from beta to a live product. During this month we have
focused on adding tools to support experienced and new developers in their journey to start working with Qlik Core.

### corectl

First versions of [corectl](https://github.com/qlik-oss/corectl) was released initial bug fixing, documentation and
usability enhancements. The goal is to deliver a command line interface (CLI) for the Qlik Associative Engine that can be used to
interact with your apps, objects, and data.

![screenshot](./images/corectl.png)

Main use case are:

* View: List applications, view and query data within and evaluate expressions
* Develop: Create, update and model a Qlik application
* Script: Automate certain tasks like schedule a reload of an application

After initial feedback we also added support for:

* [generic objects](https://github.com/qlik-oss/corectl/issues/63)
* [json output](https://github.com/qlik-oss/corectl/issues/74)

[Full change log](https://github.com/qlik-oss/corectl/releases)

### catwalk

Next step after addressing the load and view use case we looked into data modelling and created the
[catwalk](https://github.com/qlik-oss/catwalk) project. After the users has created an initial load script they quickly
end up in the data modelling problem space and need to find out how the data is associated and how selections impacts
the model. After creating two prototypes we ended up with a combined view where we focus tables fields and their
relations. The project is in its early phases and we are experimenting with how we should provide an as good user
experience as possible.

As most of our work the code is open and resides in github, you can follow the project from our initial
[prototypes](https://github.com/qlik-oss/catwalk/tree/prototype2) to the current version on the main branch.

![screenshot](https://github.com/qlik-oss/catwalk/raw/master/screenshot.png)

### mira

MIRA reached version 1.0 with a major change to not require a sidecar management component to talk to the
[kubernetes](https://kubernetes.io/) APIS to request deployment data.
