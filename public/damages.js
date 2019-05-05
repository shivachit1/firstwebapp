const ul = document.getElementById("damages");
const url = 'http://localhost:3000/damages';
let IDdamage=null;


fetch(url).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    
    for (var i = 0; i < data.length; i++){
         let damage = data[i];
        
         let node = createNode('li');
         let div = createNode('div');
         let edit = createNode('div');
         

         div.innerHTML = 
        `<p>Damage title: ${damage.damageTitle}</p>
         <p>Description: ${damage.description}</p>
         <p>Condition : ${damage.condition}</p>
         <p>Posted by : ${damage.userID}</p>`;

         edit.innerHTML = 
         `<a  onclick="updateDamage('${damage._id}')">Update</a> 
          <a  onclick="deleteDamage('${damage._id}')">Delete</a></br></br>`;
         

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
  let container = document.getElementById("update-container");
  let damagesList = document.getElementById("damageslist-container");
  let damageTitle = document.getElementById("damageTitle");
  let description = document.getElementById("description");
  let condition = document.getElementById("condition");
  container.style.display = "block";
  damagesList.style.display = "none";
  
 
    fetch(url+"/"+damageId).then(response => {
      return response.json();
    }).then(data => {
      console.log("Updating Damage:"+damageId);
      
      // Work with JSON data here
      damageTitle.value=data.damageTitle;
      description.value = data.description;
      condition.value=data.condition;
      changeformaction(damageId);
      
      
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });
    
    
}


function changeformaction(damageID){
  document.newForm.action = "http://localhost:3000/damages/"+damageID;
}

function updated(){

 let container = document.getElementById("update-container");
  let damagesList = document.getElementById("damageslist-container");
  container.style.display = "none";
  damagesList.style.display = "block";

}



function deleteDamage(Id){
  console.log(Id);
  return fetch(url + '/' + Id, {
    method: 'delete'
  }).then(response =>{
    document.location.href = "http://localhost:3000/damages.html";
  }
  );
}


