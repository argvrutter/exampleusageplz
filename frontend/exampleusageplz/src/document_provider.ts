import * as vscode from 'vscode';

export class VirtualDocProvider implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return uri.path;
    }
}