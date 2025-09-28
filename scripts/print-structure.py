import os

EXCLUDE_FOLDERS = { ".venv", "node_modules", ".vscode", ".turbo", "build", "plugins", ".git", ".DS_Store"}

def print_directory_structure(root_dir, prefix=""):
    """
    Recursively prints the directory structure starting from root_dir, excluding specific folders.
    
    Args:
        root_dir (str): The root directory to start from.
        prefix (str): The indentation prefix for formatting.
    """
    if not os.path.exists(root_dir):
        print(f"Directory '{root_dir}' does not exist.")
        return

    # Get all items, excluding specified folders
    items = [item for item in sorted(os.listdir(root_dir)) if item not in EXCLUDE_FOLDERS]
    pointers = ["├── "] * (len(items) - 1) + ["└── "]  # Formatting for tree structure

    for pointer, item in zip(pointers, items):
        path = os.path.join(root_dir, item)
        print(f"{prefix}{pointer}{item}{'/' if os.path.isdir(path) else ''}")
        
        if os.path.isdir(path):
            new_prefix = prefix + ("│   " if pointer == "├── " else "    ")
            print_directory_structure(path, new_prefix)

# Example usage
if __name__ == "__main__":
    root_directory = "."  # Change this to your project root if different
    print(f"{root_directory}/")
    print_directory_structure(root_directory)
