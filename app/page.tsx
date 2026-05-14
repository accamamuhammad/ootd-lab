import Item from "./components/Item";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-6">
        <div className="px-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">My Wardrobe</h1>
          <p className="text-gray-400 mt-0.5">4 pieces</p>
        </div>
        <Item />
      </div>
    </main>
  );
}
