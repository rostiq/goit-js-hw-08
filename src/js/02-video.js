import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

player.on('timeupdate', throttle(videoplayerCurrentTime, 1000));

function videoplayerCurrentTime(data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
};

function playVideoAfterRefresh() {
    if (localStorage.getItem('videoplayer-current-time') === null) {
        return;
    }
    player.setCurrentTime(localStorage.getItem('videoplayer-current-time')).then(function(seconds) {
        // seconds = the actual time that the player seeked to
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;
    
            default:
                // some other error occurred
                break;
        }
    });
};

playVideoAfterRefresh();
