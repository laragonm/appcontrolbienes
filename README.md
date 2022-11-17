**- Paso 1**

Debe agregar la configuración "missingDimensionStrategy" para la configuración 'react-native-camera' a 'general', esto debe encontrarse en su android/app/build.gradle lo siguiente:

```
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
  }
}
```


Add jitpack to android/build.gradle

```
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
    }
}
```

**-Paso 2 / Correr en teminal**

- npm install react-native-camera --save
- react-native link react-native-camera
- npm install react-native-qrcode-scanner --save
- react-native link react-native-qrcode-scanner
- npm install react-native-permissions --save
- react-native link react-native-permissions
