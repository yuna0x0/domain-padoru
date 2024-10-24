'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import 'sakana-widget/lib/index.css';
import SakanaWidget from 'sakana-widget';

export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const yunaPadoruImg = `https://yuna0x0.com/yunaPadoru.webp`;

  useEffect(() => {
    if (!isAudioPlaying) {
      (document.querySelector('#sakana-widget') as HTMLDivElement).innerHTML = '';
      return;
    }
    const yunaPadoru = SakanaWidget.getCharacter('chisato');
    yunaPadoru!.image = yunaPadoruImg;
    yunaPadoru!.initialState = {
      ...yunaPadoru!.initialState,
      i: 0.0075,
      d: 0.9999,
      r: 30
    };
    SakanaWidget.registerCharacter('yunaPadoru', yunaPadoru!);
    new SakanaWidget({
      size: 175,
      controls: false,
      character: 'yunaPadoru',
      rod: false
    }).mount('#sakana-widget');
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-4xl p-5">The purpose of this domain is undecided.<br></br><b className="text-4xl">Have some <a href="https://knowyourmeme.com/memes/padoru" target="_blank" className="underline" >Padoru</a> for now!</b></h1>

      <div className="p-5">
        <a href="https://soundcloud.com/iamazure/padoru-azure-projects-half-baked-remix" target="_blank" className="underline">Padoru (Azure Project&apos;s Half - Baked Remix)</a>
        <br></br>
        <audio src="/audio/Padoru_Azure_Project_Half-baked_Remix.mp3" id="padoru-audio" loop />
        <input id="audio-control" defaultValue="0.5" type="range" min="0" max="1" step="0.01" onChange={(e) => {
          const padoruAudio = document.querySelector('#padoru-audio') as HTMLAudioElement;
          padoruAudio.volume = parseFloat(e.target.value);
        }} />
        <button className="p-1" onClick={() => {
          const padoruAudio = document.querySelector('#padoru-audio') as HTMLAudioElement;
          if (isAudioPlaying) {
            padoruAudio.pause();
            setIsAudioPlaying(false);
            return;
          }
          padoruAudio.volume = (document.querySelector('#audio-control') as HTMLInputElement).valueAsNumber;
          padoruAudio.play();
          setIsAudioPlaying(true);
        }}>{
            isAudioPlaying ? '⏸️' : '▶️'
          }</button>
      </div>
      <br></br>

      <div>
        {!isAudioPlaying && <Image src={yunaPadoruImg} width="175" height="175" alt="yuna0x0 Padoru" priority />}
      </div>
      <div id="sakana-widget"></div>

      <footer className="p-5">If you know what this domain can be, drop a warm message to <a href="https://yuna0x0.com" target="_blank" className="underline">yuna0x0</a> :3</footer>
    </main>
  )
}
