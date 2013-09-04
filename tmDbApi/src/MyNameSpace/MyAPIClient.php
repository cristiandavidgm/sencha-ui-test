<?php

	//Declare the namespace in which class will work.
	namespace MyNameSpace;

	//Name spaces need by classes we depend on.
	use Guzzle\Http\Client;
	use Guzzle\Plugin\Cache\CachePlugin;
	use Guzzle\Cache\DoctrineCacheAdapter;
	use Doctrine\Common\Cache\ArrayCache;


	/**
	* We make a facade to the guzzle http client, which is already a facade to cUrl ;)
	*/
	class MyAPIClient
	{
		//themoviedb.org API credentials
		private $tmDbApiURL;
		private $tmDbApiKey;

		//the guzzle http client
		private $client;

		//If the class were correctly initialized then this is set to true.
		private $initialized = false;

		/**
		* receive the credentials, store them and init the instance.
		*
		* @param string $tmDbApiURL themoviedb.org API URL
		* @param string $tmDbApiKey Our themoviedb.org API Key
		*/
	    public function __construct( $tmDbApiURL, $tmDbApiKey ) {

	    	if (  !filter_var( $tmDbApiURL, FILTER_VALIDATE_URL) )
	    	{
	    		return null;
	    	}

	    	//Store the credentials
	    	$this->tmDbApiKey = $tmDbApiKey;
		   	$this->tmDbApiURL = $tmDbApiURL;

		   	//init the client
	    	$this->init();
	                
	    }

	    /**
		* Initialize the gussle http client.
		* @return boolean , true if every went well.
		*/
	    private function init() {

	    	try {

	    		//Create the client instance using the provided URL
		    	$this->client = new Client( $this->tmDbApiURL );

		    	//This is a client chache plugin, guzzle can cache the responses if them have ETag or Last-Modified
		    	//headers
		    	$cachePlugin = new CachePlugin(array(
				    'adapter' => new DoctrineCacheAdapter(new ArrayCache())
				));

				//Add the cache plugin to the client object
				$this->client->addSubscriber($cachePlugin);

				//Request header required by themoviedb.org API
		    	$this->client->setDefaultOption('headers', array('Accept' => 'application/json'));

		    	//Set our client as initialized
		    	$this->initialized = true;

		    	return true;

	    	}catch( Exception $err) {

	    		return false;

	    	}

	    }

	    /**
		* Get the configuration of the API, for example the images root URL.
		* @return string/boolean  False if fail, the response from the API instead.
		*/
	    public function getConfig() {

	    	try {

	    		//set the resourceUri
	    		$request = $this->client->get('/3/configuration', array(), array(

	    			//Add our auth key to the query.
					'query' => array('api_key' => $this->tmDbApiKey )

				));

				//Send the request and get the response
				$response = $request->send();

				//return the response from the API
				return $response->getBody();

	    	}catch( Exception $err) {

	    		//Nothing returned if fail.
	    		return false;

	    	}
	    	
	    }

	    /**
		* Search the list of movies for a specific person
		*
		* @param integer $id actor id.
		* @return string/boolean  False if fail, the response from the API instead.
		*/
	    public function getPersonCredits( $id ) {

	    	try {

	    		//Check if the id is an interer
	    		if (  !filter_var( $id, FILTER_VALIDATE_INT) )
		    	{
		    		//Too bad, it is not an integer :(
		    		return false;
		    	}

		    	//set the resourceUri
	    		$request = $this->client->get('/3/person/'.$id.'/credits', array(), array(

	    			//Add our auth key to the query.
					'query' => array('api_key' => $this->tmDbApiKey )

				));

				// Send the request and get the response
				$response = $request->send();

				//return the response from the API
				return $response->getBody();

	    	}catch( Exception $err) {

	    		//Nothing returned if fail.
	    		return false;

	    	}
	    	
	    }

	    /**
		* Search for people matching their name with the provided query
		*
		* @param string query, the name to search for.
		* @return string/boolean  False if fail, the response from the API instead.
		*/
	    public function searchPerson( $query ) {

	    	try {

	    		//set the resourceUri
	    		$request = $this->client->get('/3/search/person', array(), array(

	    			//Add our auth key to the query plus the name to search for.
					'query' => array('api_key' => $this->tmDbApiKey, 'query' => $query )

				));

				// Send the request and get the response
				$response = $request->send();

				//return the response from the API
				return $response->getBody();

	    	}catch( Exception $err) {

	    		return false;

	    	}
	    	
	    }

	}

?>
