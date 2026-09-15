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

    var MAX_RETRIES = 50; // 50 × 100ms = 5 seconds max wait
    var retryCount = 0;

    function startPresence() {
        if (!window.firebase || !firebase.apps.length) {
            console.warn('[NoteVault] Firebase app not initialized, skipping presence.');
            return;
        }

        var database = firebase.database();
        var presenceRef = database.ref('presence');
        var connectedRef = database.ref('.info/connected');

        console.log('[NoteVault] Signing in anonymously...');

        firebase.auth().signInAnonymously().then(function (result) {
            var uid = result.user.uid;
            var visitorRef = presenceRef.child(uid);
            console.log('[NoteVault] Auth success — UID:', uid);

            connectedRef.on('value', function (snap) {
                if (snap.val() === true) {
                    console.log('[NoteVault] Connected to Realtime Database.');
                    visitorRef.onDisconnect().remove().then(function () {
                        return visitorRef.set({
                            online: true,
                            lastSeen: firebase.database.ServerValue.TIMESTAMP,
                            page: window.location.pathname
                        });
                    }).then(function () {
                        console.log('[NoteVault] Presence set successfully.');
                    }).catch(function (err) {
                        console.error('[NoteVault] Presence write failed:', err.code, err.message);
                        if (err.code === 'PERMISSION_DENIED') {
                            console.error('[NoteVault] ⚠️ Check your Firebase Realtime Database rules — anonymous writes to /presence must be allowed.');
                        }
                    });
                } else {
                    console.log('[NoteVault] Disconnected from Realtime Database.');
                }
            });
        }).catch(function (error) {
            console.error('[NoteVault] Anonymous auth failed:', error.code, error.message);
            if (error.code === 'auth/admin-restricted-operation') {
                console.error('[NoteVault] ⚠️ Anonymous sign-in is DISABLED in Firebase Console. Enable it at:');
                console.error('    https://console.firebase.google.com/project/notevault-b027e/authentication/providers');
            } else if (error.code === 'auth/network-request-failed') {
                console.error('[NoteVault] ⚠️ Network error — check internet connection or ad-blockers.');
            }
        });
    }

    function initFirebase() {
        if (window.firebase && typeof firebase.database === 'function' && typeof firebase.auth === 'function') {
            console.log('[NoteVault] Firebase SDK loaded. Initializing app...');
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('[NoteVault] Firebase app initialized — project:', firebaseConfig.projectId);
            }
            startPresence();
        } else {
            retryCount++;
            if (retryCount <= MAX_RETRIES) {
                setTimeout(initFirebase, 100);
            } else {
                console.error('[NoteVault] Firebase SDK failed to load after ' + (MAX_RETRIES * 100 / 1000) + 's.');
                console.error('[NoteVault] ⚠️ Check that the Firebase compat scripts are loading correctly in index.html.');
                console.error('[NoteVault] Expected: firebase-app-compat.js, firebase-auth-compat.js, firebase-database-compat.js');
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFirebase);
    } else {
        initFirebase();
    }
}());