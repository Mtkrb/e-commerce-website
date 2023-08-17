"use strict"

let requestsUrl = `http://localhost:3000/requests/`
// fetch(`${requestsUrl}1`, {
//   method: "DELETE",
// })

// get products
const getProduct = async function (url) {
  const result = await fetch(url)
  if (!result.ok) {
    throw new Error(`Ошибка фетч ${url} статус: ${result.status}`)
  }
  return await result.json()
}

getProduct(`http://localhost:3000/requests`).then((data) => {
  console.log(data)
})

if (window.location.href.indexOf("product") != -1) {
  var priceSumValue = document.querySelectorAll(".product__price-sum")[0]
    .innerHTML
}

// total price
function totalPriceProdPage() {
  let productQuantity = document.querySelectorAll(
    ".product__quantity-input-picker"
  )[0].value
  let priceSum = document.querySelectorAll(".product__price-sum")
  // console.log(productQuantity)
  // console.log(priceSumValue)
  let totalPrice = 0
  for (let i = 0; i < priceSum.length; i++) {
    totalPrice = +priceSumValue * +productQuantity
    // console.log(priceSum[i])
  }
  // console.log(priceSum[0].innerText)
  // console.log(initialPrice, "ini price")
  priceSum[0].innerText = totalPrice
}

/// mobile-nav-toggle
let burgerMenu = document.querySelectorAll(".header__burger-menu")
let mobileNav = document.querySelectorAll(".mobile-nav")
let mobileNavCloseIcon = document.querySelectorAll(".mobile-nav .close-icon")
for (let i = 0; i < burgerMenu.length; i++) {
  burgerMenu[i].addEventListener("click", function () {
    mobileNav[0].classList.toggle("d-none")
    mobileNav[0].classList.toggle("active")
  })
}
for (let i = 0; i < mobileNavCloseIcon.length; i++) {
  mobileNavCloseIcon[i].addEventListener("click", function () {
    mobileNav[0].classList.toggle("d-none")
    mobileNav[0].classList.toggle("active")
  })
}

// add to cart
let addToCartBtn = document.querySelectorAll(".product__add-to-cart-button")
for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.closest("div").querySelector(".product-image")) {
      var productName = e.target
        .closest("div")
        .querySelector(".product-name").innerHTML
      var productImage = e.target
        .closest("div")
        .querySelector(".product-image").src
      var productPrice = e.target
        .closest("div")
        .querySelector(".product-price").innerHTML
      var productQuantity = "1"
    } else {
      var productImage = e.target
        .closest("#product")
        .querySelector(".product-image").src
      var productName = e.target
        .closest("#product")
        .querySelector(".product__product-name").innerHTML
      var productPrice = e.target
        .closest("#product")
        .querySelector(".product__price-sum").innerHTML
      var productQuantity = e.target
        .closest("#product")
        .querySelector(".product__quantity-input-picker").value
    }
    fetch(requestsUrl)
      .then((response) => response.json())
      .then((data) => {
        const existingProductIndex = data.findIndex(
          (request) => request.prodName.trim() === productName.trim()
        )

        if (existingProductIndex !== -1) {
          // Продукт уже существует, складываем значения
          const existingProduct = data[existingProductIndex]
          existingProduct.prodPrice = (
            parseFloat(existingProduct.prodPrice) + parseFloat(productPrice)
          ).toString()
          existingProduct.prodQuantity = (
            parseInt(existingProduct.prodQuantity) + parseInt(productQuantity)
          ).toString()

          // Отправляем PUT запрос для обновления данных продукта
          fetch(`${requestsUrl}/${existingProduct.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify(existingProduct),
          })
            .then((response) => response.json())
            .then((updatedProduct) => {
              console.log("Обновленные данные продукта:", updatedProduct)
            })
            .catch((error) => {
              console.error("Произошла ошибка:", error)
            })
        } else {
          // Продукта нет, добавляем его в requests
          fetch(requestsUrl, {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              prodName: productName,
              prodImage: productImage,
              prodPrice: productPrice,
              prodQuantity: productQuantity,
            }),
          })
            .then((response) => response.json())
            .then((newProduct) => {
              console.log("Добавленный продукт:", newProduct)
            })
            .catch((error) => {
              console.error("Произошла ошибка:", error)
            })
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error)
      })
    // alert("Продукт добавлен")
  })
}
// product render payment page
class cartProducts {
  constructor(img, name, price, quantity, insertTo, insertToCart) {
    this.img = img
    this.quantity = quantity
    this.name = name
    this.price = price
    this.insertTo = document.querySelector(
      ".payment-and-shipment-aside .cart-items-wrapper"
    )
    this.insertToCart = document.querySelector(".cart .cart-list-container")
  }

  renderPaymentPage() {
    const cartProducts = document.createElement("div")
    cartProducts.classList.add("col-12", "cart-items", "row")
    cartProducts.innerHTML = `
      <div class="cart-image-wrapper col-4">
        <img
          src="${this.img}"
          alt="product image"
          class="product-image"
        />
        <span class="cart-product-quantity"> ${this.quantity} </span>
      </div>

      <p class="product-name col-6">${this.name}</p>
      <div class="price col-2">
        <span class="product-price">${this.price}</span>
        <span>p</span>
      </div>

    `
    this.insertTo.append(cartProducts)
  }

  renderCartPage() {
    const cartPageProducts = document.createElement("div")
    cartPageProducts.classList.add("col-12", "cart-item", "row")
    cartPageProducts.innerHTML = `
      <div class="cart-item__prod-image col-12 col-md-3">
      <img
        class="product-image"
        src="${this.img}"
        alt=""
      />
    </div>
    <div class="cart-item__prod-name col-12 col-md-4">
    ${this.name}
    </div>
    <div class="cart-item__prod-quantity col-12 col-md-3">
      <div class="product__quantity-input">
        <button class="product__quantity-input-plus">+</button>
        <input
          class="product__quantity-input-picker"
          id="quantity"
          type="number"
          min="1"
          value="${this.quantity}"
          max="99"
          readonly
        />
        <button class="product__quantity-input-minus">-</button>
      </div>
    </div>
    <div class="cart-item__prod-price col-12 col-md-2">
      <span class="product-price">${this.price}</span>
      <span class="product-currency">p</span>
    </div>
    <div class="cart-item__icons">
    <img
      class="cart-trash-icon"
      src="../images/trash.svg"
      alt="trash icon"
    />
  </div>
    `
    this.insertToCart.append(cartPageProducts)
  }
}

if (window.location.href.indexOf("pay-and-ship") != -1) {
  getProduct(requestsUrl).then((data) => {
    // console.log(data)
    data.forEach((element) => {
      new cartProducts(
        element.prodImage,
        element.prodName,
        element.prodPrice,
        element.prodQuantity
      ).renderPaymentPage()
    })
    totalPrice()
    totalProducts()
  })
}

if (window.location.href.indexOf("cart") != -1) {
  let cartListContainer = document.querySelector(".cart-list-container")
  cartListContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("product__quantity-input-plus")) {
      var productNameCart = e.target
        .closest(".cart-item")
        .querySelector(".cart-item__prod-name").innerHTML
      var productImageCart = e.target
        .closest(".cart-item")
        .querySelector(".product-image").src
      var productPriceCart = e.target
        .closest(".cart-item")
        .querySelector(".product-price").innerHTML
      var productQuantityCart = e.target
        .closest(".cart-item")
        .querySelector(".product__quantity-input-picker").value

      fetch(requestsUrl)
        .then((response) => response.json())
        .then((data) => {
          const existingProductIndex = data.findIndex(
            (request) => request.prodName.trim() === productNameCart.trim()
          )

          if (existingProductIndex !== -1) {
            // Продукт уже существует, складываем значения
            const existingProduct = data[existingProductIndex]
            existingProduct.prodPrice = (
              parseFloat(existingProduct.prodPrice) +
              parseFloat(existingProduct.prodPrice) /
                parseInt(existingProduct.prodQuantity)
            ).toString()
            existingProduct.prodQuantity = (
              parseInt(existingProduct.prodQuantity) + 1
            ).toString()

            // Отправляем PUT запрос для обновления данных продукта
            fetch(`${requestsUrl}/${existingProduct.id}`, {
              method: "PUT",
              headers: {
                "Content-type": "Application/json",
              },
              body: JSON.stringify(existingProduct),
            })
              .then((response) => response.json())
              .then((updatedProduct) => {
                console.log("Обновленные данные продукта:", updatedProduct)
              })
              .catch((error) => {
                console.error("Произошла ошибка:", error)
              })
          } else {
            console.error("somethin wnt wrong")
          }
        })
        .catch((error) => {
          console.error("Произошла ошибка:", error)
        })
    }
    if (e.target.classList.contains("product__quantity-input-minus")) {
      var productNameCart = e.target
        .closest(".cart-item")
        .querySelector(".cart-item__prod-name").innerHTML
      var productImageCart = e.target
        .closest(".cart-item")
        .querySelector(".product-image").src
      var productPriceCart = e.target
        .closest(".cart-item")
        .querySelector(".product-price").innerHTML
      var productQuantityCart = e.target
        .closest(".cart-item")
        .querySelector(".product__quantity-input-picker").value

      if (+productQuantityCart === 1) {
        return
      }

      productQuantityCart

      fetch(requestsUrl)
        .then((response) => response.json())
        .then((data) => {
          const existingProductIndex = data.findIndex(
            (request) => request.prodName.trim() === productNameCart.trim()
          )

          if (existingProductIndex !== -1) {
            const existingProduct = data[existingProductIndex]

            existingProduct.prodPrice = (
              parseFloat(existingProduct.prodPrice) -
              parseFloat(existingProduct.prodPrice) /
                parseInt(existingProduct.prodQuantity)
            ).toString()
            existingProduct.prodQuantity = (
              parseInt(existingProduct.prodQuantity) - 1
            ).toString()

            // Отправляем PUT запрос для обновления данных продукта
            fetch(`${requestsUrl}/${existingProduct.id}`, {
              method: "PUT",
              headers: {
                "Content-type": "Application/json",
              },
              body: JSON.stringify(existingProduct),
            })
              .then((response) => response.json())
              .then((updatedProduct) => {
                console.log("Обновленные данные продукта:", updatedProduct)
              })
              .catch((error) => {
                console.error("Произошла ошибка:", error)
              })
          } else {
            console.error("somethin wnt wrong")
          }
        })
        .catch((error) => {
          console.error("Произошла ошибка:", error)
        })
    }
  })

  cartListContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart-trash-icon")) {
      let productName = e.target
        .closest(".cart-item")
        .querySelector(".cart-item__prod-name")
        .innerText.trim()

      fetch(requestsUrl)
        .then((response) => response.json())
        .then((data) => {
          const productIndex = data.findIndex(
            (product) => product.prodName.trim() === productName
          )

          if (productIndex !== -1) {
            const productId = data[productIndex].id

            // Sending DELETE request to remove the product
            fetch(`${requestsUrl}${productId}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then(() => {
                console.log("Product deleted successfully!")
                // You may want to reload the page or update the UI after successful deletion
              })
              .catch((error) => {
                console.error("Error deleting product:", error)
              })
          } else {
            console.error("Product not found in the database.")
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    }
  })
  getProduct(requestsUrl).then((data) => {
    // console.log(data)
    data.forEach((element) => {
      new cartProducts(
        element.prodImage,
        element.prodName,
        element.prodPrice,
        element.prodQuantity
      ).renderCartPage()
    })
    totalPrice()
    totalProducts()
  })
}

function totalPrice() {
  /// Summary price
  let priceCount = document.querySelectorAll(".cart .product-price")
  let priceCountPlacement = document.querySelectorAll(".cart .price-sum")[0]
  let totalPrice = 0
  for (let i = 0; i < priceCount.length; i++) {
    totalPrice = totalPrice + +priceCount[i].innerHTML
    // console.log(priceCount[i].innerHTML)
    // console.log(totalPrice)
  }
  priceCountPlacement.innerHTML = totalPrice + " p"
  // console.log(priceCount[0].innerHTML)
  // console.log(priceCount)
}
function totalProducts() {
  /// Summary price
  let quantityCount = document.querySelectorAll(".cart .cart-product-quantity")
  let quantityCountPlacement = document.querySelectorAll(
    ".cart .products-sum"
  )[0]
  let totalPrice = 0
  for (let i = 0; i < quantityCount.length; i++) {
    totalPrice = totalPrice + +quantityCount[i].innerHTML
    // console.log(priceCount[i].innerHTML)
    // console.log(totalPrice)
  }
  quantityCountPlacement.innerHTML = totalPrice
  if (totalPrice !== 0) {
    document.querySelector(".payment-and-shipment-aside-empty").remove()
  }
  if (window.location.href.indexOf("cart") != -1) {
    let prodQuantity = document.querySelectorAll(
      ".cart .product__quantity-input-picker"
    )
    for (let i = 0; i < prodQuantity.length; i++) {
      totalPrice = totalPrice + +prodQuantity[i].value
    }
    quantityCountPlacement.innerHTML = totalPrice
    if (totalPrice !== 0) {
      document.querySelector(".payment-and-shipment-aside-empty").remove()
    }
  }
}

// fetch(requestsUrl + "1", {
//   method: "DELETE",
// })
//prod page product quantity picker
$(document).ready(function () {
  $(".product__quantity-input-minus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepDown"]()
    totalPriceProdPage()
  })
  $(".product__quantity-input-plus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepUp"]()
    totalPriceProdPage()
  })
  // cart page picker
  if (window.location.href.indexOf("cart") != -1) {
    console.log("yeaaha")
  }
  // smooth transition
  var speed = "slow"

  $("html, body").fadeIn(speed, function () {
    $("a[href], button[href]").click(function (event) {
      var url = $(this).attr("href")
      if (url.indexOf("#") == 0 || url.indexOf("javascript:") == 0) return
      event.preventDefault()
      $("html, body").fadeOut(speed, function () {
        window.location = url
      })
    })
  })
})
;(function () {
  //Login/Signup modal window - by CodyHouse.co
  function ModalSignin(element) {
    this.element = element
    this.blocks = this.element.getElementsByClassName("js-signin-modal-block")
    this.switchers = this.element
      .getElementsByClassName("js-signin-modal-switcher")[0]
      .getElementsByTagName("a")
    this.triggers = document.getElementsByClassName("js-signin-modal-trigger")
    this.hidePassword = this.element.getElementsByClassName("js-hide-password")
    this.init()
  }

  ModalSignin.prototype.init = function () {
    var self = this
    //open modal/switch form
    for (var i = 0; i < this.triggers.length; i++) {
      ;(function (i) {
        self.triggers[i].addEventListener("click", function (event) {
          if (event.target.hasAttribute("data-signin")) {
            event.preventDefault()
            self.showSigninForm(event.target.getAttribute("data-signin"))
          }
        })
      })(i)
    }

    //close modal
    this.element.addEventListener("click", function (event) {
      if (
        hasClass(event.target, "js-signin-modal") ||
        hasClass(event.target, "js-close")
      ) {
        event.preventDefault()
        removeClass(self.element, "cd-signin-modal--is-visible")
      }
    })
    //close modal when clicking the esc keyboard button
    document.addEventListener("keydown", function (event) {
      event.which == "27" &&
        removeClass(self.element, "cd-signin-modal--is-visible")
    })

    //hide/show password
    for (var i = 0; i < this.hidePassword.length; i++) {
      ;(function (i) {
        self.hidePassword[i].addEventListener("click", function (event) {
          self.togglePassword(self.hidePassword[i])
        })
      })(i)
    }

    //IMPORTANT - REMOVE THIS - it's just to show/hide error messages in the demo
    this.blocks[0]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault()
        self.toggleError(document.getElementById("signin-email"), true)
      })
    this.blocks[1]
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (event) {
        event.preventDefault()
        self.toggleError(document.getElementById("signup-username"), true)
      })
  }

  ModalSignin.prototype.togglePassword = function (target) {
    var password = target.previousElementSibling
    "password" == password.getAttribute("type")
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password")
    target.textContent = "Hide" == target.textContent ? "Show" : "Hide"
    putCursorAtEnd(password)
  }

  ModalSignin.prototype.showSigninForm = function (type) {
    // show modal if not visible
    !hasClass(this.element, "cd-signin-modal--is-visible") &&
      addClass(this.element, "cd-signin-modal--is-visible")
    // show selected form
    for (var i = 0; i < this.blocks.length; i++) {
      this.blocks[i].getAttribute("data-type") == type
        ? addClass(this.blocks[i], "cd-signin-modal__block--is-selected")
        : removeClass(this.blocks[i], "cd-signin-modal__block--is-selected")
    }
    //update switcher appearance
    var switcherType = type == "signup" ? "signup" : "login"
    for (var i = 0; i < this.switchers.length; i++) {
      this.switchers[i].getAttribute("data-type") == switcherType
        ? addClass(this.switchers[i], "cd-selected")
        : removeClass(this.switchers[i], "cd-selected")
    }
  }

  ModalSignin.prototype.toggleError = function (input, bool) {
    // used to show error messages in the form
    toggleClass(input, "cd-signin-modal__input--has-error", bool)
    toggleClass(
      input.nextElementSibling,
      "cd-signin-modal__error--is-visible",
      bool
    )
  }

  var signinModal = document.getElementsByClassName("js-signin-modal")[0]
  if (signinModal) {
    new ModalSignin(signinModal)
  }

  // toggle main navigation on mobile
  var mainNav = document.getElementsByClassName("js-main-nav")[0]
  if (mainNav) {
    mainNav.addEventListener("click", function (event) {
      if (hasClass(event.target, "js-main-nav")) {
        var navList = mainNav.getElementsByTagName("ul")[0]
        toggleClass(
          navList,
          "cd-main-nav__list--is-visible",
          !hasClass(navList, "cd-main-nav__list--is-visible")
        )
      }
    })
  }

  //class manipulations - needed if classList is not supported
  function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))
  }
  function addClass(el, className) {
    var classList = className.split(" ")
    if (el.classList) el.classList.add(classList[0])
    else if (!hasClass(el, classList[0])) el.className += " " + classList[0]
    if (classList.length > 1) addClass(el, classList.slice(1).join(" "))
  }
  function removeClass(el, className) {
    var classList = className.split(" ")
    if (el.classList) el.classList.remove(classList[0])
    else if (hasClass(el, classList[0])) {
      var reg = new RegExp("(\\s|^)" + classList[0] + "(\\s|$)")
      el.className = el.className.replace(reg, " ")
    }
    if (classList.length > 1) removeClass(el, classList.slice(1).join(" "))
  }
  function toggleClass(el, className, bool) {
    if (bool) addClass(el, className)
    else removeClass(el, className)
  }

  //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
  function putCursorAtEnd(el) {
    if (el.setSelectionRange) {
      var len = el.value.length * 2
      el.focus()
      el.setSelectionRange(len, len)
    } else {
      el.value = el.value
    }
  }
})()
