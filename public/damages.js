const ul = document.getElementById("damages");
const url = 'http://localhost:3000/damages';

fetch(url).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    
    for (var i = 0; i < data.length; i++){
         let damage = data[i];
        
         let node = createNode('li');
         let div = createNode('div');
         let edit = createNode('div');
         

         div.innerHTML = `<p>Damage title: ${damage.damageTitle}</p>
         <p>Description: ${damage.description}</p>
         <p>Condition : ${damage.condition}</p>
         <p>Posted by : ${damage.userID}</p>`;

         edit.innerHTML = `<a href="" onclick="updateDamage('${damage._id}')">Update</a>  <a href=""onclick="deleteDamage('${damage._id}')">Delete</a></br></br>`;
         

         node.appendChild(div);
         node.appendChild(edit);
         document.getElementById("damages").appendChild(node);
         

    }

  }).catch(err => {
    // Do something for an error here
    console.log("Error Reading data " + err);
  });

  function createNode(element){
    return document.createElement(element);
}

function append(parent,el){
return parent.appendChild(el);
}


  function showThankyou(){
   // document.getElementById("damgeform").submit();
    console.log("Button click");
    
    let damageTitle=document.getElementById('damageTitle').value;
    let description=document.getElementById('description').value;
    let condition=document.getElementById('condition').value;
      /* some other fields */
      /* now call ur function by passing the above values */
    if(damageTitle && description && condition){
      let damageform = document.getElementById("damageform");
      let messageText = document.getElementById("messageText");
      let messageDiv = document.getElementById("messageDiv");
      let damagePage = document.getElementById("link1");
      let reportNewDamage = document.getElementById("link2");
      if (damageform.style.display === "none") {
        damageformstyle.display = "block";
        damagePage.style.display = "none";
      } else {
        damageform.style.display = "none";
        messageText.innerText="Thank you Reporting..."
        damagePage.style.display = "block";
        reportNewDamage.style.display = "block";
      }
    }
   
}

function updateDamage(damageId){
  console.log("Updating Damage:"+damageId);
  $("#damageform").attr("method", "PUT");
  fetch(url+"/"+damageId, { 
    method: 'UPDATE'

}); 
  
}
function deleteDamage(damageId){
  console.log("Deleting Damage: "+ damageId);
  fetch(url+"/"+damageId, { 
  method: 'DELETE' 
}); 
}


function loggedin(){
  console.log("Logged IN");
  fetch(url+"/auth/google/redirect", { 
  method: 'GET'
  
}); 
window.location = newUrl;
}