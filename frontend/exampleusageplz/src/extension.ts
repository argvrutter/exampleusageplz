
import { privateEncrypt } from 'crypto';
import * as vscode from 'vscode';
import Provider from './provider';

export function activate(context: vscode.ExtensionContext) {
	const provider = new Provider();

	let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
		"*",
		provider
	);
	
    let codelensDisposable = vscode.commands.registerCommand("exampleusageplz.addUsageInfo", (args: any) => {
        vscode.window.showInformationMessage(`CodeLens action clicked with args=${args}`);
    });

	context.subscriptions.push(codelensDisposable);
}

export function deactivate() {}
