const firebaseConfig = {
    apiKey: "AIzaSyAUqBV6bN5XxWKtTRB6fb2n8_xi5nSwyEY",
    authDomain: "easy-pdf-3900c.firebaseapp.com",
    projectId: "easy-pdf-3900c",
    storageBucket: "easy-pdf-3900c.appspot.com",
    messagingSenderId: "782956175567",
    appId: "1:782956175567:web:65d30ae912ec9b3332d7ba"
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
    const firstFile = files[0];

    let storageRef = firebase.storage().ref(firstFile.name);
    let uploadTask = storageRef.put(firstFile);

    uploadTask.on("state_changed", (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }, (error) => {
        console.error(error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            document.getElementById('hiddenInput').value = downloadURL;
        });
    });

}