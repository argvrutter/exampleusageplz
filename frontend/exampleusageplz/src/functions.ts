import * as vscode from "vscode";
import * as fs from 'fs';
import { usageInstanceToCall } from './interface';
import Client from './client';
import { Config } from './config/config';


let config: Config = require('./config/config.json');

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

// Gets usage information for a specific call and displays in peek view
export async function openPeekView(args: any){
  const baseUrl = config.baseUrl;
  let instance = <UsageInstance> args.instance;

  let client = new Client(baseUrl);
  let call = usageInstanceToCall(instance, "typescript");

  if(instance){
    let posts = await client.getPostsByCall(call);
    console.log(posts);
    if(posts){

      let locations : vscode.Location[] = [];
      for(var i=0; i<posts.length; i++){
        // workaround to seperate the title and content for now
        //let uri = vscode.Uri.parse("exampleusageplz:" +  posts[i].content);
        let uri = vscode.Uri.from({path: posts[i].title, fragment: posts[i].content, scheme: "exampleusageplz"});
        let doc = await vscode.workspace.openTextDocument(uri);
        locations.push(new vscode.Location(doc.uri, new vscode.Range(new vscode.Position(0,0), new vscode.Position(20,20))));
      };

      // Opens peek view at codelens
      let editor = vscode.window.activeTextEditor;
      if(editor){
        await vscode.commands.executeCommand("editor.action.peekLocations", 
          editor.document.uri,
          new vscode.Position(instance._line, instance._position.start.character),
          locations,
        );
      }	
    } else{
      vscode.window.showErrorMessage('No usage information');
    }
  } else {
    vscode.window.showErrorMessage('No usage information');
  }
}

function pathExists(p: string): boolean {
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
            
            return deps.concat(devDeps).filter(module => !config.baseModules.includes(module._module));
        } else {
            vscode.window.showErrorMessage("Exampleusageplz: No package.json");
            return [];
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
      public _position: vscode.Range,
    //   public _character: number,
      public _package: Dependency
    ){}
  }