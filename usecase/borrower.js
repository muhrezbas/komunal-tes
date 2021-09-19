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
  static create_reg_borrower() {
    return `INSERT INTO borrowers(
            Id ,
            CustomerName ,
            DatePurchase ,
            Amount_due__c ,
            Discount__c ,
            GST__c ,
            CreatedDate ,
            LastModifiedDate

            ) 
        VALUES ?;
        `;
  }
  static update_reg_borrower(id, data) {
    return `UPDATE borrowers SET CustomerName = '${data.CustomerName}', DatePurchase = ${data.DatePurchase}, Amount_due__c = ${data.Amount_due__c},  Discount__c = ${data.Discount__c}, GST__c = ${data.GST__c}, LastModifiedDate = '${data.LastModifiedDate.toISOString().slice(0, 19).replace('T', ' ')}' WHERE Id = '${id}'`;
  }
  static delete_reg_borrowers(id) {
    return `DELETE FROM borrowers WHERE Id = '${id}'`;
  }
  static create_user() {
    return `INSERT INTO users(
      Id ,
      Email ,
      Password ,
      CreatedDate ,
      LastModifiedDate

      ) 
  VALUES ?;
  `;

  }


}

module.exports = BorrowerUsecase;
