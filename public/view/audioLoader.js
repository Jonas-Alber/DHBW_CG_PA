/**
 * @file Model Loder
 * @Author Jonas Alber
 * @Version 1.0.0
 */

/**Start of import zone */
import * as THREE from '/build/three.module.js'
/**End of import zone */

 export class AudioLoader{
   constructor(listener){
    this.listener = listener
     this.audioBuffer  = [];
     this.posAudioBuffer =  [];
     this.activePosAudio =  [];
     this.loader = new THREE.AudioLoader();
   }
 
   /**
    * Loads a audio and stores it in the audio buffer with the given name
    * @param {string} audioName - name of the audio
    * @param {string} audioFileDirection - path to the audio
    * @param {boolean} loop - if the audio should loop after end
    * @return {int} index of the audio in the audioBuffer array
    */
   async loadAudio(audioName, audioFileDirection,loop = true){
     try{
      let sound = new THREE.Audio(this.listener);
      let buffer = await this.loader.loadAsync(audioFileDirection);
      sound.setBuffer( buffer );
      sound.setLoop(loop);
      sound.setVolume(0.1);
      this.audioBuffer.push({name: audioName, audio: sound});
     }catch (exception){
       console.error("Model " + audioFileDirection +" cannot be loaded properly: " + exception);
     }
     return this.audioBuffer.length-1;
   }

   /**
    * Take a name and direction and load a sound into the buffer
    * @param {string} audioName - Name of the audio file for the buffer
    * @param {string} audioFileDirection - Location of the audio file
    * @param {boolean} loop - if the audio should loop after end
    * @param {float} setVolume - Volume between 0 and 1
    * @param {int} soundLength - Max Distance where the audio is hearable
    * @return {int} - index of audio in buffer
    */
   async loadPositionalAudio(audioName, audioFileDirection,loop = true, setVolume = 0.1, soundLength = 10){
    try{
     let buffer = await this.loader.loadAsync(audioFileDirection);
     this.posAudioBuffer.push({name: audioName, audioBuffer: buffer, doLoop: loop, volume: setVolume, maxSoundLength: soundLength});
    }catch (exception){
      console.error("Model " + audioFileDirection +" cannot be loaded properly: " + exception);
    }
    return this.audioBuffer.length-1;
  }
 
   /**
    * Get a audio from the audio buffer 
    * @param {string} name - Name of the audio
    * @returns {object} returnValue - Model from the audioBuffer
    */
   getAudio(name){
     let returnValue;
     for(let index in this.audioBuffer){
       if(this.audioBuffer[index].name == name){
         returnValue = this.audioBuffer[index].audio;
       }
     }
     if(returnValue == undefined){
       throw Error("No Sound with given name found");
     }
     return returnValue;
   }

   /**
    * Takes a loaded audio and create an instance of Positional Audio
    * @param {string} name - Name of the audio in buffer
    * @returns {PositionalAudio} instance of class Positional Audio
    */
   getPosAudio(name){
    let returnValue;
    for(let index in this.posAudioBuffer){
      if(this.posAudioBuffer[index].name == name){
        var audioData = this.posAudioBuffer[index];
        let sound = new THREE.PositionalAudio(this.listener);
        this.activePosAudio.push(sound);
        sound.setBuffer( audioData.audioBuffer );
        sound.setLoop(audioData.doLoop);
        sound.setRefDistance(10);
        sound.setVolume(audioData.volume);
        sound.setMaxDistance(audioData.maxSoundLength);
        sound.setRolloffFactor(0.9);
        returnValue = sound;
      }
    }
    if(returnValue == undefined){
      throw Error("No Sound with given name found");
    }
    return returnValue;
  }

   playAudio(index){
    this.audioBuffer[index].audio.play();
   }
   stopAudio(index){
    this.audioBuffer[index].audio.stop();
   }

   stopPosAudio(){
      for(var index in this.activePosAudio){
        try{
          this.activePosAudio[index].stop();
        }catch (e){

        }
      }
   }
 }
 