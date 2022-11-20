/**
 * @file BaseClass for controll of the infoscreens
 * @Author Jonas Alber
 * @Version 1.0.0
 */
export class InfoScreenHandler{
  /**
   * Initialize the class
   * @param {String} idString - id of the parent element
   */
  constructor(idString){
    this.screenElements =[];
    this.parentObject = document.getElementById(idString);
  }
  /**
   * Add a new Div containig text to the parent object
   * @param {Element HTML} HTML - html code to be added into the parent object
   * @returns index of the element
   */
  addDivWithText(insertText){
    var newDiv =document.createElement("div");
    this.screenElements.push(this.parentObject.appendChild(newDiv));
    newDiv.innerHTML = insertText;
    return this.screenElements.length-1;
  }

  /**
   * Add HTML Code without adding a new Div element
   * @param {*} htmlElement - html code
   * @returns index of the element
   */
  addElement(htmlElement){
    this.screenElements.push(this.parentObject.appendChild(htmlElement));
    return this.screenElements.length-1;
  }

  /**
   * Take an index and return the html code
   * @param {int} storageLocation index of element in parent object
   * @returns html code
   */
  getInnerHTML(storageLocation){
    return this.screenElements[storageLocation].innerHTML;
  }

  /**
   * Insert HTML Code inside a location
   * @param {int} storageLocation location where the html code should be inserted
   * @param {String} insertText HTML code to be insert into the given location
   */
  setInnerHTML(storageLocation, insertText){
    this.screenElements[storageLocation].innerHTML = insertText;
  }
}
