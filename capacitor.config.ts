
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.aa3fa8707dbb47078194d2c541ec2acc',
  appName: 'myagri-prompt-genius',
  webDir: 'dist',
  server: {
    url: 'https://aa3fa870-7dbb-4707-8194-d2c541ec2acc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
