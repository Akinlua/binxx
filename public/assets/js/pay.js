require("dotenv").config();

const publicKey = process.env.PUBLIC_KEY;

let amount = 300000;
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get("plan")?.toLowerCase() || "basic";

console.log(plan);
const pls = document.getElementById("plan_show");

switch (plan) {
  case "basic":
    amount = 300000;
    pls.innerHTML = "You have chosen a premium plan";
    break;
  case "premium":
    amount = 500000;
    pls.innerHTML = "You have chosen a super premium plan";
    break;
  default:
    amount = 300000;
    pls.innerHTML = "You have chosen a premium plan";
    break;
}

function payWithPaystack(email, phone, amount, name, plan) {
  var handler = PaystackPop.setup({
    key: publicKey,
    email: email,
    amount: amount,
    currency: "NGN",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1),
    callback: function (response) {
      const currentDate = new Date();
      const options = { day: "numeric", month: "short", year: "numeric" };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);

      console.log(response);
      console.log({
        Fullname: name,
        email: email,
        plan: plan,
        price: amount / 100,
        "Phone number": phone,
      });

      alert("Payment complete! Reference: " + response.reference);
    },
    onClose: function () {
      alert("Transaction was not completed, window closed.");
    },
  });
  handler.openIframe();
}

function validatePhoneNumber(phone) {
  // Add your phone number validation logic here
  return true; // Return true if phone number is valid, false otherwise
}

setInterval(() => {
  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;

  if (
    fname.trim() !== "" &&
    lname.trim() !== "" &&
    validatePhoneNumber(phone)
  ) {
    alert("dsdd");
  } else {
    alert("naheem");
  }
}, 100);

document
  .getElementById("continueBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const fname = document.getElementById("firstName").value;
    const lname = document.getElementById("lastName").value;
    const name = fname + " " + lname;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phoneNumber").value;
    const countryCode = document.getElementById("countryCode").value;
    const otp = document.getElementById("otp-div");
    const otpValue = document.getElementById("otp").value;
    otp.classList.remove("d-none");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (validatePhoneNumber(phone)) {
      const phoneNumber = countryCode + phone;
      payWithPaystack(email, phoneNumber, amount, name, plan);
    } else {
      alert("Invalid phone number");
    }
  });

// Add event listener to the form submit event
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;

  if (
    fname.trim() !== "" &&
    lname.trim() !== "" &&
    validatePhoneNumber(phone) &&
    emailRegex.test(email)
  ) {
    // Display the OTP input field
    document.getElementById("otp-div").classList.remove("d-none");
  } else {
    // Form is not valid, show an error or take appropriate action
    alert("Please fill in all required fields with valid values.");
  }
});
