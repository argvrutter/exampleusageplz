
import * as vscode from 'vscode';
import Provider from './codelens_provider';
import { openInUntitled } from './functions';

export async function activate(context: vscode.ExtensionContext) {
	const codeLensProvider = new Provider();
	//const tree = new ExampleUsageTreeProvider();
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
	context.subscriptions.push(openCodelensDisposable,
								codelensDisposable);
}

export function deactivate() {}
