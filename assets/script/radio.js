$(function() {
    let player;
    let playing = {};
    let backend = {times: {}, timeouts: {}, setup: false, other: {}};
    let elements = {radio: {}, progress:{}};

    elements.radio.song = document.getElementById('radio--song');
    elements.radio.artist = document.getElementById('radio--artist');
    elements.radio.img = document.getElementById('view--background');
    elements.progress.text = document.getElementById('radio--progress--text');
    elements.progress.bar = document.getElementById('radio--progress');

    function getNowPlaying() {
        $.getJSON(options.ip + '/api/nowplaying/' + options.stationID, function(row) {
            playing = row;
            if(!backend.setup) {
                player = new Howl({src: [options.player], autoplay: true, html5: true, format: ['mp3']});

                player.once('load', function(){
                    player.volume(options.volume);
                });

                setInterval(iterator, 1000);
                backend.setup = true;
            }

            backend.timeouts.playing = setTimeout(getNowPlaying, 15000);
        });

    }

    getNowPlaying()

    backend.times.lastForce = new Date().getTime();
    function forceNowPlaying() {
        let now = new Date().getTime();
        if((now - backend.times.lastForce) > 1000) {
            clearTimeout(backend.timeouts.playing);
            getNowPlaying();
        }

    }
    function iterator() {
        if(backend.other.lastSong != playing.now_playing.song.title) {
            backend.other.lastSong = playing.now_playing.song.title;
            elements.radio.img.style.backgroundImage = "url('http://localhost/git/radioShowcase/api/img.php?antiCache="+Math.floor(Math.random() * 1000)+"')";
        }

        let elapsed = playing.now_playing.elapsed;

        let total = playing.now_playing.duration;
        if (elapsed < total) {
            playing.now_playing.elapsed = elapsed + 1;
            elements.progress.text.textContent = `(${formatTime(elapsed)}/${formatTime(total)})`;
        } else {
            forceNowPlaying();
        }

        let percent = (elapsed / total) * 100;
        elements.radio.song.textContent = playing.now_playing.song.title;

        elements.radio.artist.textContent = playing.now_playing.song.artist;
        try {
            elements.progress.bar.value = parseFloat(percent);
        } catch (TypeError) {
            console.error("Duration == 0");
        }
    }
    function formatTime(time) {
        var sec_num = parseInt(time, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return (hours !== "00" ? hours + ':' : "") + minutes + ':' + seconds;
    }
});
