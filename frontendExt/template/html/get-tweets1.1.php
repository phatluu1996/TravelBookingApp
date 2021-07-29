<?php
'use strict';
session_start();
require_once("js/twitteroauth-master/twitteroauth/twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "weblionmedia";
$notweets = '2';
$consumerkey = 'l3mHsfMKxZNOmfuU5VhQtA';
$consumersecret = 'owrII6Imsw4B1YzOKsmxleV9HMI2qfjSaSANkFyY2T8';
$accesstoken = '234541855-BKM0TaVI6Ns4uX3CgLdtY75C5n6FANSmltyPSQZN';
$accesstokensecret = 'NLBZLInbNbUD7VOIpBlLs3KGdZ2Sk7KOspG1uw6YBs';
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
  
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>