Backend tasks
--------------
* Setup authentication for the APIs
* Provide API to create, edit, delete, list contacts
* Provide API to create, edit, delete, list transactions
* Provide API to get an overview

Frontend tasks
---------------
* Add a page to show an overview. The page contains a table with following columns
    * Name
    * Outstanding principal amount
    * Outstanding interest amount
    * Paid interest amount
    * Date
    * Last transaction date
* Add a page to show a list of transactions (sorted by date by default). The table contains following columns
    * Name
    * Type (Lending, Payment)
    * Amount
    * Payment Type (Principal, Interest - optional field populated only when transaction type is Payment)
    * Interest percent (optional field populated only when transaction type is lending)
    * Date
* Each transaction in the page has options to Edit and Delete 
* The transactions page has a button to add a new transaction. Clicking on the button opens a page containing form to fill out the details of a transaction. Note that the form should support both the transaction types - Lending and Payment. The form should update dynamically based on user selection.
