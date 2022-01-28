const { getAllShoes, getFilteredShoes } = require("../utils/queries");

const getShoesHandler = async (req, res) => {
  const { search } = req.query;
  try {
    let shoes = await getAllShoes();
    if (search) {
      shoes = await getFilteredShoes(search);
    }
    return res.json({
      success: true,
      message: "Shoes",
      data: shoes,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

module.exports = {
  getShoesHandler,
};
