let inputs = document.querySelectorAll(".input_box")
let button = document.querySelector(".Generate")
let span_name = document.querySelector(".name")
let span_email = document.querySelector(".email")
let first_page = document.querySelector(".main_cont")
let generator_page = document.querySelector(".ticket_generator")
let date = document.querySelector(".date")
let display_image = document.querySelectorAll(".preview_image")
let profile_pic = document.querySelector(".input_img[type='file']");
let ticket_name = document.querySelector(".ticket_nm")
let ticket_git_hub = document.querySelector(".ticket_git")
let change_button =  document.querySelector(".change_img")
let remove_button =  document.querySelector(".remove_img")
let buttons =  document.querySelector(".buttons")
let upload_icon = document.querySelector(".upload_icon")
let image_input_text = document.querySelector(".input_text")
let careful_text = document.querySelectorAll(".careful_text")
let careful_messages = document.querySelectorAll(".careful_message")
let info_icons = document.querySelectorAll(".info_icon")
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let input_boxs = document.querySelectorAll(".input_box")
let empty_inputs = document.querySelectorAll(".empty_input")
let drop_area = document.querySelector(".img_input_box")



/////////////////////////////////////////////////////////////////////////////

let today = new Date();
let options = { month: "short", day: "numeric", year: "numeric" };
let formattedDate = today.toLocaleDateString("en-US", options);             // get today date 

/////////////////////////////////////////////////////////////////////////////

    // Validate Email
function check_email(email){

    if (emailPattern.test(email)) {
        careful_messages[1].classList.add("none");
        input_boxs[1].classList.remove("border_error");
        return true
    } 
    else{
        careful_messages[1].classList.remove("none");
        input_boxs[1].classList.add("border_error");
        return false;
    }

}

function Generate_ticket() {
    let name = inputs[0].value.trim();
    let email = inputs[1].value.trim();
    let git_hub = inputs[2].value.trim();

    check_empty_inputs(); // This already highlights empty fields

    // Check if any input is empty
    if (name === "" || email === "" || git_hub === "") {
        return; // Stop the function if any field is empty
    }


    if(!check_email(email)){
        return
    }
    // Ensure an image is uploaded before generating the ticket
    if (!display_image[0].src || display_image[0].src === "") {
        alert("Please upload a profile image before generating the ticket!");
        return;
    }
    // If all inputs are valid, show the ticket
    first_page.classList.add("none");
    generator_page.classList.remove("none");
    span_name.innerText = name + "!";
    span_email.innerText = email;
    date.innerText = formattedDate + " / Cairo, EG";
    ticket_git_hub.innerText = git_hub;
    ticket_name.innerText = name;
}

button.addEventListener("click",Generate_ticket)
function handle_file(file) {
    if (file.size > 500 * 1024) { // 500KB limit
        profile_pic.value = ""; // Reset input
        careful_text[0].classList.add("none");
        careful_text[1].classList.remove("none");
        info_icons[0].classList.add("none");
        info_icons[1].classList.remove("none");
        button.disabled = true;
        return;
    }

    careful_text[1].classList.add("none");
    careful_text[0].classList.remove("none");
    info_icons[1].classList.add("none");
    info_icons[0].classList.remove("none");
    button.disabled = false;

    let reader = new FileReader();
    reader.onload = function (e) {
        display_image[0].src = e.target.result;
        display_image[1].src = e.target.result;
        display_image[0].classList.remove("none");
        buttons.classList.remove("none");
        upload_icon.classList.add("none");
        profile_pic.classList.add("none");
        image_input_text.classList.add("none");
    };
    reader.readAsDataURL(file);
}

// Handle Image Selection
profile_pic.addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        handle_file(file);
    }
});

// Drag & Drop Functionality
drop_area.addEventListener("dragover", function (event) {
    event.preventDefault();
    drop_area.classList.add("highlight"); // Add highlight effect
});

drop_area.addEventListener("dragleave", function (event) {
    drop_area.classList.remove("highlight"); // Remove highlight effect
});

drop_area.addEventListener("drop", function (event) {
    event.preventDefault();
    drop_area.classList.remove("highlight");

    let file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
        handle_file(file);
    }
});

function remove_img(){
    display_image[0].classList.add("none");
    buttons.classList.add("none");
    upload_icon.classList.remove("none")
    profile_pic.classList.remove("none")
    image_input_text.classList.remove("none")
}

function change_image(){
    profile_pic.classList.remove("none")
    profile_pic.click();
}

function check_empty_inputs(){
    for(let i = 0 ; i < 3 ; i++){
        if(input_boxs[i].value == ""){
            input_boxs[i].classList.add("border_error")
            empty_inputs[i].classList.remove("none")
        }
        else{
            input_boxs[i].classList.remove("border_error")
            empty_inputs[i].classList.add("none")
        }
    }
}


remove_button.addEventListener("click",remove_img)
change_button.addEventListener("click",change_image)
email.addEventListener("change",check_email)
