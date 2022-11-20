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
     this.loader = new THREE.AudioLoader();
   }
 
   /**
    * Loads a audio and stores it in the audio buffer with the given name
    * @param {string} audioName - name of the audio
    * @param {string} audioFileDirection - path to the audio
    * @return {int} index of the audio in the audioBuffer array
    */
   async loadAudio(audioName, audioFileDirection,loop){
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
       throw Error("No Model with given name found");
     }
     return returnValue;
   }

   playAudio(index){
    this.audioBuffer[index].audio.play();
   }
   stopAudio(index){
    this.audioBuffer[index].audio.stop();
   }
 }
 