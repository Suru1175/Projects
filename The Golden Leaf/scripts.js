function addOrderItem() {
    var table = document.getElementById('orderItems');
    var newRow = table.insertRow(table.rows.length - 1); // Insert before the last row (before the "Add Item" button)
    var productCell = newRow.insertCell(0);
    var quantityCell = newRow.insertCell(1);
    var priceCell = newRow.insertCell(2);
    // var amountCell = newRow.insertCell(3);

    var productSelect = document.createElement('select');
    productSelect.setAttribute('name', 'product');
    productSelect.setAttribute('onchange', 'updatePrice(this)');
    productSelect.setAttribute('required', 'true');
    productSelect.innerHTML = `
        <option value="green_tea">Green Tea</option>
        <option value="herbal_tea">Herbal Tea</option>
        <option value="black_tea">Black Tea</option>
    `;
    
    productCell.appendChild(productSelect);
    quantityCell.innerHTML = '<input type="number" name="quantity" onchange="updateAmount(this)" required>';
    priceCell.innerHTML = '<input type="number" name="price" step="0.01" readonly required>';
}


function updatePrice(selectElement) {
    var priceField = selectElement.parentElement.nextElementSibling.nextElementSibling.querySelector('input[name="price"]');
    var product = selectElement.value;
    var price;
    
    // Assign price based on selected product
    switch (product) {
        case "green_tea":
            price = 15.00;
            break;
        case "herbal_tea":
            price = 20.00;
            break;
        case "black_tea":
            price = 25.00;
            break;
        // Add more cases for other products
        default:
            price = 0.00;
            break;
    }
    
    priceField.value = price.toFixed(2); // Set price with 2 decimal places
    updateAmount(selectElement.parentElement.nextElementSibling.querySelector('input[name="quantity"]')); // Update total amount
}

