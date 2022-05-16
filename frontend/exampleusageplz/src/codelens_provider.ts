import { TextDocument, 
          CodeLens, 
          Range, 
          CodeLensProvider, 
          window, 
          workspace,
          Position,
          commands,
          LocationLink, 
          EventEmitter} from 'vscode';

import { getDepsInPackageJson, 
         Dependency, 
         UsageInstance } from './functions';

import * as ts from 'typescript';
import * as path from "path";

export default class Provider implements CodeLensProvider {
    private _funcList: UsageInstance[] = [];
    private _packageList: Dependency[] = [];
    private readonly _onChangeCodeLensesEmitter = new EventEmitter<void>();
    readonly onDidChangeCodeLenses = this._onChangeCodeLensesEmitter.event;

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

    reload() {
      this._onChangeCodeLensesEmitter.fire();
    }

    // Starts CodeLens by filling function list
    async startCodelens() {
      this._funcList = []; 
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
        let codeLens : CodeLens[] = [];

        if (workspace.getConfiguration("exampleusageplz").get("exampleUsageCodeLens", true)) {
          await this.startCodelens();

          for(var i=0; i<this._funcList.length; i++){
            let args = [
              {
                "instance": this._funcList[i],
              }
            ];
            let command =  {
              command : "exampleusageplz.addUsageInfo",
              title : "Example: " + this._funcList[i]._name,
              arguments: args
            };
            codeLens.push(new CodeLens(this._funcList[i]._position, command));
          }
      }
      return codeLens;   
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
              // Check if instance is already in the list
              let found = this._funcList.find(instance => (instance._name === funcName && instance._line === line));
              if(!found){
                this._funcList.push(new UsageInstance(funcName, line, range, definition));
              }
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

  // Get definition information at a position if it is a node package
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
                      return this._packageList.find(dependency => dependency._module.includes(moduleName));
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
