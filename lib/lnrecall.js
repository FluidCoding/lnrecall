'use babel';

import LnrecallView from './lnrecall-view';
import { CompositeDisposable, Point } from 'atom';

export default {

  lnrecallView: null,
  subscriptions: null,
	markedLine: 0,

  activate(state) {
    this.lnrecallView = new LnrecallView(state.lnrecallViewState);

    document.querySelector('.status-bar-left').appendChild( this.lnrecallView.getElement());

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lnrecall:recall': () => this.recall()
    }));
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'lnrecall:mark': () => this.mark()
		}));
		document.querySelectorAll('.status-bar-left  a.message')[0].onclick = () => this.mark();
		document.querySelectorAll('.status-bar-left  a.message')[1].onclick = () => this.recall();
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

  recall() {
		let editor = atom.workspace.getActiveTextEditor();
		const position = new Point(this.markedLine,0);
		editor.setCursorBufferPosition(position);
		editor.unfoldBufferRow(this.markedLine);
		editor.scrollToBufferPosition(position, {
			center: true
		});
  },

  mark() {
		this.markedLine = atom.workspace.getActiveTextEditor().getCursorBufferPosition().row || 0;
  }

};
