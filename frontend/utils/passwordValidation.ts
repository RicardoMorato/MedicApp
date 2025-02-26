const passwordValidation = {
    hasUpperCase: (v: string) => /[A-Z]/.test(v) || "A senha deve ter pelo menos uma letra maiúscula.",
    hasLowerCase: (v: string) => /[a-z]/.test(v) || "A senha deve ter pelo menos uma letra minúscula.",
    hasSpecialChar: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || "A senha deve ter pelo menos um caractere especial."
};

export default passwordValidation
