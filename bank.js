import inquirer from 'inquirer';

class BankAccount {
    constructor() {
        this.accountBalance = 500;
        this.bankAccountNumber = Math.floor(Math.random() * 90000) + 10000;
    }

    async withdraw() {
        const { amount } = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to Withdraw: ',
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        });

        if (amount <= this.accountBalance) {
            this.accountBalance -= amount + 1; // $1 for the transaction
            console.log(`Withdrawn ${amount} from your account. Remaining balance is ${this.accountBalance} after deduction of $1 Transaction Fee`);
        } else {
            console.log('Insufficient balance.');
        }
    }

    async deposit() {
        const { amount } = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to Deposit: ',
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number
        });
        if (amount <= this.accountBalance) {
            this.accountBalance += amount - 1; // $1 for the transaction
            console.log(`Deposited ${amount} to your account. Remaining balance is ${this.accountBalance}, $1 transaction fee deducted.`);
        }
    }
}

class Customer extends BankAccount {
    constructor(firstName, lastName, gender, age, mobileNumber) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
    }
}

async function createCustomerAndAccount() {
    const { firstName, lastName, gender, age, mobileNumber } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter your first name:' },
        { type: 'input', name: 'lastName', message: 'Enter your last name:' },
        { type: 'list', name: 'gender', message: 'Select your gender:', choices: ['Male', 'Female'] },
        { type: 'input', name: 'age', message: 'Enter your age:', filter: Number },
        { type: 'input', name: 'mobileNumber', message: 'Enter your mobile number:' }
    ]);

    const customer = new Customer(firstName, lastName, gender, age, mobileNumber);

    const { operation } = await inquirer.prompt({
        type: 'list',
        name: 'operation',
        message: 'Choose an operation:',
        choices: ['Withdraw', 'Deposit']
    });

    if (operation === 'Withdraw') {
        customer.withdraw();
    } else {
        customer.deposit();
    }
}

createCustomerAndAccount();
