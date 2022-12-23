import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const TIME = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(TIME, data.seconds);
  }, 1000)
);

if (localStorage.getItem(TIME)) {
  const time = localStorage.getItem(TIME);
  player.setCurrentTime(time);
}
