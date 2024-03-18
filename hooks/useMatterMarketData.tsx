import { useEffect, useMemo, useState } from "react"
import { serviceCategories, digitalCategories, physicalCategories } from "@/lib/consts"
import getProductsByType from "@/lib/firebase/getProductsByType"

const useMatterMarketData = (type) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [subCategoryLabel, setSubCategoryLabel] = useState("")

  const allNav = {
    label: "ALL",
    value: "ALL",
  }
  const [selectedNav, setSelectedNav] = useState(allNav.value) as any

  const categories = useMemo(() => {
    if (type === "Service") return [allNav, ...serviceCategories]
    if (type === "Digital") return [allNav, ...digitalCategories]
    if (type === "Physical") return [allNav, ...physicalCategories]
    return []
  }, [type])

  useEffect(() => {
    const label = categories.filter((category) => category.value === selectedNav)
    setSubCategoryLabel(selectedNav === "ALL" ? `All ${type}` : label[0].label)
  }, [categories, selectedNav])

  useEffect(() => {
    const init = async () => {
      const response = await getProductsByType(type)
      setProducts(response)
    }
    init()
  }, [type])

  useEffect(() => {
    if (products && selectedNav) {
      if (selectedNav === allNav.value) {
        setFilteredProducts(products)
        return
      }
      const temp = products.filter((product) => product.productCategory === selectedNav)
      setFilteredProducts(temp)
    }
  }, [selectedNav, products])

  return {
    products,
    categories,
    setSelectedNav,
    selectedNav,
    filteredProducts,
    setFilteredProducts,
    subCategoryLabel,
  }
}

export default useMatterMarketData
