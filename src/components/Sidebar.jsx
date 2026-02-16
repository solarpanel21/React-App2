import { useState, useCallback } from "react"
/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @returns Component
 */
export default function Sidebar({ initialMenuItems }) {
  let [newMenuItem, setNewMenuItem] = useState("")
  let [menuItems, setMenuItems] = useState(initialMenuItems)
  let [filter, setFilter] = useState("")
  // Adds a single string passed in as parameter to the state element
  // "menuItems" that holds the set of current menu items.
  let addMenuItem = useCallback(() => {
    // add the new item to the front of the list
    setMenuItems([newMenuItem].concat(menuItems))
  }, [newMenuItem, menuItems])

  // build a filtered list using a while loop
  let filteredItems = []
  let i = 0
  while (i < menuItems.length) {
    let regex = new RegExp(filter, "i")
    if (regex.test(menuItems[i])) {
      filteredItems.push(menuItems[i])
    }
    i++
  }

  // build the list items using a while loop
  let listItems = []
  let j = 0
  while (j < filteredItems.length) {
    listItems.push(<li key={j}>{filteredItems[j]}</li>)
    j++
  }

  return (
    <div>
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
      ></input>
      <br />
      <button
        onClick={addMenuItem}
      >
        Add Item
      </button>
      <br />
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..."
      ></input>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}
