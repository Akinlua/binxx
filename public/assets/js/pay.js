require("dotenv").config();
(function () {
  ("use strict");

  const publicKey = process.env.PUBLIC_KEY;

  amount = 0;
  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the 'plan' parameter
  const plan = urlParams.get("plan").toLocaleLowerCase() || "basic";

  // Log the value of the 'plan' parameter
  console.log(plan);
  pls = document.getElementById("plan_show");

  switch (plan) {
    case "basic":
      amount = 300000;
      pls.innerHTML = "You have choosen a premium plan";
      break;
    case "premium":
      amount = 500000;
      pls.innerHTML = "You have choosen a super premium plan";
      break;
    default:
      amount = 300000;
      pls.innerHTML = "You have choosen a premium plan";
      break;
  }

  // Function to handle Paystack checkout
  function payWithPaystack(email, phone, amount, name, plan) {
    var handler = PaystackPop.setup({
      key: publicKey, // Replace with your public key
      email: email,
      amount: amount, // Amount in kobo
      currency: "NGN", // Currency code
      ref: "" + Math.floor(Math.random() * 1000000000 + 1), // Generate a random reference number
      callback: function (response) {
        const currentDate = new Date();

        // Add 30 days to the current date
        const futureDate = new Date(
          currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );

        // Format the future date as "10 Jan, 2024"
        const options = { day: "numeric", month: "short", year: "numeric" };
        const formattedDate = futureDate.toLocaleDateString("en-US", options);

        console.log(response);
        console.log({
          Fullname: name,
          email: email,
          plan: plan,
          price: amount / 100,
          "Expiry Date": formattedDate,
          "Phone number": phone,
        });
        // What to do after payment is successful
        alert("Payment complete! Reference: " + response.reference);
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe();
  }

  // Function to validate phone number
  function validatePhoneNumber(phone) {
    // Add your phone number validation logic here
    return true; // Return true if phone number is valid, false otherwise
  }
  setInterval(() => {
    if (
      fname.trim() != "" &&
      lname.trim() != "" &&
      emailRegex.test(email) &&
      phone.trim() != ""
    ) {
      alert("dsdd");
    } else {
      alert("naheem");
    }
  }, 100);
  // Handle continue button click
  document.getElementById("continueBtn").addEventListener("click", function () {
    event.preventDefault();
    var fname = document.getElementById("firstName").value;
    var lname = document.getElementById("lastName").value;
    var name = fname + " " + lname;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phoneNumber").value;
    var countryCode = document.getElementById("countryCode").value;
    var otp = document.getElementById("otp-div");
    var otp = document.getElementById("otp").value;
    otp.classList.remove("d-none");

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validate phone number
    if (validatePhoneNumber(phone)) {
      // Concatenate country code and phone number
      var phoneNumber = countryCode + phone;

      // Call Paystack checkout function
      payWithPaystack(email, phoneNumber, amount, name, plan);
    } else {
      alert("Invalid phone number");
    }
  });
});
