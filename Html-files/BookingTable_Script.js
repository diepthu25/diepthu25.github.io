import data from "./data.js";

const selectedTables = new Set();

function addToCart(productId) {
  for (let i = 0; i < data.length; i++) {
    const product = data[i].find((item) => item.id_table === productId);
    if (product) {
      product.pic = "../Images/table/redTable.png";
      // cart.push(product);
      // localStorage.setItem("cart", JSON.stringify(cart));
      // document.getElementById("product-count").innerHTML = cart.length;
      // renderCart(cart);

      selectedTables.add(productId);
      renderTables();
      console.log(product.pic);
    }
  }
}

window.addToCart = addToCart;

// Function to show QR booking modal
function QRbooking(id_table) {
  const modal = new bootstrap.Modal(document.getElementById("QRmodal"));
  modal.show();
  addToCart(id_table);
  const currentModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  currentModal.hide();
}

window.QRbooking = QRbooking;

// Function to populate booking modal with table details
function populateModal(table_id) {
  let htmlShowInforBooking = "";

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  htmlShowInforBooking += `
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title text-center" id="exampleModalLabel">Booking table</h5>
    </div>
    <div class="modal-body">
      <form>
        <div class="row">
          <div class="col-5 mb-3">
            <label for="date" class="form-label">Date</label>
            <input type="date" id="date" class="form-control" value="${formattedDate}" disabled/>
          </div>
          <div class="col-4 mb-3">
            <label for="time" class="form-label">Check-in-time</label>
            <input type="time" id="time" class="form-control" value="${formattedTime}" disabled/>
          </div>
          <div class="col-3 mb-3">
            <label for="people" class="form-label">People</label>
            <input type="number" id="people" class="form-control" value="0" min="1" />
          </div>
        </div>
        <div class="mb-3">
          <label for="table" class="form-label">Tables</label>
          <select id="table" class="form-select" disabled>
            <option value="${table_id}" disabled selected>Table: ${table_id}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" id="name" class="form-control" placeholder="Hoang Diep Thu Nguyen" />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone</label>
          <input type="tel" id="phone" class="form-control" placeholder="+84 123456789" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" class="form-control" placeholder="hoangdiepthunguyen@bookingtable.com" />
        </div>
        <div class="mb-3 text-center">
          <p style="color:red;"><i>(Deposit $2 to reserve a table at our coffee!! Thank you very much)</i></p>
          <p style="color:red;"><i>Own: Nguyễn Hoàng Diệp Thư</i></p>
          <img src="../Images/image_home/qr.png" alt="QR" />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
      <button type="button" class="btn btn-primary" onClick="QRbooking(${table_id})">Booking</button>
    </div>
  </div>`;

  document.getElementById("modalInforBooking").innerHTML = htmlShowInforBooking;
}

// Function to open the booking modal
function onClickModal(table_id) {
  console.log(table_id);
  populateModal(table_id);
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
}

window.onClickModal = onClickModal;

// render data from data.js
function renderTables() {
  let htmlString = "";

  data.forEach((row) => {
    htmlString += '<div class="row mb-3">';

    row.forEach((table) => {
      const isSelected = selectedTables.has(table.id_table);
      htmlString += ` 
        <div class="col text-center"> 
          <p style="margin-left: -50%; margin-bottom: 3%;">Table ${
            table.id_table
          }</p>
          <img
            onClick="${isSelected ? "" : `onClickModal(${table.id_table})`}"
            src="${table.pic}"
            alt="Table ${table.id_table}"
            class="img-fluid ${
              table.pic.includes("redTable") ? "highlight" : ""
            }" 
            style="width: 50%; border: 2px solid black; border-radius: 32%;"
            title="${isSelected ? "Booked table" : "Empty table"}" 
          />
        </div>`;
    });
    htmlString += "</div>";
  });

  document.getElementById("product-list").innerHTML = htmlString;
}

document.addEventListener("DOMContentLoaded", renderTables);
