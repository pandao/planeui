<?php

	header("Access-Control-Allow-Origin: *");

	if(isset($_POST)) {
		echo number_format(($_POST['score'] + $_POST['newscore']) / 2, 2);
	}
