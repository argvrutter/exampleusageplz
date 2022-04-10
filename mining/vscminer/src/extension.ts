// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import fs
import * as fs from 'fs';
import { pathExists, getDepsInPackageJson } from './functions';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscminer" is now active!');

	// First, the dispatcher will open an instance of vscode inside the repository to be mined

	// Open all Javascript and typescript files in the current folder
	let disposable2 = vscode.commands.registerCommand('vscminer.openAll', () => {
		vscode.workspace.findFiles('**/*.{js,ts}', '**/node_modules/**').then(uris => {
			uris.forEach(uri => {
				vscode.window.showTextDocument(uri);
			});
		});
	});
	// vscode.commands.executeCommand('vscminer.openAll');
	// set path, may be undefined
	let path: string | undefined = vscode.workspace.workspaceFolders[0].uri.fsPath;
	// let path = ?vscode.workspace.workspaceFolders[0];
	// get the deps in package.json
	let packages = getDepsInPackageJson(path + context.extensionPath, 'package.json');
	console.log(packages);

	// get function calls
	let funcList: UsageInstance[] = [];
	

	context.subscriptions.push(disposable2);
	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
