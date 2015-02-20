var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var done = false;
    var ytPlayer;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-video', {
        width  : '100%',
        height : '100%',
        videoId: '7L92QyrPIzI',
        suggestedQuality: 'hd720'
    });
}

function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11){
        return match[7];
    }
}

function playVideo(videoId) {
    var currentVideoUrl = ytPlayer.getVideoUrl(),
        currentVideoId  = youtubeParser(currentVideoUrl);

    if ( videoId && videoId != currentVideoId) {
        ytPlayer.loadVideoById(videoId);
    }
    ytPlayer.playVideo();
}

function pauseVideo() {
    ytPlayer.pauseVideo();
}