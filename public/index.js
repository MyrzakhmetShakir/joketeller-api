const audioBel = document.querySelector('.audio');
const btn = document.querySelector('.btn');

const disab = () => btn.disabled = false; 

async function fetchedData() {
   fetch('https://joketeller-api.onrender.com/post', {method:"POST"})
        .then(async (r)=>{
            if(r.ok) { 
                 try {
                    audioBel.src = "https://joketeller-api.onrender.com/name";
                    await audioBel.play();
                    btn.disabled = true;
                  } catch (error) { console.log(error); }   }
           
        });
}

btn.addEventListener('click', fetchedData);
audioBel.addEventListener('ended', disab);
