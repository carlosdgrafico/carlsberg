<?php

$cWinner = '06025';

$cUser = $_POST['code'];
if(strlen($cUser) == 5){
	if($cUser == $cWinner)
		echo 1;
	else
		echo 0;
}
else{
	echo 0;
}