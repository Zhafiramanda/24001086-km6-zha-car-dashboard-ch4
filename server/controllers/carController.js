const Car = require("../models/Car");

// Menampilkan halaman utama
exports.homepage = async (req, res) => {
  try {
    const cars = await Car.find({}, { _id: 0 });
    const message = req.flash("info");
    res.render("index", { cars: cars, message: message });
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan dalam menampilkan homepage");
  }
};

// Menampilkan form tambah mobil baru
exports.addCar = async (req, res) => {
  res.render("car/add");
};

// Menambahkan mobil baru ke database
exports.postCar = async (req, res) => {
  console.log(req.body);

  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    throw err;
  }

  const newCar = new Car({
    name: req.body.name,
    price: parseFloat(req.body.price),
    size: req.body.size,
    image: req.file.path,
  });

  try {
    await Car.create(newCar);
    req.flash("info", "Data berhasil disimpan.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan dalam menyimpan mobil baru");
  }
};

// Menampilkan form edit mobil berdasarkan ID
exports.editCar = async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id });
    res.render("car/edit", { car });
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan dalam menampilkan form edit");
  }
};

// Memperbarui mobil berdasarkan ID
exports.editCarPost = async (req, res) => {
  try {
    const { name, price, size } = req.body;
    const carId = req.params.id;

    // Perbarui data mobil berdasarkan ID yang diberikan
    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { name, price, size, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).send("Mobil tidak ditemukan");
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan dalam memperbarui mobil");
  }
};

module.exports = exports;
