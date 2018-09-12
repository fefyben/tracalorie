// Storage Controller
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: function(item) {
      let items;
      // Check if any items in LocalStorage
      if (localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // Set new item in LocalStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in LocalStorage and parse as an object
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set LocalStorage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateStorageItem: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        } 
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteStorageItem: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        } 
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearStorageItems: function() {
      localStorage.removeItem('items');
    }
  }
})();