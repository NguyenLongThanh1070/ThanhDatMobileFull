// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDGLHyOjZHRRiaNI1AMMK9zkluqFMilMoQ',
    authDomain: 'thanhdatmobile-1ff1d.firebaseapp.com',
    projectId: 'thanhdatmobile-1ff1d',
    storageBucket: 'thanhdatmobile-1ff1d.appspot.com',
    messagingSenderId: '460287965901',
    appId: '1:460287965901:web:5cf49c25701e88d0098784',
    measurementId: 'G-9TSVC6J00V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage(app)

export { analytics, storage }
