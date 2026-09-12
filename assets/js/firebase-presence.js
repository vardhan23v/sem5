(function () {
    'use strict';

    // Firebase web configuration is safe to expose in browser code.
    var firebaseConfig = {
        apiKey: 'AIzaSyBUaIyB-7F3Hc24wD58IOlFg4i_-eRbIKg',
        authDomain: 'notevault-b027e.firebaseapp.com',
        databaseURL: 'https://notevault-b027e-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'notevault-b027e',
        storageBucket: 'notevault-b027e.firebasestorage.app',
        messagingSenderId: '628354183588',
        appId: '1:628354183588:web:3eff72453a6f20f00fd131'
    };

    // Backend-only live viewer presence. No UI is updated — this data is
    // consumed from the Realtime Database externally (e.g. admin dashboard).
    function startPresence() {
        if (!window.firebase || !firebase.apps.length) return;

        var database = firebase.database();
        var presenceRef = database.ref('presence');
        var visitorRef;

        firebase.auth().signInAnonymously().then(function (result) {
            visitorRef = presenceRef.child(result.user.uid);
            return visitorRef.onDisconnect().remove();
        }).then(function () {
            return visitorRef.set({
                online: true,
                lastSeen: firebase.database.ServerValue.TIMESTAMP,
                page: window.location.pathname
            });
        }).catch(function (error) {
            console.warn('Live viewer presence is unavailable:', error.message);
        });
    }

    function startFirebase() {
        try {
            if (!window.firebase) return;
            if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
            startPresence();
        } catch (error) {
            console.warn('Firebase could not start:', error.message);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startFirebase);
    } else {
        startFirebase();
    }
}());