import { Suspense, use } from "react";

function Comments({ dataPromise }: { dataPromise: Promise<unknown> } ) {
  const data = use(dataPromise);
  return <div>{JSON.stringify(data)}</div>;
}

async function loadData() {
  const res = await fetch('https://api.alliancelabs.com/washAlerts/machines?organisationID=652210');
  return res.json();
}

export default function () {
  return <main>
    <Suspense fallback={<div>Loading...</div>}>
      <Comments dataPromise={loadData()} />
    </Suspense>
  </main>
}
