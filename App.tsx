import { StatusBar } from 'expo-status-bar';
import QRPaymentScreen from './src/screens/QRPaymentScreen';

export default function App() {
  return (
    <>
      <QRPaymentScreen />
      <StatusBar style="auto" />
    </>
  );
}
