import { Firebase } from "./class/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
const firebase = new Firebase();
// bat duoc su kien khi nguoi dung submit form
// lay du lieu nguoi dung nhap vao
// gui len firebase de dang nhap
// neu dang nhap thanh cong thi chuyen huong ve trang chu,....

function handleAuthStateChanged(user) {
  if (user) {
    console.log("User is signed in.", user.displayName);
    // block user navigate to this page
    window.location.href = "index.html";
  } else {
    document.body.style.opacity = 1;

    async function signIn(e) {
      // chan su kien load trang
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // validation: kiem tra du lieu co hop le hay khong
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        Swal.fire({
          title: "Đăng kí thất bại",
          text: "Please enter a valid email address.",
          icon: "error",
        });
        return;
      }

      try {
        const result = await firebase.login(email, password);
        Swal.fire({
          title: "Đăng kí thành công",
          text: "Welcome to my website",
          icon: "success",
        });
        const user = result.user;
        console.log(user);
      } catch (error) {
        Swal.fire({
          title: "Đăng kí thất bại",
          text: error.message,
          icon: "error",
        });
        console.log(error);
      }
    }

    document.getElementById("sign-in-form").addEventListener("submit", signIn);
  }
}

onAuthStateChanged(firebase.auth, handleAuthStateChanged);
