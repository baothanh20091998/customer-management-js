function listCustomer() {
  axios({
    url: "https://6141d7d44d16670017ba29ec.mockapi.io/api-customer/customer",
    method: "GET",
  })
    .then((res) => {
      danhSachNVAxios = res.data;
      let danhSachNVSorted = danhSachNVAxios.sort(function (a, b) {
        return a.maNV - b.maNV;
      });
      renderListCustomer(danhSachNVSorted);
      console.log(danhSachNVAxios);
    })
    .catch((err) => {
      console.log(err);
    });
}
listCustomer();

function deleteApi(id) {
  axios({
    url:
      "https://6141d7d44d16670017ba29ec.mockapi.io/api-customer/customer/" + id,
    method: "DELETE",
  })
    .then((res) => {
      alert("Xóa Thành Công");
      listCustomer();
    })
    .catch((err) => {
      console.log(err);
    });
}

function createApi(nv) {
  axios({
    url: "https://6141d7d44d16670017ba29ec.mockapi.io/api-customer/customer",
    method: "POST",
    data: nv,
  })
    .then((result) => {
      console.log(result);
      listCustomer();
    })
    .catch((err) => {
      console.log(err);
    });
}

function detailCustomerApi(id, nvEdit) {
  axios({
    url:
      "https://6141d7d44d16670017ba29ec.mockapi.io/api-customer/customer/" + id,
    method: "GET",
  })
    .then((res) => {
      nvEdit = res.data;
      document.getElementById("msnv").value = nvEdit.maNV;
      document.getElementById("name").value = nvEdit.tenNV;
      document.getElementById("email").value = nvEdit.email;
      document.getElementById("password").value = "";
      document.getElementById("datepicker").value = nvEdit.ngayLam;
      document.getElementById("chucvu").value = nvEdit.chucVu;
    })
    .catch((err) => {
      console.log(err);
    });
}

function editApi(id, nvUpdate) {
  axios({
    url:
      "https://6141d7d44d16670017ba29ec.mockapi.io/api-customer/customer/" + id,
    method: "PUT",
    data: nvUpdate,
  })
    .then((res) => {
      alert("Cập nhật thành công");
      listCustomer();
    })
    .catch((err) => {
      alert("Mã số nhân viên không đúng");
    });
}
