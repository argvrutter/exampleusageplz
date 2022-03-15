
import { privateEncrypt } from 'crypto';
import * as vscode from 'vscode';
import Provider from './provider';

export function activate(context: vscode.ExtensionContext) {
	const provider = new Provider();
	
	console.log('Extension running!');

	let disposable = vscode.commands.registerCommand('exampleusageplz.getUsage', () => {
		return provider.getFunc();
    });

	context.subscriptions.push(disposable);
}

export function deactivate() {}
