CONTENT MANAGEMENT DASHBOARD SECURED BY PERMIT.IO API-FIRST SOFTWARE AS A SERVICE

#Dashboard Functionality
My applications aims to benefit from the current trend of API-first approaches, all the main operations and suboperations are carried out in remote severs and workspaces.  The core functionalities, POST USERS and BUGS are all served through API. 
Authentication and Authorizations too have leveraged the API-first idea.

1. POST tab
   The post tab support view of the posts.
   It allows search of post based on category, too general but is important
   Allows search for post based on title, titles are unique, best chance of singling out your target
   Alter option on top right: Make post
                            : Delete post
                            : Update post attributes
   All operations originate from a backend server.

2.USERS tab
    View users who subscribed to newsletter
    Search for subscriber using email
    Download CSV for mailing services
    Delete subscribers --- require admin 
    
3. BUGS tab
    Detailed server error logs on the dashboard
    Error attributes are -- error code, trigger, stack trace and time of occurance
    A "Mark as Resolved" button.
   
   NOTE: BUGS tab is only accessile to the admin only.
         All these operations are initiated in the frontend and effected from the backend APIs.

#Authentication and authorization
1.Authentication
Simple login page for verification of expected users. Also doubles as the initializer of user.

2. Permit.io Authorization
   I used 
   i) Dynamic UI control --- you dont have the authorization? this optioned is faded out and disabled
   ii) Fine-grained permission check---policies live outside the code
   iii) Reusable "PermissionCheck" frontend component --- declarative protection in the frontend, largely depend on backend rules
   iv) Backend layer --- protection to suppliment the front end.

HOW PERMIT.IO WORKS
1. 

  BACKEND
  Installation of Permit.io in Node.js environment --- npm install permitio
  Easy, hit you npm install and use their cloud hosted dashboard.
  Import Permit module from permitio-- import {Permit} from "permitio"
  Explore the workspace and declare your rules --- roles, resources and operations externally.
  Create a permit function from the top-level function.
  Create a checkpoint route called from frontend to check permissions using api-key and Permit.io cloud URL.

  FRONTEND
  I used a jsx module technique where, i created module PermissionGate in a file, used it to wrap options in my dashboard 
  requiring authorization from backend. Retrieves variables needed to check authorization from the modules it was imported i.e:
  userId, resource, and action --- all necessary for the permit.io role based authorization.

  PERMISSION MODEL
  The roles are: newuser(109) and admin(1009)
  Resources: post(post view and manipulations), sendEmail(Subscribers), debugPage(BUGS tab)

  Admin permissions; 
      1.post --- all CRUD operations
      2.sendEmail --- all operations -read and delete
      3.debugPage --- delete and upadate(Mark as resolved)

  newuser/writer permissions; 
      1.post --- all CRUD operations
      2.sendEmail --- operations -read but no delete
      3.debugPage --- no access
  SECURITY
  As much as i use the API-first authorization and verification, on a pull , use https and sanitize your inputs for more security.

  Conclusion
  This project demonstrates how to design with authorization first, using external policy logic to scale cleanly and securely.   I didn’t scatter access rules inside route handlers — I pull them out, make them reusable, and centralized them via Permit.io.
If you're building APIs meant to scale or be maintained by others, this is the way. And also, if you want only headache to be your core functionalities API-first approaches like Permit.io is the way.

  CONTRIBUTIONS
  You can forward any suggestion, PRs and improvements for this project to jackokebe64@gmail.com. Thanks.

  Made with sweat, burnouts and love by ---- JACK ORWA ----


