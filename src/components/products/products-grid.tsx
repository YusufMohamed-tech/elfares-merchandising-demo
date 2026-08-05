"use client"

import { useState } from "react"
import { Search, Plus, Package, Grid3X3, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Dairy", "Juices & Beverages", "Snacks", "Canned Foods", "Frozen Foods"]

const products = [
  { id: "1", name: "Al Fares Full Cream Milk 1L", nameAr: "حليب الفارس كامل الدسم 1 لتر", sku: "AF-DRY-001", category: "Dairy", barcode: "6281100000001", status: "active" },
  { id: "2", name: "Al Fares Yogurt 500g", nameAr: "زبادي الفارس 500 جرام", sku: "AF-DRY-002", category: "Dairy", barcode: "6281100000002", status: "active" },
  { id: "3", name: "Al Fares Orange Juice 1L", nameAr: "عصير برتقال الفارس 1 لتر", sku: "AF-JCE-001", category: "Juices & Beverages", barcode: "6281100000003", status: "active" },
  { id: "4", name: "Al Fares Apple Juice 1L", nameAr: "عصير تفاح الفارس 1 لتر", sku: "AF-JCE-002", category: "Juices & Beverages", barcode: "6281100000004", status: "active" },
  { id: "5", name: "Al Fares Potato Chips 150g", nameAr: "شيبس الفارس 150 جرام", sku: "AF-SNK-001", category: "Snacks", barcode: "6281100000005", status: "active" },
  { id: "6", name: "Al Fares Tomato Paste 400g", nameAr: "معجون طماطم الفارس 400 جرام", sku: "AF-CAN-001", category: "Canned Foods", barcode: "6281100000006", status: "active" },
  { id: "7", name: "Al Fares Tuna 185g", nameAr: "تونة الفارس 185 جرام", sku: "AF-CAN-002", category: "Canned Foods", barcode: "6281100000007", status: "active" },
  { id: "8", name: "Al Fares Frozen Vegetables 450g", nameAr: "خضار مجمدة الفارس 450 جرام", sku: "AF-FRZ-001", category: "Frozen Foods", barcode: "6281100000008", status: "active" },
]

export function ProductsGrid() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products in catalog</p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                selectedCategory === cat
                  ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto border border-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-400"}`}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-400"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-gray-300"
            >
              <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 mb-3">
                <Package className="h-10 w-10 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{product.nameAr}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">{product.sku}</span>
                  <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-700 border-green-200">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.nameAr}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{product.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-400">{product.barcode}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-gray-500">Showing {filtered.length} of {products.length} products</p>
    </div>
  )
}
