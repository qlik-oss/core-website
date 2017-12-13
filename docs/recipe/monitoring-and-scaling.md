# Monitoring and Scaling

## Key monitoring metrics
Mira includes a metrics endpoint that will return the status of available QIX engines. 
Each QIX engine also include metric endpoint that will list active sessions, active 

## Session placement
New session should be placed on QIX engines that have free available resources, it is usually RAM memory that is needed.

## Indicators when to scale

### Up-scaling
When the metrics are indicating that all available QIX Engine hosts are running low on resources is a critical indicator that new hosts are needed. Make sure that new hosts are added well in advance hosts getting to saturated and unresponsive.

It is advantageous to plan up-scaling according to anticipated traffic. One example could be to have all needed engine hosts up and running before the office hours start.   

### Down-scaling


## System recommendations




Original questions:

Monitoring/Scaling
1.	How do I get an overview of my system?
a.	What metrics are interesting to look at? (can we use the metrics available on Confluence, will Engine expose these somewhere with the release of the Linux engine? Discuss with Engine)
i.	For the future: MIRA visualizer? 
2.	How do I know where to place a session?
a.	Which metrics can be used for session placement, describe a couple of scenarios
3.	How do I know when to scale up and down?
a.	Good indicators for when I need to scale up and down
4.	How do I know what system (“size” of infrastructure) I need? (Discuss with Scalability around what they have for Qlik Sense and how that can be used for Linux engine?)
a.	Algorithm that help you answer what infrastructure I need?
