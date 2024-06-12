const firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "AUTHDOMAIN",
    projectId: "PROJECTID",
    storageBucket: "STORAGEBUCKET",
    messagingSenderId: "MESSAGINGSENDERID",
    appId: "APPID"
};

firebase.initializeApp(firebaseConfig);

const initApp = () => {

    const droparea = document.querySelector('.droparea');

    const active = () => droparea.classList.add("green-border");

    const inactive = () => droparea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });

    droparea.addEventListener("drop", handleDrop);

}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    Array.from(files).forEach((file) => {
        let randomInt = Math.floor(Math.random() * 1000000);
        let fileExtension = file.name.split('.').pop();
        let fileName = file.name.split('.').slice(0, -1).join('.') + '_' + randomInt + '.' + fileExtension;

        // Use the file extension to create the storage reference
        let storageRef = firebase.storage().ref(fileExtension + '/' + fileName);
        let uploadTask = storageRef.put(file);

        uploadTask.on("state_changed", (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            var loadingBar = document.getElementById('loadingBar');
            loadingBar.style.width = progress + '%'; // Set the width to 50%
            loadingBar.textContent = progress.toFixed(2) + '%';

            if (progress == 100) {
                loadingBar.textContent = 'File(s) uploaded successfully!';

            }

            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            console.error(error);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initApp();

    // Get a reference to the storage service
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    var storageRef = storage.ref();

    // List all the prefixes (directories)
    storageRef.listAll().then(function (res) {
        var select = document.getElementById('fileTypeSelect');

        res.prefixes.forEach(function (folderRef) {
            // Get the folder name (file type)
            var fileType = folderRef.name;

            // Create a new option element
            var option = document.createElement('option');
            option.value = fileType;
            option.text = fileType;

            // Add the option to the select
            select.appendChild(option);
        });
    }).catch(function (error) {
        console.log('Error getting directories:', error);
    });
});

// Add listFilesInDirectory to the global scope
window.listFilesInDirectory = listFilesInDirectory;

function listFilesInDirectory(directory) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var directoryRef = storageRef.child(directory);

    directoryRef.listAll().then(function (res) {
        var fileList = document.getElementById('fileList');

        // Clear the file list
        fileList.innerHTML = '';

        res.items.forEach(function (fileRef) {
            fileRef.getDownloadURL().then(function (url) {
                // Create a new list item
                var li = document.createElement('li');
                li.className = 'p-1';

                // Create a new link
                var a = document.createElement('a');
                a.href = url;
                a.className = 'fs-5 text-decoration-none'

                // Split the filename into parts based on the underscore and dot characters
                var filenameParts = fileRef.name.split(/[_\.]/);
                // Remove the ID from the filename
                var filenameWithoutId = filenameParts.slice(0, -2).concat(filenameParts.slice(-1)).join('.');
                a.textContent = filenameWithoutId;

                // Add the link to the list item
                li.appendChild(a);

                // Create a new delete button
                var button = document.createElement('button');
                button.className = 'btn btn-danger ms-2 btn-sm rounded-circle';

                // Create a new icon
                var icon = document.createElement('i');
                icon.className = 'fas fa-times'; // Font Awesome class for the 'X' icon

                // Add the icon to the button
                button.appendChild(icon);


                button.onclick = function () {
                    // Delete the file
                    fileRef.delete().then(function () {
                        // File deleted successfully
                        console.log('File deleted successfully');
                        // Refresh the file list
                        listFilesInDirectory(directory);
                    }).catch(function (error) {
                        // An error occurred
                        console.log('Error deleting file:', error);
                    });
                };

                // Add the delete button to the list item
                li.appendChild(button);

                // Add the list item to the file list
                fileList.appendChild(li);
            });
        });
    }).catch(function (error) {
        console.log('Error getting files:', error);
    });
}
