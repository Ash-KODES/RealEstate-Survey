{ pkgs }: {
  deps = [
    pkgs.python39Full
    pkgs.python39Packages.flask
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
    # Add any additional dependencies you might need
  ];
}
