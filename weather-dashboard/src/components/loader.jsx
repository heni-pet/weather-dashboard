//Shows a spinner during fetches
export default function Loader() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}