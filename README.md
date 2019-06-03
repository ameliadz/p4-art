# P4: a thing about art - title TBD

## Plans

### Overview:
Art event database using React on Rails. I'd like to use auth and maybe even a map. Picture upload would be cool too. I don't really know how to do any of that. Gonna use info from the [Art Beat API](https://www.nyartbeat.com/resources/doc/api), but it comes in XML so I'll have to convert it to JSON.<br />
**User stories**: My user is Art Paintbrush, and Art would really like to stay in the loop on cool local art events. Maybe he even does art and wants to let people know about his upcoming gallery show. He probably wants to bookmark upcoming events and I bet he'd want to save them to his calendar, but that all seems like a lot so I should probably just pick one thing.<br />
**Timeline**: 6/3 - flesh out idea. 6/4 - build database. 6/7 - present nearly-completed product.<br />

### Wireframes
![image1 2](https://media.git.generalassemb.ly/user/19640/files/35b77d00-861a-11e9-9041-cb6db1c8864a)<br />
vague sketch of a home page

### ERDs
![image1 1](https://media.git.generalassemb.ly/user/19640/files/3996cf80-8619-11e9-8685-349bb82f776b)<br />
^ I just realized this doesn't include auth tho. I would like to implement auth. Which means I'll need a users table. I guess the users (who would want accounts) will be people who are coordinating events, like gallery owners or whatever. They'll be able to log in, create events, etc. Although I'd really like to give regular art consumers the ability to add events to a calendar. Maybe that'll be Post-MVP, cuz it will require a separate type of auth to make a "viewer" profile or whatever to bookmark events.
