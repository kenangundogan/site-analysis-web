// src/app/lib/validation.js

function validateEmail(value) {
    if (!value) return "Email zorunludur";
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) return "Geçerli bir email adresi girin";
    return "";
}

function validatePassword(value) {
    if (!value) return "Şifre zorunludur";
    if (value.length < 6) return "Şifre en az 6 karakter olmalı";
    return "";
}

function validateText(value) {
    if (!value) return "Bu alan zorunludur";
    return "";
}

const validators = {
    email: validateEmail,
    password: validatePassword,
    text: validateText,
};

export function validateField(type, value) {
    const validator = validators[type] || validators.text;
    return validator(value);
}
