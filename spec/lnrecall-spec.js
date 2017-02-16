'use babel';

import Lnrecall from '../lib/lnrecall';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Lnrecall', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('lnrecall');
  });

  describe('when the lnrecall:mark event is triggered', () => {
    it('does not show by default', () => {
      expect(workspaceElement.querySelector('.lnrecall')).not.toExist();
    });

    it('displayed the status bar links', () => {
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.lnrecall')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'lnrecall:mark');
      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for elements visibility
        expect(workspaceElement.querySelector('.lnrecall')).toBeVisible();
        expect(workspaceElement.querySelector('.status-bar-left a.message#Mark')).toBeVisible();
      });
    });
  });
});
