import * as vscode from "vscode";
import * as path from "path";
import * as fs from 'fs';
// import { Config } from './config/config';
import * as ts from 'typescript';


import { TextDocument, 
          CodeLens, 
          Range, 
          CodeLensProvider, 
          window, 
          workspace,
          Position,
          commands,
          LocationLink } from 'vscode';
// let config: Config = require('./config/config.json');

// Opens document side by side view
export async function openInUntitled(content: string, language?: string) {

    const document = await vscode.workspace.openTextDocument({
        language,
        content,
    });
    vscode.window.showTextDocument(document, {
		viewColumn: vscode.ViewColumn.Beside
	});
	console.log(vscode.window.showTextDocument.toString());
}

export function pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }
    return true;
}

// Gets module and version from package.json
export function getDepsInPackageJson(packageJsonPath: string, workspaceRoot: string): Dependency[] {
    if (pathExists(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
   
        const toDep = (moduleName: string, version: string): Dependency => {
            //if (pathExists(path.join(workspaceRoot, 'node_modules', moduleName)), ) {
            return new Dependency(moduleName, version);

        };
      
        const deps = packageJson.dependencies
            ? Object.keys(packageJson.dependencies).map(dep =>
                toDep(dep, packageJson.dependencies[dep])
            )
            : [];
        const devDeps = packageJson.devDependencies
            ? Object.keys(packageJson.devDependencies).map(dep =>
                toDep(dep, packageJson.devDependencies[dep])
            )
            : [];
            
            // return deps.concat(devDeps).filter(module => !config.baseModules.includes(module._module));
        } else {
            return [];
        }
}

// Traverse AST tree to get function calls
export async function getFunctionCalls(node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile) 
{
if (ts.isCallExpression(node) && node.expression) {
    let expression : any = node.expression;
    let func = <ts.Identifier> expression.name;
    let funcName : string = func ? <any>func.escapedText : undefined;
    
    if(funcName){
    let { line, character } = 
        sourceFile.getLineAndCharacterOfPosition(func.getStart(sourceFile));

        let definition = await getDefinitionInfo(new Position(line, character));
        if(definition){
            this._funcList.push(new UsageInstance(funcName, line, character, definition));
        }
    }
}

await Promise.all(node.getChildren(sourceFile).map(async (child) => {
    await this.getFunctionCalls(child, indentLevel + 1, sourceFile);
}));
}

export  async function getDefinitionInfo(pos: Position): Promise<Dependency | undefined>{
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
                let re = new RegExp("node_modules" + "\\"+ path.sep +"(.*?)\\" + path.sep);
                let match = link.match(re);
                if(match){
                    let moduleName = match[1];
                    // filter to modules in our list of packages
                    return this._packageList.find(dependency => dependency._module === moduleName);
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

export class Dependency {
    constructor(
      public _module: string,
      public _version: string,
    ) {}
}

export class UsageInstance {
    constructor(
      public _name: string,
      public _line: number,
      public _character: number,
      public _package: Dependency
    ){}
  }