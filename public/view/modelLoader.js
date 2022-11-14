import { GLTFLoader } from '/jsm/loaders/GLTFLoader.js';
export class ModelLoader{
  constructor(){
    this.modelBuffer  = [];
    this.loader = new GLTFLoader();
  }

  async loadModel(modelName, modelFileDirection){
    try{
      let object = await this.loader.loadAsync(modelFileDirection);
      this.modelBuffer.push({name: modelName, model: object});
    }catch (exception){
      console.error("Model " + modelFileDirection +" cannot be loaded properly: " + exception);
    }
  }

  async loadList(modelList){
    let promises  = [];
    for(let index in modelList){
      promises.push(this.loadModel(modelList[index][0], modelList[index][1]));
    }
    await Promise.all(promises);
  }

  getModel(name){
    for(let index in this.modelBuffer){
      if(this.modelBuffer[index].name == name){
        return this.modelBuffer[index].model;
      }
    }
  }
}
