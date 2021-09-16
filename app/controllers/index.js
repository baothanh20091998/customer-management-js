let danhSachNVAxios = [];

//xóa nhân viên
let handleDelete = function (id, maNV) {
  if (window.confirm(`Xác nhận muốn xóa nhân viên có mã số ${maNV}`)) {
    deleteApi(id);
  }
  // }
};

// hiển thị danh sách nhân viên
function renderListCustomer(listNV) {
  let tbodyContent = "";
  listNV.forEach(function (customer) {
    // console.log("customer : ", customer);
    tbodyContent += `
          <tr>
            <td>${customer.maNV}</td>
            <td>${customer.tenNV}</td>
            <td>${customer.email}</td>
            <td>${customer.ngayLam}</td>
            <td>${customer.chucVu}</td>
            <td>
              <button class="btn btn-danger" 
              onclick="handleDelete(${customer.id},${parseInt(
      customer.maNV
    )})"> Xóa </button>
              <button class="btn btn-primary" 
              onclick="handleEdit(${customer.id},${parseInt(
      customer.maNV
    )})" id="btnSua" data-toggle="modal" data-target="#myModal">Sửa</button>
            </td>
          </tr>
        `;
  });
  document.getElementById("tableDanhSach").innerHTML = tbodyContent;
}

//sắp xếp nhân viên theo mã nhân viên
//giảm
document.getElementById("SapXepTang").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "none";
  document.getElementById("SapXepGiam").style.display = "inline-block";
  const listCustomerSorted = danhSachNVAxios.sort(function (a, b) {
    return b.maNV - a.maNV;
  });
  renderListCustomer(listCustomerSorted);
});
//tăng
document.getElementById("SapXepGiam").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "inline-block";
  document.getElementById("SapXepGiam").style.display = "none";
  const listCustomerSorted = danhSachNVAxios.sort(function (a, b) {
    return a.maNV - b.maNV;
  });
  renderListCustomer(listCustomerSorted);
});

//thêm nhân viên
document.getElementById("btnThemNV").addEventListener("click", () => {
  let msnv = document.getElementById("msnv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;
  let nv = new NhanVien(msnv, name, email, password, ngayLam, chucVu);
  const index = danhSachNVAxios.findIndex((item) => item.maNV === msnv);
  if (index !== -1) {
    alert("Mã số nhân viên đã tồn tại");
  } else {
    alert("Thêm nhân viên thành công");
    createApi(nv);
  }
});

//đưa danh sách nhân viên để chỉnh sửa
function handleEdit(id, maNV) {
  document.getElementById("msnv").disabled = true;
  let nvEdit = [];
  detailCustomerApi(id, nvEdit);
  console.log(id);
  //chỉnh sửa nhân viên
  document.getElementById("btnCapNhat").addEventListener("click", () => {
    let msnv = document.getElementById("msnv").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ngayLam = document.getElementById("datepicker").value;
    let chucVu = document.getElementById("chucvu").value;
    let nvUpdate = new NhanVien(msnv, name, email, password, ngayLam, chucVu);
    const index = danhSachNVAxios.findIndex((item) => item.maNV === msnv);
    if (index !== -1) {
      editApi(id, nvUpdate);
    } else {
      alert("Không tìm thấy mã số nhân viên tương ứng");
    }
  });
}

document.getElementById("btnDong").addEventListener("click", () => {
  document.getElementById("msnv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("chucvu").value = "chonChucVu";
  document.getElementById("msnv").disabled = false;
});

//tìm kiếm nhân viên
document.getElementById("btnTimNV").addEventListener("click", function () {
  searchValue = document.getElementById("searchName").value;
  const danhSachNVAxiosFilter = danhSachNVAxios.filter((customer) =>
    customer.tenNV.toLowerCase().includes(searchValue.toLowerCase())
  );
  if (danhSachNVAxiosFilter.length > 0) {
    renderListCustomer(danhSachNVAxiosFilter);
  } else {
    alert("Không tìm thấy tên nhân viên trùng khớp");
  }
});
