<?php

	//Define the name space for the Slim client
	use Slim\Slim;

	//Load all the necesary dependencies using the provided composer autoload
	require 'vendor/autoload.php';

	//This file includes the functions that are going to be invoked on every route.
	require 'src/callables.php';

	//Setup the mode for the framework to work, production dont do debug but does log.
	$mode = array(
	    'mode' => 'production'
	);

	//Create the application instance
	$app = new Slim($mode);


	//Leave blank the root so calls to it return blank, we dont want to give clues about our framework.
	$app->get('/', function () {
    	echo "";
	});


	//Do the same with the wrong paths
	$app->notFound(function () {
	    echo "";
	});

	//And the same in errors too.
	$app->error(function (\Exception $err) use ($app) {
	    echo "";
	});

	/*For every path we define an acction, It can be seen as controllers but as it is a microframework these 
	 * are just 	callable functions.
	*/

	$app->get('/search/person','basicClientCaching', 'setHeaders','searchPerson');
	$app->get('/person/:id/credits','basicClientCaching', 'setHeaders','getPersonCredits')->conditions(array('id' => '\d+'));
	$app->get('/configuration','basicClientCaching', 'setHeaders', 'getConfiguration');

	//Finally we get our app instance to process our code.	
	$app->run();

