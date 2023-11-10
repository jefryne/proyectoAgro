export function VoiceBlob() {
  return(
      <>
        <div className="container-xxl bg-danger py-5">
          <div className="container">
            <button onClick="wave.play()">Play</button>
            <button onClick="wave.pause()">Pause</button>
            <button onClick="loadAndPlayAudio()">Eleven</button>
            <div id="chart-container" className="bg-primary" style={{ maxWidth: 500, maxHeight: 500 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, ea.</div>
          </div>
        </div>
      </>
      )
  }