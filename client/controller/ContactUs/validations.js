export const validationName = (name) => {
  const spanError = document.getElementById("spanErrorName");
  if (name.trim().length < 6) {
    spanError.style.display = "block";
    spanError.style.color = "red";
    return true;
  } else {
    spanError.style.display = "none";
    return false;
  }
};

export const validationEmail = (email) => {
  const spanError = document.getElementById("spanErrorEmail");
  const regEx = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!regEx.test(email)) {
    spanError.style.display = "block";
    spanError.style.color = "red";
    return true;
  } else {
    spanError.style.display = "none";
    return false;
  }
};

export const validationMsg = (msg) => {
  const spanError = document.getElementById("spanErrorMsg");
  if (msg.length < 30) {
    spanError.style.display = "block";
    spanError.style.color = "red";
    return true;
  } else {
    spanError.style.display = "none";
    return false;
  }
};
