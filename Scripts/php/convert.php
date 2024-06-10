<?php

$api = new Ilovepdf('ILOVEPDF_PUBLIC_KEY','ILOVEPDF_PRIVATE_KEY');

$myTaskConvertOffice = $ilovepdf->newTask('officepdf');

$file=$myTask->addURLFile('https://URLpath/to/file_name.pdf');

?>