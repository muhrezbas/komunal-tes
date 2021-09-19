class BorrowerUsecase {
  static read_reg_borrower(page, limit) {
    let last = (page * limit) 
    let first = last - limit
    console.log(first, last)
    return `SELECT * FROM borrowers
    limit ${first},${last}`;
  }
  static read_reg_borrower_id(id) {
    console.log(id, "test")
    return `SELECT * FROM borrowers
    where Id = "${id}"`;
  }

  
}

module.exports = BorrowerUsecase;
