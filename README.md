
UI Developer Test


Considerations:

	- I coded this app using PHP as backend only because it was the only technology required. But if I 
	where to do the same app I will probably do not use PHP because today there are methods to access any REST api returning json using javascript on the client side (aka browser).

	I build a working example of this URL:

		http://cristiangrajales.co/tmDb_no_php/

	It uses JSONp to make the crossdomain request  cristiangrajales.co <--> private-7bcf-themoviedb.apiary.io

	- Once I have the app on the client side fully working against themoviedb.org API I build my own API on cristiangrajales.co and the only thing I changed on the client apart from the datasources URL was the returned format
	from JSONP to rest, as cross domain request were not necessary anymore.

	- To give some functionality to the PHP backend apart of acting as a proxy I did two caching levels, first it checks for client caching using the last modified and expires header. So we can use the browser cache to reduce the server load. Second there is a server cache using redis server. The redis connection parameter are set to my free instance on  "redis4you.com" but the server cache is disabled by default because I can't use that connection on my shared hosting. If you are using localhost or a server that allows you to connect the try it.

	- I decided to use a mobile framework to the client because, first I am currently working on building mobile apps so I tend to make everything to mobile platforms. And second I asked for any additional requirements and no more requirements were given. If I had been told that it should work on IE 6 for example I would have used another framework.



Working Example:

	A working example can be found at:

		http://cristiangrajales.co/tmDb/



Requirements:
	
	- These are the requirements to run the app, based on the frameworks used.
		
		- PHP 5.3.3+ compiled with the cURL extension.
             -  A recent version of cURL 7.16.2+ compiled with OpenSSL and zlib
 


Frameworks:

	- On the client side:
		
		Sencha touch 2.2.1:  As I explained before I tend to do every thing mobile first and sencha touch (ST) is an excellent job for html5 powered apps. What I like more about ST is not that you can create controls without giving any html or css code. What I really like is way the javascript code is structured when using this frame work. It has a class system. There are no real classes since it is javascript and we just have prototypes but the approximation is excellent. We have also an MVC pattern approximation and model persistence is a kids game. connecting to a rest api for example is out of the box.

	- On the server side:
				
		Slim: "slimframework.com"  Looking to the requirements for this app I decided to use a micro framework because I pro "use the right tool for the job".  The app was small, I was building an API so basically a need routes. No ORM need, no AUTH need. A full framework will bring a lot of modules that I would not use.

		Guzzle: "guzzlephp.org"  Guzzle specialises on creating http clients which was exactly what I needed to conner to 	themoviedb.org API. Also has a caching features which I found really useful.

		Predis: I use this one to connect to a redis server and give server caching functionality to the app. I have been using redis to replace memcached.


Folder structures:


	API:

	tmDbApi
	|-- composer.json   // Use composer to load the dependencies which are declared here.
	|-- config                 //App gobal configurations, loaded using composer that is why is has another inside with the same name. PSR-0 autoload.
	|   `-- Config 
	|       `-- tmDbApiConfig.php  //Global app configuration parameters.
	|-- index.php           //The main app file, the SIim app is initialised here and every route provided by the API.
	|-- src                      //Custom Classes go here.
	|   |-- MyNameSpace   //PSR-0 too
	|   |   `-- MyAPIClient.php   //My abstraction to the guzzle http client connecting to the themoviedb.org API.
	|   `-- callables.php   //The logic used on every route on the main app file.
	`-- vendor                 //Here goes everything installed by composer. I could give it empty since composer will load it.

Any other files are not relevant to the app overall functions.

	CLIENT:

Only listed files or folder are relevant to be explained.

|-- app					//Inside this folder goes the app code we write.
|   |-- controller          //This folder contains the controllers
|   |   |-- ActorsListPanel.js  //Controller relevant to the list of actors an the search field.
|   |-- model
|   |   |-- Actor.js       //Actor model, as returned by themoviedb api. Matching the documentation.
|   |   |-- Movie.js      //Movie model, as returned by themoviedb api. Matching the documentation.
|   |-- profile             //If we were to build different profiles for diferent screens the code would be here.
|   |-- store              //Here are the stores, The datasources definitions go in here.
|   |   |-- Actors.js    //Actors store, used to retrieve the actors list from the configured API
|   |   |-- Movies.js  //Movies.js store, used to retrieve the actor movies list from the configured API
|   |-- util
|   |   |-- Functions.js  //This is a helper file with usefull functions I use in my projects. It is a singleton emulation.
|   |   `-- Globals.js    //Here are the app configuration parameters, the API URL for example.
|   `-- view              //Here are the views
|       |-- ActorsListPanel.js  //The actors list on the left, including the search field. 
|       |-- Main.js                   //The main panel, including the top toolbar.
|       |-- MoviesListPanel.js  //The movies list on the right.
|-- app.js            //The main file, it is like the index for the sencha framework. model, views, controller, stores are declared here.
|-- index.html     // Since our app is an html5 page this is the index file. there is no need to change it.
`-- resources
    |-- css
    |   `-- app.css  //Compiled css file. this is the main css but it is generated using compass. so do not edit it. 
    |-- sass
    |   |-- app.scss   //This is the file we edit to add our custom styles.
    |   |-- config.rb
    |   `-- stylesheets


reviewed CDGM...

