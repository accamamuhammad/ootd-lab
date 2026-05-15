import Link from "next/link";
import Item from "./components/Item";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-6">
        <div className="px-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">My Wardrobe</h1>
            <p className="text-sm text-gray-400 mt-0.5">Built by accama</p>
          </div>
          <Link
            href="/add"
            className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white transition-opacity hover:opacity-80"
          >
            <span className="text-lg leading-none">+</span> Add Item
          </Link>
        </div>
        <Item />
      </div>
    </main>
  );
}