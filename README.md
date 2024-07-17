# Quick Copy-Paste Chrome Extension

Quick Copy-Paste is a Chrome extension that allows users to store frequently used text snippets with keys for easy copy-pasting. This extension is ideal for quickly accessing and copying text like cover letters, email templates, or code snippets.

## Features

- Save text snippets with a unique key.
- Copy snippets to the clipboard with a single click.
- Delete snippets when they are no longer needed.
- Clean and responsive UI using Tailwind CSS.

## Installation

1. Clone the repository or download the source code.

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by clicking the toggle switch in the top-right corner.

4. Click the "Load unpacked" button and select the directory where you downloaded the source code.

5. The extension should now appear in your extensions list and the icon will be visible in the Chrome toolbar.

## Usage

1. Click on the Quick Copy-Paste icon in the Chrome toolbar to open the extension popup.

2. To save a new snippet:
   - Enter a unique key in the "Enter key..." input field.
   - Enter the text snippet in the "Enter your text here..." textarea.
   - Click the "Save" button.

3. Your saved snippets will appear below with their keys displayed.

4. To copy a snippet to the clipboard:
   - Click the "Copy" button next to the desired snippet.

5. To delete a snippet:
   - Click the "Delete" button next to the snippet you want to remove.

## Project Files


### manifest.json

Defines the extension's metadata and permissions.

### popup.html

Contains the HTML structure and references to the JavaScript and CSS files.

### popup.js

Includes the logic for saving, retrieving, displaying, copying, and deleting snippets.

### styles.css

Defines the styles for the popup. Tailwind CSS is used for styling.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions for improvements or new features.

## Acknowledgments

- Tailwind CSS for the styling framework.
- Chrome Extensions API documentation for guidance.


