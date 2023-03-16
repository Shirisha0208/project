const lengthSlider = document.querySelector("#inputValue"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndirect = document.querySelector(".pass-indirect"),
 generateBtn = document.querySelector(".generate-btn");

 const characters = {
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"^!$%&|[](){}:;.,*+-#@<>~"
 }


 const generatePassword = () =>{
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
    
    options.forEach(option => {
        if(option.checked){
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]
            }else if( option.id === "spaces"){
                staticPassword += `  ${staticPassword}  `;
            }else{
                excludeDuplicate = true;
            }
           
        }
    });
    for (let i = 0; i < passLength; i++){
        let randomchar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
            !randomPassword.includes(randomchar) || randomchar == " " ? randomPassword += randomchar : i--;
        }else{
            randomPassword += randomchar
        }


    }
    
    passwordInput.value = randomPassword;
 }
 const updatePassIndirect = () =>{
    passIndirect.id = lengthSlider.value <= 8 ? "week" : lengthSlider.value <= 16 ? "medium" : "strong";

 }

const updateSlider = () =>{
    document.querySelector(".pass-length span").innerText=lengthSlider.value;
    generatePassword();
    updatePassIndirect();
}
updateSlider();

const copyPassword = () =>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
}
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword);