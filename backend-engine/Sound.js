class SoundClass {
  constructor() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.cache = {}; // Store downloaded buffers

    this.library = {
      // Add your sounds here
      click:
        "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
      shoot:
        "https://assets.mixkit.co/active_storage/sfx/2153/2153-preview.mp3",
      // more sounds...
    };

    this.preloadLibrary();
  }

  // The URL is used as the cache key
  loadSound(url) {
    // If it's in cache, no need to download
    if (this.cache[url]) {
      return Promise.resolve(this.cache[url]);
    }

    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => this.audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        // Add to cache
        this.cache[url] = audioBuffer;
        return audioBuffer;
      });
  }

  play(url, options = {}) {
    // Load the sound and then play it
    this.loadSound(url).then((audioBuffer) => {
      let source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // If it's a looping sound
      if (options.loop) {
        source.loop = true;
      }

      // Connect to output (speakers)
      source.connect(this.audioContext.destination);
      source.start(0);
    });
  }

  // Play a sound from the library
  playFromLibrary(name, options = {}) {
    if (this.library[name]) {
      this.play(this.library[name], options);
    } else {
      console.error(`Sound ${name} not found in library.`);
    }
  }

  // Preload all sounds in the library
  preloadLibrary() {
    for (let name in this.library) {
      this.loadSound(this.library[name]).catch((err) =>
        console.error(`Failed to preload sound ${name}: ${err}`)
      );
    }
  }
}

export const Sound = new SoundClass();
