import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload
      .map((product) => product.price)
      .sort((a, b) => b - a)[0]
    // let minPrice = action.payload
    //   .map((product) => product.price)
    //   .sort((a, b) => a - b)[0]

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    let sorted = [...state.filtered_products]
    if (state.sort === 'price-lowest') {
      sorted = state.filtered_products.sort((a, b) => a.price - b.price)
    }
    if (state.sort === 'price-highest') {
      sorted = state.filtered_products.sort((a, b) => b.price - a.price)
    }
    if (state.sort === 'name-a') {
      sorted = state.filtered_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      )
    }
    if (state.sort === 'name-z') {
      sorted = state.filtered_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      )
    }
    return { ...state, filtered_products: sorted }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload

    return { ...state, filters: { ...state.filters, [name]: value } }
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const {
      text,
      category,
      company,
      color,
      price,
      max_price,
      shipping,
    } = state.filters
    //before we filter something we always start with s fresh copy of all products
    let tempProducts = [...all_products]
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((line) => line === color)
      })
    }
    if (max_price) {
      tempProducts = tempProducts.filter((product) => product.price <= price)
    }
    if (shipping === true) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
