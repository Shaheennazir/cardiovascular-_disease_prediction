# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.postgresql
  ];

  # Sets environment variables in the workspace
  env = {
    PYTHONPATH = "${pkgs.python311}/bin";
    NODE_PATH = "${pkgs.nodejs_20}/bin";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "ms-python.python"
      "ms-python.vscode-pylance"
      "ms-vscode.vscode-typescript-next"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        frontend = {
          # Run React frontend with PORT set to IDX's defined port for previews
          command = ["npm" "start"];
          manager = "web";
          cwd = "./frontend";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
            BROWSER = "none";  # Prevent opening browser automatically
          };
        };
        backend = {
          # Run FastAPI backend
          command = ["uvicorn" "main:app" "--host" "0.0.0.0" "--port" "$PORT"];
          manager = "web";
          cwd = "./backend";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Install Python dependencies
        python-install = "cd backend && pip install -r requirements.txt";
        # Install JS dependencies from NPM
        npm-install = "cd frontend && npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Start database if needed
        # start-db = "pg_ctl -D /usr/local/var/postgres start";
      };
    };
  };
}
