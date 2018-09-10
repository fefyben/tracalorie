// Storage Controller



// Item Controller
const ItemCtrl = (function() {
  // Item constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Cookies', calories: 400 },
      { id: 2, name: 'Eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  }

  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    logData: function() {
      return data;
    }
  }

})();



// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemsList: '#items-list'
  }

  // Public methods
  return {
    populateItemsList: function(items) {
      let output = '';

      items.forEach(item => {
        output += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>
        `;
      });

      document.querySelector(UISelectors.itemsList).innerHTML = output;
    }
  }

})();



// App Controller
const App = (function(ItemCtrl, UICtrl) {

  // Public method
  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemsList(items);
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();
