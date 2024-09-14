import { Player } from '@lottiefiles/react-lottie-player';
import Load from '@/assets/lottie/loading.json';

export default function SplashLoading() {
  return <Player autoplay loop src={Load} />;
}
