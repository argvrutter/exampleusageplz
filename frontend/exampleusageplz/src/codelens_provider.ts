import { TextDocument, 
          CodeLens, 
          Range, 
          CodeLensProvider, 
          window, 
          CancellationToken,
          Position} from 'vscode';

import { getDefinitionInfo } from './functions';

type FuncInfo = {name: string; line: number; pos: number};

export default class Provider implements CodeLensProvider {
    private _funcList: FuncInfo[] = [];
    private _codeLens: CodeLens[] = [];

    constructor() {
    }   

    async startCodelens(){
      this.getFunc();
    }

    async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
        this._codeLens = [];
     
        for(var i=0; i<this._funcList.length; i++){
          let line = this._funcList[i]['line'], 
              startChar = this._funcList[i]['pos'],
              endChar = startChar + this._funcList[i]['name'].length;
          
          let command =  {
            command : "exampleusageplz.addUsageInfo",
            title : "Example: " + this._funcList[i]['name']
          };
          let position = new Range(line, startChar, line, endChar);
 
          this._codeLens.push(new CodeLens(position, command));
        }
        return this._codeLens;
     
      }
      // TODO:: render with func name

      public async getFunc() {
        const editor = window.activeTextEditor;
        if (editor) {
        
          let document = editor.document;
          // Get the document text
          const documentText = document.getText();
          this._funcList = await lineNumberByIndex(documentText);
          }
    }
}

async function lineNumberByIndex(s : string){
  getDefinitionInfo(new Position(7, 15));
  // RegExp
  var line = 0,
      match,
      re = /[a-zA-Z]+\([^\)]*\)(\.[^\)]*\))?/g;
  var allLines = s.split("\n");
  var funcList: FuncInfo[] = [];

  for (var i = 0; i < allLines.length; i++) {
        while ((match = re.exec(allLines[i])) !== null) {
          let name = match[0].replace(/ *\([^)]*\) */g, '');
          let definition = await getDefinitionInfo(new Position(i, match.index));
          if(definition){
            funcList.push({name: name, line: i, pos: match.index});
          }
        }
  }
  return funcList;
}
