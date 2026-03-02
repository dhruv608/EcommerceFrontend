export default function Metadata({ product }: any) {
  return (
    <div className="bg-white p-6 rounded border space-y-2">
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
