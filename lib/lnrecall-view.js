'use babel';

export default class LnrecallView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('lnrecall');

    // Create message element
    const markMessage = document.createElement('a');
    markMessage.id = "Mark";
    markMessage.textContent = 'Mark Line';
    markMessage.classList.add('message');
    this.element.appendChild(markMessage);

    const recallMessage = document.createElement('a');
    recallMessage.id = "Recall";
    recallMessage.textContent = 'Recall Line';
    recallMessage.classList.add('message');
    this.element.appendChild(recallMessage);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
