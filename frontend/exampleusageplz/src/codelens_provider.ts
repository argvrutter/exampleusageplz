import { TextDocument, 
          CodeLens, 
          Range, 
          CodeLensProvider, 
          window, 
          CancellationToken,
          Position} from 'vscode';

import * as ts from 'typescript';
import { getDefinitionInfo } from './functions';
import { SourceFile } from 'ts-morph';

type FuncInfo = {name: string; line: number; pos: number};

export default class Provider implements CodeLensProvider {
    private _funcList: FuncInfo[] = [];
    private _codeLens: CodeLens[] = [];

    constructor() {
    }   

    // Starts CodeLens by filling function list
    async startCodelens(){
      const editor = window.activeTextEditor;

      if (editor) {
        const sourceFile = ts.createSourceFile(
          "test.ts", editor.document.getText(), ts.ScriptTarget.Latest
        );
        await this.getFunctionCalls(sourceFile, 0, sourceFile);    
      }
      console.log(this._funcList);
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
      /*
      public async getFunc() {
        const editor = window.activeTextEditor;
        if (editor) {
        
          let document = editor.document;
          // Get the document text
          const documentText = document.getText();
          this._funcList = await lineNumberByIndex(documentText);
          }
    }*/

  // Traverse AST tree to get function calls
  async getFunctionCalls(
    node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile
  ) {
   
    if (ts.isCallExpression(node) && node.expression) {
      let expression : any = node.expression;
      let func = <ts.Identifier> expression.name;
      let funcName : string = <any>func.escapedText;
      
      if(func){
        let { line, character } = 
            sourceFile.getLineAndCharacterOfPosition(func.getStart(sourceFile));
  
            let definition = await getDefinitionInfo(new Position(line, character));
            if(definition){
              this._funcList.push({name: funcName, line: line, pos: character});
            }
      }
    }

    await Promise.all(node.getChildren(sourceFile).map(async (child) => {
      await this.getFunctionCalls(child, indentLevel + 1, sourceFile);
    }));
  }

}
// TODO:: delete
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
