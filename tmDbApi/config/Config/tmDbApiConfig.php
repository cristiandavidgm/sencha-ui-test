<?php

	namespace Config;

	/**
	* This is a class to store config values, I prefer this to 'emulate' a singleton in php.
	*/
	class tmDbApiConfig
	{

		//themoviedb.org API crendetials
	   	public static $tmDbApiKey = '81ad015af2e39bf1ebcc70e042a72515';
	   	public static $tmDbApiURL = 'http://private-7bcf-themoviedb.apiary.io/';
	   
	   	//The redis server connection parameters, this is my http://redis4you.com/ free instance. 
	   	//feel free to use it but avoid abuse or use your own server.
	   	public static $redisConfig = array(
			    'host'     	=> '50.30.35.9', 
			    'password' 	=> 'afada8dbc77596752eaec469a4b5340d', 
			    'database' 	=> 'cristiandavidgm', 
			    'port'		=>	'2582'
			);

	   	//The time we will cache the responses or check for cached documents on the client.
	   	public static $cacheSeconds = 3600; //  There are few chances an actor or movie info will change that soon.

	   	//Set to true if you can connect to a redis server, false otherwise.
	   	public static $ServerCache = false;

	}

?>