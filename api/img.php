<?php
    $files = glob('../assets/backgrounds/*.*');
    $file = array_rand($files);
    $file = $files[$file];

    $fp = fopen($file, 'rb');

    header('Content-Type: image/png');
    header('Content-Length: '.filesize($file));

    fpassthru($fp);
    exit;
