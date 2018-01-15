<?php
require("db_info.php");
error_reporting(E_ALL);
ini_set("display_errors",1);

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a MySQL server

$connection=mysqli_connect ('mysql.cs.ccu.edu.tw', $username, $password, $database);
if (!$connection) {  die('Not connected : ' . mysqli_error($connection));}

// Set the active MySQL database

$db_selected = mysqli_select_db($connection, $database);
if (!$db_selected) {
  die ('Can\'t use db : ' . mysqli_error($connection));
}

// Select all the rows in the markers table

$query = "SELECT * FROM uscfood_location WHERE 1 ORDER BY name";


$result_query = mysqli_query($connection, $query);
if (!$result_query) {
  die('Invalid query: ' . mysqli_error($connection));
}

// Iterate through the rows, adding XML nodes for each
$result = array();
while ($row = @mysqli_fetch_array($result_query)){
  $result[] = array('id' => $row['id'], 'name' => $row['name'], 'address' => $row['address'], 'lat' => $row['lat'], 'lng' => $row['lng'], 'type' => $row['type']);
}

echo json_encode($result);

?>