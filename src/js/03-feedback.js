import { forEach, throttle } from "lodash";

const formRef = document.querySelector(".feedback-form");

const formData = {
    email: "",
    message: "",
};

formRef.addEventListener("input", throttle(formDataInput, 500));

function formDataInput(event) {
    event.preventDefault();
    formData[event.target.name] = event.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
    console.log(JSON.stringify(formData));
};

formRef.addEventListener("submit", (event) => {
    if (Object.values(formData).includes("")) {
        event.preventDefault();
        alert("Заповніть всі поля форми");
        return;
    }

    localStorage.removeItem("feedback-form-state");
    event.currentTarget.reset();
    console.log(formData);
});

function getFormData() {
    if (localStorage.getItem("feedback-form-state") === null) {
        return;
    }

    const  localStorageData = JSON.parse(localStorage.getItem("feedback-form-state"));

    Object.entries(localStorageData).forEach(([key, value]) => {
        formRef.elements[key].value = value;
    });
};

getFormData();


