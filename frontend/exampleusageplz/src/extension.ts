
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openInUntitled } from './functions';
import { showQuickPick } from './post';
export async function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(() => {
		console.log("editor change");
	});

	const codeLensProvider = new Provider();

	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		"*",
		codeLensProvider
	);
	
	let openCodelensDisposable = vscode.commands.registerCommand("exampleusageplz.getUsage", async () => {
		codeLensProvider.startCodelens();
	});

    let codelensDisposable = vscode.commands.registerCommand("exampleusageplz.addUsageInfo", (args: any) => {
		openInUntitled('Test');
    });

	// Add a command for quickly submitting a post
	// based on quickinput-sample: 
	// https://github.com/microsoft/vscode-extension-samples/blob/main/quickinput-sample/src/extension.ts
	let quickPostDisposable = vscode.commands.registerCommand("exampleusageplz.quickPost", async () => {
		const result = await showQuickPick(codeLensProvider);
		vscode.window.showInformationMessage(`Got: ${result}`);
	});
	
	context.subscriptions.push(codeLensProviderDisposable, openCodelensDisposable,
								codelensDisposable, quickPostDisposable);

}

export function deactivate() {}
