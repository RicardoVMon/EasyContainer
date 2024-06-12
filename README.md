# Quick Container

## Overview

Quick Container is a simple web application designed to make file storage and retrieval easy. It allows users to upload files by dragging and dropping them into a designated area and then download the files back by selecting their extensions.

## Features

- Drag and drop file upload
- Real-time upload progress display
- Firebase storage integration for file management
- File type selection for viewing stored files
- Option to delete files

## Prerequisites

- A Firebase project with storage enabled
- Basic knowledge of HTML, CSS, and JavaScript
- A web browser (Chrome, Firefox, etc.)

## Setup and Configuration

### Firebase Configuration

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the instructions to create a new project.

2. **Enable Firebase Storage**:
   - In the Firebase Console, navigate to your project.
   - Click on "Storage" in the left-hand menu.
   - Click on "Get started" and follow the instructions to enable Firebase Storage.

3. **Add a Web App to Your Firebase Project**:
   - In the Firebase Console, click on the gear icon next to "Project Overview" and select "Project settings".
   - Click on the "General" tab and scroll down to "Your apps".
   - Click on the web icon (`</>`) to set up a new web app.
   - Register the app and copy the configuration details provided (API key, Auth domain, etc.).

4. **Update Configuration in `main.js`**:
   - Replace the `firebaseConfig` object in `main.js` with your Firebase project's configuration details.

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Running the Application

#### Option 1: Running Locally

1. **Download the Project Files**:
   - Download the HTML, CSS, and JS files (`index.html`, `main.css`, `main.js`) to your local machine.

2. **Open `index.html`**:
   - Open the `index.html` file in a web browser to start the application.

#### Option 2: Hosting on GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/) and create a new repository.

2. **Upload Project Files**:
   - Upload the HTML, CSS, and JS files to the repository.

3. **Enable GitHub Pages**:
   - Go to the repository settings.
   - Scroll down to the "GitHub Pages" section.
   - Select the branch and folder where your files are located (usually `main` and `/root`).
   - Save the settings and GitHub Pages will provide you with a URL to access your application.

## Usage

1. **Upload Files**:
   - Drag and drop files into the designated drop area on the web page.
   - The progress bar will display the upload status.

2. **Select File Type**:
   - Use the dropdown menu to select a file type to view.
   - The list of files of the selected type will be displayed.

3. **Download and Delete Files**:
   - Click on the file name to download it.
   - Click on the delete button (red X) next to the file name to delete it from storage.

## Contributing

If you would like to contribute to the development of this project, please fork the repository and submit a pull request with your changes. 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, please contact [RicardoVMon](https://github.com/RicardoVMon).

---

Enjoy using Quick Container!
