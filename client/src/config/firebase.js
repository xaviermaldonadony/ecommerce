// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBC-deIAtCaHI9l7SEC6e7dtYvRUWW0moc',
	authDomain: 'ecommerce-343ad.firebaseapp.com',
	projectId: 'ecommerce-343ad',
	storageBucket: 'ecommerce-343ad.appspot.com',
	messagingSenderId: '1055080302978',
	appId: '1:1055080302978:web:94452ad573199b9dd9679b',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { auth, googleAuthProvider };
