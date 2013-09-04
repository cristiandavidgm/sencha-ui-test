<?php

	use MyNameSpace\MyAPIClient;
	use Config\tmDbApiConfig;

	use Slim\Slim;


	/*
	 * setHeaders
	 *
	 * I use this functions to provide common headers to every request, Sometimes I put debug information on 
	 * these header.
	 *
	 * It takes no params as it use the global app instance
	 *
	 * It does not retun anything just prepend headers to the response.
	 *
	 */
	function setHeaders(  ) {

		// Get application instance
		$app	=   Slim::getInstance();

		// Get response object
		$res = $app->response();

		// Get request object
		$req = $app->request();

		//We set the last modified time to the current processing time.
		$app->lastModified( time() );

		//We can use the browser cache by setting the expires header so it use its cached document instead of procesing a new one.
		$expires = '+'.tmDbApiConfig::$cacheSeconds.' seconds';
		$app->expires( $expires );

		//Every response on this api will be json so we can define the content type for every one here.
		$res['Content-Type'] = 'application/json';

		//Custom headers
		$res['MyExpire'] = $expires;

		// Get the If-Modified-Since header and the current, to compare. quite Util when solving time zone problems :/
		$IfModifiedSince = $req->headers('If-Modified-Since');
		$res['IfModifiedSince'] = strtotime($IfModifiedSince);
		$res['curTime'] = time();

	}

	/*
	 * basicClientCaching
	 *
	 * I use this function as a middleware on every route, basically it checks if the user a cached 
	 * version of the document and compare it to the configured cached time. In case the cached document is 
	 * still valid we return a 304 not modified otherwise we continue processing the request. 
	 *
	 * No parameters, It takes no params as it use the global app instance
	 *
	 * No explicit return but in case of cache it returns a 304 http response.
	 *
	*/
	function basicClientCaching(  ) {

		// Get application instance
		$app	=   Slim::getInstance();

		// Get request object
		$req = $app->request();

		// Get the If-Modified-Since header
		$IfModifiedSince = $req->headers('If-Modified-Since');

		// If there is a If-Modified-Since then the client has a cached version of this request.
		if ( !empty( $IfModifiedSince ) )
		{

			//Parse the string to UNIX EPOCH so we can compare seconds
			$IfModifiedSince = strtotime($IfModifiedSince);

			//if the modified is still between the acepted time we return a 304 not modified.
			if ( ( time() - $IfModifiedSince ) <  tmDbApiConfig::$cacheSeconds  )
			{
				//This stop the app and return the provided code. 
				$app->halt(304);

			}

		}

	}

	/*
	 * basicServerCachingCheck
	 *
	 * Check if the document has been cached on our server due to another client request. 
	 * If we have the request cached then we return our cached version instead of processing the full request.
	 * As redis is used to store the key, value pair then so redis takes charge of the cached key duration.
	 *
	 * No parameters, It takes no params as it use the global app instance
	 * @return  Return the cached content in case of found a coincidence or false otherwise.
	*/
	function basicServerCachingCheck(  ) {

		//We dont want our app to fail in case the cache server dont get to work.
		try {

			//Check if the app is configured to use server cache.
			if ( !tmDbApiConfig::$ServerCache )
				return false;

			// Get application instance
			$app	=   Slim::getInstance();	

			// Get request object
			$req = $app->request();

			//Get resource URI
			$resourceUri = $req->getResourceUri();

			//Get query string
			$query = $req->get('query');

			/*create a key, our key will be the URI plus the query string. 
			 *A hash can be used but it takes processing time.
			*/
			$key = $resourceUri.'|query|'.$query;

			//Connect to the redis server
			$redis = new Predis\Client( tmDbApiConfig::$redisConfig );

			//If a key is already stored then we get its value.
			if ( $redis->exists( $key ) )
			{
				// Get response object
				$res = $app->response();

				// Let them know this is a cached response
				$res['Cached-by'] = 'MyServer';

				//get the value
				$value = $redis->get( $key );
    			
    			return $value;

			}
		
		}
		catch (Exception $e) {
		    
			//Nothing is done, Since this is just a middleware we dont want or app to crash for this cause.
			return false;

		}

	}

	/*
	 * basicServerCachingSet
	 *
	 * Check if the document has been cached on our server due to another client request. 
	 * If we have the request cached then we return our cached version instead of processing the full request.
	 * As redis is used to store the key, value pair then so redis takes charge of the cached key duration.
	 *
	 * @param body, Only the content to be cached should be sent, The key can be made using the app instance.
	 * @return  Return the cached content in case of found a coincidence or false otherwise.
	*/
	function basicServerCachingSet( $body ) {

		//We dont want our app to fail in case the cache server dont get to work.
		try {

			//Check if the app is configured to use server cache.
			if ( !tmDbApiConfig::$ServerCache )
				return false;

			//Get application instance
			$app	=   Slim::getInstance();

			//Connect to the redis server
			$redis = new Predis\Client( tmDbApiConfig::$redisConfig );

			//Get request object
			$req = $app->request();

			//Get resource URI
			$resourceUri = $req->getResourceUri();

			//Get query string
			$query = $req->get('query');

			//Create a key
			$key = $resourceUri.'|query|'.$query;

			//TODO: try to make this async with Predis\Async\Client, I dont use it because it is experimental :/
			$redis->set( $key, $body );
			
			//$redis->expire( $expire, tmDbApiConfig::$cacheSeconds );
			$redis->expire( $key, tmDbApiConfig::$cacheSeconds );

			return true;
		
		}
		catch (Exception $e) {
		    
		    //Nothing is done.
			return false;

		}

	}

	/*
	 * searchPerson
	 *
	 * Search for a person on themoviedb.org API. 
	 *
	 * @param The only parameter is sent on the request query, so we get it from the app instance.
	 * It is called 'query' too ;)
	 * @return  A string with the response from themoviedb.org API about our request.
	*/
	function searchPerson() {

		try {

			//Check if there is a server cached  version of this request.
			if (  !$cachedResponse = basicServerCachingCheck() )
			{

				//themoviedb.org API
				$app	=   Slim::getInstance();

				//Get request object
				$req 	= 	$app->request();

				//Get the query paramter	
				$query 	= 	$req->params('query');

				//Get themoviedb.org API credential from the config file.
				$tmDbApiKey 			= tmDbApiConfig::$tmDbApiKey;
				$tmDbApiURL 			= tmDbApiConfig::$tmDbApiURL;

				//Use our custom API client to connect to the API.
				$MyapiClient = new MyAPIClient( $tmDbApiURL, $tmDbApiKey);

				//Search for the query string provided.
				$person = $MyapiClient->searchPerson( $query );

				//Save the response on our server cache. so we don have to go for it later again.
				basicServerCachingSet( $person );

				//Give the response
				echo $person;

			}else{

				//Give cached response
				echo $cachedResponse;

			}

		} catch (Exception  $err ) {

			//In case there is any error we give a clue to the app dev. but no more.
			echo '{"error":{ "text": "An Error Occurred on searchPerson '.__LINE___.' "}}'; 

		}

	}

	/*
	 * getPersonCredits
	 *
	 * Search the list of movies for a specific person on themoviedb.org API. 
	 *
	 * @param (int) $id - The id number on themoviedb of the desired actor.
	 * @return  A string with the response from themoviedb.org API about our request.
	*/
	function getPersonCredits( $id ) {

		try {

			//Check if there is a server cached  version of this request.
			if (  !$cachedResponse = basicServerCachingCheck() )
			{
				//Get themoviedb.org API credential from the config file.
				$tmDbApiKey 			= tmDbApiConfig::$tmDbApiKey;
				$tmDbApiURL 			= tmDbApiConfig::$tmDbApiURL;

				//Use our custom API client to connect to the API.
				$MyapiClient = new MyAPIClient( $tmDbApiURL, $tmDbApiKey);

				//Search for the actor movies.
				$credits = $MyapiClient->getPersonCredits( $id );

				//Save the response on our server cache. so we don have to go for it later again.
				basicServerCachingSet( $credits );

				//Give the response
				echo $credits;

			}else{

				//Give cached response
				echo $cachedResponse;

			}

		} catch (Exception  $err ) {

			//In case there is any error we give a clue to the app dev. but no more.
			echo '{"error":{ "text": "An Error Occurred on searchPerson '.__LINE___.' "}}'; 

		}

	}

	/*
	 * getConfiguration
	 *
	 * Get the config parameter from themoviedb so if we need to display an actor profile picture for example
	 * the we know the base URL to the image.
	 *
	 * No paramaters required
	 * 
	 * @return  A string with the response from themoviedb.org API about our request.
	*/
	function getConfiguration() {

		try {

			//Check if there is a server cached  version of this request.
			if (  !$cachedResponse = basicServerCachingCheck() )
			{

				//Get themoviedb.org API credentials from the config file.
				$tmDbApiKey 			= tmDbApiConfig::$tmDbApiKey;
				$tmDbApiURL 			= tmDbApiConfig::$tmDbApiURL;

				//Use our custom API client to connect to the API.
				$MyapiClient = new MyAPIClient( $tmDbApiURL, $tmDbApiKey);

				//Get for the themoviedb configuration.
				$config = $MyapiClient->getConfig();

				//Save the response on our server cache. so we don have to go for it later again.
				basicServerCachingSet( $config );

				//Give the response
				echo $config;

			}else{

				//Give cached response
				echo $cachedResponse;

			}			

		} catch (Exception  $err ) {

			//In case there is any error we give a clue to the app dev. but no more.
			echo '{"error":{ "text": "An Error Occurred on searchPerson '.__LINE___.' "}}'; 

		}
		
	}

