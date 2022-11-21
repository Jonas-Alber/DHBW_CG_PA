/**
 * @file Model Loder
 * @Author Ralf Ehli
 * @Version 1.0.0
 */

import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
export class ModelLoader{
  constructor(){
    this.modelBuffer  = [];
    this.loader = new GLTFLoader();
  }

  /**
   * Loads a model and stores it in the model buffer with the given name
   * @param {string} modelName - name of the model
   * @param {string} modelFileDirection - path to the model
   */
  async loadModel(modelName, modelFileDirection){
    try{
      let object = await this.loader.loadAsync(modelFileDirection);
      this.modelBuffer.push({name: modelName, model: object});
    }catch (exception){
      console.error("Model " + modelFileDirection +" cannot be loaded properly: " + exception);
    }
  }

  /**
   * NOT IN USE AT THE MOMENT
   * @param {*} modelList 
   */
  async loadList(modelList){
    let promises  = [];
    for(let index in modelList){
      promises.push(this.loadModel(modelList[index][0], modelList[index][1]));
    }
    await Promise.all(promises);
  }

  /**
   * Get a model from the model buffer 
   * @param {string} name - Name of the model
   * @returns {object} returnValue - Model from the modelBuffer
   */
  getModel(name){
    let returnValue;
    for(let index in this.modelBuffer){
      if(this.modelBuffer[index].name == name){
        returnValue = this.modelBuffer[index].model;
      }
    }
    if(returnValue == undefined){
      throw Error("No Model with given name found");
    }
    return returnValue;
  }
}
