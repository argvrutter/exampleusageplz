import { Func } from 'mocha';
import * as vscode from 'vscode';
import { TextDocument, CodeLens, Command, Range, Disposable } from 'vscode';

type FuncInfo = {name: string; line: number; pos: number};

export default class Provider implements vscode.CodeLensProvider {
    private _funcList: FuncInfo[] = [];
    private _codeLens: CodeLens[] = [];
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
        this.getFunc();
        console.log(this._funcList);
    }   
    
    async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
        this._codeLens = [];
     
        for(var i=0; i<this._funcList.length; i++){
          let line = this._funcList[i]['line'], 
              startChar = this._funcList[i]['pos'],
              endChar = startChar + this._funcList[i]['name'].length;
    
          let position = new Range(line, startChar, line, endChar);
 
          this._codeLens.push(new CodeLens(position));
        }
        return this._codeLens;
     
      }

      public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
            codeLens.command = {
                title: "Example Usage",
                command: "exampleusageplz.addUsageInfo",
                arguments: ["Argument 1", false]
            };
            return codeLens;
    }

      public async getFunc() {
        const editor = vscode.window.activeTextEditor;
    
        if (editor) {
            let document = editor.document;
            // Get the document text
            const documentText = document.getText();
            this._funcList = lineNumberByIndex(documentText);
          }
    }
}

function lineNumberByIndex(s : string){
  // RegExp
  var line = 0,
      match,
      re = /[a-zA-Z]+\([^\)]*\)(\.[^\)]*\))?/g;
  var allLines = s.split("\n");
  var funcList: FuncInfo[] = [];

  for (var i = 0; i < allLines.length; i++) {
        while ((match = re.exec(allLines[i])) !== null) {
          funcList.push({name: match[0], line: i, pos: match.index});
        }
  }
  return funcList;
}
