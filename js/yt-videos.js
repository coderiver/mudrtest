var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    // var done = false;
    var ytPlayer;
    // var ytPlayers = [];

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-video', {
        width  : '100%',
        height : '100%',
        videoId: '7L92QyrPIzI',
        suggestedQuality: 'hd720'
    });
}

// function onYouTubeIframeAPIReady() {
//     ytPlayers[0] = new YT.Player('yt-video', {
//         width  : '100%',
//         height : '100%',
//         videoId: '7L92QyrPIzI',
//         suggestedQuality: 'hd720'
//     });
//     ytPlayers[1] = new YT.Player('yt-video2', {
//         width  : '100%',
//         height : '100%',
//         videoId: 'dbA8poWwqYg',
//         suggestedQuality: 'hd720'
//     });
//     ytPlayers[2] = new YT.Player('yt-video3', {
//         width  : '100%',
//         height : '100%',
//         videoId: '5_-RoIjYbPY',
//         suggestedQuality: 'hd720'
//     });
//     ytPlayers[4] = new YT.Player('yt-video4', {
//         width  : '100%',
//         height : '100%',
//         videoId: 'IetWJs6SVW0',
//         suggestedQuality: 'hd720'
//     });
// }

function youtubeParser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11){
        return match[7];
    }
}

function loadVideo(videoId) {
    var currentVideoUrl = ytPlayer.getVideoUrl(),
        currentVideoId  = youtubeParser(currentVideoUrl);

    if ( videoId && videoId != currentVideoId) {
        ytPlayer.loadVideoById(videoId);
    }
}

function playVideo() {
    ytPlayer.playVideo();
}

function pauseVideo() {
    ytPlayer.pauseVideo();
}