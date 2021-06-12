# Omnilytics Programming Challenge - API

This project is bare react app made with npm init

## The Challennge

**Challenge Description**

Write a Web app using React.js to generate four (4) types of printable random  
objects and store them in a single file, each object will be separated by a ",".\  
These are the 4 objects: alphabetical strings, real numbers, integers, alphanumerics.\
Sample extracted output:

`hisadfnnasd, 126263, assfdgsga12348fas, 13123.123,`  
`lizierdjfklaasf, 123192u3kjwekhf, 89181811238,122,`  
`nmarcysfa900jkifh  , 3.781, 2.11, ....`

The output should be 2MB in size. Once file generation is done the output should be available   
as a link which can be then downloaded by clicking on it. Also, there should be a button on the   
page so by clicking on this button the total number of each random objects will be displayed.


**Note: The backend API must be written using Flask (Python) or Express frameworks.  
All the communication between frontend and backend MUST be done via these APIs only.**

## The Product 

**Links associated with API**  

`/` - returns basic information

`/generate`  - returns solution in linear approach (for localhost)

`/generateMultiPartRandomObject`  - returns solution in multipart approach (for low end servers)

API Part can be found on this link: [HEROKU](https://opc-api.herokuapp.com/) - [EC2](http://54.255.196.92:3000) - [GIT](https://github.com/thecasualdev17/opc_api)  
UI Part can be found in here [APP](https://opc-ui.netlify.app/) - [GIT](https://github.com/thecasualdev17/opc_ui)