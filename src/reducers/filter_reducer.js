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
    let minPrice = action.payload
      .map((product) => product.price)
      .sort((a, b) => a - b)[0]

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
    // console.log('filtering products')

    return { ...state }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
