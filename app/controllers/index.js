if (localStorage.getItem("danhSachNV")) {
  var danhSachNV = JSON.parse(localStorage.getItem("danhSachNV"));
} else {
  var danhSachNV = [];
}

//sắp xếp nhân viên theo mã nhân viên
function handleSortUp() {
  document.getElementById("SapXepTang").style.display = "none";
  document.getElementById("SapXepGiam").style.display = "inline-block";
  const listCustomerSorted = danhSachNV.sort(function (a, b) {
    return b.maNV - a.maNV;
  });
  renderListCustomer(listCustomerSorted);
}
function handleSortDown() {
  document.getElementById("SapXepTang").style.display = "inline-block";
  document.getElementById("SapXepGiam").style.display = "none";
  const listCustomerSorted = danhSachNV.sort(function (a, b) {
    return a.maNV - b.maNV;
  });
  renderListCustomer(listCustomerSorted);
}

// định nghĩa ra lớp đối tượng
function NhanVien(txtMaNV, txtTenNV, txtEmail, txtPass, txtNgayLam, chucVu) {
  // property
  this.maNV = txtMaNV;
  this.tenNV = txtTenNV;
  this.email = txtEmail;
  this.pass = txtPass;
  this.ngayLam = txtNgayLam;
  this.chucVu = chucVu;
}

//xóa nhân viên
function handleDelete(maNV) {
  const index = danhSachNV.findIndex(
    (customer) => parseInt(customer.maNV) === maNV
  );
  if (index === -1) {
    alert("Không tìm thấy");
  } else {
    if (window.confirm(`Xác nhận muốn xóa nhân viên có mã số ${maNV}`)) {
      danhSachNV.splice(index, 1);
      localStorage.setItem("danhSachNV", JSON.stringify(danhSachNV));
      alert("Xóa thành công");
      renderListCustomer(danhSachNV);
    }
  }
}

//thêm nhân viên
function handleAddCustomer() {
  let msnv = document.getElementById("msnv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;
  let nv = new NhanVien(msnv, name, email, password, ngayLam, chucVu);
  const index = danhSachNV.findIndex((item) => item.maNV === msnv);
  if (index !== -1) {
    alert("Mã số nhân viên đã tồn tại");
  } else {
    danhSachNV.push(nv);
    localStorage.setItem("danhSachNV", JSON.stringify(danhSachNV));
    alert("Thêm nhân viên thành công");
    renderListCustomer(danhSachNV);
  }
}

//đưa danh sách nhân viên để chỉnh sửa
function handleEdit(maNV) {
  const index = danhSachNV.findIndex((item) => parseInt(item.maNV) === maNV);
  if (index !== -1) {
    const nvEdit = danhSachNV[index];
    document.getElementById("msnv").value = nvEdit.maNV;
    document.getElementById("name").value = nvEdit.tenNV;
    document.getElementById("email").value = nvEdit.email;
    document.getElementById("password").value = nvEdit.password;
    document.getElementById("datepicker").value = nvEdit.ngayLam;
    document.getElementById("chucvu").value = nvEdit.chucVu;
  } else {
    console.log("Không thấy");
  }
}

//chỉnh sửa nhân viên
function handleUpdate() {
  let msnv = document.getElementById("msnv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;
  let nv = new NhanVien(msnv, name, email, password, ngayLam, chucVu);
  const index = danhSachNV.findIndex((item) => item.maNV === msnv);
  if (index !== -1) {
    alert(`Nhân viên có mã số ${msnv} đã được cập nhật`);
    danhSachNV[index] = nv;
    renderListCustomer(danhSachNV);
    localStorage.setItem("danhSachNV", JSON.stringify(danhSachNV));
  } else {
    alert("Không tìm thấy mã số nhân viên tương ứng");
  }
}

// hiển thị danh sách nhân viên
function renderListCustomer(listNV) {
  let tbodyContent = "";
  // const listNVSorted = listNV.sort(function (a, b) {
  //   return a.maNV - b.maNV;
  // });
  listNV.forEach(function (customer, index) {
    // console.log("customer : ", customer);
    tbodyContent += `
          <tr>
            <td>${customer.maNV}</td>
            <td>${customer.tenNV}</td>
            <td>${customer.email}</td>
            <td>${customer.ngayLam}</td>
            <td>${customer.chucVu}</td>
            <td>
              <button class="btn btn-danger" onclick="handleDelete(${parseInt(
                customer.maNV
              )})"> Xóa </button>
              <button class="btn btn-primary" onclick="handleEdit(${parseInt(
                customer.maNV
              )})" id="btnThem" data-toggle="modal" data-target="#myModal">Sửa</button>
            </td>
          </tr>
        `;
  });
  document.getElementById("tableDanhSach").innerHTML = tbodyContent;
}
renderListCustomer(danhSachNV);

//tìm kiếm nhân viên
document.getElementById("btnTimNV").addEventListener("click", function () {
  searchValue = document.getElementById("searchName").value;
  const danhSachNVFilter = danhSachNV.filter((customer) =>
    customer.tenNV.toLowerCase().includes(searchValue.toLowerCase())
  );
  if (danhSachNVFilter.length > 0) {
    renderListCustomer(danhSachNVFilter);
  } else {
    alert("Không tìm thấy tên nhân viên trùng khớp");
  }
});
