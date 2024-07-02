
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function checkAndRequestPermissions() {
  const result = await check(PERMISSIONS.ANDROID.INSTALL_PACKAGES);
  if (result === RESULTS.GRANTED) {
    // Permission already granted, proceed with installation
  } else {
    // Permission not granted, request it
    const requestResult = await request(PERMISSIONS.ANDROID.INSTALL_PACKAGES);
    if (requestResult === RESULTS.GRANTED) {

      // Permission granted, proceed with installation
    } else {

      // Permission not granted, handle accordingly
    }
  }
}

export { checkAndRequestPermissions };