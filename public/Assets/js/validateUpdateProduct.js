function validateUpdateProductForm() {
    const productName = document.getElementById("product_name");
    const productDescription = document.getElementById("product_description");
    const regularPrice = document.getElementById("regularPrice");
    const salePrice = document.getElementById("sale_price");
    const brand = document.getElementById("product_brand");
    const size = document.getElementById("product_size");
    const stock = document.getElementById("product_stock");
    const color = document.getElementById("product_color");
    const material = document.getElementById("product_material");
    const type = document.getElementById("product_type");
    const shippingFees = document.getElementById("product_shippingFees");
    const taxRate = document.getElementById("product_taxRate");
    const images = document.getElementById("product_images");
    const category = document.getElementById("product_cat");
  
    // Error feild
    const productNameError = document.getElementById("productNameError");
    const productDescriptionError = document.getElementById(
      "productDescriptionError"
    );
    const regularPriceError = document.getElementById("regularPriceError");
    const salePriceError = document.getElementById("salePriceError");
    const brandError = document.getElementById("brandError");
    const sizeError = document.getElementById("sizeError");
    const stockError = document.getElementById("stockError");
    const colorError = document.getElementById("colorError");
    const materialError = document.getElementById("materialError");
    const typeError = document.getElementById("typeError");
    const shippingFeesError = document.getElementById("shippingFeesError");
    const taxRateError = document.getElementById("taxRateError");
    const imagesError = document.getElementById("imagesError");
    const categoryError = document.getElementById("categoryError");
  
    let isValid = true;
  
    const descriptionRegex = /^[A-Za-z0-9\s.,!?&(){}[\]:;/@#^$|<>*%+=_-]+$/;
    const nameRegex = /^[A-Z]/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const stockRegex = /^\d+$/;
  
    function clearErrorWithDelay(errorField) {
      setTimeout(() => {
        errorField.innerHTML = "";
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  
    function validateProductName() {
      if (productName.value.trim() === "") {
        productNameError.innerHTML = "First name cannot be empty";
        clearErrorWithDelay(productNameError);
        isValid = false;
      } else if (!nameRegex.test(productName.value)) {
        productNameError.innerHTML = "First letter should be capital";
        clearErrorWithDelay(productNameError);
        isValid = false;
      } else {
        productNameError.innerHTML = ""; // Clear error message
      }
    }
    function validateDescription() {
      const trimmedDescription = productDescription.value.trim();
  
      if (trimmedDescription === "") {
        productDescriptionError.innerHTML = "Description cannot be empty";
        clearErrorWithDelay(productDescriptionError);
        isValid = false;
      } else if (!descriptionRegex.test(trimmedDescription)) {
        productDescriptionError.innerHTML = "Invalid description format";
        clearErrorWithDelay(productDescriptionError);
        isValid = false;
      } else if (trimmedDescription.length > 50) {
        productDescriptionError.innerHTML =
          "Description has reached the maximum length of 50 characters";
        clearErrorWithDelay(productDescriptionError);
        isValid = false;
      } else {
        productDescriptionError.innerHTML = ""; // Clear error message
      }
    }
  
    // Function to validate regular price
    // Function to validate regular price
  // Function to validate regular price
  function validateRegularPrice() {
    const regularPriceValue = regularPrice.value.trim();
    const salePriceValue = salePrice.value.trim();
  
    if (regularPriceValue === "") {
        regularPriceError.innerHTML = "Regular price cannot be empty";
        clearErrorWithDelay(regularPriceError);
        isValid = false;
    } else {
        // Check if the value is a valid number
        const isNumeric = /^\d+$/.test(regularPriceValue);
  
        if (!isNumeric) {
            regularPriceError.innerHTML = "Regular price must be a number";
            clearErrorWithDelay(regularPriceError);
            isValid = false;
        } else {
            // Check if the price is greater than or equal to 1
            const numericValue = parseInt(regularPriceValue, 10);
            if (numericValue < 1) {
                regularPriceError.innerHTML =
                    "Regular price must be greater than or equal to 1";
                clearErrorWithDelay(regularPriceError);
                isValid = false;
            } else {
                regularPriceError.innerHTML = ""; // Clear error message
            }
  
            // Check if regular price is greater than sale price
            if (numericValue <= parseInt(salePriceValue, 10)) {
                regularPriceError.innerHTML = "Regular price must be greater than sale price and not the same";
                clearErrorWithDelay(regularPriceError);
                isValid = false;
            }
        }
    }
  }
  
  // Function to validate sale price
  function validateSalePrice() {
    const salePriceValue = salePrice.value.trim();
    const regularPriceValue = regularPrice.value.trim();
  
    if (salePriceValue === "") {
        salePriceError.innerHTML = "Sale price cannot be empty";
        clearErrorWithDelay(salePriceError);
        isValid = false;
    } else {
        // Check if the value is a valid number
        const isNumeric = /^\d+$/.test(salePriceValue);
  
        if (!isNumeric) {
            salePriceError.innerHTML = "Sale price must be a number";
            clearErrorWithDelay(salePriceError);
            isValid = false;
        } else {
            // Check if the price is greater than or equal to 1
            const numericValue = parseInt(salePriceValue, 10);
            if (numericValue < 1) {
                salePriceError.innerHTML =
                    "Sale price must be greater than or equal to 1";
                clearErrorWithDelay(salePriceError);
                isValid = false;
            } else {
                salePriceError.innerHTML = ""; // Clear error message
            }
  
            // Check if sale price is greater than regular price
            if (numericValue >= parseInt(regularPriceValue, 10)) {
                salePriceError.innerHTML = "Sale price must be less than regular price and not the same";
                clearErrorWithDelay(salePriceError);
                isValid = false;
            }
        }
    }
  }
  
  
  
    // Function to validate brand
    function validateBrand() {
      const brandValue = brand.value.trim();
  
      if (brandValue === "") {
        brandError.innerHTML = "Brand cannot be empty";
        clearErrorWithDelay(brandError);
        isValid = false;
      } else {
        // Check if the value is a valid string
        const isString = /^[a-zA-Z\s]+$/.test(brandValue);
  
        if (!isString) {
          brandError.innerHTML = "Brand must contain only letters and spaces";
          clearErrorWithDelay(brandError);
          isValid = false;
        } else {
          brandError.innerHTML = ""; // Clear error message
        }
      }
    }
    function validateSize() {
      const selectedSize = size.value;
  
      if (!selectedSize || selectedSize === "Size") {
        sizeError.innerHTML = "Please select a valid size";
        clearErrorWithDelay(sizeError);
        isValid = false;
      } else {
        sizeError.innerHTML = ""; // Clear error message
      }
    }
  
    function validateStock() {
      const stockValue = stock.value.trim();
  
      if (stockValue === "") {
        stockError.innerHTML = "Stock cannot be empty";
        clearErrorWithDelay(stockError);
        isValid = false;
      } else {
        // Check if the value is a valid number
        const isNumeric = stockRegex.test(stockValue);
  
        if (!isNumeric) {
          stockError.innerHTML = "Stock must be a number";
          clearErrorWithDelay(stockError);
          isValid = false;
        } else {
          stockError.innerHTML = ""; // Clear error message
        }
      }
    }
  
    function validatecolor() {
      console.log("validatecolor");
      if (color.value.trim() === "") {
        colorError.innerHTML = "its cannot be empty";
        clearErrorWithDelay(colorError);
        isValid = false;
      } else if (!nameRegex.test(color.value)) {
        colorError.innerHTML = "First letter should be capital";
        clearErrorWithDelay(colorError);
        isValid = false;
      } else {
        colorError.innerHTML = ""; // Clear error message
      }
    }
  
    function validatematerial() {
      if (material.value.trim() === "") {
        materialError.innerHTML = "its cannot be empty";
        clearErrorWithDelay(materialError);
        isValid = false;
      } else if (!nameRegex.test(material.value)) {
        materialError.innerHTML = "First letter should be capital";
        clearErrorWithDelay(materialError);
        isValid = false;
      } else {
        materialError.innerHTML = ""; // Clear error message
      }
    }
  
    function validateType() {
      const selectedType = type.value;
  
      if (!selectedType || selectedType === "Type") {
        typeError.innerHTML = "Please select a valid size";
        clearErrorWithDelay(typeError);
        isValid = false;
      } else {
        typeError.innerHTML = ""; // Clear error message
      }
    }
    function validateShippingFees() {
      console.log("validateShippingFees");
      const shippingFeesValue = shippingFees.value.trim();
  
      if (shippingFeesValue === "") {
        shippingFeesError.innerHTML = "Shipping fees cannot be empty";
        clearErrorWithDelay(shippingFeesError);
        isValid = false;
      } else {
        // Check if the value is a valid number
        const isNumeric = /^\d+(\.\d{1,2})?$/.test(shippingFeesValue);
  
        if (!isNumeric) {
          shippingFeesError.innerHTML = "Shipping fees must be a valid number";
          clearErrorWithDelay(shippingFeesError);
          isValid = false;
        } else {
          // Check if the value is greater than or equal to 0
          const numericValue = parseFloat(shippingFeesValue);
          if (numericValue < 0) {
            shippingFeesError.innerHTML =
              "Shipping fees must be greater than or equal to 0";
            clearErrorWithDelay(shippingFeesError);
            isValid = false;
          } else {
            shippingFeesError.innerHTML = ""; // Clear error message
          }
        }
      }
    }
  
    function validateTaxRate() {
      const taxRateValue = taxRate.value.trim();
  
      if (taxRateValue === "") {
        taxRateError.innerHTML = "Tax rate cannot be empty";
        clearErrorWithDelay(taxRateError);
        isValid = false;
      } else {
        // Check if the value is a valid number
        const isNumeric = /^\d+(\.\d{1,2})?$/.test(taxRateValue);
  
        if (!isNumeric) {
          taxRateError.innerHTML = "Tax rate must be a valid number";
          clearErrorWithDelay(taxRateError);
          isValid = false;
        } else {
          // Check if the value is within a valid range (adjust the range as needed)
          const numericValue = parseFloat(taxRateValue);
          if (numericValue < 0 || numericValue > 100) {
            taxRateError.innerHTML = "Tax rate must be between 0 and 100";
            clearErrorWithDelay(taxRateError);
            isValid = false;
          } else {
            taxRateError.innerHTML = ""; // Clear error message
          }
        }
      }
    }
  
    function validateCatgory() {
      console.log("validateCatgory");
  
      const selectedCategory = category.value;
      console.log("selectedCategory  ===>>> ",selectedCategory);
  
      if (!selectedCategory || selectedCategory === "Category") {
          console.log("validateCatgory");
        categoryError.innerHTML = "Please select a valid size";
        clearErrorWithDelay(categoryError);
        isValid = false;
      } else {
        categoryError.innerHTML = ""; // Clear error message
      }
    }
  
    function validateImages() {
        console.log("validateImages");
        console.log(images.files);
      
        // Get the selected files from the input
        const selectedFiles = images.files.length;
      
        // Check if the user is updating images
        if (selectedFiles > 0) {
          // Check if the number of selected files exceeds the maximum limit (5 in this example)
          if (selectedFiles <= 0) {
            console.log("inside if");
            imagesError.innerHTML = "Select images to upload";
            clearErrorWithDelay(imagesError);
            isValid = false;
            console.log("Leaving if");
          } else if (selectedFiles > 5) {
            console.log("inside else if");
            imagesError.innerHTML = "You can only upload up to 5 images";
            clearErrorWithDelay(imagesError);
            isValid = false;
            console.log("Leaving else if");
          } else {
            imagesError.innerHTML = ""; // Clear error message
            // Check the file types
            for (let i = 0; i < selectedFiles; i++) {
              console.log("Inside for of image");
              const fileType = images.files[i].type;
      
              // Define a list of allowed image MIME types (you can customize this list)
              const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      
              if (!allowedTypes.includes(fileType)) {
                imagesError.innerHTML =
                  "Invalid image format. Please use JPEG, PNG, or GIF";
                clearErrorWithDelay(imagesError);
                isValid = false;
                break; // Stop checking further files if one is invalid
              } else {
                imagesError.innerHTML = ""; // Clear error message
              }
            }
          }
        } else {
          // No new images are being updated, so no need for validation
          imagesError.innerHTML = ""; // Clear error message
        }
      }
      
    if (isValid) validateProductName();
    if (isValid) validateDescription();
    if (isValid) validateRegularPrice();
    if (isValid) validateSalePrice();
    if (isValid) validateBrand();
    if (isValid) validateSize();
    if (isValid) validateStock();
    if (isValid) validatecolor();
    if (isValid) validatematerial();
    if (isValid) validateType();
    if (isValid) validateShippingFees();
    if (isValid) validateTaxRate();
    if (isValid) validateImages();
    if (isValid) validateCatgory();
  
    return isValid;
  }
  