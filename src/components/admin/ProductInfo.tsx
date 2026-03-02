export default function ProductInfo({ product }: any) {
  return (
    <div className="bg-white p-6 rounded border space-y-3">
      <h2 className="font-medium">Product Information</h2>

      <div>
        <p className="text-xs text-gray-500">PRODUCT NAME</p>
        <p className="font-medium">{product.name}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500">CATEGORY</p>
        <p>{product.category.name}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500">DESCRIPTION</p>
        <p className="text-sm">{product.description}</p>
      </div>
    </div>
  );
}
