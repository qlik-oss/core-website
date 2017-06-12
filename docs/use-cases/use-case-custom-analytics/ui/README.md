# Use case: Custom Analytics UI

**WORK IN PROGRESS**

## UI and visualization

![Viz one](./1.png)

DIMENSIONS: 
Medical Description Reaction: [Medical Description Reaction]  
  
MEASURES:
\# Patient Cases: Count(Demographic_Caseid)  
\# Unique Drugs: Count(distinct Drugname)  
\# Drug Cases: Count(Drug_caseID)  

![Viz two](./2.png)

DIMENSIONS:  
Medical Description Drug Use: [Medical Description Drug Use]  
  
MEASURES:  
\# Patient Cases: Count(Demographic_Caseid)  
\# Unique Drugs: Count(distinct Drugname)  
\# Drug Cases: Count(Drug_caseID)    
  
![Viz three](./3.png)

DIMENSIONS:  
Drug Role Event: [Drug Role Event]  
  
MEASURES:  
\# Drug Cases: Count(Drug_caseID)

![Viz four](./4.png)

DIMENSIONS:  
Patient Age Group: [Patient Age Group]  
  
MEASURES:  
\# Death by primary suspect: Count({<[Drug Role Event] = {'Primary Suspect Drug'},[Medical Description Reaction] = {'Death'} >}Demographic_Caseid)  

![Viz five](./5.png)

DIMENSIONS:  
Manufacturer Code Name: [Manufacturer Code Name]  
Patient Event Outcome: [Patient Event Outcome]    
  
MEASURES:  
\# Drug Cases: Count(Drug_caseID)

![Viz six](./6.png)

DIMENSIONS:  
Reaction Therapy Stop:[Reaction Therapy Stop]  
  
MEASURES:  
\# Patient Cases: Count(Demographic_Caseid)  
\# Drug Cases: Count(Drug_caseID)  

## UI Overview

![UI one](./7.png)
![UI two](./8.png)
![UI three](./9.png)