export default function Home() {
  return (
    <div className="grid grid-rows-2 gap-4 p-4 h-container max-md:flex max-md:flex-col">
      <div className="grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
        <article className="p-2 border rounded shadow border-neutral-50">
          <strong>Ultimos pacientes</strong>
        </article>
        <article className="p-2 border rounded shadow border-neutral-50">
          <strong>Ultimos diaginósticos</strong>
        </article>
      </div>
      <article className="p-2 border rounded shadow border-neutral-50">
        <strong>Gráfico de sintomas</strong>
      </article>
    </div>
  );
}
