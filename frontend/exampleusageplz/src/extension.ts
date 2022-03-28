
import * as vscode from 'vscode';
import Provider from './codelens_provider';
//import { ExampleUsageTreeProvider } from './treeview_provider';
import { openInUntitled } from './functions';

import path = require('path');

export async function activate(context: vscode.ExtensionContext) {
	const codeLensProvider = new Provider();

	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		"*",
		codeLensProvider
	);
/*
	const rootPath =
  	vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
    	? vscode.workspace.workspaceFolders[0].uri.fsPath
    	: undefined;
			if(rootPath){
		vscode.window.createTreeView('usageView', {
			treeDataProvider: new ExampleUsageTreeProvider(rootPath),
		});
	}
	*/
	
	let openCodelensDisposable = vscode.commands.registerCommand("exampleusageplz.getUsage", () => {
		codeLensProvider.startCodelens();
	});

    let codelensDisposable = vscode.commands.registerCommand("exampleusageplz.addUsageInfo", (args: any) => {
		openInUntitled('Test');
    });
	context.subscriptions.push(openCodelensDisposable,
								codelensDisposable);
}

export function deactivate() {}
