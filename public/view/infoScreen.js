export class InfoScreenHandler{
  constructor(idString){
    this.screenElements =[];
    this.parentObject = document.getElementById(idString);
  }
  /**
   * 
   * @param {Element HTML} HTML 
   * @returns index of the element
   */
  addDivWithText(insertText){
    var newDiv =document.createElement("div");
    this.screenElements.push(this.parentObject.appendChild(newDiv));
    newDiv.innerHTML = insertText;
    return this.screenElements.length-1;
  }

  addElement(htmlElement){
    this.screenElements.push(this.parentObject.appendChild(htmlElement));
    return this.screenElements.length-1;
  }

  getInnerHTML(storageLocation){
    //return this.screenElements[storageLocation].innerHTML;
  }

  setInnerHTML(storageLocation, insertText){
    //this.screenElements[storageLocation].innerHTML = insertText;
  }
}
