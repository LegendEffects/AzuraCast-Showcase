<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RadioShowcase</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="assets/stylesheet.css">

    <script>
        var options = {
            player: 'http://192.168.1.71:8000/radio.mp3?1522176106',
            ip: 'http://192.168.1.71',
            stationID: 1,
            volume: 25,
        }
    </script>
</head>
<body>
<div class="view--background" id="view--background"></div>
<div class="view--container">
    <div class="view--radio">
        <span class="radio--song" id="radio--song"></span>
        <span class="radio--artist" id="radio--artist"></span>
    </div>
</div>
<div class="view--progress">
    <div class="radio--duration">
        <span class="radio--duration--text" id="radio--progress--text"></span>

        <div class="radio--progress--bar">
            <progress max="100" value="0" class="progress-main" id="radio--progress"></progress>
        </div>

    </div>
</div>

</body>

<script src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
<script src="assets/vendor/howler/howler.core.js"></script>
<script src="assets/script/radio.js"></script>
</html>