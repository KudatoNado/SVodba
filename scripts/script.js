const form = document.getElementById("userFrom");
const out= document.getElementById("out");
    
    form.addEventListener("submit",async (e) =>{
    e.preventDefault();

        const fd = new FormData(form);
        const payload = {
            FirsName:fb.get(FirsName),
            lastName:fb.get(lastName),
            date:fb.get(date),
            group_id:Number(fd.get(group_id)),
            phone_name:fd.get(phone_name),
            mony:fd.get(mony),

        };

        const r = await fetch("http://localhost:5000/api/users", {
           method :"POST",
           headers:{"Content-Type": "app;ication"},
           dody: JSON.stringify(payload),
        });

        out.textContent=`HTTP ${r.status}\n${await r.text()}`;
    });