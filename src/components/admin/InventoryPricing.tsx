export default function InventoryPricing({ product }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
      <h2 className="font-medium">Inventory & Pricing</h2>

      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-medium">₹{product.price}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Stock</p>
          <p className="font-medium">{product.stock} units</p>
        </div>
      </div>
    </div>
  );
}
