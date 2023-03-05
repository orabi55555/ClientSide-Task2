//Select data to work with
let DisplayAll = document.querySelector('.Display-data button');
let dataContainer = document.querySelector('.Display-data')

//function to create elements to users
function createElement(key,value){
    let h2 = document.createElement('h2')
    h2.innerText = `${key} : ` ;
    let span = document.createElement('span')
    span.className="spanStyle"
    span.innerText = value
    h2.appendChild(span)
    dataContainer.appendChild(h2)
}

// action on button to fetch all data
DisplayAll.onclick=function(){

    fetch('http://localhost:7001/myjsonfile.json')

    .then((response)=>{

        if(response.ok === false){

            throw new Error(response.status)

        }else{

            return response.json();

        }

    })

    .then((data)=>{
// delete content of the dev in welcome to fetch all users
        dataContainer.innerHTML = ""
        data.forEach(element => {
            createElement( 'Name', element.name)
            createElement( 'Mobile', element.mobile)
            createElement('Email',element.email)
            createElement('Address',element.address)
            let hr = document.createElement('hr')
             dataContainer.appendChild(hr)
    
        });
       
    })

    .catch((err)=>{

        console.log(err)

    })
}