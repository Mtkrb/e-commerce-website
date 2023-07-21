$(document).ready(function () {
  $(".product__quantity-input-minus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepDown"]()
  })
  $(".product__quantity-input-plus").on("click", function (e) {
    let input = $(e.target).closest(".product__quantity-input").find("input")
    input[0]["stepUp"]()
  })
})
