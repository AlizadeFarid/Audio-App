import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  audioObject = new Audio()
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  musics = [
    {
      url: '../assets/muiscs/song1.mp3',
      name: 'PASTER - CHAIN (feat. SAYBU SWAG)'
    },
    {
      url: '../assets/muiscs/song2.mp3',
      name: 'Cem Adrian & Mark Eliyahu - KÜL'
    },
    {
      url: '../assets/muiscs/song3.mp3',
      name: 'M. Eliyahu & C. Adrian - Derinlerde'
    }
  ];

  currentTime:any = '00:00';
  duration:any = '00:00';
  seek:any = 0;

  streamObserver(url:any){
    return new Observable(observable=>{

      this.audioObject.src = url;
      this.audioObject.load();
      this.audioObject.play();
      
      const handler = (event:Event)=>{
        console.log(event);
        this.seek = this.audioObject.currentTime;
        this.duration = this.timeFormat(this.audioObject.duration);
        this.currentTime = this.timeFormat(this.audioObject.currentTime);
      }

      this.addEvent(this.audioObject, this.audioEvents, handler);

      return ()=>{
        this.audioObject.pause();
        this.audioObject.currentTime = 0;

        this.removeEvent(this.audioObject, this.audioEvents, handler);
      }
    })
  }

  addEvent(obj:any, events:any, handler:any){
    events.forEach((event:any) => {
        obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj:any, events:any, handler:any){
    events.forEach((event:any) => {
      obj.removeEventListener(event, handler);
  });
  }

  setSeek(ev:any){
    this.audioObject.currentTime = ev.target.value;
  }

  changeVolume(event:any){
    this.audioObject.volume = event.target.value;
    console.log(event.target.value);
  }

  startMusic(url: any) {
   this.streamObserver(url).subscribe(event =>{});

    console.log(url);
  }

  play() {
    this.audioObject.play();
    console.log('Click play btn');
  }

  pause() {
    this.audioObject.pause();
    console.log('Click pause btn');
  }

  stop() {
    this.audioObject.pause();
    this.audioObject.currentTime = 0;
    console.log('Click stop btn');
  }

  timeFormat(time:any, format:any = "mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
