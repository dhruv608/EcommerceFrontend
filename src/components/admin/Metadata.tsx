export default function Metadata({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
      <h2 className="font-medium">Metadata</h2>

      <div>
        <p className="text-xs text-gray-500">CREATED AT</p>
        <p>{new Date(product.createdAt).toDateString()}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500">LAST UPDATED</p>
        <p>{new Date(product.updatedAt).toDateString()}</p>
      </div>
    </div>
  );
}
