const express = require('express');
const sql = require('mssql');
const app = express();
app.use(express.json());

const databaseConfig = {
    server:"A402PCPREPOD",
    database: "KodinDo25_05_2026",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,
        trustServerCerficate: true
    }
};
app.get("/users", async(req, res)=>{
    const connect = await sql.connect(databaseConfig);

    const result =await connect.request()
        .query("SELECT * FROM   dbo.users");
    res.json(result.recordset);
});

app.post("/users", async(req, res)=>{
    const connect = await sql.connect(databaseConfig);

    const {FirsName, lastName, date, group_id, phone_name, mony} = req.body;
    await connect.request()
    .input("FirsName",sql.NVarChar, FirsName )
    .input("lastName",sql.NVarChar, lastName )
    .input("date",sql.Date, date)
    .input("group_id",sql.Int, group_id)
    .input("phone_name",sql.NVarChar, phone_name)
    .input("mony",sql.Money, mony)
    .query(`
        INSERT INTO dbo.users(FirsName, lastName, date, group_id, phone_name, mony)
        VALUES(@FirsName, @lastName, @date, @group_id, @phone_name, @mony)

    `);
    res.send("OK")

    


});


app.listen(3000, () => {
    console.log('Server sterted')
});