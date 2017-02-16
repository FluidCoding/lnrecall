'use babel';

import LnrecallView from './lnrecall-view';
import { CompositeDisposable, Point } from 'atom';

export default {
  lnrecallView: null,
  subscriptions: null,
  markedLine: 0,

  activate(state) {
    this.lnrecallView = new LnrecallView(state.lnrecallViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lnrecall:recall': () => this.recall()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lnrecall:mark': () => this.mark()
    }));

    this.attachToStatusBar();
  },

  deactivate() {
    this.subscriptions.dispose();
    this.lnrecallView.destroy();
  },

  serialize() {
    return {
      lnrecallViewState: this.lnrecallView.serialize()
    };
  },

  // @TODO: Condition this on setting
  attachToStatusBar(){
    const statusBar = document.querySelector('.status-bar-left');
    if(statusBar){
      statusBar.appendChild(this.lnrecallView.getElement());
      this.lnrecallView.getElement().querySelector("#Mark").onclick = () => this.mark();
      this.lnrecallView.getElement().querySelector("#Recall").onclick = () => this.recall();
    }
  },

  recall() {
    const actEditor = atom.workspace.getActiveTextEditor();
    if(actEditor){
      const position = new Point(this.markedLine,0);
      actEditor.setCursorBufferPosition(position);
      actEditor.unfoldBufferRow(this.markedLine);
      actEditor.scrollToBufferPosition(position, {
        center: true
      });
    }
  },

  mark() {
    const actEditor = atom.workspace.getActiveTextEditor();
    if(actEditor) this.markedLine = actEditor.getCursorBufferPosition().row || 0;
  }

};
