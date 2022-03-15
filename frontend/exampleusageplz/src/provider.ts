import * as vscode from 'vscode';
import { TextDocument, CodeLens, Command, Range, Disposable } from 'vscode';


export default class Provider implements vscode.CodeLensProvider {
    private _subscriptions: Disposable[] = [];
    private _disposable: Disposable;
    private _currentFunc: string = "";

    constructor() {
        this._disposable = Disposable.from(...(this._subscriptions));
    }   
    // TODO:: open codelens at current func position
    async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
        let topOfDocument = new Range(0, 0, 0, 0);
    
        let c: Command = {
          command: 'extension.addUsageInfo',
          title: 'Insert Usage',
        };
    
        let codeLens = new CodeLens(topOfDocument, c);
    
        return [codeLens];
      }

      public async getFunc() {
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
            let document = editor.document;
    
            // Get the document text
            const documentText = document.getText();
            var range = document.getWordRangeAtPosition(editor.selection.active);
            var func = document.getText(range);
            this._currentFunc = func;
            console.log(func);
            this.provideCodeLenses(document);
        }
    }

}