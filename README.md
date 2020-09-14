# temp-check
Temp-check is a application allows you to check in on the temperatures of the people you care about over SMS while updating others on yours. (**Note: this application is not currently deployed for public use. The code is shared here for interest and discussion's sake.**)

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

## Tech overview

Temp-check is structured as a NodeJS application, intended to be run as a micro-service API that can be deployed to the cloud. When a user messages a phone number (provided by Twilio), the service makes a callback to the microservice, which queries a cloud database and triggers a response with the relevant data. The repository is intended for continuous-deployment - with any code changes triggering a rebuild and re-deployment of the service to the Google Cloud.

## Design pricinples and data privacy

This broad design principles behind the application:
- Optimise for less.
  - Actively be as low tech as possible in all its interactions with users. 
  - Minimise required (or even possible) interactions with the service.  
  - Use simple language and clear instructions in all messages. Keep it short. 
- Store no data, at all, whenever possible.
  - Store no phone numbers! 
  - If it _must_ store data, the data should be deleted as soon as possible.  
  - If the data _has to_ be stored, it must be stored in as low fidelity as possible. (The service currently  stores the last few digits of the sender's number.)

# Tech
## Key architectural decisions
- The application runs as a microservice that can be scaled and deployed to multiple numbers/backends/datastores easily. It is currently set up to be continuously deployed using Google's Cloud services (specifically, Cloud Build, the Container Registry, and Cloud Run). Any push to this master branch will result in a new microservice being deployed.
- The messages themselves are stored in Google Firebase. 
- The application is based on NodeJS
