import React from 'react';
import Sound from 'react-sound';
import './audio.scss';
import clock from '../../assets/audio/clock.mp3';
import cheer from '../../assets/audio/cheer.mp3';
import gong from '../../assets/audio/gong.mp3';

const Audio = ({soundStatus, cheerSound, gongSound, tickSound, toggleSound}) => {
  cheerSound = cheerSound ? Sound.status.PLAYING : Sound.status.STOPPED;
  gongSound = gongSound ? Sound.status.PLAYING : Sound.status.STOPPED;
  tickSound = tickSound ? Sound.status.PLAYING : Sound.status.STOPPED;

  return (
    <div>
      <div className={'icon--sound ' + (soundStatus ? ' enable' : ' disable') } onClick={ toggleSound }></div>
      {soundStatus && (
        <div>
          <Sound
            url={ cheer }
            playStatus={ cheerSound }/>
      
          <Sound
            url={ gong }
            playStatus={ gongSound }/>
          <Sound
            url={ clock }
            playStatus={ tickSound }
            loop={ true }/>
        </div>)
      }
    </div>
  )
}

export default Audio;
