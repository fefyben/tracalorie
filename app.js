// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', addItemSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', (e) => {
      // Keycode for new versions and Wich for old versions
      if (e.keycode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit item event
    document.querySelector(UISelectors.itemsList).addEventListener('click', editItemClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItemSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItemSubmit);

    // Back event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.hideEditState);

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item submit
  const addItemSubmit = function(e) {
    const input = UICtrl.getItemInput();

    // Check for name and calories input
    if (input.name !== '' && input.calories !== '') {
      // Add new item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add new item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store item in LocalStorage
      StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInputs();
    }

    e.preventDefault();
  }

  // Edit item click
  const editItemClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      // Get list item id
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split('-');
      // Get the actual id
      const id = parseInt(listIdArr[1]);
      
      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add current item to UI form
      UICtrl.addCurrentItemToForm();
    }

    e.preventDefault();
  }

  // Update item submit
  const updateItemSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update item in LocalStorage
    StorageCtrl.updateStorageItem(updatedItem);

    UICtrl.hideEditState();

    e.preventDefault();
  }

  // Delete item submit
  const deleteItemSubmit = function(e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete item from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete item from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete item in LocalStorage
    StorageCtrl.deleteStorageItem(currentItem.id);

    UICtrl.hideEditState();

    e.preventDefault();
  }

  // Clear items event
  const clearAllItemsClick = function() {
    // Clear all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Clear all items from UI
    UICtrl.clearListItems();

    // Clear all items form LocalStorage
    StorageCtrl.clearStorageItems();

    // Hide UL
    UICtrl.hideList();
  }

  // Public method
  return {
    init: function() {
      // Set init state
      UICtrl.hideEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any item
      if(items.length === 0 ) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemsList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);      

      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();
