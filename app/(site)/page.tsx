import Header from "@/components/Header";


export default function Home() {
  return (
    <main className="bg-neutral-900 rounded-md h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4 gap-3 ">

          </div>
        </div>
      </Header>
    </main>
  );
}
