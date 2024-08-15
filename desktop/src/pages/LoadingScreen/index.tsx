import { Player } from '@lottiefiles/react-lottie-player';
import Load from '@/assets/lottie/loading.json';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Player autoplay loop src={Load} />
    </div>
  );
}
