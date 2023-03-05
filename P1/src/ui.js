function show_u_review(){
  document.getElementById('rbu').hidden = false;
  document.getElementById('rau').hidden = true;
  document.getElementById('about').removeAttribute('aria-current');
  document.getElementById('about').classList.remove('active');
  document.getElementById('by').setAttribute('aria-current','page');
  document.getElementById('by').classList.add('active');
}

function show_u1_review(){
  document.getElementById('rbu').hidden = true;
  document.getElementById('rau').hidden = false;
  document.getElementById('by').removeAttribute('aria-current');
  document.getElementById('by').classList.remove('active');
  document.getElementById('about').setAttribute('aria-current','page');
  document.getElementById('about').classList.add('active');
}

function show_login(){
  document.getElementById('register').hidden = true;
  document.getElementById('login').hidden = false;
  document.getElementById('register_button').removeAttribute('aria-current');
  document.getElementById('register_button').classList.remove('active');
  document.getElementById('login_button').setAttribute('aria-current','page');
  document.getElementById('login_button').classList.add('active');
}

function show_register(){
  document.getElementById('login').hidden = true;
  document.getElementById('register').hidden = false;
  document.getElementById('login_button').removeAttribute('aria-current');
  document.getElementById('login_button').classList.remove('active');
  document.getElementById('register_button').setAttribute('aria-current','page');
  document.getElementById('register_button').classList.add('active');
}

function show_edit_profile(element) {
  element.classList.add("disabled");
  document.getElementById("edit-form").hidden=false;
  document.getElementById("basic-infor").hidden=true;
}

function hide_edit() {
  document.getElementById("change").classList.remove("disabled");
  document.getElementById("edit-form").hidden=true;
  document.getElementById("basic-infor").hidden=false;
}

function log_out() {
  alert("Log out successfully");
}

function submit_suc() {
  alert("Submit successfully");
}

function reset_suc() {
  alert("Reset successfully");
}

function add(element){
  // initialization srar class
  let row = element.parentElement;
  var cur_rating = element.getAttribute('rating'); 
  for (let idx = 0 ; idx < row.children.length; idx ++){
    let item = row.children[idx];
    if (item.getAttribute('rating') <= cur_rating){
      item.classList.add('checked');
    }else{
      item.classList.remove('checked');
    }
  }

}