import * as vscode from "vscode";
import * as path from "path";
import * as fs from 'fs';
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