# temp-check
This application allows you to check in on the temperatures of the people you care about over SMS while updating others on yours. 

## How it works
1) You SMS a phone number with your latest temperature reading
2) In response, you receive a response with the latest updates/temperature reading of those you care about

E.g.  
You send a simple update to the phone number:  
> 36.8  

You receive a response from the phone number:  

> UPDATES:  
> ~BOB, 03/04 6:15pm, 37.2  
> ~ALICE, 05/04 1:47am, 34.2  
> ~EVE, 01/04 11:18am, 38.1   

## Design pricinples and data privacy

This broad design principles behind the application:
- Optimise for less.
  - Actively be as low tech as possible in all its interactions with users. 
  - Minimise required (or even possible) interactions with the service.  
  - Use simple language and clear instructions in all messages. Keep it short. 
- Store no data, at all, whenever possible.
  - Store no phone numbers!
  - If it _must_ store data, the data should be deleted as soon as possible.  
  - If the data _has to_ be stored, it must be stored in as low fidelity as possible.  

# Tech
## Key architectural decisions
- The application runs as a microservice that can be scaled and deployed to multiple numbers/backends/datastores easily.
- The application is based on NodeJS
