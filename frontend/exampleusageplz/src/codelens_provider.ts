import { TextDocument, 
          CodeLens, 
          Range, 
          CodeLensProvider, 
          window, 
          workspace,
          Position,
          commands,
          LocationLink, 
          TextEditor} from 'vscode';

import { getDepsInPackageJson, 
         Dependency, 
         UsageInstance } from './functions';

import * as ts from 'typescript';
import * as path from "path";

export default class Provider implements CodeLensProvider {
    private _funcList: UsageInstance[] = [];
    private _codeLens: CodeLens[] = [];
    private _packageList: Dependency[] = [];

    constructor() {
      const rootPath =
      workspace.workspaceFolders && workspace.workspaceFolders.length > 0
        ? workspace.workspaceFolders[0].uri.fsPath
        : undefined;
        if(rootPath){
          this._packageList = getDepsInPackageJson(
          path.join(rootPath, 'package.json'),
          rootPath
        );
      }
    }   


    // Starts CodeLens by filling function list
    async startCodelens(document?: TextDocument){
      // if editor is undefined, use active editor
      if(!document){
        document = window.activeTextEditor?.document;
      }

      if (document) {
        const sourceFile = ts.createSourceFile(
          "test.ts", document.getText(), ts.ScriptTarget.Latest
        );
        await this.getFunctionCalls(sourceFile, 0, sourceFile);    
      }
    }

    async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
        this._codeLens = [];
    
        for(var i=0; i<this._funcList.length; i++){
          // let line = this._funcList[i]._line, 
          //     startChar = this._funcList[i]._character,
          //     endChar = startChar + this._funcList[i]._name.length;
          
          let command =  {
            command : "exampleusageplz.addUsageInfo",
            title : "Example: " + this._funcList[i]._name
          };
          // let position = new Range(line, startChar, line, endChar);
 
          this._codeLens.push(new CodeLens(this._funcList[i]._position, command));
        }

        let closestCodelens = this._codeLens.filter(codelens => {
          return codelens.range.start.line === window.activeTextEditor?.selection.start.line;
        });
        return this._codeLens;
        // return closestCodelens;
  }

  // Traverse AST tree to get function calls
  async getFunctionCalls(
    node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile
  ) {
    if (ts.isCallExpression(node) && node.expression) {
      let expression : any = node.expression;
      let func = <ts.Identifier> expression.name;
      let funcName : string = func ? <any>func.escapedText : undefined;
      
      if(funcName){
        let { line, character } = 
            sourceFile.getLineAndCharacterOfPosition(func.getStart(sourceFile));
            
            // get full position construct from ts node and construct vs.Range
            let startPos = new Position(line, character);
            let endPos = new Position(line, character + funcName.length);
            let range = new Range(startPos, endPos);

            let definition = await this.getDefinitionInfo(new Position(line, character));
            if(definition){
              this._funcList.push(new UsageInstance(funcName, line, range, definition));
            }
      }
    }

    await Promise.all(node.getChildren(sourceFile).map(async (child) => {
      await this.getFunctionCalls(child, indentLevel + 1, sourceFile);
    }));
  }

  public get funcList() {
    return this._funcList;
  }

  private async getDefinitionInfo(pos: Position): Promise<Dependency | undefined>{
    const editor = window.activeTextEditor;

    if (editor) {
        try {
          const referenceLocation = await commands.executeCommand('vscode.executeDefinitionProvider',
              editor.document.uri, 
              pos 
          )  as LocationLink[];

          if(referenceLocation.length > 0){
                let link = path.resolve(referenceLocation[0].targetUri.path);
                if(link.includes('node_modules')){
                    let re = new RegExp("node_modules" + "\\" + path.sep +"(.*?)\\" + path.sep);
                    let match = link.match(re);
                    if(match){
                      let moduleName = match[1];
                      return this._packageList.find(dep => dep._module.includes(moduleName));
                    }
                }
          }
        } catch(e){
                if (typeof e === "string") {
                    console.log(e.toUpperCase()); 
                } else if (e instanceof Error) {
                    console.log(e.message); 
                }
            }
        }
        return undefined;
  }
}
