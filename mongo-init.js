const dbName = "test";
const systemUsers = [
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: dbName
            },
            {
                role: "root",
                db: "admin"
            }
        ]
    }
];


db.dropAllUsers();
db.getSiblingDB(dbName).dropAllUsers();

systemUsers.forEach(user => {
    db.createUser(user);
    db.getSiblingDB(dbName).createUser(user);
});
