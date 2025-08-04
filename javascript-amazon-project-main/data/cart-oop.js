function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    localStorageKey,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
          }
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      if (!Array.isArray(this.cartItems)) {
        this.loadFromStorage(); 
      }

      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      if (!Array.isArray(this.cartItems)) {
        this.loadFromStorage();
      }

      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      if (!Array.isArray(this.cartItems)) {
        this.loadFromStorage();
      }

      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      }
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

console.log(cart);
console.log(businessCart);
