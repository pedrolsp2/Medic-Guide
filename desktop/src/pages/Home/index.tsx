import { Store, useStoreBase } from '@/store';

const stateSelector = (state: Store) => ({
  usuario: state.usuario,
});

export default function Home() {
  const { usuario } = useStoreBase(stateSelector);

  return <div className="h-container">Home {usuario}</div>;
}
