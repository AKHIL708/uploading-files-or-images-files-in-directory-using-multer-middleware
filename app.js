var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const app = express();
console.log(path.join(__dirname, "./public/images"));
let storagePath = path.join(__dirname, "./public/images");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename : (req, file , cb)=>{
    console.log(file);
    cb(null , file.originalname)
    // cb(null , Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({storage : storage})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/upload", (req, res) => {
  res.render("index");
});
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file.path)
  res.send("image uploaded 😊");
});

app.listen(3000, () => {
  console.log("app listening");
});
